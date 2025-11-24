<script setup>
defineProps({
    p1: String,
    p2: String
})
</script>

<template>
        <ul>
            <li><p>{{ p1 }}</p></li>
            <li><p>{{ p2 }}</p></li>
        </ul>
</template>

<style scoped>
ul {
    padding: var(--space-base) 0;
    gap: var(--space-base);
    li {
        &:nth-child(1) {
            grid-column: span 4;
            > p {
                max-width: var(--content-narrow);
            }
        }
        :nth-child(2) {
            grid-column: span 3;
        }
    }
}

@media (max-width: 1080px) {
    ul {
        li {
            &:nth-child(1) {
                grid-column: span 2;
            }
            :nth-child(2) {
                grid-column: span 2;
            }
        }
    }
}
</style>