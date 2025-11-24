<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = 5
const circles = ref([])
const section = ref(null)

const targets = Array.from({ length: items }, (_, i) => ({
  size: 25 + i * 25, // in vh units
  opacity: 1
}))

const initialState = {
  size: 25 // vh
}

onMounted(() => {
  if (!section.value || !circles.value.length) return

  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section.value,
      start: 'top top',
      end: '+=300vh',
      scrub: true,
      invalidateOnRefresh: true,
    }
  })

  // Animate each circle with will-change for GPU acceleration
  circles.value.forEach((el, i) => {
    if (!el) return

    // Set initial state (all start small)
    gsap.set(el, {
      width: `${initialState.size}vw`,
      height: `${initialState.size}vw`,
      opacity: initialState.opacity,
      willChange: 'width, height'
    })

    // Animate to target state with stagger
    tl.to(el, {
      width: `${targets[i].size}vw`,
      height: `${targets[i].size}vw`,
      opacity: targets[i].opacity,
      duration: 1,
      ease: 'none'
    }, i * 0)
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <section ref="section">
    <ul ref="container">
      <li
        v-for="(_, i) in items"
        :key="i"
        ref="circles"
      ></li>
    </ul>
  </section>
</template>

<style scoped>
section {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

ul {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

li {
  background: transparent;
  border: 2px solid var(--is-foreground);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%);
  will-change: width, height;
  contain: layout size;
  &:first-child {
    
  position: absolute;
  top: 25%;
  }
}
</style>