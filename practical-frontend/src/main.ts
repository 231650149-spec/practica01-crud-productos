import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'      // Importamos el enrutador
import './plugins/axios'           // Importamos la configuración global de Axios

const app = createApp(App)

app.use(createPinia())
app.use(router) // Registramos las rutas en Vue

app.mount('#app')
