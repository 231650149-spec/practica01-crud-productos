<template>
  <div id="app">
    <ProductosComponent />
  </div>
</template>

<script setup>
import ProductosComponent from './components/ProductosComponent.vue'
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
</style>