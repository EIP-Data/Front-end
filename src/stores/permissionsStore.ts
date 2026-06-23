import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserRole, ProtectedRoute, PermissionsConfig } from '@/types/permissions';

const PERMISSIONS_CONFIG: PermissionsConfig = {
  Administrator: {
    routes: [
      'UserDashboard',
      'UserData',
      'UserPreferences',
      'UserSettings',
      'VpnInstallation',
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
    routes: ['UserDashboard', 'Research', 'DataManagement', 'Statistics', 'UserPreferences', 'UserSettings', 'VpnInstallation'],
    canManageUsers: false,
    canExportData: true,
    canViewAnalytics: true,
  },
  User: {
    routes: ['UserDashboard', 'UserData', 'UserPreferences', 'UserSettings', 'VpnInstallation'],
    canManageUsers: false,
    canExportData: false,
    canViewAnalytics: false,
  },
};

export const usePermissionsStore = defineStore(
  'permissions',
  () => {
    const currentRole = ref<UserRole | null>(null);

    const isAuthenticated = computed(() => currentRole.value !== null);

    const currentPermissions = computed(() => {
      if (!currentRole.value) return null;
      return PERMISSIONS_CONFIG[currentRole.value];
    });

    const availableRoutes = computed(() => {
      return currentPermissions.value?.routes ?? [];
    });

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
      currentRole,
      isAuthenticated,
      currentPermissions,
      availableRoutes,
      setRole,
      clearRole,
      canAccessRoute,
      hasPermission,
      getAllRoles,
    };
  },
  {
    persist: true,
  }
);
