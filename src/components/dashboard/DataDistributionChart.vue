<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/themeStore';

const { t } = useI18n();
const themeStore = useThemeStore();

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 350,
    background: 'transparent'
  },
  labels: [
    t('dashboard.charts.navigation'),
    t('dashboard.charts.clicks'),
    t('dashboard.charts.scrolls'),
    t('dashboard.charts.other')
  ],
  colors: ['#F59E0B', '#8B5CF6', '#10B981', '#3B82F6'],
  legend: {
    position: 'bottom',
    labels: {
      colors: themeStore.isDarkMode ? '#9CA3AF' : '#6B7280'
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: t('dashboard.charts.total'),
            fontSize: '16px',
            color: themeStore.isDarkMode ? '#9CA3AF' : '#6B7280',
            formatter: () => '100%'
          },
          value: {
            fontSize: '24px',
            color: themeStore.isDarkMode ? '#FFFFFF' : '#1F2937',
            formatter: (val: string) => `${val}%`
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(1)}%`
  },
  tooltip: {
    theme: themeStore.isDarkMode ? 'dark' : 'light',
    y: {
      formatter: (val: number) => `${val}%`
    }
  }
}));

const series = [35, 28, 22, 15];
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">
      {{ t('dashboard.charts.dataDistribution') }}
    </h3>
    <apexchart
      type="donut"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
