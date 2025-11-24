<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const columnCount = ref(10)

const updateColumnCount = () => {
  columnCount.value = window.innerWidth <= 1080 ? 2 : 10
}

onMounted(() => {
  updateColumnCount()
  window.addEventListener('resize', updateColumnCount)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumnCount)
})
</script>

<template>
  <ul>
    <li v-for="item in columnCount" :key="item">
    </li>
  </ul>
</template>

<style scoped>
ul {
    position: fixed;
    z-index: -1;
    inset: 0;
    gap: var(--space-base);
    display: grid;
    grid-template-columns: var(--grid-layout);
    margin: 0 var(--space-lg);
    > li {
        background: var(--is-light);
        border-left: var(--border-thin) solid var(--is-muted);
        border-right: var(--border-thin) solid var(--is-muted);
    }
}
</style>