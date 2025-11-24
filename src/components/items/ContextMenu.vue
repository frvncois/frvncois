<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from '@/stores/useTheme.js'
import IconTheme from '@/assets/icons/IconTheme.vue'
import IconCode from '@/assets/icons/IconCode.vue'

const { theme, setTheme } = useTheme()

// Emits
const emit = defineEmits(['navigate'])

const toggleTheme = () => {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
  visible.value = false
}


const visible = ref(false)
const pos = ref({ x: 0, y: 0 })

// Open menu at click position
const open = (event) => {
  event.preventDefault()
  visible.value = true
  pos.value = { x: event.clientX, y: event.clientY }
}

// Close menu
const close = () => {
  visible.value = false
}

onMounted(() => {
  document.addEventListener('contextmenu', open)
  document.addEventListener('click', close)
})

onBeforeUnmount(() => {
  document.removeEventListener('contextmenu', open)
  document.removeEventListener('click', close)
})

// Navigation handler
const go = (item) => {
  if (item === 'github') {
    window.open('https://github.com/frvncois', '_blank')
  } else {
    emit('navigate', item)
  }

  visible.value = false
}
</script>

<template>
  <ul 
    v-if="visible"
    :style="{
      position: 'fixed',
      top: pos.y + 'px',
      left: pos.x + 'px',
      zIndex: 9999,
      listStyle: 'none'
    }"
  >
    <li @click="toggleTheme">
     <IconTheme/> {{ theme === 'light' ? 'Dark mode' : 'Light mode' }}
    </li>

    <li @click="go('github')"><IconCode/> Inspect code</li>
  </ul>
</template>


<style scoped>
ul {
  min-width: var(--menu-min-width);
  cursor: pointer;
  backdrop-filter: blur(var(--blur-amount));
  background: var(--is-light);
  border-radius: var(--radius-md);
  border: var(--border-thin) solid var(--is-muted);
  padding: var(--space-tiny);
  box-shadow: var(--shadow-context) rgba(0, 0, 0, 0.15);
}

li {
  padding: var(--space-xs) var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-base);
  > svg {
    width: var(--icon-size);
    height: var(--icon-size);
  }
}

li:last-child {
  border-bottom: 0;
}

li:hover {
  background: var(--is-muted);
  border-radius: var(--radius-sm);
}
</style>
