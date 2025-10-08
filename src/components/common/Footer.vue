<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settingsStore.ts';

const { t, locale: i18nLocale } = useI18n();
const currentYear = new Date().getFullYear();

const settingsStore = useSettingsStore();
const { getDarkMode, getLocale, toggleDarkMode, changeLanguage } = settingsStore;

i18nLocale.value = getLocale().value;

function switchDarkMode(state) {
  toggleDarkMode(state);
}

function switchLanguage(language) {
  changeLanguage(language);
  i18nLocale.value = getLocale().value;
}
</script>

<template>
  <!--<footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h2 class="text-2xl font-bold text-[#F9AB3B]">Datalyz</h2>
          <p class="mt-4 text-gray-400">
            {{ t('footer.description') }}
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-[#F9AB3B]">{{ t('footer.quickLinks') }}</h3>
          <ul class="mt-4 space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.home') }}</router-link></li>
            <li><router-link to="/services" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.services') }}</router-link></li>
            <li><router-link to="/about" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.about') }}</router-link></li>
            <li><router-link to="/statistics" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.statistics') }}</router-link></li>
            <li><router-link to="/contact" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.contact') }}</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-[#F9AB3B]">{{ t('footer.categories') }}</h3>
          <ul class="mt-4 space-y-2">
            <li><router-link to="/terms-of-services" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.terms') }}</router-link></li>
            <li><router-link to="/" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.visualization') }}</router-link></li>
            <li><router-link to="/" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.machineLearning') }}</router-link></li>
            <li><router-link to="/" class="text-gray-400 hover:text-[#F9AB3B]">{{ t('footer.links.bigData') }}</router-link></li>
          </ul>
        </div>


      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        &copy; {{ currentYear }} Datalyz. {{ t('footer.copyright') }}
      </div>
    </div>
  </footer>-->
  <footer class="bg-gray-900 text-gray-300 py-12 px-6 md:px-10">
    <div class="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
      <div>
        <h4 class="font-bold text-white mb-3">Company</h4>
        <ul class="space-y-2">
          <li>About us</li>
          <li>Blog</li>
          <li>Contact us</li>
          <li>Pricing</li>
          <li>Testimonials</li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-white mb-3">Support</h4>
        <ul class="space-y-2">
          <li>Help center</li>
          <li>Terms of service</li>
          <li>Legal</li>
          <li>Privacy policy</li>
          <li>Status</li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-white mb-3">Stay up to date</h4>
        <div class="flex">
          <input type="email" placeholder="Your email address" class="p-2 rounded-l bg-white text-gray-800 w-full" />
          <button class="bg-datalyz px-4 rounded-r text-white">→</button>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-[#F9AB3B]">{{ t('footer.settings') }}</h3>
          <ul class="mt-4 space-y-2">
            <li>
              <label class="block text-sm text-gray-400 mb-1">{{ t('footer.darkMode') }}</label>
              <div class="flex space-x-2">
                <button
                    @click="switchDarkMode(true)"
                    :class="{ 'text-[#F9AB3B]': getDarkMode().value, 'text-gray-400 cursor-pointer hover:text-[#F9AB3B]': !getDarkMode().value }"
                >
                  {{ t('footer.on') }}
                </button>
                <span class="text-gray-400">/</span>
                <button
                    @click="switchDarkMode(false)"
                    :class="{ 'text-[#F9AB3B]': !getDarkMode().value, 'text-gray-400 cursor-pointer hover:text-[#F9AB3B]': getDarkMode().value }"
                >
                  {{ t('footer.off') }}
                </button>
              </div>
            </li>

            <li>
              <label class="block text-sm text-gray-400 mb-1">{{ t('footer.language') }}</label>
              <div class="flex space-x-2">
                <button
                    @click="switchLanguage('fr')"
                    :class="{ 'text-[#F9AB3B]': getLocale().value === 'fr', 'text-gray-400 cursor-pointer hover:text-[#F9AB3B]': getLocale().value !== 'fr' }"
                >
                  FR
                </button>
                <span class="text-gray-400">/</span>
                <button
                    @click="switchLanguage('en')"
                    :class="{ 'text-[#F9AB3B]': getLocale().value === 'en', 'text-gray-400 cursor-pointer hover:text-[#F9AB3B]': getLocale().value !== 'en' }"
                >
                  EN
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-center text-sm text-gray-500 mt-10">© 2025 Datalyz. All rights reserved.</div>
  </footer>
</template>

<style scoped>
</style>