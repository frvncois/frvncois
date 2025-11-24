<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const items = 16
const bars = ref([])
const container = ref(null)

const targets = Array.from({ length: items }, (_, i) => ({
  height: 1 + i * 2,
  margin: 1 + (items - i) * 2
}))

const invertedTargets = Array.from({ length: items }, (_, i) => ({
  height: 1 + (items - 1 - i) * 2,
  margin: 1 + (i + 1) * 2
}))

const updateBars = () => {
  if (!container.value) return
  
  const rect = container.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const progress = Math.max(0, Math.min(1, 
    1 - (rect.top / (windowHeight - rect.height))
  ))
  const eased = 1 - Math.pow(1 - progress, 3)
  
  bars.value.forEach((el, i) => {
    if (!el) return
    const height = invertedTargets[i].height + (targets[i].height - invertedTargets[i].height) * eased
    const margin = invertedTargets[i].margin + (targets[i].margin - invertedTargets[i].margin) * eased
    
    el.style.height = height + 'px'
    el.style.marginBottom = margin + 'px'
  })
}

onMounted(() => {
  updateBars()
  window.addEventListener('scroll', updateBars, { passive: true })
  window.addEventListener('resize', updateBars)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateBars)
  window.removeEventListener('resize', updateBars)
})
</script>

<template>
  <ul ref="container">
    <li
      v-for="(_, i) in items"
      :key="i"
      ref="bars"
    ></li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-lg);
  > li {
    background: var(--is-foreground);
    width: 100%;
    height: 0;
    margin-bottom: 0;
  }
}
</style>