<script setup lang="ts">
interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

defineProps<Props>();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          {{ title }}
        </p>
        <h3 class="text-3xl font-bold text-gray-800 dark:text-white mb-1">
          {{ value }}
        </h3>
        <p v-if="subtitle" class="text-xs text-gray-500 dark:text-gray-400">
          {{ subtitle }}
        </p>

        <div v-if="trend" class="mt-3 flex items-center gap-1">
          <svg
            v-if="trend.isPositive"
            class="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <svg
            v-else
            class="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span
            :class="trend.isPositive ? 'text-green-500' : 'text-red-500'"
            class="text-sm font-medium"
          >
            {{ Math.abs(trend.value) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
