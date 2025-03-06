<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isLoggedIn = ref(false);
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div class="container mx-auto px-6 nav-height flex justify-between items-center">
      <router-link to="/" class="flex items-center space-x-2">
        <img src="@/assets/images/common/logo.webp" :alt="t('navbar.company') + ' Logo'" class="h-8 w-auto" />
        <span class="text-2xl font-bold text-[#F9AB3B]">{{ t("navbar.company") }}</span>
      </router-link>

      <div class="md:hidden">
        <button @click="toggleMenu" class="text-gray-700 hover:text-[#F9AB3B] focus:outline-none">
          <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <div class="hidden md:flex flex-1 justify-center space-x-6">
        <router-link to="/" class="text-gray-700 hover:text-[#F9AB3B]">{{ t("navbar.links.home") }}</router-link>
        <router-link to="/services" class="text-gray-700 hover:text-[#F9AB3B]">{{ t("navbar.links.services") }}</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-[#F9AB3B]">{{ t("navbar.links.about") }}</router-link>
        <router-link to="/statistics" class="text-gray-700 hover:text-[#F9AB3B]">{{ t("navbar.links.statistics") }}</router-link>
        <router-link to="/contact" class="text-gray-700 hover:text-[#F9AB3B]">{{ t("navbar.links.contact") }}</router-link>
      </div>

      <div class="hidden md:flex items-center space-x-6">
        <template v-if="!isLoggedIn">
          <router-link to="/login" class="text-gray-700 hover:text-[#F9AB3B]">{{ t("navbar.links.signIn") }}</router-link>
          <router-link
              to="/register"
              class="bg-[#F9AB3B] text-white px-4 py-2 rounded-lg hover:bg-[#e6952e] transition duration-300"
          >
            {{ t("navbar.links.signUp") }}
          </router-link>
        </template>
        <template v-else>
          <router-link
              to="#"
              class="bg-[#F9AB3B] text-white px-4 py-2 rounded-lg hover:bg-[#e6952e] transition duration-300"
          >
            {{ t("navbar.links.dashboard") }}
          </router-link>
        </template>
      </div>
    </div>

    <div
        v-if="isMenuOpen"
        class="md:hidden fixed backdrop-blur-sm bg-opacity-50 z-40"
        @click="toggleMenu"
    ></div>
    <div
        class="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
        :class="{ '-translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }"
    >
      <div class="p-6">
        <router-link to="/" class="block text-gray-700 hover:text-[#F9AB3B] mb-4">{{ t("navbar.links.home") }}</router-link>
        <router-link to="/services" class="block text-gray-700 hover:text-[#F9AB3B] mb-4">{{ t("navbar.links.services") }}</router-link>
        <router-link to="/about" class="block text-gray-700 hover:text-[#F9AB3B] mb-4">{{ t("navbar.links.about") }}</router-link>
        <router-link to="/statistics" class="block text-gray-700 hover:text-[#F9AB3B] mb-4">{{ t("navbar.links.statistics") }}</router-link>
        <router-link to="/contact" class="block text-gray-700 hover:text-[#F9AB3B] mb-4">{{ t("navbar.links.contact") }}</router-link>

        <template v-if="!isLoggedIn">
          <router-link to="/login" class="block text-gray-700 hover:text-[#F9AB3B] mb-4">{{ t("navbar.links.signIn") }}</router-link>
          <router-link
              to="/register"
              class="block bg-[#F9AB3B] text-white px-4 py-2 rounded-lg hover:bg-[#e6952e] transition duration-300"
          >
            {{ t("navbar.links.signUp") }}
          </router-link>
        </template>
        <template v-else>
          <router-link
              to="#"
              class="block bg-[#F9AB3B] text-white px-4 py-2 rounded-lg hover:bg-[#e6952e] transition duration-300"
          >
            {{ t("navbar.links.dashboard") }}
          </router-link>
        </template>
      </div>
    </div>
  </nav>
  <div class="nav-adjustment"></div>
</template>

<style>
.nav-height {
  height: var(--navbar-height);
}

.nav-adjustment {
  padding-top: var(--navbar-height);
}
</style>
