<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSettingsStore } from '@/stores/settingsStore.ts';

useSettingsStore();
</script>

<template>
  <RouterView />
</template>
