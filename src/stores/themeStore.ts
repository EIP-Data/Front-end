import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDarkMode = ref<boolean>(false);

    // Initialize from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        isDarkMode.value = savedTheme === 'true';
    }

    // Apply theme class to document
    const applyTheme = () => {
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Watch for changes and persist
    watch(isDarkMode, (newValue) => {
        localStorage.setItem('darkMode', String(newValue));
        applyTheme();
    }, { immediate: true });

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
    };

    return {
        isDarkMode,
        toggleDarkMode,
        applyTheme,
    };
});
