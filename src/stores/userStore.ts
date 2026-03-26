import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserRole } from '@/types/permissions';
import { usePermissionsStore } from './permissionsStore';

export const useUserStore = defineStore('user', () => {
    const username = ref<string>('');
    const email = ref<string>('');
    const role = ref<UserRole | null>(null);
    const isAuthenticated = ref<boolean>(false);

    const setInformation = (user: string, email_address: string) => {
        username.value = user;
        email.value = email_address;
    }

    const clearInformation = () => {
        username.value = '';
        email.value = '';
        role.value = null;
        isAuthenticated.value = false;

        // Synchroniser avec permissionsStore
        const permissionsStore = usePermissionsStore();
        permissionsStore.clearRole();
    }

    const setUsername = (user: string) => {
        username.value = user;
    }

    const setEmail = (email_address: string) => {
        email.value = email_address;
    }

    const login = (email_address: string, userRole?: UserRole) => {
        email.value = email_address;
        isAuthenticated.value = true;

        // Si un rôle est fourni (futur: depuis le backend), le définir
        if (userRole) {
            role.value = userRole;
            const permissionsStore = usePermissionsStore();
            permissionsStore.setRole(userRole);
        }
    }

    const logout = () => {
        username.value = '';
        email.value = '';
        role.value = null;
        isAuthenticated.value = false;

        // Synchroniser avec permissionsStore
        const permissionsStore = usePermissionsStore();
        permissionsStore.clearRole();
    }

    const getUsername = () => {
        return username.value;
    }

    const getEmail = () => {
        return email.value;
    }

    const getIsAuthenticated = computed(() => isAuthenticated.value);

    const getRole = () => {
        return role.value;
    };

    const setRole = (userRole: UserRole | null) => {
        role.value = userRole;
        const permissionsStore = usePermissionsStore();
        permissionsStore.setRole(userRole);
    };

    return {
        username,
        email,
        role,
        isAuthenticated,
        setInformation,
        clearInformation,
        setUsername,
        setEmail,
        setRole,
        login,
        logout,
        getUsername,
        getEmail,
        getRole,
        getIsAuthenticated,
    }
});
