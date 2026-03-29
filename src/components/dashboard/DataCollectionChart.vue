<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/themeStore';

const { t } = useI18n();
const themeStore = useThemeStore();

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false
    },
    background: 'transparent'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  xaxis: {
    categories: [
      t('months.jan'), t('months.feb'), t('months.mar'),
      t('months.apr'), t('months.may'), t('months.jun'),
      t('months.jul'), t('months.aug'), t('months.sep'),
      t('months.oct'), t('months.nov'), t('months.dec')
    ],
    labels: {
      style: {
        colors: themeStore.isDarkMode ? '#9CA3AF' : '#6B7280'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: themeStore.isDarkMode ? '#9CA3AF' : '#6B7280'
      },
      formatter: (value: number) => `${(value / 1000).toFixed(1)}k`
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  colors: ['#F59E0B', '#8B5CF6'],
  legend: {
    position: 'top',
    labels: {
      colors: themeStore.isDarkMode ? '#9CA3AF' : '#6B7280'
    }
  },
  tooltip: {
    theme: themeStore.isDarkMode ? 'dark' : 'light'
  },
  grid: {
    borderColor: themeStore.isDarkMode ? '#374151' : '#E5E7EB'
  }
}));

const series = [
  {
    name: t('dashboard.charts.dataCollected'),
    data: [12000, 15000, 18000, 22000, 28000, 32000, 38000, 42000, 48000, 52000, 58000, 65000]
  },
  {
    name: t('dashboard.charts.dataAnalyzed'),
    data: [8000, 11000, 14000, 18000, 23000, 27000, 32000, 36000, 41000, 45000, 51000, 57000]
  }
];
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">
      {{ t('dashboard.charts.dataEvolution') }}
    </h3>
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
