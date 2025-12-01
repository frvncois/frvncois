<script setup>
import ProjectLayout from '@/components/layout/ProjectLayout.vue';
import HeaderLayout from '@/components/layout/HeaderLayout.vue';
</script>

<template>
    <section>
        <ul>
            <li>
                <HeaderLayout 
                    h1="Projets" 
                    h2="Selection" 
                    h3="2023/24/25" 
                />
            </li>
            <li>
                <ProjectLayout />
            </li>
        </ul>
    </section>
</template>

<style scoped>
ul > li {
    &:first-child ul {
        display: grid;
        grid-template-columns: var(--grid-layout);
        margin-top: var(--vh-half);
    }
    &:last-child {
        padding-bottom: var(--vh-quarter);
    }
}

section {
    background: var(--is-background);
}
</style>