import './assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { configureAxios } from '@/axiosConfiguration'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import fr from './assets/locales/fr.json';
import en from './assets/locales/en.json';
import {createI18n} from "vue-i18n";

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'fr',
    messages: {
        fr,
        en,
    },
});


app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
configureAxios(router);
