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
    <Sidebar :isOpen="isSidebarOpen" @close="closeSidebar" />
    <div class="lg:ml-80 flex flex-col min-h-screen">
      <TopBar @toggleSidebar="toggleSidebar" />
      <main class="flex-1 p-6 lg:p-10 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
