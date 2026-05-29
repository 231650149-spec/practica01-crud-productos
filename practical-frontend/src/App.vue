<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// Estructura limpia orientada a rutas
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f9;
  color: #333;
  margin: 0;
  padding: 20px;
}
#app {
  max-width: 1000px;
  margin: 0 auto;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
</style>