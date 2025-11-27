<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { forgotPassword, type ForgotPasswordRequest } from "@/client/clientAuth.ts";
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import heroImage from '@/assets/images/home/hero_image.png';

const { t } = useI18n();

const email = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  const request: ForgotPasswordRequest = {
    email: email.value,
  };

  await forgotPassword(request)
      .then(() => {
        successMessage.value = t('forgotPassword.success');
        email.value = '';
      })
      .catch((error: Error) => {
        errorMessage.value = t('forgotPassword.error');
        console.error(error);
      })
      .finally(() => {
        isLoading.value = false;
      });
};
</script>

<template>
  <LayoutShowcase>
    <div class="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center">
    <div class="w-full max-w-6xl px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left illustration -->
        <div class="hidden md:flex justify-center">
          <img
            :src="heroImage"
            alt="Password reset illustration"
            class="w-full max-w-md object-contain"
          />
        </div>

        <!-- Right form -->
        <div>
          <h1 class="text-5xl md:text-6xl font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-4">
            {{ t('forgotPassword.title') }}<br>
            <span class="text-amber-500 dark:text-amber-400 font-bold">{{ t('forgotPassword.titleHighlight') }}</span>
          </h1>

          <p class="text-slate-600 dark:text-slate-400 mb-10">
            {{ t('forgotPassword.subtitle') }}
          </p>

          <div v-if="errorMessage"
               class="mb-5 p-4 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage"
               class="mb-5 p-4 text-sm text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700">
            {{ successMessage }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <input
                v-model="email"
                type="email"
                required
                :placeholder="t('forgotPassword.email')"
                :disabled="isLoading"
                class="w-full rounded-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="mt-4 w-full rounded-none bg-amber-400 px-6 py-3 text-slate-900 text-lg font-semibold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">{{ t('forgotPassword.submit') }}</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            {{ t('forgotPassword.rememberPassword') }}
            <router-link to="/login" class="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-500 font-medium">
              {{ t('forgotPassword.backToLogin') }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  </LayoutShowcase>
</template>
