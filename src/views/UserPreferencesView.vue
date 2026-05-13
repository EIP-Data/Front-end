<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LayoutDashboard from '@/components/common/LayoutDashboard.vue';
import { useConsentsStore } from '@/stores/consentsStore';
import type { ConsentState } from '@/stores/consentsStore';

const { t } = useI18n();
const consentsStore = useConsentsStore();

const consentKeys = ['data', 'navigation', 'history', 'clicks', 'scrolls', 'fullExperience'] as const;

const localConsents = ref<ConsentState>({ ...consentsStore.consents });

const saved = ref(false);

const savePreferences = () => {
  consentsStore.setConsents(localConsents.value);
  saved.value = true;
  setTimeout(() => { saved.value = false; }, 3000);
};
</script>

<template>
  <LayoutDashboard>
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {{ t('onboarding.title') }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        {{ t('onboarding.subtitle') }}
      </p>
    </div>

    <div class="flex flex-col gap-4 max-w-3xl">
      <div
        v-for="key in consentKeys"
        :key="key"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <h2 class="text-base font-semibold text-gray-800 dark:text-white mb-1">
              {{ t(`onboarding.consents.${key}.title`) }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {{ t(`onboarding.consents.${key}.description`) }}
            </p>
            <div class="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 px-3 py-2">
              <svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <p class="text-xs text-amber-800 dark:text-amber-300">
                {{ t(`onboarding.consents.${key}.benefit`) }}
              </p>
            </div>
          </div>

          <button
            @click="localConsents[key] = !localConsents[key]"
            class="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            :class="localConsents[key] ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'"
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition duration-200"
              :class="localConsents[key] ? 'translate-x-5' : 'translate-x-0'"
            />
          </button>
        </div>
      </div>

      <div class="flex items-center justify-end gap-4 mt-2">
        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-200"
          leave-to-class="opacity-0"
        >
          <span v-if="saved" class="text-sm text-green-600 dark:text-green-400 font-medium">
            {{ t('userPreferences.saved') }}
          </span>
        </Transition>
        <button
          @click="savePreferences"
          class="px-6 py-2.5 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
        >
          {{ t('userPreferences.save') }}
        </button>
      </div>
    </div>
  </LayoutDashboard>
</template>
