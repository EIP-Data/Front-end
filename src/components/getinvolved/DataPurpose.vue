<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 py-16">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          {{ t('getInvolved.purpose.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
          {{ t('getInvolved.purpose.description') }}
        </p>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-12 h-12 text-[#F9AB3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            {{ t('getInvolved.purpose.privacy') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
