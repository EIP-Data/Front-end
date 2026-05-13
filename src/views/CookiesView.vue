<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LayoutShowcase from '@/components/common/LayoutShowcase.vue';

const { t } = useI18n();
</script>

<template>
  <LayoutShowcase>

    <section class="bg-gray-50 dark:bg-gray-900 py-20">
      <div class="container mx-auto px-6 text-center max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-bold text-brand mb-6">
          {{ t('footer.links.cookies') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('cookiesPolicy.subtitle') }}
        </p>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">1. {{ t('cookiesPolicy.sections.what.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('cookiesPolicy.sections.what.content') }}
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">2. {{ t('cookiesPolicy.sections.list.title') }}</h2>
          <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table class="w-full text-sm text-left">
              <thead class="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  <th class="px-4 py-3 font-semibold">{{ t('cookiesPolicy.table.name') }}</th>
                  <th class="px-4 py-3 font-semibold">{{ t('cookiesPolicy.table.purpose') }}</th>
                  <th class="px-4 py-3 font-semibold">{{ t('cookiesPolicy.table.duration') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                <tr class="bg-white dark:bg-gray-800">
                  <td class="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">token</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ t('cookiesPolicy.table.rows.token') }}</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ t('cookiesPolicy.table.rows.tokenDuration') }}</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-700/50">
                  <td class="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">locale</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ t('cookiesPolicy.table.rows.locale') }}</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ t('cookiesPolicy.table.rows.localeDuration') }}</td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                  <td class="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">theme</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ t('cookiesPolicy.table.rows.theme') }}</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ t('cookiesPolicy.table.rows.themeDuration') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">3. {{ t('cookiesPolicy.sections.manage.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('cookiesPolicy.sections.manage.content') }}
          </p>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">4. {{ t('cookiesPolicy.sections.contact.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('cookiesPolicy.sections.contact.content') }}
            <router-link to="/contact" class="text-brand hover:underline ml-1">{{ t('footer.links.contact') }}</router-link>.
          </p>
        </div>

      </div>
    </section>

  </LayoutShowcase>
</template>
