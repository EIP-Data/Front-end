import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
    const username = ref<string>('');
    const email = ref<string>('');
    const isAuthenticated = ref<boolean>(false);

    const setInformation = (user: string, email_address: string) => {
        username.value = user;
        email.value = email_address;
    }

    const clearInformation = () => {
        username.value = '';
        email.value = '';
        isAuthenticated.value = false;
    }

    const setUsername = (user: string) => {
        username.value = user;
    }

    const setEmail = (email_address: string) => {
        email.value = email_address;
    }

    const login = (email_address: string) => {
        email.value = email_address;
        isAuthenticated.value = true;
    }

    const logout = () => {
        username.value = '';
        email.value = '';
        isAuthenticated.value = false;
    }

    const getUsername = () => {
        return username.value;
    }

    const getEmail = () => {
        return email.value;
    }

    const getIsAuthenticated = computed(() => isAuthenticated.value);

    return {
        username,
        email,
        isAuthenticated,
        setInformation,
        clearInformation,
        setUsername,
        setEmail,
        login,
        logout,
        getUsername,
        getEmail,
        getIsAuthenticated,
    }
});
