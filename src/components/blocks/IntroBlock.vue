<script setup>
import ContentLayout from '@/components/layout/ContentLayout.vue';
import HeaderLayout from '@/components/layout/HeaderLayout.vue';
</script>

<template>
  <section>
    <ul>
        <li>
            <h4>Design&dev</h4><div><h5><span>based</span> in</h5></div><h6>Montreal</h6>
        </li>
        <li>
            <HeaderLayout
              h1="Francois Lemieux"
              h2="Development + UX/UI"
              h3="Since 2012"
            />
          </li>
          <li>
            <ContentLayout
              p1="Specialized Web Solutions"
              p2="Senior Web Developer & UX/UI based in Montreal. Since 2012, I've been helping agencies, brands, and businesses create showcase sites, eCommerce platforms, and custom solutions. I handle the full cycle — design, UX, development, integrations, and deployment — to deliver fast, reliable projects aligned with your goals."
            />
        </li>
    </ul>
  </section>
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
      margin-bottom: var(--space-base);
      letter-spacing: -2px;
      > h4, h5, h6 {
        margin-left: -6px;
        margin-right: -3px;
        font-size: var(--font-big);
        text-transform: uppercase;
      }
      & span {
        font-family: 'accent', sans-serif;
        line-height: 0.75;
        text-transform: lowercase;
        letter-spacing: -0.19em;
        color: transparent;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--is-foreground);
      }
    }
    ul {
        display: grid;
        grid-template-columns: var(--grid-layout);
    }
  }
}
@media (max-width: 1080px) {
    ul {
        > li {
            &:first-child {
                flex-direction: column;
                align-items: stretch;
                gap: 0;
                > h4, h5, h6 {
                    font-size: var(--font-big);
                    margin-left: -3px;
                    margin-right: -1px;
                }
                > div {
                display: flex;
                flex: 1;
                h5 {
                    flex: 1;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                      margin-top: var(--space-tiny);
                    }
                  }
                }
            }
        }
    }
}
</style>