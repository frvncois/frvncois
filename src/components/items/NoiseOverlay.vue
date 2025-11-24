<template>
    <div></div>
</template>

<script setup>
</script>

<style scoped>
div {
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url('/src/assets/img/noise.gif');
  opacity: 0.05;
  z-index: 9999;
  mix-blend-mode: overlay;
}
</style>   