import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
    const isDarkMode = ref<boolean>(
        localStorage.getItem('darkMode') !== null
            ? localStorage.getItem('darkMode') === 'true'
            : window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    watch(isDarkMode, (value) => {
        value
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', value.toString());
    }, { immediate: true });

    const toggleDarkMode = (state?: boolean) => {
        isDarkMode.value = state !== undefined ? state : !isDarkMode.value;
    };

    const locale = ref<string>(
        localStorage.getItem('locale') || navigator.language.split('-')[0] || 'en'
    );

    const changeLanguage = (lang: string) => {
        locale.value = lang;
        localStorage.setItem('locale', lang);
    };

    return {
        isDarkMode,
        locale,
        toggleDarkMode,
        changeLanguage,
    };
});
