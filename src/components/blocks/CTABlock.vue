<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const address = ref(null)

onMounted(() => {
  const items = address.value.querySelectorAll('a')

  // First item: translate -50% to 50% horizontally
  gsap.fromTo(items[0],
    { x: '-12.5%' },
    {
      x: '12.5%',
      scrollTrigger: {
        trigger: address.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    }
  )

  // Second item: translate 50% to -50% horizontally
  gsap.fromTo(items[1],
    { x: '12.5%' },
    {
      x: '-12.5%',
      scrollTrigger: {
        trigger: address.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    }
  )
})
</script>

<template>
  <address ref="address">
    <ul>
        <li>
            <a href="mailto:hello@frvncois.com" class="full-link">
              <h4>hello@frvncois.com</h4><h4>hello@frvncois.com</h4><h4>hello@frvncois.com</h4><h4>hello@frvncois.com</h4><h4>hello@frvncois.com</h4>
            </a>
        </li>
        <li>
            <a href="tel:+14389237640" class="full-link">
              <h4>438 923 7640</h4><h4>438 923 7640</h4><h4>438 923 7640</h4><h4>438 923 7640</h4><h4>438 923 7640</h4>
            </a>
        </li>
    </ul>
  </address>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-md);
  margin: var(--space-xl) -2em;
  > li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-top: var(--border-thin) solid var(--is-foreground);
    border-bottom: var(--border-thin) solid var(--is-foreground);
    background: var(--is-background);
    color: var(--is-foreground);
    width: 150vw;
    text-transform: uppercase;
    transition: none;
    &:nth-child(1) {
      position: relative;
      transform: rotate(-2deg);
      z-index: 2;
    }
    &:nth-child(2) {
      position: relative;
      transform: rotate(1deg);
      z-index: 1;
    }
    > a.full-link {
      display: flex;
      justify-content: center;
      gap: var(--space-md);
      padding: var(--space-md);
      width: 100%;
      cursor: pointer;
    }
    & h4 {
      display: flex;
      align-items: center;
      white-space: nowrap;
      color: inherit;
      font-size: var(--font-big);
      &::after {
        content: '→';
        opacity: 0;
        margin-left: var(--space-small);
        transition: opacity var(--transition-base) ease;
      }
    }
    &:hover h4::after {
      opacity: 1;
    }
    &:hover {
      background: var(--is-foreground);
      color: var(--is-background);
      border-color: var(--is-foreground);
    }
  }
}

</style>