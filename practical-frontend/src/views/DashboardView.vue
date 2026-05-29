<template>
  <div>
    <NavBar />
    <div class="dashboard-content">
      <div class="welcome-box card">
        <h3>📊 Panel de Control General</h3>
        <p>Has ingresado de manera segura utilizando un Token API Bearer de Laravel Sanctum[cite: 18].</p>
      </div>
      
      <ProductosList />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import NavBar from '../components/NavBar.vue'
import ProductosList from '../components/ProductosComponent.vue'
const authStore = useAuthStore()

onMounted(async () => {
  // Si no tenemos los datos del usuario cargados en memoria, los pedimos a /api/me [cite: 52]
  if (!authStore.user) {
    try {
      const res = await axios.get('/me')
      authStore.user = res.data
    } catch (err) {
      console.error("Error al recuperar perfil del servidor", err)
    }
  }
})
</script>

<style scoped>
.dashboard-content { display: flex; flex-direction: column; gap: 20px; }
.welcome-box { background: #e8f4f8; border-left: 5px solid #3498db; padding: 15px; text-align: left; }
.welcome-box h3 { margin: 0 0 5px 0; color: #2c3e50; }
.welcome-box p { margin: 0; color: #555; font-size: 14px; }
</style>