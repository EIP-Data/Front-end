<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/themeStore';

const { t } = useI18n();
const themeStore = useThemeStore();

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false
    },
    background: 'transparent'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 8
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: [
      t('dashboard.charts.week1'),
      t('dashboard.charts.week2'),
      t('dashboard.charts.week3'),
      t('dashboard.charts.week4')
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
      }
    }
  },
  fill: {
    opacity: 1
  },
  colors: ['#10B981', '#3B82F6'],
  legend: {
    position: 'top',
    labels: {
      colors: themeStore.isDarkMode ? '#9CA3AF' : '#6B7280'
    }
  },
  tooltip: {
    theme: themeStore.isDarkMode ? 'dark' : 'light',
    y: {
      formatter: (val: number) => `${val} users`
    }
  },
  grid: {
    borderColor: themeStore.isDarkMode ? '#374151' : '#E5E7EB'
  }
}));

const series = [
  {
    name: t('dashboard.charts.activeUsers'),
    data: [250, 320, 380, 420]
  },
  {
    name: t('dashboard.charts.newUsers'),
    data: [45, 62, 78, 95]
  }
];
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">
      {{ t('dashboard.charts.userActivity') }}
    </h3>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
