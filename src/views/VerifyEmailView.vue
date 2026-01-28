<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { verifyEmail } from "@/client/clientAuth.ts";
import { useUserStore } from '@/stores/userStore';
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import heroImage from '@/assets/images/home/hero_image.png';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const isVerifying = ref(true);
const isSuccess = ref(false);
const isError = ref(false);
const token = ref('');

onMounted(async () => {
  // Get token from URL query params
  token.value = route.query.token as string || '';

  if (!token.value) {
    isVerifying.value = false;
    isError.value = true;
    return;
  }

  // Automatically verify email on mount
  await verifyEmail(token.value)
      .then(() => {
        isVerifying.value = false;
        isSuccess.value = true;

        // Redirect after 2 seconds
        setTimeout(() => {
          if (userStore.getIsAuthenticated) {
            router.push('/user-dashboard');
          } else {
            router.push('/login');
          }
        }, 2000);
      })
      .catch((error: Error) => {
        console.error(error);
        isVerifying.value = false;
        isError.value = true;
      });
});
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
            alt="Email verification illustration"
            class="w-full max-w-md object-contain"
          />
        </div>

        <!-- Right content -->
        <div>
          <h1 class="text-5xl md:text-6xl font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-4">
            {{ t('verifyEmail.title') }}<br>
            <span class="text-amber-500 dark:text-amber-400 font-bold">{{ t('verifyEmail.titleHighlight') }}</span>
          </h1>

          <!-- Verifying state -->
          <div v-if="isVerifying" class="mt-10">
            <div class="flex items-center justify-center space-x-3 mb-4">
              <svg class="animate-spin h-8 w-8 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p class="text-center text-lg text-slate-600 dark:text-slate-400">
              {{ t('verifyEmail.verifying') }}
            </p>
          </div>

          <!-- Success state -->
          <div v-if="isSuccess" class="mt-10">
            <div class="mb-5 p-6 text-center bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded-lg">
              <div class="flex justify-center mb-3">
                <svg class="w-16 h-16 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {{ t('verifyEmail.success') }}
              </h2>
              <p class="text-sm text-green-600 dark:text-green-400">
                {{ userStore.getIsAuthenticated ? t('verifyEmail.successMessageLoggedIn') : t('verifyEmail.successMessageNotLoggedIn') }}
              </p>
            </div>
          </div>

          <!-- Error state -->
          <div v-if="isError" class="mt-10">
            <div class="mb-5 p-6 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg">
              <div class="flex justify-center mb-3">
                <svg class="w-16 h-16 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-red-600 dark:text-red-400 mb-2 text-center">
                {{ t('verifyEmail.error') }}
              </h2>
              <p class="text-sm text-red-600 dark:text-red-400 text-center mb-6">
                {{ t('verifyEmail.errorMessage') }}
              </p>
            </div>

            <div class="space-y-3">
              <button
                @click="router.push('/login')"
                class="w-full rounded-none bg-amber-400 px-6 py-3 text-slate-900 text-lg font-semibold hover:bg-amber-500 transition-colors"
              >
                {{ t('verifyEmail.loginButton') }}
              </button>

              <button
                @click="router.push('/register')"
                class="w-full rounded-none bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 px-6 py-3 text-slate-900 dark:text-slate-100 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                {{ t('verifyEmail.registerButton') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </LayoutShowcase>
</template>
