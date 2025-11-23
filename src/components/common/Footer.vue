<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settingsStore.ts';

const { t, locale: i18nLocale } = useI18n();
const currentYear = new Date().getFullYear();

const settingsStore = useSettingsStore();
const { getDarkMode, getLocale, toggleDarkMode, changeLanguage } = settingsStore;

i18nLocale.value = getLocale().value;

function switchDarkMode(state: boolean) {
  toggleDarkMode(state);
}

function switchLanguage(language: string) {
  changeLanguage(language);
  i18nLocale.value = getLocale().value;
}
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 py-12 px-6 md:px-10">
    <div class="max-w-6xl mx-auto">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <!-- Brand Section -->
        <div class="md:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <img src="@/assets/images/common/logo.webp" alt="Datalyz Logo" class="h-8 w-auto" />
            <span class="text-2xl font-bold text-[#F9AB3B]">Datalyz</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-white mb-4">{{ t('footer.quickLinks') }}</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.home') }}
              </router-link>
            </li>
            <li>
              <router-link to="/our_work" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.ourWork') }}
              </router-link>
            </li>
            <li>
              <router-link to="/get_involved" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.getInvolved') }}
              </router-link>
            </li>
            <li>
              <router-link to="/about_us" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.aboutUs') }}
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.contact') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-bold text-white mb-4">{{ t('footer.legal') }}</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/terms-of-services" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.terms') }}
              </router-link>
            </li>
            <li>
              <router-link to="/privacy-policy" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.privacy') }}
              </router-link>
            </li>
            <li>
              <router-link to="/cookies" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
                {{ t('footer.links.cookies') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Settings -->
        <div>
          <h4 class="font-bold text-white mb-4">{{ t('footer.settings') }}</h4>
          <div class="space-y-4">
            <!-- Dark Mode Toggle -->
            <div>
              <label class="block text-sm text-gray-400 mb-2">{{ t('footer.darkMode') }}</label>
              <div class="flex space-x-2">
                <button
                    @click="switchDarkMode(true)"
                    :class="[
                      'px-3 py-1 rounded text-sm transition-colors',
                      getDarkMode().value
                        ? 'bg-[#F9AB3B] text-white'
                        : 'bg-gray-700 text-gray-400 hover:text-[#F9AB3B]'
                    ]"
                >
                  {{ t('footer.on') }}
                </button>
                <button
                    @click="switchDarkMode(false)"
                    :class="[
                      'px-3 py-1 rounded text-sm transition-colors',
                      !getDarkMode().value
                        ? 'bg-[#F9AB3B] text-white'
                        : 'bg-gray-700 text-gray-400 hover:text-[#F9AB3B]'
                    ]"
                >
                  {{ t('footer.off') }}
                </button>
              </div>
            </div>

            <!-- Language Toggle -->
            <div>
              <label class="block text-sm text-gray-400 mb-2">{{ t('footer.language') }}</label>
              <div class="flex space-x-2">
                <button
                    @click="switchLanguage('fr')"
                    :class="[
                      'px-3 py-1 rounded text-sm transition-colors',
                      getLocale().value === 'fr'
                        ? 'bg-[#F9AB3B] text-white'
                        : 'bg-gray-700 text-gray-400 hover:text-[#F9AB3B]'
                    ]"
                >
                  FR
                </button>
                <button
                    @click="switchLanguage('en')"
                    :class="[
                      'px-3 py-1 rounded text-sm transition-colors',
                      getLocale().value === 'en'
                        ? 'bg-[#F9AB3B] text-white'
                        : 'bg-gray-700 text-gray-400 hover:text-[#F9AB3B]'
                    ]"
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-500 text-sm">
            &copy; {{ currentYear }} Datalyz. {{ t('footer.copyright') }}
          </p>
          <div class="flex space-x-6">
            <a href="https://github.com/EIP-Data" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#F9AB3B] transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
