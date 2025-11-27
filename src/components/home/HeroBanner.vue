<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Hero from "@/components/common/Hero.vue";

const { t } = useI18n();
</script>

<template>
  <Hero
      class="flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left gap-8 md:gap-10 px-8 md:px-16 py-24 bg-gray-50 dark:bg-gray-900"
  >
    <!-- Texte -->
    <div class="md:w-1/2 flex flex-col items-center md:items-start space-y-6">
      <h1
          class="text-4xl md:text-6xl font-extrabold leading-tight text-gray-800 dark:text-gray-100"
      >
        {{ t('home.hero.titleStart') }}
        <br />
        <span class="text-datalyz text-amber-500">{{ t('home.hero.titleHighlight') }}</span>
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('home.hero.subtitle') }}
      </p>

      <button
          class="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        {{ t('home.hero.register') }}
      </button>
    </div>

    <!-- Image -->
    <div class="md:w-1/2 flex justify-center">
      <img
          src="/src/assets/images/home/hero_image.png"
          alt="Data Visualisation"
          class="w-4/5 max-w-lg drop-shadow-md"
      />
    </div>
  </Hero>
</template>

<style scoped>
</style>
