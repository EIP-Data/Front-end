<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-white dark:bg-gray-800 py-16">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {{ t('ourWork.goal.title') }}
          </h2>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg">
          <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {{ t('ourWork.goal.description') }}
          </p>

          <div class="grid md:grid-cols-3 gap-6 mt-8">
            <div class="text-center p-4">
              <div class="w-16 h-16 bg-[#F9AB3B] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {{ t('ourWork.goal.features.understand.title') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{ t('ourWork.goal.features.understand.description') }}
              </p>
            </div>

            <div class="text-center p-4">
              <div class="w-16 h-16 bg-[#F9AB3B] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {{ t('ourWork.goal.features.analyze.title') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{ t('ourWork.goal.features.analyze.description') }}
              </p>
            </div>

            <div class="text-center p-4">
              <div class="w-16 h-16 bg-[#F9AB3B] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {{ t('ourWork.goal.features.publish.title') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{ t('ourWork.goal.features.publish.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
