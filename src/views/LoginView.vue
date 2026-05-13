<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, resendVerificationEmail, type LoginCredentials } from "@/client/clientAuth.ts";
import { useUserStore } from '@/stores/userStore';
import { useConsentsStore } from '@/stores/consentsStore';
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import heroImage from '@/assets/images/home/hero_image.png';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const consentsStore = useConsentsStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const errorMessage = ref('');
const emailNotVerified = ref(false);
const resendLoading = ref(false);
const resendSuccess = ref(false);
const resendError = ref(false);

const handleSubmit = async () => {
  emailNotVerified.value = false;
  resendSuccess.value = false;
  resendError.value = false;

  let credentials: LoginCredentials = {
    email: email.value,
    password: password.value,
    remember: rememberMe.value,
  };

  await login(credentials)
      .then(() => {
        errorMessage.value = '';
        userStore.login(email.value);
        router.push(consentsStore.hasCompletedOnboarding ? '/user-dashboard' : '/onboarding');
      })
      .catch((error: any) => {
        if (error?.response?.status === 403) {
          errorMessage.value = '';
          emailNotVerified.value = true;
        } else {
          errorMessage.value = t('login.error');
        }
        console.error(error);
      });
};

const handleResendEmail = async () => {
  resendLoading.value = true;
  resendSuccess.value = false;
  resendError.value = false;

  await resendVerificationEmail(email.value)
    .then(() => {
      resendSuccess.value = true;
    })
    .catch(() => {
      resendError.value = true;
    })
    .finally(() => {
      resendLoading.value = false;
    });
};
</script>

<template>
  <LayoutShowcase>
    <div class="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center">
    <div class="w-full max-w-6xl px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="hidden md:flex justify-center">
          <img
            :src="heroImage"
            alt="Dashboard illustration"
            class="w-full max-w-md object-contain"
          />
        </div>

        <div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-6 md:mb-10">
            {{ t('login.welcome') }}<br>
            <span class="text-amber-500 dark:text-amber-400 font-bold">{{ t('login.back') }}</span>
          </h1>

          <div v-if="errorMessage"
               class="mb-5 p-4 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700">
            {{ errorMessage }}
          </div>

          <div v-if="emailNotVerified"
               class="mb-5 p-4 text-sm bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-600">
            <p class="text-amber-800 dark:text-amber-300 font-medium mb-3">{{ t('login.emailNotVerified') }}</p>
            <div v-if="resendSuccess" class="text-green-700 dark:text-green-400">{{ t('login.resendEmailSuccess') }}</div>
            <div v-else-if="resendError" class="text-red-600 dark:text-red-400 mb-2">{{ t('login.resendEmailError') }}</div>
            <button
              v-if="!resendSuccess"
              type="button"
              :disabled="resendLoading"
              @click="handleResendEmail"
              class="mt-1 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 underline text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ resendLoading ? '...' : t('login.resendEmail') }}
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <input
                v-model="email"
                type="email"
                required
                :placeholder="t('login.email')"
                class="w-full rounded-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />
            </div>

            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                :placeholder="t('login.password')"
                class="w-full rounded-none border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400"
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

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  id="rememberMe"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
                />
                <span class="text-sm text-slate-600 dark:text-slate-400">{{ t('login.rememberMe') }}</span>
              </label>
              <router-link
                to="/forgot-password"
                class="text-sm text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
              >
                {{ t('login.forgotPassword') }}
              </router-link>
            </div>

            <button
              type="submit"
              class="mt-4 w-full rounded-none bg-amber-400 px-6 py-3 text-slate-900 text-lg font-semibold hover:bg-amber-500 transition-colors"
            >
              {{ t('login.submit') }}
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            {{ t('login.register') }}
            <router-link to="/register" class="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-500 font-medium">
              {{ t('login.registerInstead') }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  </LayoutShowcase>
</template>
