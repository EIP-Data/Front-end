<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import TrackingCard from './TrackingCard.vue';

const { t } = useI18n();

const mobileFeatures = computed(() => [
  t('getInvolved.mobile.features.vpn'),
  t('getInvolved.mobile.features.secure'),
  t('getInvolved.mobile.features.anonymous')
]);

const desktopFeatures = computed(() => [
  t('getInvolved.desktop.features.extension'),
  t('getInvolved.desktop.features.tracking'),
  t('getInvolved.desktop.features.prediction')
]);
</script>

<template>
  <section class="bg-white dark:bg-gray-800 py-16">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {{ t('getInvolved.howItWorks.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('getInvolved.howItWorks.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <TrackingCard
          icon="mobile"
          :title="t('getInvolved.mobile.title')"
          :description="t('getInvolved.mobile.description')"
          :features="mobileFeatures"
        />

        <TrackingCard
          icon="desktop"
          :title="t('getInvolved.desktop.title')"
          :description="t('getInvolved.desktop.description')"
          :features="desktopFeatures"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
