<script setup>
defineProps({
  intro: String,
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <ul>
    <li>
      <p>{{ intro }}</p>
    </li>

    <li v-for="(item, i) in items" :key="i">
      <h4>{{ item.title }}</h4>

      <ul>
<li v-for="(skill, j) in item.content" :key="j">
  <template v-if="skill.includes('::')">
    <a
      :href="skill.split('::')[1]"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ skill.split('::')[0] }}
    </a>
  </template>

  <template v-else>
    {{ skill }}
  </template>
</li>

      </ul>
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: var(--space-base) 0;
  margin-bottom: var(--vh-quarter);
  gap: var(--space-base);
  li {
    &:first-child {
      grid-column: span 4;
      & p {
        max-width: var(--content-medium);
        white-space: pre-line;
      }
    }
    &:not(:first-child) {
      grid-column: span 1;
    }
  }
}
@media (max-width: 1080px) {
    ul {
        li {
          ul {
            margin-bottom: 0;
          }
            &:nth-child(1) {
                grid-column: span 2;
            }
            &:not(:first-child){
                grid-column: span 1;
            }
        }
    }
}
</style>
