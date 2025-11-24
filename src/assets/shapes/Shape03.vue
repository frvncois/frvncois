<script setup>
import { ref } from 'vue'

const shape = ref(null)

const randomRotation = () => {
  const rotations = [0, 45, 90]
  return rotations[Math.floor(Math.random() * rotations.length)]
}

const randomPosition = () => {
  const positions = ['0%', '25%', '50%', '75%', '100%']
  return positions[Math.floor(Math.random() * positions.length)]
}

const handleClick = () => {
  if (!shape.value) return

  const circles = shape.value.querySelectorAll('.circle')
  const lines = shape.value.querySelectorAll('.line')

  circles.forEach(circle => {
    circle.style.top = randomPosition()
    circle.style.left = randomPosition()
    circle.style.transform = `rotate(${randomRotation()}deg)`
  })

  lines.forEach(line => {
    line.style.top = randomPosition()
    line.style.left = randomPosition()
    line.style.transform = `rotate(${randomRotation()}deg)`
  })
}
</script>

<template>
  <div
    ref="shape"
    class="shape shape-03"
    @click="handleClick"
  >
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
    <div class="line line-1"></div>
    <div class="line line-2"></div>
  </div>
</template>

<style scoped>
.shape {
  position: absolute;
  width: 50vw;
  aspect-ratio: 1;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  position: absolute;
  border: 0.5px solid var(--is-foreground);
  border-radius: 50%;
  width: 20.75vw;
  aspect-ratio: 1;
  transition: top 0.25s ease, left 0.25s ease, transform 0.25s ease;
}

.circle-1 {
  left: 50%;
  transform: translateX(-50%);
}

.circle-2 {
  top: 0;
  right: 0;
}

.circle-3 {
  bottom: 0;
  left: 0;
}

.line {
  position: absolute;
  width: 1px;
  height: 20.75vw;
  background: var(--is-foreground);
  transform-origin: top left;
  transition: top 0.25s ease, left 0.25s ease, transform 0.25s ease;
}

.line-1 {
  top: 0;
  right: 0;
  transform: rotate(-45deg) scaleY(1.414);
}

.line-2 {
  bottom: 0;
  left: 0;
  transform: rotate(-45deg) scaleY(1.414);
}
</style>
