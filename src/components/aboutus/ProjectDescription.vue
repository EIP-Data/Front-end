<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-white dark:bg-gray-800 py-16">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg">
            <div class="w-16 h-16 bg-[#F9AB3B] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {{ t('aboutUs.project.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ t('aboutUs.project.description') }}
            </p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg">
            <div class="w-16 h-16 bg-[#F9AB3B] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {{ t('aboutUs.research.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ t('aboutUs.research.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
