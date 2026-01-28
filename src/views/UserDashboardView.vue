<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';
import LayoutDashboard from "@/components/common/LayoutDashboard.vue";

const { t } = useI18n();
const userStore = useUserStore();
</script>

<template>
  <LayoutDashboard>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 transition-colors">
      <h1 class="text-4xl font-semibold text-slate-800 dark:text-white mb-6">
        {{ t('dashboard.welcome') }}
      </h1>
      <p class="text-lg text-slate-600 dark:text-gray-300">
        {{ userStore.email }}
      </p>
    </div>
  </LayoutDashboard>
</template>
