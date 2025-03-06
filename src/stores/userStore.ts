import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const username = ref<string>('');
    const email = ref<string>('');

    const setInformation = (user: string, email_address: string) => {
        username.value = user;
        email.value = email_address;
    }

    const clearInformation = () => {
        username.value = '';
        email.value = '';
    }

    const setUsername = (user: string) => {
        username.value = user;
    }

    const setEmail = (email_address: string) => {
        email.value = email_address;
    }

    const getUsername = () => {
        return username.value;
    }

    const getEmail = () => {
        return email.value;
    }

    return {
        setInformation,
        clearInformation,
        setUsername,
        setEmail,
        getUsername,
        getEmail,
    }
});
