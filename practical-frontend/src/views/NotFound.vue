<template>
  <div class="not-found-container">
    <div class="card error-404-card shadow">
      <div class="error-icon">🚫 404</div>
      <h1>Página No Encontrada</h1>
      <p>Lo sentimos, el enlace al que intentas acceder no existe o fue movido de sección.</p>
      <router-link to="/" class="btn btn-home">Regresar a la Tienda</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
.error-404-card { max-width: 500px; text-align: center; padding: 40px; border-top: 5px solid #e74c3c; }
.error-icon { font-size: 72px; font-weight: bold; color: #e74c3c; margin-bottom: 10px; }
.error-404-card h1 { color: #2c3e50; margin: 0 0 15px 0; }
.error-404-card p { color: #7f8c8d; margin-bottom: 30px; line-height: 1.6; }
.btn-home { background: #3498db; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; display: inline-block; }
.btn-home:hover { background: #2980b9; }
</style>