<template>
  <div class="container">
    <h1>📦 CRUD de Productos</h1>

    <div class="card form-card">
      <h2>{{ editando ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
      
      <div v-if="mensaje" :class="['alert', alertClass]">{{ mensaje }}</div>

      <form @submit.prevent="guardarProducto">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" v-model="form.nombre" required placeholder="Ej. Laptop Dell">
        </div>

        <div class="form-group">
          <label>Descripción:</label>
          <textarea v-model="form.descripcion" placeholder="Opcional..."></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Precio:</label>
            <input type="number" step="0.01" v-model="form.precio" required placeholder="0.00">
          </div>

          <div class="form-group">
            <label>Stock:</label>
            <input type="number" v-model="form.stock" required placeholder="0">
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-success">
            {{ editando ? 'Actualizar' : 'Guardar' }}
          </button>
          <button type="button" v-if="editando" @click="cancelarEdicion" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <div class="card table-card">
      <h2>Lista de Productos</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.id }}</td>
            <td><strong>{{ producto.nombre }}</strong></td>
            <td>{{ producto.descripcion || '-' }}</td>
            <td>${{ producto.precio }}</td>
            <td>{{ producto.stock }} unidades</td>
            <td>
              <button @click="cargarParaEditar(producto)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="eliminar(producto.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
          <tr v-if="productos.length === 0">
            <td colspan="6" class="text-center">No hay productos registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productoService'

// Estados de la aplicación
const productos = ref([])
const editando = ref(false)
const idSeleccionado = ref(null)

// Mensajes informativos
const mensaje = ref('')
const alertClass = ref('')

// Estructura reactiva del formulario (v-model)
const form = ref({
  nombre: '',
  descripcion: '',
  precio: '',
  stock: ''
})

// Función para mostrar alertas temporales al usuario
const mostrarAlerta = (texto, tipo = 'success') => {
  mensaje.value = texto
  alertClass.value = tipo === 'success' ? 'alert-success' : 'alert-danger'
  setTimeout(() => { mensaje.value = '' }, 4000)
}

// 4.7 CARGAR PRODUCTOS AL INICIAR (onMounted)
const cargarProductos = async () => {
  try {
    const respuesta = await getProductos()
    productos.value = respuesta.data
  } catch (error) {
    mostrarAlerta('Error al cargar la lista de productos de la API.', 'error')
  }
}

onMounted(() => {
  cargarProductos()
})

// 4.8 GUARDAR O ACTUALIZAR (Modo Dual)
const guardarProducto = async () => {
  try {
    if (editando.value) {
      // Si estamos editando, llama a la función de actualizar
      await updateProducto(idSeleccionado.value, form.value)
      mostrarAlerta('¡Producto actualizado exitosamente!')
    } else {
      // Si no, crea un producto nuevo
      await createProducto(form.value)
      mostrarAlerta('¡Producto creado exitosamente!')
    }
    resetearFormulario()
    cargarProductos() // Recarga la tabla de inmediato sin recargar la página entera
  } catch (error) {
    mostrarAlerta('Error al procesar la solicitud. Revisa los datos enviados.', 'error')
  }
}

// Cargar los datos de la fila en el formulario para editar
const cargarParaEditar = (producto) => {
  editando.value = true
  idSeleccionado.value = producto.id
  form.value = {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock
  }
}

// Cancelar el modo edición
const cancelarEdicion = () => {
  resetearFormulario()
}

// Limpiar campos del formulario
const resetearFormulario = () => {
  editando.value = false
  idSeleccionado.value = null
  form.value = { nombre: '', descripcion: '', precio: '', stock: '' }
}

// BOTÓN ELIMINAR CON CONFIRMACIÓN
const eliminar = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    try {
      await deleteProducto(id)
      mostrarAlerta('Producto eliminado correctamente.')
      cargarProductos() // Actualiza la lista asíncronamente
    } catch (error) {
      mostrarAlerta('No se pudo eliminar el producto.', 'error')
    }
  }
}
</script>

<style scoped>
/* Estilos CSS Sencillos y Elegantes para la Práctica */
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
h1 { text-align: center; color: #2c3e50; margin-bottom: 10px; }
h2 { margin-top: 0; color: #34495e; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.form-group { display: flex; flex-direction: column; margin-bottom: 15px; }
.form-row { display: flex; gap: 15px; }
.form-row .form-group { flex: 1; }
label { font-weight: 600; margin-bottom: 5px; color: #555; }
input, textarea { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; }
textarea { resize: vertical; min-height: 60px; }
.form-actions { display: flex; gap: 10px; }
.btn { padding: 10px 15px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 14px; }
.btn-sm { padding: 5px 10px; font-size: 12px; margin-right: 5px; }
.btn-success { background-color: #2ecc71; color: white; }
.btn-warning { background-color: #f1c40f; color: #333; }
.btn-danger { background-color: #e74c3c; color: white; }
.btn-secondary { background-color: #95a5a6; color: white; }
.table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
.table th { background-color: #f8f9fa; color: #666; }
.alert { padding: 12px; border-radius: 4px; margin-bottom: 15px; font-weight: bold; }
.alert-success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.alert-danger { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
.text-center { text-align: center; color: #7f8c8d; }
</style>