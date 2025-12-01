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
          h2="Developpement + UX/UI" 
          h3="Depuis 2012"
        />
      </li>
      <li>
        <ListLayout
          :intro="`Sites vitrines, boutiques en ligne, microsites et plateformes sur mesure pour agences, marques et entreprises.

Design, UX/UI, développement frontend, intégration de CMS, architecture headless, animations, API, contenu et déploiement — tout est pris en charge du concept à la mise en ligne.`"
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