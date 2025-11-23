<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, type LoginCredentials } from "@/client/clientAuth.ts";
import { useUserStore } from '@/stores/userStore';
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import heroImage from '@/assets/images/home/hero_image.png';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  let credentials: LoginCredentials = {
    email: email.value,
    password: password.value,
  };

  await login(credentials)
      .then(() => {
        errorMessage.value = '';
        userStore.login(email.value);
        router.push('/user-dashboard');
      })
      .catch((error: Error) => {
        errorMessage.value = t('login.error');
        console.error(error);
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
            alt="Dashboard illustration"
            class="w-full max-w-md object-contain"
          />
        </div>

        <!-- Right form -->
        <div>
          <h1 class="text-5xl md:text-6xl font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-10">
            {{ t('login.welcome') }}<br>
            <span class="text-amber-500 dark:text-amber-400 font-bold">{{ t('login.back') }}</span>
          </h1>

          <div v-if="errorMessage"
               class="mb-5 p-4 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700">
            {{ errorMessage }}
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

            <div class="flex justify-end">
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
