<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useThemeStore } from '@/stores/themeStore';
import { usePermissionsStore } from '@/stores/permissionsStore';
import { deleteToken } from '@/client/clientCommon';
import logo from '@/assets/images/common/logo.webp';
import type { UserRole } from '@/types/permissions';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const themeStore = useThemeStore();
const permissionsStore = usePermissionsStore();

// Mode développement pour le sélecteur de rôle
const isDev = import.meta.env.DEV;
const showRoleSelector = ref(false);

// Configuration des liens de navigation avec leurs rôles requis
interface NavLink {
  to: string;
  label: string;
  requiredRoutes: string[];
}

const navLinks: NavLink[] = [
  { to: '/user-dashboard', label: 'sidebar.dashboard', requiredRoutes: ['UserDashboard'] },
  { to: '/user-data', label: 'sidebar.myData', requiredRoutes: ['UserData'] },
  { to: '/research', label: 'sidebar.research', requiredRoutes: ['Research'] },
  { to: '/data-management', label: 'sidebar.dataManagement', requiredRoutes: ['DataManagement'] },
  { to: '/scientist-management', label: 'sidebar.scientistManagement', requiredRoutes: ['ScientistManagement'] },
  { to: '/admin-panel', label: 'sidebar.adminPanel', requiredRoutes: ['AdminPanel'] },
  { to: '/user-preferences', label: 'sidebar.preferences', requiredRoutes: ['UserPreferences'] },
  { to: '/user-settings', label: 'sidebar.settings', requiredRoutes: ['UserSettings'] },
];

// Filtrage des liens selon les permissions
const visibleLinks = computed(() => {
  return navLinks.filter(link => {
    return link.requiredRoutes.every(route => permissionsStore.canAccessRoute(route));
  });
});

// Tous les rôles disponibles
const availableRoles = computed(() => permissionsStore.getAllRoles());

// Rôle actuel
const currentRole = computed(() => permissionsStore.currentRole);

// Changer de rôle (seulement en développement)
const changeRole = (role: UserRole) => {
  userStore.setRole(role);
  showRoleSelector.value = false;
};

const handleLogout = () => {
  userStore.logout();
  deleteToken();
  router.push('/');
};
</script>

<template>
  <div class="w-80 min-h-screen bg-[#f7f7f7] dark:bg-gray-800 shadow-2xl flex flex-col py-10 px-6 transition-colors">
    <!-- Logo -->
    <div class="flex items-center gap-3 mb-10">
      <img :src="logo" class="w-12 h-12" alt="Datalyz logo" />
      <h1 class="text-4xl font-light text-amber-500 tracking-wide">Datalyz</h1>
    </div>

    <!-- Badge de rôle et sélecteur (mode dev) -->
    <div v-if="currentRole" class="mb-10">
      <div
        v-if="isDev"
        class="relative"
      >
        <button
          @click="showRoleSelector = !showRoleSelector"
          class="w-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span>{{ t(`permissions.roles.${currentRole}`) }}</span>
          </div>
          <svg class="w-4 h-4" :class="{ 'rotate-180': showRoleSelector }" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Dropdown des rôles -->
        <div
          v-if="showRoleSelector"
          class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-amber-200 dark:border-amber-700 overflow-hidden z-50"
        >
          <button
            v-for="role in availableRoles"
            :key="role"
            @click="changeRole(role)"
            class="w-full px-4 py-3 text-left text-sm hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors"
            :class="currentRole === role ? 'bg-amber-50 dark:bg-gray-600 text-amber-700 dark:text-amber-300 font-semibold' : 'text-gray-700 dark:text-gray-300'"
          >
            {{ t(`permissions.roles.${role}`) }}
          </button>
        </div>
      </div>

      <!-- Badge simple (mode production) -->
      <div
        v-else
        class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
        <span>{{ t(`permissions.roles.${currentRole}`) }}</span>
      </div>
    </div>

    <!-- Menu filtré dynamiquement -->
    <nav class="flex flex-col items-center text-amber-500 font-light text-2xl gap-10">
      <router-link
        v-for="link in visibleLinks"
        :key="link.to"
        :to="link.to"
        class="hover:underline transition-all"
      >
        {{ t(link.label) }}
      </router-link>
    </nav>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Dark Mode Toggle -->
    <div class="flex items-center justify-between px-2 mb-10">
      <div class="flex items-center gap-3">
        <span class="text-4xl">{{ themeStore.isDarkMode ? '&#9728;' : '&#127769;' }}</span>
        <span class="text-gray-600 dark:text-gray-300 text-xl font-light">{{ t('sidebar.darkMode') }}</span>
      </div>

      <button
        @click="themeStore.toggleDarkMode()"
        class="relative w-16 h-8 rounded-full px-1 cursor-pointer transition-colors"
        :class="themeStore.isDarkMode ? 'bg-amber-400' : 'bg-gray-300'"
      >
        <div
          class="absolute top-0.5 w-7 h-7 bg-white rounded-full shadow transition-transform"
          :class="themeStore.isDarkMode ? 'translate-x-8' : 'translate-x-0'"
        ></div>
        <span
          class="absolute text-xs top-2 transition-opacity"
          :class="themeStore.isDarkMode ? 'right-2 text-white' : 'right-2 text-gray-600'"
        >
          {{ themeStore.isDarkMode ? 'ON' : 'OFF' }}
        </span>
      </button>
    </div>

    <!-- Logout Button -->
    <button
      @click="handleLogout"
      class="w-full bg-amber-400 text-white py-4 rounded-xl text-xl font-light flex items-center justify-center gap-3 hover:bg-amber-500 transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      {{ t('sidebar.logout') }}
    </button>
  </div>
</template>
