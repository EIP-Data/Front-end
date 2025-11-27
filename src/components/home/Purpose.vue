<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="bg-white dark:bg-gray-800 py-24 px-6 md:px-16 text-center">
    <div class="max-w-3xl mx-auto mb-16">
      <h2 class="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
        {{ t('home.purpose.title') }}
      </h2>
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        {{ t('home.purpose.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      <div
          class="bg-white dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 flex flex-col items-center space-y-4"
      >
        <img
            src="/src/assets/images/home/icon_users.png"
            alt="Users icon"
            class="w-12 h-12"
        />
        <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ t('home.purpose.cards.users.title') }}</h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('home.purpose.cards.users.description') }}
        </p>
      </div>

      <div
          class="bg-white dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 flex flex-col items-center space-y-4"
      >
        <img
            src="/src/assets/images/home/icon_associations.png"
            alt="Associations icon"
            class="w-12 h-12"
        />
        <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ t('home.purpose.cards.associations.title') }}</h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('home.purpose.cards.associations.description') }}
        </p>
      </div>

      <div
          class="bg-white dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 flex flex-col items-center space-y-4"
      >
        <img
            src="/src/assets/images/home/icon_community.png"
            alt="Community icon"
            class="w-12 h-12"
        />
        <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ t('home.purpose.cards.community.title') }}</h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('home.purpose.cards.community.description') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
