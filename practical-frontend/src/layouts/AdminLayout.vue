<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>🛠️ AdminPanel</h3>
        <span class="user-badge" v-if="authStore.user">
          👤 {{ authStore.user.name }}
        </span>
      </div>

      <nav class="sidebar-menu">
        <router-link to="/admin" exact-active-class="active-link" class="menu-item">
          📊 Resumen de Actividad
        </router-link>
        <router-link to="/admin/productos" active-class="active-link" class="menu-item">
          📦 Control de Inventario
        </router-link>
        <router-link to="/catalogo" class="menu-item view-shop-item">
          🌐 Ver Tienda Pública
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
      </div>
    </aside>

    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  if (confirm('¿Deseas cerrar el sistema de administración seguro?')) {
    await authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.admin-layout { display: flex; min-height: 85vh; gap: 20px; background: #f8f9fa; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
.sidebar { width: 260px; background: #2c3e50; color: white; display: flex; flex-direction: column; padding: 25px 15px; box-sizing: border-box; text-align: left; }
.sidebar-header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 25px; }
.sidebar-header h3 { margin: 0 0 10px 0; font-size: 22px; color: #ecf0f1; }
.user-badge { background: #34495e; padding: 6px 12px; border-radius: 4px; font-size: 13px; color: #3498db; font-weight: bold; display: block; }
.sidebar-menu { display: flex; flex-direction: column; gap: 10px; flex-grow: 1; }
.menu-item { color: #bdc3c7; text-decoration: none; padding: 12px 15px; border-radius: 6px; font-weight: 600; font-size: 15px; transition: all 0.2s; }
.menu-item:hover { background: #34495e; color: white; }
.active-link { background: #3498db !important; color: white !important; }
.view-shop-item { margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; color: #2ecc71; }
.view-shop-item:hover { background: transparent; color: #27ae60; }
.sidebar-footer { padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
.btn-logout { width: 100%; background: #e74c3c; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
.btn-logout:hover { background: #c0392b; }
.admin-content { flex: 1; padding: 30px; background: white; box-sizing: border-box; overflow-y: auto; }
</style>