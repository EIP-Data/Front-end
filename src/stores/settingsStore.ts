import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
    const isDarkMode = ref<boolean>(
        localStorage.getItem('darkMode') !== null ? localStorage.getItem('darkMode') === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    const setDarkMode = () => {
        isDarkMode.value ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    }

    const toggleDarkMode = (state: boolean) => {
        isDarkMode.value = state;
        setDarkMode();
        localStorage.setItem('darkMode', isDarkMode.value.toString());
    };

    const locale = ref<string>(localStorage.getItem('locale') || navigator.language.split('-')[0] || 'en');

    const changeLanguage = (lang: string) => {
        locale.value = lang;
        localStorage.setItem('locale', lang);
    };

    const getDarkMode = () => {
        return isDarkMode;
    }

    const getLocale = () =>  {
        return locale;
    }

    return {
        isDarkMode,
        locale,
        setDarkMode,
        toggleDarkMode,
        getDarkMode,
        getLocale,
        changeLanguage,
    };
});