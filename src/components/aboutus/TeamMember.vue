<script setup lang="ts">
defineProps<{
  name: string;
  role: string;
  image: string;
  description?: string;
}>();
</script>

<template>
  <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
    <img
      :src="image"
      :alt="name"
      class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#F9AB3B]"
    />
    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
      {{ name }}
    </h3>
    <p class="text-[#F9AB3B] font-semibold mb-2">
      {{ role }}
    </p>
    <p v-if="description" class="text-gray-600 dark:text-gray-400 text-sm">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
</style>
