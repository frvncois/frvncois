import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/style.css'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Lenis from 'lenis'
import { useTheme } from '@/stores/useTheme'

gsap.registerPlugin(Draggable, ScrollTrigger, ScrollToPlugin)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  infinite: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  syncTouch: true, 
  autoRaf: false,
})

document.documentElement.classList.add('lenis')
lenis.on('scroll', ScrollTrigger.update)
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true })
    }
    return lenis.scroll
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  pinType: document.body.style.transform ? 'transform' : 'fixed'
})


const { setTheme, getNextTheme } = useTheme()
let lastScroll = 0
let lastDirection = 0
let isLooping = false


const checkForLoop = () => {
  const currentScroll = lenis.scroll
  const delta = currentScroll - lastScroll
  const currentDirection = Math.sign(delta)
  const wrapThreshold = lenis.limit * 0.3
  const hasDirectionChange = lastDirection !== 0 && currentDirection !== 0 && lastDirection !== currentDirection
  const hasLargeJump = Math.abs(delta) > wrapThreshold

  if (hasLargeJump && hasDirectionChange && !isLooping) {
    isLooping = true
    setTheme(getNextTheme())
    setTimeout(() => {
      isLooping = false
    }, 1000)
  }

  lastScroll = currentScroll
  if (Math.abs(delta) > 1) {
    lastDirection = currentDirection
  }
}

let loopCheckScheduled = false
lenis.on('scroll', () => {
  if (!loopCheckScheduled) {
    loopCheckScheduled = true
    requestAnimationFrame(() => {
      checkForLoop()
      loopCheckScheduled = false
    })
  }
})

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

ScrollTrigger.addEventListener('refresh', () => lenis.resize())
ScrollTrigger.refresh()

export { lenis }