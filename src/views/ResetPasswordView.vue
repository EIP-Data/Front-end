<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { resetPassword, type ResetPasswordRequest } from "@/client/clientAuth.ts";
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import heroImage from '@/assets/images/home/hero_image.png';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);
const token = ref('');

onMounted(() => {
  // Get token from URL query params
  token.value = route.query.token as string || '';

  if (!token.value) {
    errorMessage.value = t('resetPassword.invalidToken');
  }
});

function testPasswordStrength() {
  if (password.value.length === 0) return 0;
  if (password.value.length < 8) return 1;
  if (/[A-Z]/.test(password.value) && /[a-z]/.test(password.value) && /[0-9]/.test(password.value)) return 3;
  return 2;
}

const handleSubmit = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!token.value) {
    errorMessage.value = t('resetPassword.invalidToken');
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = t('resetPassword.passwordMismatch');
    return;
  }

  if (testPasswordStrength() !== 3) {
    errorMessage.value = t('resetPassword.weakPassword');
    return;
  }

  isLoading.value = true;

  const request: ResetPasswordRequest = {
    token: token.value,
    new_password: password.value,
  };

  await resetPassword(request)
      .then(() => {
        successMessage.value = t('resetPassword.success');
        password.value = '';
        confirmPassword.value = '';

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      })
      .catch((error: Error) => {
        errorMessage.value = t('resetPassword.error');
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
            {{ t('resetPassword.title') }}<br>
            <span class="text-amber-500 dark:text-amber-400 font-bold">{{ t('resetPassword.titleHighlight') }}</span>
          </h1>

          <p class="text-slate-600 dark:text-slate-400 mb-10">
            {{ t('resetPassword.subtitle') }}
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
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                :placeholder="t('resetPassword.password')"
                :disabled="isLoading || !token"
                class="w-full rounded-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                :disabled="isLoading || !token"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 disabled:opacity-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M6.58 6.58L4 4m3.582 3.582L11 11m2 2l1.586 1.586M19 4l-2.586 2.586M4 19l3.582-3.582"/>
                </svg>
              </button>
            </div>

            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                :placeholder="t('resetPassword.confirmPassword')"
                :disabled="isLoading || !token"
                class="w-full rounded-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                :disabled="isLoading || !token"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 disabled:opacity-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M6.58 6.58L4 4m3.582 3.582L11 11m2 2l1.586 1.586M19 4l-2.586 2.586M4 19l3.582-3.582"/>
                </svg>
              </button>
            </div>

            <button
              type="submit"
              :disabled="isLoading || !token"
              class="mt-4 w-full rounded-none bg-amber-400 px-6 py-3 text-slate-900 text-lg font-semibold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">{{ t('resetPassword.submit') }}</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </LayoutShowcase>
</template>
