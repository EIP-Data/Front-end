import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserRole, ProtectedRoute, PermissionsConfig } from '@/types/permissions';

/**
 * Configuration des permissions par rôle
 * Chaque rôle a un ensemble distinct de routes et fonctionnalités
 */
const PERMISSIONS_CONFIG: PermissionsConfig = {
  Administrator: {
    routes: [
      'UserDashboard',
      'UserData',
      'UserPreferences',
      'UserSettings',
      'AdminPanel',
      'Research',
      'DataManagement',
      'Statistics',
      'ScientistManagement',
    ],
    canManageUsers: true,
    canExportData: true,
    canViewAnalytics: true,
  },
  Scientist: {
    routes: ['UserDashboard', 'Research', 'DataManagement', 'Statistics', 'UserPreferences', 'UserSettings'],
    canManageUsers: false,
    canExportData: true,
    canViewAnalytics: true,
  },
  User: {
    routes: ['UserDashboard', 'UserData', 'UserPreferences', 'UserSettings'],
    canManageUsers: false,
    canExportData: false,
    canViewAnalytics: false,
  },
};

/**
 * Store de gestion des permissions utilisateur
 * Persiste le rôle dans localStorage via pinia-plugin-persistedstate
 */
export const usePermissionsStore = defineStore(
  'permissions',
  () => {
    // État
    const currentRole = ref<UserRole | null>(null);

    // Computed
    const isAuthenticated = computed(() => currentRole.value !== null);

    const currentPermissions = computed(() => {
      if (!currentRole.value) return null;
      return PERMISSIONS_CONFIG[currentRole.value];
    });

    const availableRoutes = computed(() => {
      return currentPermissions.value?.routes ?? [];
    });

    // Actions
    const setRole = (role: UserRole | null) => {
      currentRole.value = role;
    };

    const clearRole = () => {
      currentRole.value = null;
    };

    const canAccessRoute = (routeName: string): boolean => {
      if (!currentRole.value) return false;
      return availableRoutes.value.includes(routeName as ProtectedRoute);
    };

    const hasPermission = (permission: keyof Pick<typeof PERMISSIONS_CONFIG.Administrator, 'canManageUsers' | 'canExportData' | 'canViewAnalytics'>): boolean => {
      if (!currentPermissions.value) return false;
      return currentPermissions.value[permission] ?? false;
    };

    const getAllRoles = (): UserRole[] => {
      return ['Administrator', 'Scientist', 'User'];
    };

    return {
      // État
      currentRole,

      // Computed
      isAuthenticated,
      currentPermissions,
      availableRoutes,

      // Actions
      setRole,
      clearRole,
      canAccessRoute,
      hasPermission,
      getAllRoles,
    };
  },
  {
    persist: true, // Persist le store dans localStorage
  }
);
