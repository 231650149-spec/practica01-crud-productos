// src/plugins/axios.js
import axios from 'axios'
import router from '../router' // Importaremos el enrutador que crearemos en el siguiente paso

// Configuramos la URL base global de nuestra API
axios.defaults.baseURL = 'http://localhost:8000/api'

// Interceptor de Petición: Añade el Token Bearer automáticamente si existe
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token') 
  if (token) {
    config.headers.Authorization = `Bearer ${token}` 
  }
  return config 
}, error => {
  return Promise.reject(error)
})

// Interceptor de Respuesta: Atrapa errores globales del servidor (como el 401)
axios.interceptors.response.use(
  response => response, 
  error => {
    // Si el servidor responde 401 (No autorizado), limpiamos todo y mandamos al login
    if (error.response?.status === 401) { 
      localStorage.removeItem('token')
      router.push('/login') 
    }
    return Promise.reject(error)
  }
)

export default axios