<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';
import LayoutDashboard from "@/components/common/LayoutDashboard.vue";
import StatCard from "@/components/dashboard/StatCard.vue";
import DataCollectionChart from "@/components/dashboard/DataCollectionChart.vue";
import UserActivityChart from "@/components/dashboard/UserActivityChart.vue";
import DataDistributionChart from "@/components/dashboard/DataDistributionChart.vue";

const { t } = useI18n();
const userStore = useUserStore();
</script>

<template>
  <LayoutDashboard>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        {{ t('dashboard.welcome') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ userStore.email }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <StatCard
        :title="t('dashboard.stats.totalUsers')"
        :value="1247"
        :subtitle="t('dashboard.stats.registeredUsers')"
        :trend="{ value: 12.5, isPositive: true }"
        color="blue"
      />
      <StatCard
        :title="t('dashboard.stats.dataCollected')"
        value="65.2k"
        :subtitle="t('dashboard.stats.totalRecords')"
        :trend="{ value: 8.3, isPositive: true }"
        color="green"
      />
      <StatCard
        :title="t('dashboard.stats.activeToday')"
        :value="420"
        :subtitle="t('dashboard.stats.activeUsers')"
        :trend="{ value: 3.2, isPositive: false }"
        color="purple"
      />
      <StatCard
        :title="t('dashboard.stats.analysisCompleted')"
        :value="892"
        :subtitle="t('dashboard.stats.thisMonth')"
        :trend="{ value: 15.7, isPositive: true }"
        color="orange"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      <DataCollectionChart />
      <UserActivityChart />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2">
        <DataCollectionChart />
      </div>
      <DataDistributionChart />
    </div>
  </LayoutDashboard>
</template>
