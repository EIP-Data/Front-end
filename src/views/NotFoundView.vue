<script setup lang="ts">
import { useRouter } from 'vue-router';
import LayoutShowcase from '@/components/common/LayoutShowcase.vue';
import logo from '@/assets/images/common/logo.webp';

const router = useRouter();
</script>

<template>
  <LayoutShowcase>
    <div class="min-h-screen bg-gray-100 dark:bg-slate-900 flex flex-col items-center justify-center gap-8 px-6">
      <img :src="logo" alt="Logo" class="w-40 object-contain" />
      <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 text-center">
        You seem to be lost!
      </h1>
      <button
        @click="router.push('/')"
        class="rounded-none bg-amber-400 px-8 py-3 text-slate-900 text-lg font-semibold hover:bg-amber-500 transition-colors"
      >
        Back to Home
      </button>
    </div>
  </LayoutShowcase>
</template>
