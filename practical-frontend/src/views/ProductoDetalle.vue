<template>
  <div class="detalle-container">
    <div v-if="cargando" class="text-center card">Consultando ficha técnica del producto...</div>
    
    <div v-else-if="error" class="card error-card">
      <h3>⚠️ Error</h3>
      <p>{{ error }}</p>
      <button @click="volver" class="btn btn-secondary">Volver al Catálogo</button>
    </div>

    <div v-else-if="producto" class="card main-detalle-card">
      <div class="detalle-header">
        <h2>🔍 Ficha de Producto: ID #{{ id }}</h2>
        <span :class="['status-indicator', producto.stock > 0 ? 'ok' : 'critico']">
          {{ producto.stock > 0 ? 'Disponible' : 'Sin Existencias' }}
        </span>
      </div>

      <div class="detalle-body">
        <h1 class="prod-title">{{ producto.nombre }}</h1>
        <p class="prod-desc">{{ producto.descripcion || 'Este artículo no cuenta con una descripción detallada en la base de datos.' }}</p>
        
        <div class="info-grid">
          <div class="info-tile">
            <span class="label">Precio al Público</span>
            <span class="value price-val">${{ producto.precio }}</span>
          </div>
          <div class="info-tile">
            <span class="label">Unidades en Almacén</span>
            <span class="value">{{ producto.stock }} unidades</span>
          </div>
        </div>
      </div>

      <div class="detalle-footer">
        <button @click="volver" class="btn btn-back">← Volver al Catálogo</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Recibe la propiedad id de forma nativa desde el Vue Router 
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const producto = ref(null)
const cargando = ref(true)
const error = ref('')

// Retorna un nivel atrás en la pila de navegación de la SPA 
const volver = () => {
  router.back() 
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/productos/${props.id}`) 
    producto.value = response.data
  } catch (err) {
    error.value = 'No se pudo localizar el producto solicitado o el servidor no respondió.'
  } finally {
    cargando.value = false
  }
})
</script>

<style scoped>
.detalle-container { display: flex; justify-content: center; padding: 20px 0; }
.main-detalle-card { width: 100%; max-width: 650px; text-align: left; padding: 30px; border-top: 5px solid #3498db; }
.detalle-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f4f6f9; padding-bottom: 15px; margin-bottom: 20px; }
.detalle-header h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #7f8c8d; margin: 0; }
.status-indicator { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
.ok { background: #d4edda; color: #155724; }
.critico { background: #f8d7da; color: #721c24; }
.prod-title { font-size: 32px; color: #2c3e50; margin: 0 0 15px 0; }
.prod-desc { font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 25px; }
.info-grid { display: flex; gap: 20px; margin-bottom: 35px; }
.info-tile { flex: 1; background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; display: flex; flex-direction: column; }
.info-tile .label { font-size: 12px; color: #7f8c8d; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; }
.info-tile .value { font-size: 22px; font-weight: bold; color: #2c3e50; }
.info-tile .price-val { color: #2ecc71; }
.btn { padding: 12px 20px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
.btn-back { background: #95a5a6; color: white; }
.btn-secondary { background: #e74c3c; color: white; }
.error-card { text-align: center; border-top: 5px solid #e74c3c; width: 400px; padding: 25px; }
</style>