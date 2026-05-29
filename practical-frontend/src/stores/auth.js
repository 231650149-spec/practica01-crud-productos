// src/stores/auth.js
import { defineStore } from 'pinia' 
import axios from 'axios' 

export const useAuthStore = defineStore('auth', { 
  state: () => ({ 
    user: null, 
    token: localStorage.getItem('token') || null, // Recupera el token guardado en el navegador [cite: 142]
  }), 

  getters: { 
    // Retorna true si hay un token activo, de lo contrario false [cite: 145]
    isAuthenticated: (state) => !!state.token, 
  }, 

  actions: { 
    // Acción para iniciar sesión [cite: 148]
    async login(credentials) { 
      try {
        const response = await axios.post('http://localhost:8000/api/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        
        // Guardamos el token de forma permanente en el navegador
        localStorage.setItem('token', response.data.token)
        return response.data
      } catch (error) {
        throw error // Lanza el error para que la vista lo capture y lo muestre en pantalla
      }
    },

    // Acción para registrar un nuevo usuario [cite: 149]
    async register(data) { 
      try {
        const response = await axios.post('http://localhost:8000/api/register', data)
        this.token = response.data.token
        this.user = response.data.user
        
        localStorage.setItem('token', response.data.token)
        return response.data
      } catch (error) {
        throw error
      }
    },

    // Acción para cerrar la sesión actual [cite: 150]
    async logout() { 
      try {
        // Le avisamos al backend de Laravel que destruya el token activo
        await axios.post('http://localhost:8000/api/logout', {}, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
      } catch (error) {
        console.error("Error al revocar token en servidor:", error)
      } finally {
        // Limpiamos los datos de Pinia y del almacenamiento local pase lo que pase [cite: 182]
        this.logoutLocal()
      }
    },

    // === NUEVAS ACCIONES ===
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:8000/api/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data
      } catch (error) {
        this.logoutLocal()
        throw error
      }
    },
    
    logoutLocal() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  } 
})
