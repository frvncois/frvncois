<script setup>
import { ref, watch } from 'vue'
import { randomText, randomNumber, randomWordLike } from '@/utils/textScrambler.js'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  projectIndex: {
    type: Number,
    required: true
  },
  isHovered: {
    type: Boolean,
    default: false
  },
  isExpanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const displayTitles = ref(Array(6).fill(props.project.title))
const displayYears = ref(Array(6).fill(props.project.year))
const displayCategories = ref(Array(6).fill(props.project.category))

let shuffleInterval = null

const scramble = () => {
  if (shuffleInterval) {
    clearInterval(shuffleInterval)
  }

  const iterations = 10
  const interval = 30
  let count = 0

  shuffleInterval = setInterval(() => {
    displayTitles.value = Array(6).fill(null).map(() => randomText(props.project.title.length))
    displayYears.value = Array(6).fill(null).map(() => randomNumber(props.project.year.toString().length))
    displayCategories.value = Array(6).fill(null).map(() => randomWordLike(props.project.category))

    count++
    if (count >= iterations) {
      clearInterval(shuffleInterval)
      shuffleInterval = null
    }
  }, interval)
}

const reset = () => {
  if (shuffleInterval) {
    clearInterval(shuffleInterval)
    shuffleInterval = null
  }

  displayTitles.value = Array(6).fill(props.project.title)
  displayYears.value = Array(6).fill(props.project.year)
  displayCategories.value = Array(6).fill(props.project.category)
}

const onMouseEnter = () => {
  if (!props.isExpanded) {
    scramble()
  }
}

const onMouseLeave = () => {
  if (!props.isExpanded) {
    reset()
  }
}

const handleToggle = () => {
  if (!props.isExpanded) {
    scramble()
  } else {
    reset()
  }
  emit('toggle')
}

watch(() => props.isExpanded, (newVal) => {
  if (!newVal) {
    reset()
  }
})
</script>

<template>
  <header
    :data-expanded="isExpanded"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave">
    <ul @click="handleToggle">
      <li
        v-for="n in 6"
        :key="n">
        <h2>{{ displayTitles[n - 1] }}</h2>
        <span>
          <h3>{{ displayCategories[n - 1] }}</h3>
          <h4>{{ displayYears[n - 1] }}</h4>
        </span>
      </li>
    </ul>
  </header>
</template>

<style scoped>
header ul {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: var(--space-xl);
  list-style: none;
  margin: 0;
  padding: 0;
}

header li {
  display: flex;
  flex-shrink: 0;
  gap: var(--space-base);
  height: 4vw;
  overflow: hidden;
  transition: height var(--transition-base) ease;
  position: relative;
}

header:hover li,
header[data-expanded="true"] li {
  height: 6.5vw;
}

header li h3 {
  text-transform: uppercase;
  width: 15ch;
}

header li h4 {
  display: flex;
  align-items: center;
  gap: var(--space-base);
  &::before {
    content: "";
    flex-shrink: 0;
    height: var(--space-sm);
    width: var(--space-sm);
    background-color: var(--is-foreground);
    border-radius: var(--radius-full);
    display: block;
  }
}

header li h2 {
  font-size: var(--font-big);
  text-transform: uppercase;
  white-space: nowrap;
  margin: 0;
  pointer-events: none;
}

header:hover li h2,
header[data-expanded="true"] li h2 {
  font-family: 'accent', sans-serif;
  text-transform: lowercase;
  letter-spacing: -0.2em;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--is-foreground);
  color: var(--is-background);
  padding-top: var(--space-micro);
  padding-right: var(--space-micro);
}

span {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 5.5vw;
  padding: 0.5em 0;
  transition: height var(--transition-base) ease;
}

@media (max-width: 1080px) {
  header ul {
    gap: var(--space-base);
  }
  header li {
    height: 8vw;
  }
  header:hover li,
  header[data-expanded="true"] li {
    height: 16vw;
  }
  span {
    display: none;
  }
}
</style>
