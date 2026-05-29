<template>
  <div class="auth-container">
    <div class="card auth-card">
      <h2>Crear Cuenta</h2>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" v-model="form.name" required placeholder="Tu nombre real">
        </div>

        <div class="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" v-model="form.email" required placeholder="correo@ejemplo.com">
        </div>
        
        <div class="form-group">
          <label>Contraseña:</label>
          <input type="password" v-model="form.password" required placeholder="Mínimo 8 caracteres">
        </div>

        <div class="form-group">
          <label>Confirmar Contraseña:</label>
          <input type="password" v-model="form.password_confirmation" required placeholder="Repite la contraseña">
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="cargando">
          {{ cargando ? 'Registrando...' : 'Registrarme' }}
        </button>
      </form>
      <p class="auth-footer">
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({ name: '', email: '', password: '', password_confirmation: '' })
const error = ref('')
const cargando = ref(false)

const handleRegister = async () => {
  error.value = ''
  cargando.value = true
  try {
    await authStore.register(form.value)
    router.push('/dashboard') // Registro exitoso nos loguea y manda al dashboard
  } catch (err) {
    error.value = err.response?.data?.message || 'Error en el registro. Verifica los campos.'
  } finally {
    cargando.value = false
  }
}
</script>