<script setup lang="ts">
</script>

<template>
  <section class="hero-height bg-gray-50 flex items-center relative overflow-hidden">
    <slot/>
  </section>
</template>

<style scoped>
.hero-height {
  min-height: calc(100vh - var(--navbar-height));
}
</style>