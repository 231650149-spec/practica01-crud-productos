<template>
  <div class="home-container">
    <header class="hero-section">
      <h1>🛍️ ¡Bienvenido a nuestra Tienda SPA!</h1>
      <p>Explora nuestro catálogo de productos con navegación ultra rápida en tiempo real.</p>
      <div class="hero-actions">
        <router-link to="/catalogo" class="btn btn-primary">Ver Catálogo Público</router-link>
        <router-link to="/admin" class="btn btn-secondary">Panel de Administración</router-link>
      </div>
    </header>

    <section class="latest-section">
      <h2>✨ Novedades del Inventario</h2>
      <div v-if="cargando" class="text-center">Cargando novedades...</div>
      
      <div v-else class="products-grid">
        <div v-for="producto in ultimosProductos" :key="producto.id" class="product-card">
          <h3>{{ producto.nombre }}</h3>
          <p class="price">${{{ producto.precio }}}</p>
          <router-link :to="'/catalogo/' + producto.id" class="btn-sm-link">Ver Detalles →</router-link>
        </div>
        <div v-if="ultimosProductos.length === 0" class="text-center">No hay productos disponibles.</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const ultimosProductos = ref([])
const cargando = ref(true)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/productos')
    // Obtenemos solo los últimos 3 productos agregados utilizando slice()
    ultimosProductos.value = response.data.slice(-3).reverse()
  } catch (error) {
    console.error("Error al obtener las novedades:", error)
  } finally {
    cargando.value = false
  }
})
</script>

<style scoped>
.home-container { display: flex; flex-direction: column; gap: 40px; padding: 20px 0; }
.hero-section { background: linear-gradient(135deg, #3498db, #2c3e50); color: white; padding: 60px 20px; border-radius: 12px; text-align: center; }
.hero-section h1 { margin: 0 0 15px 0; font-size: 32px; }
.hero-section p { margin: 0 0 25px 0; font-size: 18px; opacity: 0.9; }
.hero-actions { display: flex; justify-content: center; gap: 15px; }
.latest-section h2 { border-bottom: 2px solid #eee; padding-bottom: 10px; color: #2c3e50; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
.product-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eee; display: flex; flex-direction: column; justify-content: space-between; }
.product-card h3 { margin: 0 0 10px 0; color: #333; }
.price { font-size: 20px; font-weight: bold; color: #2ecc71; margin: 0 0 15px 0; }
.btn-sm-link { color: #3498db; font-weight: bold; text-decoration: none; align-self: flex-start; }
.btn-sm-link:hover { text-decoration: underline; }
.btn { padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none; display: inline-block; }
.btn-primary { background: #2ecc71; color: white; }
.btn-secondary { background: rgba(255,255,255,0.15); color: white; border: 1px solid white; }
.text-center { text-align: center; width: 100%; color: #7f8c8d; }
</style>