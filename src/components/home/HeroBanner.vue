<script setup lang="ts">
import Hero from "@/components/common/Hero.vue";
</script>

<template>
  <Hero>
    <div class="container mx-auto px-6 text-center h-64 gap-8 flex flex-col justify-evenly items-center relative z-10">
      <h1 class="text-5xl font-bold text-[#F9AB3B] mb-6">
        <slot name="title"></slot>
      </h1>
      <p class="text-xl text-gray-600 mb-8 w-2/3">
        <slot name="paragraph"></slot>
      </p>
      <div class="space-x-4">
        <slot name="call-to-action"></slot>
      </div>
    </div>
  </Hero>
</template>

<style scoped>
</style>