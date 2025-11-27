<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 py-24 px-6 md:px-16">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
      <!-- Texte -->
      <div class="md:w-1/2 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight">
          {{ t('home.research.titleStart') }}
          <br />
          <span class="text-amber-500">{{ t('home.research.titleHighlight') }}</span>
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {{ t('home.research.subtitle') }}
        </p>
      </div>

      <!-- Stats -->
      <div class="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 text-center md:text-left">
        <!-- Stat 1 -->
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center space-x-3 mb-1">
            <h3 class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">2,245,341</h3>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-base">{{ t('home.research.stats.members') }}</p>
        </div>

        <!-- Stat 2 -->
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center space-x-3 mb-1">
            <h3 class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">46,328</h3>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-base">{{ t('home.research.stats.githubStars') }}</p>
        </div>

        <!-- Stat 3 -->
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center space-x-3 mb-1">
            <h3 class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">101,828,867</h3>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-base">{{ t('home.research.stats.recordedClicks') }}</p>
        </div>

        <!-- Stat 4 -->
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center space-x-3 mb-1">
            <h3 class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">3,419,926,436</h3>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-base">{{ t('home.research.stats.dataCollected') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
