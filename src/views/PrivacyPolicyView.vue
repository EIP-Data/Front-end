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
          {{ t('footer.links.privacy') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('privacyPolicy.subtitle') }}
        </p>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">1. {{ t('privacyPolicy.sections.collect.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('privacyPolicy.sections.collect.content') }}
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">2. {{ t('privacyPolicy.sections.use.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('privacyPolicy.sections.use.content') }}
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">3. {{ t('privacyPolicy.sections.rights.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('privacyPolicy.sections.rights.content') }}
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">4. {{ t('privacyPolicy.sections.retention.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('privacyPolicy.sections.retention.content') }}
          </p>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-3">5. {{ t('privacyPolicy.sections.contact.title') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('privacyPolicy.sections.contact.content') }}
            <router-link to="/contact" class="text-brand hover:underline ml-1">{{ t('footer.links.contact') }}</router-link>.
          </p>
        </div>

      </div>
    </section>

  </LayoutShowcase>
</template>
