<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import LayoutDashboard from '@/components/common/LayoutDashboard.vue';

const { t } = useI18n();

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: ReleaseAsset[];
}

type Browser = 'chrome' | 'firefox' | 'unknown';

const release = ref<Release | null>(null);
const loading = ref(true);
const error = ref('');

const detectedBrowser = ref<Browser>('unknown');

const steps = ['install', 'enable', 'signin'] as const;

const detectBrowser = (): Browser => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Chrome') || ua.includes('Chromium')) return 'chrome';
  return 'unknown';
};

const chromeAsset = computed(() =>
  release.value?.assets.find(a => /chrome|chromium/i.test(a.name)) ?? null
);

const firefoxAsset = computed(() =>
  release.value?.assets.find(a => /firefox/i.test(a.name)) ?? null
);

const formattedDate = computed(() => {
  if (!release.value) return '';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(
    new Date(release.value.published_at)
  );
});

const fetchRelease = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('https://api.github.com/repos/EIP-Data/WXT-Extension/releases/latest');
    if (!res.ok) {
      if (res.status === 404) throw new Error('no_release');
      if (res.status === 403) throw new Error('rate_limit');
      throw new Error('api_error');
    }
    release.value = await res.json();
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'api_error';
    error.value = ['no_release', 'rate_limit'].includes(msg) ? msg : 'api_error';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  detectedBrowser.value = detectBrowser();
  fetchRelease();
});
</script>

<template>
  <LayoutDashboard>
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {{ t('extensionInstallation.title') }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        {{ t('extensionInstallation.subtitle') }}
      </p>
    </div>

    <div class="max-w-3xl flex flex-col gap-6">

      <div class="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 px-5 py-4 rounded-r-xl">
        <svg aria-hidden="true" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm text-blue-800 dark:text-blue-300">
          {{ t('extensionInstallation.whyExtension') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        <div
          v-for="(step, index) in steps"
          :key="step"
          class="flex items-start gap-5 p-6"
        >
          <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
            {{ index + 1 }}
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-800 dark:text-white mb-1">
              {{ t(`extensionInstallation.steps.${step}.title`) }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ t(`extensionInstallation.steps.${step}.description`) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-800 dark:text-white mb-2">
          {{ t('extensionInstallation.download.title') }}
        </h2>

        <div v-if="detectedBrowser !== 'unknown'" class="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ t(`extensionInstallation.download.detected.${detectedBrowser}`) }}
        </div>

        <div v-if="loading" role="status" aria-live="polite" class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <svg aria-hidden="true" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span class="text-sm">{{ t('extensionInstallation.release.loading') }}</span>
        </div>

        <div v-else-if="!error" class="flex flex-wrap gap-3">
          <a
            v-if="chromeAsset"
            :href="chromeAsset.browser_download_url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="detectedBrowser === 'chrome' ? `Chrome – ${t('extensionInstallation.download.recommended')} (${t('common.opensInNewTab')})` : `Chrome (${t('common.opensInNewTab')})`"
            :class="[
              'flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors',
              detectedBrowser === 'chrome'
                ? 'bg-brand text-white hover:bg-brand-dark shadow-md ring-2 ring-brand ring-offset-2'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 8h5.196A6.002 6.002 0 0012 6C9.188 6 6.78 7.67 5.633 10.1L8.1 14.05A4 4 0 0112 8z"/>
              <path d="M6.804 16A6 6 0 0012 18a6.002 6.002 0 005.196-3H12a4 4 0 01-3.464-2L6.072 9A6.002 6.002 0 006 12c0 1.48.535 2.83 1.418 3.87"/>
            </svg>
            Chrome
            <span v-if="detectedBrowser === 'chrome'" class="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded">
              {{ t('extensionInstallation.download.recommended') }}
            </span>
          </a>

          <a
            v-if="firefoxAsset"
            :href="firefoxAsset.browser_download_url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="detectedBrowser === 'firefox' ? `Firefox – ${t('extensionInstallation.download.recommended')} (${t('common.opensInNewTab')})` : `Firefox (${t('common.opensInNewTab')})`"
            :class="[
              'flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors',
              detectedBrowser === 'firefox'
                ? 'bg-brand text-white hover:bg-brand-dark shadow-md ring-2 ring-brand ring-offset-2'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.48.41-2.86 1.12-4.06C5.98 9.37 7.5 10 9 10c1.5 0 2.9-.56 3.95-1.49A5.97 5.97 0 0118 12c0 4.41-3.59 8-6 8z"/>
            </svg>
            Firefox
            <span v-if="detectedBrowser === 'firefox'" class="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded">
              {{ t('extensionInstallation.download.recommended') }}
            </span>
          </a>

          <div v-if="!chromeAsset && !firefoxAsset && release" class="text-sm text-gray-500 dark:text-gray-400">
            {{ t('extensionInstallation.release.errors.no_assets') }}
          </div>
        </div>

        <p v-if="detectedBrowser === 'unknown' && !loading && !error" class="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {{ t('extensionInstallation.download.unknownBrowser') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-800 dark:text-white mb-4">
          {{ t('extensionInstallation.release.title') }}
        </h2>

        <div v-if="loading" role="status" aria-live="polite" class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <svg aria-hidden="true" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span class="text-sm">{{ t('extensionInstallation.release.loading') }}</span>
        </div>

        <div v-else-if="error" role="alert" class="flex items-start gap-3 text-red-600 dark:text-red-400">
          <svg aria-hidden="true" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm">{{ t(`extensionInstallation.release.errors.${error}`) }}</span>
        </div>

        <div v-else-if="release" class="flex flex-col gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium px-3 py-1 rounded-full">
              <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              {{ release.tag_name }}
            </span>
            <span class="text-sm text-gray-400 dark:text-gray-500">
              {{ t('extensionInstallation.release.publishedOn') }} {{ formattedDate }}
            </span>
          </div>

          <div v-if="release.body" class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">
            {{ release.body }}
          </div>
        </div>
      </div>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ t('extensionInstallation.support') }}
        <router-link to="/contact" class="text-brand hover:underline">{{ t('extensionInstallation.supportLink') }}</router-link>.
      </p>

    </div>
  </LayoutDashboard>
</template>
