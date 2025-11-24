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

// Initialize Lenis with optimized settings for infinite scroll
const lenis = new Lenis({
  duration: 1.2,              // Longer duration for smoother feel
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  smoothTouch: false,         // Keep false for better touch performance
  infinite: true,
  wheelMultiplier: 1,         // Reduced from 2 - less aggressive
  touchMultiplier: 2,
  autoRaf: false,             // CRITICAL: Disable internal RAF since we use GSAP ticker
})

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// Sync GSAP's scroller proxy with Lenis
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

// Theme switching on loop detection
const { setTheme, getNextTheme } = useTheme()
let lastScroll = 0
let isLooping = false

// Use a separate scroll listener for loop detection (throttled)
const checkForLoop = () => {
  const currentScroll = lenis.scroll
  const delta = currentScroll - lastScroll
  
  // Detect wrap-around: large negative jump (scrolled past end, wrapped to start)
  // or large positive jump (scrolled past start, wrapped to end)
  const wrapThreshold = lenis.limit * 0.5
  
  if (Math.abs(delta) > wrapThreshold && !isLooping) {
    isLooping = true
    setTheme(getNextTheme())
    
    // Debounce to prevent multiple triggers
    setTimeout(() => {
      isLooping = false
    }, 500)
  }
  
  lastScroll = currentScroll
}

// Throttled loop check
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

// Single unified animation loop using GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

// Disable lag smoothing for consistent frame timing
gsap.ticker.lagSmoothing(0)

// Refresh ScrollTrigger after everything is set up
ScrollTrigger.addEventListener('refresh', () => lenis.resize())
ScrollTrigger.refresh()

// Export lenis instance if needed elsewhere
export { lenis }