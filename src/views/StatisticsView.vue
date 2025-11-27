<script setup lang="ts">
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import BarChart from '@/components/charts/BarChart.vue';
import LineChart from '@/components/charts/LineChart.vue';
import PieChart from '@/components/charts/PieChart.vue';
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import HeroBanner from "@/components/home/HeroBanner.vue";

const {t} = useI18n();

const barChartData = ref({
  labels: [
    t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
    t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'),
    t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
  ],
  datasets: [
    {
      label: t('statistics.dataCollected'),
      backgroundColor: '#F9AB3B',
      data: [65, 59, 80, 81, 56, 55, 40, 70, 90, 85, 75, 95],
    },
  ],
});

const lineChartData = ref({
  labels: [
    t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
    t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'),
    t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
  ],
  datasets: [
    {
      label: t('statistics.activeUsers'),
      borderColor: '#F9AB3B',
      fill: false,
      data: [1200, 1300, 1250, 1400, 1500, 1600, 1550, 1700, 1800, 1750, 1850, 1900],
    },
  ],
});

const pieChartData = ref({
  labels: [t('categories.a'), t('categories.b'), t('categories.c'), t('categories.d')],
  datasets: [
    {
      backgroundColor: ['#F9AB3B', '#FF6384', '#36A2EB', '#4BC0C0'],
      data: [30, 25, 20, 25],
    },
  ],
});
</script>

<template>
  <LayoutShowcase>
    <HeroBanner class="dark:bg-gray-900">
      <template #title>
        {{ t('statistics.title') }}
      </template>
      <template #description>
        {{ t('statistics.description') }}
      </template>
    </HeroBanner>

    <div class="px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ t('statistics.activeUsers') }}</h3>
          <p class="text-3xl font-bold text-[#F9AB3B]">1,234</p>
          <p class="text-gray-500 dark:text-gray-400">+12% {{ t('statistics.thisMonth') }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ t('statistics.dataCollected') }}</h3>
          <p class="text-3xl font-bold text-[#F9AB3B]">456 Go</p>
          <p class="text-gray-500 dark:text-gray-400">+8% {{ t('statistics.thisMonth') }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ t('statistics.satisfactionRate') }}</h3>
          <p class="text-3xl font-bold text-[#F9AB3B]">202 543</p>
          <p class="text-gray-500 dark:text-gray-400">+2% {{ t('statistics.thisMonth') }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{{
              t('statistics.dataCollectedByMonth')
            }}</h3>
          <BarChart :data="barChartData"/>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{{ t('statistics.userTrends') }}</h3>
          <LineChart :data="lineChartData"/>
        </div>

        <div
            class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{{
              t('statistics.dataDistribution')
            }}</h3>
          <PieChart :data="pieChartData"/>
        </div>
      </div>
    </div>
  </LayoutShowcase>
</template>
