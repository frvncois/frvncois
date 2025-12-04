<script setup>
import ListLayout from '@/components/layout/ListLayout.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import info from '@/data/info.js'
</script>

<template>
  <section>
    <ul>
      <li>
        <HeaderLayout
          h1="Francois Lemieux"
          h2="Development + UX/UI"
          h3="Since 2012"
        />
      </li>
      <li>
        <ListLayout
          :intro="`Showcase sites, online stores, microsites, and custom platforms for agencies, brands, and businesses.

Design, UX/UI, frontend development, CMS integration, headless architecture, animations, API, content, and deployment — everything is handled from concept to launch.`"
          :items="info"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: column;
    flex: 1;
  > li {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > h4, h5, h6 {
        font-size: var(--font-big);
        text-transform: uppercase;
      }
    }
    ul {
        display: grid;
        grid-template-columns: var(--grid-layout)
    }
  }
}
</style>