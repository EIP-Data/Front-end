<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LayoutShowcase from '@/components/common/LayoutShowcase.vue';

const { t } = useI18n();

const dataTypes = ['data', 'navigation', 'history', 'clicks', 'scrolls', 'fullExperience'] as const;
const rightsList = ['access', 'rectification', 'erasure', 'portability', 'opposition', 'restriction'] as const;
const useList = ['scraping', 'impersonation', 'interference', 'illegal'] as const;
</script>

<template>
  <LayoutShowcase>

    <section class="bg-gray-50 dark:bg-gray-900 py-20">
      <div class="container mx-auto px-6 text-center max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-bold text-brand mb-6">
          {{ t('footer.links.terms') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('termsOfServices.lastUpdated') }}
        </p>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {{ t('termsOfServices.sections.acceptance.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('termsOfServices.sections.acceptance.content') }}
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {{ t('termsOfServices.sections.description.title') }}
          </h2>
          <div class="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 px-4 py-3">
            <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm text-amber-800 dark:text-amber-300 font-medium">
              {{ t('termsOfServices.sections.description.content') }}
            </p>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {{ t('termsOfServices.sections.accounts.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('termsOfServices.sections.accounts.content') }}
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {{ t('termsOfServices.sections.data.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {{ t('termsOfServices.sections.data.intro') }}
          </p>
          <ul class="space-y-2 mb-4 ml-2">
            <li v-for="type in dataTypes" :key="type" class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
              {{ t(`termsOfServices.sections.data.types.${type}`) }}
            </li>
          </ul>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{{ t('termsOfServices.sections.data.granular') }}</p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{{ t('termsOfServices.sections.data.modify') }}</p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{{ t('termsOfServices.sections.data.noSale') }}</p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {{ t('termsOfServices.sections.hosting.title') }}
          </h2>
          <div class="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 px-4 py-3">
            <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
            </svg>
            <p class="text-sm text-blue-800 dark:text-blue-300">
              {{ t('termsOfServices.sections.hosting.content') }}
            </p>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {{ t('termsOfServices.sections.rights.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{{ t('termsOfServices.sections.rights.intro') }}</p>
          <ul class="space-y-2 mb-4 ml-2">
            <li v-for="right in rightsList" :key="right" class="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-1.5"></span>
              {{ t(`termsOfServices.sections.rights.list.${right}`) }}
            </li>
          </ul>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t('termsOfServices.sections.rights.exercise') }}</p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {{ t('termsOfServices.sections.use.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{{ t('termsOfServices.sections.use.intro') }}</p>
          <ul class="space-y-2 ml-2">
            <li v-for="item in useList" :key="item" class="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></span>
              {{ t(`termsOfServices.sections.use.list.${item}`) }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">{{ t('termsOfServices.sections.ip.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t('termsOfServices.sections.ip.content') }}</p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">{{ t('termsOfServices.sections.termination.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t('termsOfServices.sections.termination.content') }}</p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">{{ t('termsOfServices.sections.changes.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ t('termsOfServices.sections.changes.content') }}</p>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">{{ t('termsOfServices.sections.contact.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('termsOfServices.sections.contact.content') }}
            <router-link to="/contact" class="text-brand hover:underline ml-1">{{ t('footer.links.contact') }}</router-link>.
          </p>
        </div>

      </div>
    </section>

  </LayoutShowcase>
</template>
