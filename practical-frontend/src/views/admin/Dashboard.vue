<template>
  <div class="dashboard-box">
    <h2>📊 Resumen de Actividad de la Empresa</h2>
    <p>Bienvenido al Panel Ejecutivo Seguro. Desde aquí puedes supervisar el estado global de la tienda.</p>

    <div class="metrics-grid">
      <div class="metric-card shadow-sm">
        <h3>📦 Total Productos</h3>
        <p class="number">{{ totalProductos }}</p>
        <router-link to="/admin/productos" class="manage-link">Gestionar Inventario →</router-link>
      </div>

      <div class="metric-card shadow-sm total-stock">
        <h3>📉 Alerta Stock Crítico</h3>
        <p class="number critical">{{ stockCritico }}</p>
        <span>Productos con menos de 5 unidades.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const totalProductos = ref(0)
const stockCritico = ref(0)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/productos')
    const productos = response.data
    totalProductos.value = productos.length
    // Filtramos localmente cuántos productos tienen bajo stock
    stockCritico.value = productos.filter(p => p.stock < 5).length
  } catch (error) {
    console.error("Error al recopilar métricas:", error)
  }
})
</script>

<style scoped>
.dashboard-box h2 { color: #2c3e50; margin: 0 0 10px 0; }
.dashboard-box p { color: #7f8c8d; margin-bottom: 30px; }
.metrics-grid { display: flex; gap: 20px; flex-wrap: wrap; }
.metric-card { flex: 1; min-width: 250px; background: #fff; border: 1px solid #e9ecef; padding: 25px; border-radius: 8px; text-align: left; position: relative; }
.metric-card h3 { margin: 0 0 15px 0; font-size: 16px; color: #7f8c8d; text-transform: uppercase; }
.metric-card .number { font-size: 42px; font-weight: bold; margin: 0 0 15px 0; color: #2c3e50; }
.metric-card .critical { color: #e74c3c; }
.manage-link { color: #3498db; text-decoration: none; font-weight: bold; font-size: 14px; }
.manage-link:hover { text-decoration: underline; }
.total-stock { background: #fff5f5; border-color: #fecaca; }
.total-stock span { font-size: 13px; color: #c0392b; }
</style>