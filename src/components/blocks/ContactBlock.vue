<script setup>
import FooterLayout from '@/components/layout/FooterLayout.vue';
</script>

<template>
  <footer>
    <ul>
        <li>
            <h2>Contact</h2>
        </li>
        <li>
            <FooterLayout
              h1="Francois Lemieux"
              h2="hello@frvncois.com"
              link="mailto:hello@frvncois.com"
            />
          </li>
          <li>
            <FooterLayout
              h1="© 2025"
              h2="438 923 7640"
              h3="Montreal"
              link="tel:+14389237640"
            />
        </li>
    </ul>
</footer>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  > li {
    border-left: var(--border-thin) solid var(--is-muted);
    border-right: var(--border-thin) solid var(--is-muted);
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & h2 {
        margin-bottom: var(--space-micro);
        font-size: var(--font-big);
        text-transform: uppercase;
      }
    }
    &:last-child ul {
        border: unset;
    }
    ul {
        display: grid;
        grid-template-columns: var(--grid-layout);
    }
  }
}
</style>