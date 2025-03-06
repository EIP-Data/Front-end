<script setup lang="ts">

</script>

<template>
  <section class="banner py-16 bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto px-6 flex items-center justify-center">
      <div class="hidden md:block flex-shrink-0 mr-8">
        <img
            src="@/assets/images/common/logo.webp"
            alt="Datalyz Mascot"
            class="w-32 h-32 object-contain"
        />
      </div>

      <slot></slot>

      <div class="hidden md:block flex-shrink-0 ml-8">
        <img
            src="@/assets/images/common/logo.webp"
            alt="Datalyz Mascot"
            class="w-32 h-32 transform -scale-x-100 object-contain"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>