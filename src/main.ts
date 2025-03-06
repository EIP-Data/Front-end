import './assets/css/style.css'
import 'aos/dist/aos.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { configureAxios } from '@/axiosConfiguration'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import fr from './assets/locales/fr.json';
import en from './assets/locales/en.json';
import {createI18n} from "vue-i18n";
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import VueApexCharts from "vue3-apexcharts";


const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
    legacy: false,
    fallbackLocale: 'en',
    messages: {
        fr,
        en,
    },
});


app.use(router);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(i18n);
app.use(AOS.init());
app.use(VueApexCharts);

app.mount('#app');
configureAxios(router);
