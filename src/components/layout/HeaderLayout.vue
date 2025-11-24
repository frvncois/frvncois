<script setup>
defineProps({
  h1: String,
  h2: String,
  h3: String
})
</script>

<template>
    <ul>
        <li><h1>{{ h1 }}</h1></li>
        <li><h2>{{ h2 }}</h2></li>
        <li><h3>{{ h3 }}</h3></li>
    </ul>
</template>

<style scoped>
ul {
    gap: var(--space-base);
    padding: var(--space-base) 0;
    border-top: var(--border-thin) solid var(--is-foreground);
    border-bottom: var(--border-thin) solid var(--is-foreground);
    > li {
      &:nth-child(1) {
        grid-column: span 4;
      }
      &:nth-child(2) {
        grid-column: span 4;
      }
      &:nth-child(3) {
        display: flex;
        gap: var(--space-base);
        align-items: center;
        grid-column: span 2;
        justify-self: end;

        &:after {
          content: "";
          flex-shrink: 0;
          height: var(--space-sm);
          width: var(--space-sm);
          background-color: var(--is-foreground);
          border-radius: var(--radius-full);
          display: block;
        }
      }
      &:nth-child(3):has(h3:empty)::after {
        content: none !important;
      }
    }
  }
@media (max-width: 1080px) {
    ul {
        > li {
            &:nth-child(1) {
                grid-column: span 1;
            }
            &:nth-child(2) {
                display: none;
            }
            &:nth-child(3) {
                grid-column: span 1;
                justify-self: end;
            }
        }
    }
}
</style>