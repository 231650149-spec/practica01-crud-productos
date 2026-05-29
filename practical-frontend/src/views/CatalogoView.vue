<template>
  <div class="catalogo-container">
    <div class="header-back">
      <router-link to="/" class="back-link">← Volver al Inicio</router-link>
    </div>
    
    <h2>📦 Catálogo Completo de Productos</h2>

    <div class="search-box">
      <input 
        type="text" 
        v-model="busqueda" 
        placeholder="🔍 Escribe el nombre de un producto para filtrar..."
        class="search-input"
      />
    </div>

    <div v-if="cargando" class="text-center">Cargando el catálogo de la tienda...</div>

    <div v-else>
      <div class="products-grid">
        <div v-for="producto in productosFiltrados" :key="producto.id" class="card product-card">
          <div class="card-body">
            <h3>{{ producto.nombre }}</h3>
            <p class="description">{{ producto.descripcion || 'Sin descripción disponible.' }}</p>
            <div class="card-footer-info">
              <span class="price">${{ producto.precio }}</span>
              <span :class="['stock-badge', producto.stock > 0 ? 'in-stock' : 'no-stock']">
                {{ producto.stock > 0 ? producto.stock + ' disp.' : 'Agotado' }}
              </span>
            </div>
            <router-link :to="'/catalogo/' + producto.id" class="btn btn-detail">Ver Detalles</router-link>
          </div>
        </div>
      </div>

      <div v-if="productosFiltrados.length === 0" class="no-results card">
        No se encontraron productos que coincidan con "{{ busqueda }}".
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const productos = ref([])
const busqueda = ref('') // Enlazado reactivamente con v-model [cite: 187]
const cargando = ref(true)

// Filtrado reactivo en tiempo real por propiedad computada sin peticiones extra 
const productosFiltrados = computed(() => {
  return productos.value.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) [cite: 189, 190]
  )
})

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/productos')
    productos.value = response.data
  } catch (error) {
    console.error("Error al cargar catálogo:", error)
  } finally {
    cargando.value = false
  }
})
</script>

<style scoped>
.catalogo-container { display: flex; flex-direction: column; gap: 20px; }
.header-back { text-align: left; }
.back-link { color: #3498db; text-decoration: none; font-weight: bold; }
h2 { color: #2c3e50; margin: 0; }
.search-box { margin-bottom: 10px; }
.search-input { width: 100%; padding: 12px 15px; border: 2px solid #bdc3c7; border-radius: 8px; font-size: 16px; box-sizing: border-box; }
.search-input:focus { border-color: #3498db; outline: none; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.product-card { display: flex; flex-direction: column; justify-content: space-between; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
.product-card h3 { margin: 0 0 10px 0; color: #2c3e50; font-size: 20px; }
.description { font-size: 14px; color: #7f8c8d; margin: 0 0 15px 0; line-height: 1.4; flex-grow: 1; }
.card-footer-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.price { font-size: 22px; font-weight: bold; color: #2ecc71; }
.stock-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
.in-stock { background: #e8f8f5; color: #1e8449; }
.no-stock { background: #fceae9; color: #922b21; }
.btn-detail { background: #3498db; color: white; border: none; padding: 10px; text-align: center; border-radius: 5px; text-decoration: none; font-weight: bold; display: block; }
.no-results { text-align: center; padding: 30px; color: #7f8c8d; font-size: 16px; }
</style>