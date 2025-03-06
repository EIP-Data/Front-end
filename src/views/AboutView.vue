<script setup lang="ts">
import HeroBanner from "@/components/home/HeroBanner.vue";
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
</script>

<template>
  <LayoutShowcase>
    <HeroBanner class="dark:bg-gray-900">
      <template #title>
        About Us
      </template>
    </HeroBanner>
  </LayoutShowcase>
</template>

<style scoped>

</style>