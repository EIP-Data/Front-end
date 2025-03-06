<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Hero from "@/components/common/Hero.vue";
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";

const { t } = useI18n();

const name = ref('');
const email = ref('');
const message = ref('');

const submitForm = () => {
  if (!name.value || !email.value || !message.value) {
    alert(t('contact.form.alert.emptyFields'));
    return;
  }

  console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });

  name.value = '';
  email.value = '';
  message.value = '';

  alert(t('contact.form.alert.success'));
};
</script>


<template>
  <LayoutShowcase>
    <Hero class="dark:bg-gray-900">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-[#F9AB3B] dark:text-[#F9AB3B] mb-4">
            {{ t('contact.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('contact.description') }}
          </p>
        </div>

        <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <form @submit.prevent="submitForm">
            <div class="mb-6">
              <label for="name" class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                {{ t('contact.form.name') }}
              </label>
              <input
                  type="text"
                  id="name"
                  v-model="name"
                  :placeholder="t('contact.form.placeholder.name')"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9AB3B] bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  required
              />
            </div>

            <div class="mb-6">
              <label for="email" class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                {{ t('contact.form.email') }}
              </label>
              <input
                  type="email"
                  id="email"
                  v-model="email"
                  :placeholder="t('contact.form.placeholder.email')"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9AB3B] bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  required
              />
            </div>

            <div class="mb-6">
              <label for="message" class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                {{ t('contact.form.message') }}
              </label>
              <textarea
                  id="message"
                  v-model="message"
                  :placeholder="t('contact.form.placeholder.message')"
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9AB3B] bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  required
              ></textarea>
            </div>

            <div class="text-center">
              <button
                  type="submit"
                  class="bg-[#F9AB3B] text-white px-6 py-3 rounded-lg hover:bg-[#e6952e] transition duration-300"
              >
                {{ t('contact.form.submit') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Hero>
  </LayoutShowcase>
</template>


<style scoped>
</style>