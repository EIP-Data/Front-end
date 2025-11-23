<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 py-20">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-[#F9AB3B] mb-6">
          {{ t('ourWork.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('ourWork.hero.subtitle') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
