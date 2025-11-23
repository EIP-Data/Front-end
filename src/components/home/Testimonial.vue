<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 py-24 px-6 md:px-16">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

      <!-- Image -->
      <div class="md:w-1/3 flex justify-center">
        <img
            src="/src/assets/images/home/vindiou.png"
            alt="Contributor illustration"
            class="w-3/4 max-w-sm"
        />
      </div>

      <!-- Texte -->
      <div class="md:w-2/3 text-center md:text-left">
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          {{ t('home.testimonial.quote') }}
        </p>

        <div class="space-y-1 mb-10">
          <h3 class="text-amber-500 font-semibold text-lg">{{ t('home.testimonial.author') }}</h3>
          <p class="text-gray-400 dark:text-gray-500">
            {{ t('home.testimonial.organization') }}
          </p>
        </div>

        <a
            href="#"
            class="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-600 transition-all"
        >
          {{ t('home.testimonial.meetContributors') }}
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>


<style scoped>
</style>
