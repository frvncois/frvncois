<script setup>
defineProps({
    h1: String,
    h2: String,
    h3: String,
    link: String
})
</script>

<template>
    <ul>
        <li><span>{{ h1 }}</span></li>
        <li>
            <span v-if="!link">{{ h2 }}</span>
            <a v-else :href="link">{{ h2 }}</a>
        </li>
        <li><span>{{ h3 }}</span></li>
    </ul>
</template>

<style scoped>
ul {
    gap: var(--space-base);
    padding: var(--space-base) 0;
    border-top: var(--border-thin) solid var(--is-foreground);
    border-bottom: var(--border-thin) solid var(--is-foreground);
    }
li:nth-child(1) {
    grid-column: span 4;
    }
li:nth-child(2) {
    grid-column: span 4;
    }
li:nth-child(3) {
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

    li:nth-child(3):has(span:empty) {
  display: none;
}

@media (max-width: 1080px) {
ul {
    gap: var(--space-base);
    padding: var(--space-base) 0;
    border-top: var(--border-thin) solid var(--is-foreground);
    border-bottom: var(--border-thin) solid var(--is-foreground);
    }
li:nth-child(1) {
    grid-column: span 1;
    }
li:nth-child(2) {
    grid-column: span 1;
    justify-self: end;
    }
li:nth-child(3) {
    grid-column: span 1;
    justify-self: end;
    }
}
    
    

</style>
