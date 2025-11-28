<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import userIcon from '@/assets/images/common/user-icon.png';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const emit = defineEmits<{
  toggleSidebar: []
}>();

const showUserMenu = ref(false);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const navigateToSettings = () => {
  router.push('/user-settings');
  showUserMenu.value = false;
};
</script>

<template>
  <header class="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md transition-colors">
    <div class="flex items-center justify-between px-6 py-4">
      <button
        @click="emit('toggleSidebar')"
        class="lg:hidden text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
        :aria-label="t('topbar.toggleMenu')"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="flex-1 lg:ml-0 ml-4">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          {{ t('topbar.title') }}
        </h2>
      </div>

      <div class="relative">
        <button
          @click="toggleUserMenu"
          class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          :aria-label="t('topbar.userMenu')"
        >
          <div class="hidden sm:flex flex-col items-end">
            <span class="text-sm font-medium text-gray-800 dark:text-white">
              {{ userStore.email }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ t('topbar.user') }}
            </span>
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <img :src="userIcon" alt="User" class="w-full h-full object-cover" />
          </div>
        </button>

        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-xl shadow-lg py-2 border border-gray-200 dark:border-gray-600"
          >
            <button
              @click="navigateToSettings"
              class="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ t('topbar.settings') }}
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
