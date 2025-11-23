<script setup lang="ts">
import Sidebar from "@/components/common/Sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen bg-gray-200 dark:bg-gray-900 transition-colors">
    <Sidebar />
    <main class="flex-1 p-10 overflow-auto">
      <slot />
    </main>
  </div>
</template>