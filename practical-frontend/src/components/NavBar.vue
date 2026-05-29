<template>
  <nav class="navbar" v-if="authStore.isAuthenticated">
    <div class="nav-brand">🚀 Mi Aplicación</div>
    <div class="nav-user">
      <span>Bienvenido, <strong>{{ authStore.user?.name || 'Usuario' }}</strong></span>
      <button @click="handleLogout" class="btn-logout" :disabled="cargando">
        {{ cargando ? 'Cerrando...' : 'Cerrar Sesión' }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const cargando = ref(false)

const handleLogout = async () => {
  cargando.value = true
  await authStore.logout() // Borra token en Laravel y Pinia
  cargando.value = false
  router.push('/login') // Redirige al login
}
</script>

<style scoped>
.navbar { display: flex; justify-content: space-between; align-items: center; background: #2c3e50; color: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; }
.nav-brand { font-weight: bold; font-size: 18px; }
.nav-user { display: flex; align-items: center; gap: 15px; }
.btn-logout { background: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }
.btn-logout:disabled { background: #95a5a6; }
</style>