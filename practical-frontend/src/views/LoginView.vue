<template>
  <div class="auth-container">
    <div class="card auth-card">
      <h2>Iniciar Sesión</h2>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" v-model="form.email" required placeholder="correo@ejemplo.com">
        </div>
        
        <div class="form-group">
          <label>Contraseña:</label>
          <input type="password" v-model="form.password" required placeholder="********">
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="cargando">
          {{ cargando ? 'Verificando...' : 'Entrar' }}
        </button>
      </form>
      <p class="auth-footer">
        ¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router' // 👈 Importamos también useRoute

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute() // 👈 Accedemos a los parámetros de la URL actual

const form = ref({ email: '', password: '' })
const error = ref('')
const cargando = ref(false)

const handleLogin = async () => {
  error.value = ''
  cargando.value = true
  try {
    await authStore.login(form.value)
    
    // 👇 Lógica de redirección avanzada post-login
    const destinoOriginal = route.query.redirect || '/admin'
    router.push(destinoOriginal)

  } catch (err) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.'
  } finally {
    cargando.value = false
  }
}
</script>

<style>
/* Estilos compartidos para las vistas de Auth */
.auth-container { display: flex; justify-content: center; align-items: center; min-height: 70vh; }
.auth-card { width: 100%; max-width: 400px; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.auth-card h2 { text-align: center; margin-bottom: 20px; color: #2c3e50; }
.form-group { display: flex; flex-direction: column; margin-bottom: 15px; text-align: left; }
.form-group label { font-weight: bold; margin-bottom: 5px; color: #555; }
.form-group input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; }
.btn-primary { width: 100%; background: #3498db; color: white; border: none; padding: 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 16px; margin-top: 10px; }
.btn-primary:disabled { background: #95a5a6; }
.auth-footer { text-align: center; margin-top: 15px; font-size: 14px; }
.alert { padding: 10px; border-radius: 4px; margin-bottom: 15px; font-weight: bold; font-size: 14px; text-align: center; }
.alert-danger { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
</style>
