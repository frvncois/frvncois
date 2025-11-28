<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '@/stores/useTheme'

const props = defineProps({
  isOpen: Boolean,
  project: { type: Object, required: true }
})

const { theme } = useTheme()

const content = ref(null)
const videoRefs = ref([])
const currentVideoIndex = ref(0)
const currentImageIndex = ref(0)
let imageInterval = null

const handleTransitionEnd = () => {
  ScrollTrigger.refresh()
}

const playCurrentVideo = () => {
  if (!props.project.videos || videoRefs.value.length === 0) return

  const video = videoRefs.value[currentVideoIndex.value]
  if (video) {
    video.play().catch(err => console.log('Video play failed:', err))
  }
}

const handleVideoEnded = () => {
  if (!props.project.videos) return

  currentVideoIndex.value++

  if (currentVideoIndex.value < props.project.videos.length) {
    playCurrentVideo()
  } else {
    // Loop back to first video
    currentVideoIndex.value = 0
    playCurrentVideo()
  }
}

const startImageSlideshow = () => {
  if (!props.project.images || props.project.images.length === 0) return

  currentImageIndex.value = 0
  imageInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.project.images.length
  }, 2000)
}

const stopImageSlideshow = () => {
  if (imageInterval) {
    clearInterval(imageInterval)
    imageInterval = null
  }
}

watch(
  () => props.isOpen,
  open => {
    if (!content.value) return
    content.value.removeEventListener('transitionend', handleTransitionEnd)

    if (open) {
      content.value.style.maxHeight = content.value.scrollHeight + 'px'
      content.value.style.opacity = '1'

      // Start playing videos or images when content opens
      nextTick(() => {
        if (props.project.videos) {
          currentVideoIndex.value = 0
          playCurrentVideo()
        } else if (props.project.images) {
          startImageSlideshow()
        }
      })
    } else {
      content.value.style.maxHeight = '0px'
      content.value.style.opacity = '0'

      // Pause all videos when closing
      videoRefs.value.forEach(video => {
        if (video) video.pause()
      })

      // Stop image slideshow
      stopImageSlideshow()
    }
    content.value.addEventListener('transitionend', handleTransitionEnd, { once: true })
  }
)

onBeforeUnmount(() => {
  stopImageSlideshow()
})
</script>
 
<template>
  <article ref="content" class="content">
    <ul>
      <li>
        <p>{{ project.intro }}</p>
        <p v-if="project.description">{{ project.description }}</p>
      </li>
      <li v-if="project.videos && project.videos.length > 0">
        <video
          v-for="(videoSrc, index) in project.videos"
          :key="index"
          :ref="el => { if (el) videoRefs[index] = el }"
          :src="videoSrc"
          muted
          playsinline
          :style="{ display: currentVideoIndex === index ? 'block' : 'none' }"
          @ended="handleVideoEnded"
        />
      </li>
      <li v-else-if="project.images && project.images.length > 0">
        <img
          v-for="(imageSrc, index) in project.images"
          :key="index"
          :src="imageSrc"
          :style="{ display: currentImageIndex === index ? 'block' : 'none' }"
        />
      </li>
      <li v-else>
        <img src="@/assets/img/demo.png"/>
      </li>
      <li v-if="project.year">
            <h2>{{ project.year }}</h2>
            <p>{{ project.title }}</p>
      </li>
      <li v-if="project.agency">
            <h3>Agence</h3>
            <p>{{ project.agency }}</p>
      </li>
      <li v-if="project.design">
            <h3>Design</h3>
            <p>{{ project.design }}</p>
      </li>
      <li v-if="project.cms">
            <h3>CMS</h3>
            <p>{{ project.cms }}</p>
      </li>
      <li v-if="project.frontend?.length">
            <h3>Frontend</h3>
            <p>{{ project.frontend.join(', ') }}</p>
      </li>
      <li v-if="project.backend?.length">
            <h3>Backend</h3>
            <p>{{ project.backend.join(', ') }}</p>
      </li>
      <li v-if="project.animations?.length">
            <h3>Animations</h3>
            <p>{{ project.animations.join(', ') }}</p>
      </li>
      <li v-if="project.deploy">
            <h3>Deploiement</h3>
            <p>{{ project.deploy }}</p>
      </li>
      <li v-if="project.website">
            <a :href="project.website" target="_blank" rel="noopener noreferrer">Voir le site →</a>
      </li>
      <li v-if="project.status && !project.website">
            <p>Lancement {{ project.status }}</p>
      </li>
    </ul>
  </article>
</template>

<style scoped>
article {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height var(--transition-slow) ease,
              opacity var(--transition-fast) ease;
  > ul {
    display: grid;
    grid-template-columns: var(--grid-layout);
    gap: var(--space-base);
    > li {
      position: relative;
      img, video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &.video-container {
        video {
          display: block;
        }
      }
      &.image-container {
        img {
          display: block;
        }
      }
      &:first-child {
        grid-column: span 4;
        > p {
          margin-bottom: var(--space-base);
        }
      }
      &:nth-child(2) {
        grid-column: span 6;
        grid-row: span 6;
        aspect-ratio: 4 / 3;
        background: var(--is-foreground);
      }
      &:nth-child(n + 3):not(:last-child) {
        grid-column: span 2;
      }
      &:last-child {
        grid-column: span 4;
        font-size: var(--font-medium);
      }
    }
  }
}

@media (max-width: 1080px) {
article {
  & > ul {
    display: flex;
    flex-direction: column;
  }
}
}
</style>
