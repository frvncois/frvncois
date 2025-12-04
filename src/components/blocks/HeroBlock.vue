<script setup>
import SeparatorLayout from '@/components/layout/SeparatorVertical.vue';
import HeaderLayout from '@/components/layout/HeaderLayout.vue';
</script>

<template>
    <section>
        <ul>
            <li>
                <header>
                    <HeaderLayout
                        h1="Francois Lemieux"
                        h2="Development + UX/UI"
                        h3="Since 2012"
                        :isMainHeading="true"
                    />
                </header>
            </li>
            <li>
                <SeparatorLayout />
            </li>
        </ul>
    </section>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: var(--vh-full);
    margin: var(--space-xs) 0;
    > li {
        :first-child ul {
            display: grid;
            grid-template-columns: var(--grid-layout)
        }
        ul {
            height: unset;
        }
    }
}
</style>