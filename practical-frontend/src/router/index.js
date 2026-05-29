// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  // --- RUTAS PÚBLICAS ---
  { 
    path: '/', 
    name: 'home',
    component: () => import('../views/HomeView.vue') 
  },
  { 
    path: '/catalogo', 
    name: 'catalogo',
    component: () => import('../views/CatalogoView.vue') 
  },
  { 
    path: '/catalogo/:id', 
    name: 'producto-detalle',
    component: () => import('../views/ProductoDetalle.vue'),
    props: true // Pasa el parámetro :id automáticamente como prop al componente
  },
  { 
    path: '/login', 
    name: 'login',
    component: () => import('../views/LoginView.vue') 
  },
  { 
    path: '/register', 
    name: 'register',
    component: () => import('../views/RegisterView.vue') 
  },

  // --- RUTAS PRIVADAS ANIDADAS (ADMINISTRACIÓN) ---
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true }, // Protege todo este bloque
    children: [
      { 
        path: '', 
        name: 'admin-dashboard',
        component: () => import('../views/admin/Dashboard.vue') 
      },
      { 
        path: 'productos', 
        name: 'admin-productos',
        component: () => import('../views/admin/Productos.vue') 
      }
    ]
  },

  // --- RUTA 404 CATCH-ALL ---
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: () => import('../views/NotFound.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// GUARD GLOBAL DE NAVEGACIÓN (Se implementará en los siguientes pasos)
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Si hay un token pero perdimos al usuario en memoria (F5), recuperamos la sesión
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch (error) {
      authStore.logoutLocal() // Si el token expiró, limpiamos localmente
    }
  }

  // Validación de accesos protegidos
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Si no está autenticado, mandamos al login guardando la ruta de origen en la URL
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    // Si ya está autenticado e intenta ir a login, lo redirigimos al panel
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router