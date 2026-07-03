<script setup lang="ts">
import Sidebar from "@/components/common/Sidebar.vue";
import TopBar from "@/components/common/TopBar.vue";
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-200 dark:bg-gray-900 transition-colors">
    <a href="#dashboard-main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-900 focus:font-semibold focus:rounded">
      Skip to main content
    </a>
    <Sidebar :isOpen="isSidebarOpen" @close="closeSidebar" />
    <div class="lg:ml-80 flex flex-col min-h-screen">
      <TopBar @toggleSidebar="toggleSidebar" />
      <main id="dashboard-main" tabindex="-1" class="flex-1 p-6 lg:p-10 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
