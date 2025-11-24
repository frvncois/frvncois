<script setup>
import { ref, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '@/data/projects.js'
import ProjectHeader from './ProjectHeader.vue'
import ProjectContent from './ProjectContent.vue'

const isOpen = ref(projects.map(() => false))
const hoveredIndex = ref(null)

const toggle = async (i) => {
  isOpen.value = isOpen.value.map((_, index) => index === i ? !isOpen.value[i] : false)
  await nextTick()
  ScrollTrigger.refresh()
}
</script>


<template>
  <ul>
    <li
      v-for="(project, i) in projects"
      :key="i"
      @mouseenter="hoveredIndex = i"
      @mouseleave="hoveredIndex = null"
    >
      <ProjectHeader
        :project="project"
        :project-index="i"
        :is-hovered="hoveredIndex === i"
        :is-expanded="isOpen[i]"
        @toggle="toggle(i)"
      />

      <ProjectContent :is-open="isOpen[i]" :project="project" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  overflow: hidden;
}

li {
  border-bottom: var(--border-thin) solid var(--is-foreground);
  padding-top: var(--space-base);
}
</style>
