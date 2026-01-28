<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
  features: string[];
}>();
</script>

<template>
  <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div class="w-20 h-20 bg-[#F9AB3B] rounded-full flex items-center justify-center mx-auto mb-6">
      <svg v-if="icon === 'mobile'" class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      <svg v-else-if="icon === 'desktop'" class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>

    <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-4">
      {{ title }}
    </h3>

    <p class="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
      {{ description }}
    </p>

    <ul class="space-y-3">
      <li v-for="(feature, index) in features" :key="index" class="flex items-start">
        <svg class="w-5 h-5 text-[#F9AB3B] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="text-gray-600 dark:text-gray-400">{{ feature }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
