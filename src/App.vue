<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSettingsStore } from '@/stores/settingsStore.ts';

const settingsStore = useSettingsStore();
settingsStore.setDarkMode();
</script>

<template>
  <RouterView />
</template>
