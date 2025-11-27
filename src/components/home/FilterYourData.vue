<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-white dark:bg-gray-800 py-24 px-6 md:px-16">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

      <!-- Image -->
      <div class="md:w-1/2 flex justify-center">
        <img
            src="/src/assets/images/home/filter_data.png"
            alt="Filtering data illustration"
            class="w-4/5 max-w-md"
        />
      </div>

      <!-- Texte -->
      <div class="md:w-1/2 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight mb-6">
          {{ t('home.filterData.titleStart') }} <span class="text-amber-500">{{ t('home.filterData.titleHighlight') }}</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {{ t('home.filterData.description') }}
        </p>
        <button
            class="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          {{ t('home.filterData.learnMore') }}
        </button>
      </div>
    </div>
  </section>
</template>


<style scoped>
</style>
