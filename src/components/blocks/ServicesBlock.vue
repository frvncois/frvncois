<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Shape01 from '@/assets/shapes/Shape01.vue'
import Shape02 from '@/assets/shapes/Shape02.vue'
import Shape03 from '@/assets/shapes/Shape03.vue'

gsap.registerPlugin(ScrollTrigger)

const wrap = ref(null)
const track = ref(null)
const card1ZIndex = ref(3)
const card2ZIndex = ref(1)
const card3ZIndex = ref(2)
const activeCard = ref(null)

const handleCard1Click = () => {
  if (activeCard.value === 1) return

  // Reset previously active card to original z-index
  if (activeCard.value === 2) card2ZIndex.value = 1
  if (activeCard.value === 3) card3ZIndex.value = 2

  // Set current card to z-index 5
  card1ZIndex.value = 5
  activeCard.value = 1
}

const handleCard2Click = () => {
  if (activeCard.value === 2) return

  // Reset previously active card to original z-index
  if (activeCard.value === 1) card1ZIndex.value = 3
  if (activeCard.value === 3) card3ZIndex.value = 2

  // Set current card to z-index 5
  card2ZIndex.value = 5
  activeCard.value = 2
}

const handleCard3Click = () => {
  if (activeCard.value === 3) return

  // Reset previously active card to original z-index
  if (activeCard.value === 1) card1ZIndex.value = 3
  if (activeCard.value === 2) card2ZIndex.value = 1

  // Set current card to z-index 5
  card3ZIndex.value = 5
  activeCard.value = 3
}

onMounted(() => {
  const section = wrap.value
  const trackEl = track.value
  const cards = trackEl.querySelectorAll('li')
  const servicesTitle = trackEl.querySelector('div h3')
  const isMobile = window.matchMedia('(max-width: 1080px)').matches

  // Set initial rotated state for all cards (centered)
  gsap.set(cards[0], { rotation: -35, transformOrigin: 'center' })
  gsap.set(cards[1], { rotation: -18, transformOrigin: 'center' })
  gsap.set(cards[2], { rotation: 14, transformOrigin: 'center' })

  // Set initial display none for services title
  gsap.set(servicesTitle, { display: 'none' })

  // Create timeline for all animations
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: trackEl,
    }
  })

  // Show services title at 50% progress
  tl.to(servicesTitle, {
    display: 'inline',
    ease: 'none',
  }, 0.5)

  if (isMobile) {
    tl.to(cards[0], {
      rotation: -10,
      y: '-33.33vh',
      ease: 'none',
    }, '<')
    .to(cards[1], {
      rotation: 5,
      ease: 'none',
    }, '<')
    .to(cards[2], {
      rotation: 0,
      y: '33.33vh',
      ease: 'none',
    }, '<')
  } else {
    tl.to(cards[0], {
      rotation: -10,
      x: '-33.33vw',
      ease: 'none',
    }, '<')
    .to(cards[1], {
      rotation: 5,
      ease: 'none',
    }, '<')
    .to(cards[2], {
      rotation: 0,
      x: '33.33vw',
      ease: 'none',
    }, '<')
  }
})
</script>

<template>
  <section ref="wrap">
    <ul ref="track">
      <div>
        <h3>Modules</h3>
      </div>
      <li class="card-1" :style="{ zIndex: card1ZIndex }">
        <h2>Site Vitrine</h2>
        <h2>Website</h2>
        <Shape03 @click="handleCard1Click" />
      </li>

      <li class="card-2" :style="{ zIndex: card2ZIndex }">
        <h2>eCommerce</h2>
        <h2>Online store</h2>
        <Shape01 @click="handleCard2Click" />
      </li>

      <li class="card-3" :style="{ zIndex: card3ZIndex }">
        <h2>Apps</h2>
        <h2>SaaS</h2>
        <Shape02 @click="handleCard3Click" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  width: 100vw;
  height: 180vh;
  background: var(--is-background);
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 var(--space-lg);
  width: 100vw;
  margin: 0 -2em;
  > li {
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: var(--border-thin) solid var(--is-foreground);
    color: var(--is-foreground);
    background: var(--is-background);
    padding: var(--space-lg);
    width: 40vw;
    aspect-ratio: 1;
    > h2 {
      z-index: 1;
      font-size: var(--font-large);
      text-transform: uppercase;
      text-align: center;
      &:first-of-type {
        align-self: flex-start;
      }
      &:last-of-type {
        align-self: flex-end;
      }
    }
  }
  > div {
    position: absolute;
    top: var(--space-xl);
    left: 50%;
    transform: translateX(-50%);
    z-index: 6;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    > h3 {
      font-family: 'accent', sans-serif;
      text-transform: lowercase;
      letter-spacing: -0.2em;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--is-foreground);
      color: var(--is-background);
      font-size: var(--font-xbig);
      margin-top: -0.125em;
    }
  }
}

@media (max-width: 1080px) {
  ul {
    overflow: hidden;
    & > div {
      & > h3 {
          opacity: 0;
      }
    }
  }
}
</style>