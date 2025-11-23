<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const people = computed(() => [
  {
    name: 'Cyprien Diedrichs',
    speciality: t('aboutUs.team.members.cyprien.role'),
    image: '/src/assets/images/team/cyprien_diedrichs.jpeg'
  },
  {
    name: 'Côme Terlecki',
    speciality: t('aboutUs.team.members.come.role'),
    image: '/src/assets/images/team/come_terlecki.jpeg'
  },
  {
    name: 'Mathieu Coulet',
    speciality: t('aboutUs.team.members.mathieu.role'),
    image: '/src/assets/images/team/mathieu_coulet.jpeg'
  },
  {
    name: 'Tom Blancheton',
    speciality: t('aboutUs.team.members.tom.role'),
    image: '/src/assets/images/team/tom_blancheton.jpeg'
  }
]);
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-800 py-16">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-[#F9AB3B] mb-4">
          {{ t('home.aboutUs.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('home.aboutUs.description') }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div v-for="person in people" :key="person.name">
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <img :src="person.image" alt="Person picture" class="mx-auto w-40 mb-4 rounded-full"/>
            <h3 class="text-xl font-semibold text-[#F9AB3B] mb-2">{{ person.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ person.speciality }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
