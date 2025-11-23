<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useThemeStore } from '@/stores/themeStore';
import { deleteToken } from '@/client/clientCommon';
import logo from '@/assets/images/common/logo.webp';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const themeStore = useThemeStore();

const handleLogout = () => {
  userStore.logout();
  deleteToken();
  router.push('/');
};
</script>

<template>
  <div class="w-80 min-h-screen bg-[#f7f7f7] dark:bg-gray-800 shadow-2xl flex flex-col py-10 px-6 transition-colors">
    <!-- Logo -->
    <div class="flex items-center gap-3 mb-20">
      <img :src="logo" class="w-12 h-12" alt="Datalyz logo" />
      <h1 class="text-4xl font-light text-amber-500 tracking-wide">Datalyz</h1>
    </div>

    <!-- Menu -->
    <nav class="flex flex-col items-center text-amber-500 font-light text-2xl gap-24">
      <router-link to="/user-dashboard" class="hover:underline">
        {{ t('sidebar.dashboard') }}
      </router-link>
      <router-link to="/user-data" class="hover:underline">
        {{ t('sidebar.myData') }}
      </router-link>
      <router-link to="/user-preferences" class="hover:underline">
        {{ t('sidebar.preferences') }}
      </router-link>
      <router-link to="/user-settings" class="hover:underline">
        {{ t('sidebar.settings') }}
      </router-link>
    </nav>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Dark Mode Toggle -->
    <div class="flex items-center justify-between px-2 mb-10">
      <div class="flex items-center gap-3">
        <span class="text-4xl">{{ themeStore.isDarkMode ? '&#9728;' : '&#127769;' }}</span>
        <span class="text-gray-600 dark:text-gray-300 text-xl font-light">{{ t('sidebar.darkMode') }}</span>
      </div>

      <button
        @click="themeStore.toggleDarkMode()"
        class="relative w-16 h-8 rounded-full px-1 cursor-pointer transition-colors"
        :class="themeStore.isDarkMode ? 'bg-amber-400' : 'bg-gray-300'"
      >
        <div
          class="absolute top-0.5 w-7 h-7 bg-white rounded-full shadow transition-transform"
          :class="themeStore.isDarkMode ? 'translate-x-8' : 'translate-x-0'"
        ></div>
        <span
          class="absolute text-xs top-2 transition-opacity"
          :class="themeStore.isDarkMode ? 'right-2 text-white' : 'right-2 text-gray-600'"
        >
          {{ themeStore.isDarkMode ? 'ON' : 'OFF' }}
        </span>
      </button>
    </div>

    <!-- Logout Button -->
    <button
      @click="handleLogout"
      class="w-full bg-amber-400 text-white py-4 rounded-xl text-xl font-light flex items-center justify-center gap-3 hover:bg-amber-500 transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      {{ t('sidebar.logout') }}
    </button>
  </div>
</template>
