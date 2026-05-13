<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import LayoutDashboard from '@/components/common/LayoutDashboard.vue';
import { getAuthenticatedHeader } from '@/client/clientCommon';

const { t } = useI18n();

const steps = ['launch', 'choose', 'download'] as const;

type Platform = 'windows' | 'apple' | 'android';

const downloadLoading = ref<Platform | null>(null);
const downloadError = ref('');
const proxyDownloadLoading = ref(false);
const proxyDownloadError = ref('');

const platforms: { key: Platform; label: string; icon: string }[] = [
  {
    key: 'windows',
    label: 'Windows',
    icon: 'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z',
  },
  {
    key: 'apple',
    label: 'Apple',
    icon: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
  },
  {
    key: 'android',
    label: 'Android',
    icon: 'M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24C14.9 8.31 13.5 8 12 8s-2.9.31-4.47.91L5.65 5.67c-.19-.29-.55-.37-.83-.22-.3.16-.42.54-.26.85L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25S6.31 12.75 7 12.75s1.25.56 1.25 1.25S7.69 15.25 7 15.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z',
  },
];

const handleDownloadProxy = async () => {
  proxyDownloadLoading.value = true;
  proxyDownloadError.value = '';
  const win = window.open('', '_blank');
  try {
    const response = await axios.get('/proxy-key/download', {
      headers: getAuthenticatedHeader(),
    });
    const url = response.data?.url;
    if (url && win) win.location.href = url;
    else win?.close();
  } catch {
    win?.close();
    proxyDownloadError.value = t('vpnInstallation.proxyDownloadError');
  } finally {
    proxyDownloadLoading.value = false;
  }
};

const handleDownload = async (platform: Platform) => {
  downloadLoading.value = platform;
  downloadError.value = '';
  const win = window.open('', '_blank');
  try {
    const response = await axios.get(`/vpn-key/download/${platform}`, {
      headers: getAuthenticatedHeader(),
    });
    const url = response.data?.url;
    if (url && win) win.location.href = url;
    else win?.close();
  } catch {
    win?.close();
    downloadError.value = t('vpnInstallation.downloadError');
  } finally {
    downloadLoading.value = null;
  }
};
</script>

<template>
  <LayoutDashboard>
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {{ t('vpnInstallation.title') }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        {{ t('vpnInstallation.subtitle') }}
      </p>
    </div>

    <div class="max-w-3xl flex flex-col gap-6">

      <div class="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 px-5 py-4 rounded-r-xl">
        <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm text-amber-800 dark:text-amber-300">
          {{ t('vpnInstallation.whyVpn') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        <div
          v-for="(step, index) in steps"
          :key="step"
          class="flex items-start gap-5 p-6"
        >
          <div class="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
            {{ index + 1 }}
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-800 dark:text-white mb-1">
              {{ t(`vpnInstallation.steps.${step}.title`) }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ t(`vpnInstallation.steps.${step}.description`) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-800 dark:text-white mb-4">
          {{ t('vpnInstallation.download.title') }}
        </h2>

        <div class="flex flex-wrap gap-3">
          <button
            v-for="platform in platforms"
            :key="platform.key"
            @click="handleDownload(platform.key)"
            :disabled="downloadLoading !== null"
            class="flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg
              v-if="downloadLoading !== platform.key"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path :d="platform.icon"/>
            </svg>
            <svg v-else class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ platform.label }}
          </button>
        </div>

        <p v-if="downloadError" class="mt-3 text-sm text-red-500">{{ downloadError }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-800 dark:text-white mb-4">
          {{ t('vpnInstallation.proxy.title') }}
        </h2>

        <button
          @click="handleDownloadProxy"
          :disabled="proxyDownloadLoading"
          class="flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg v-if="!proxyDownloadLoading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          <svg v-else class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ t('vpnInstallation.proxy.button') }}
        </button>

        <p v-if="proxyDownloadError" class="mt-3 text-sm text-red-500">{{ proxyDownloadError }}</p>
      </div>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ t('vpnInstallation.support') }}
        <router-link to="/contact" class="text-brand hover:underline">{{ t('vpnInstallation.supportLink') }}</router-link>.
      </p>

    </div>
  </LayoutDashboard>
</template>
