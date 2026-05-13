<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import TeamMember from './TeamMember.vue';
import imgCome from '@/assets/images/team/come_terlecki.jpeg';
import imgMathieu from '@/assets/images/team/mathieu_coulet.jpeg';
import imgCyprien from '@/assets/images/team/cyprien_diedrichs.jpeg';
import imgTom from '@/assets/images/team/tom_blancheton.jpeg';

const { t } = useI18n();

const team = computed(() => [
  {
    name: 'Côme Terlecki',
    role: t('aboutUs.team.members.come.role'),
    description: t('aboutUs.team.members.come.description'),
    image: imgCome
  },
  {
    name: 'Mathieu Coulet',
    role: t('aboutUs.team.members.mathieu.role'),
    description: t('aboutUs.team.members.mathieu.description'),
    image: imgMathieu
  },
  {
    name: 'Cyprien Diedrichs',
    role: t('aboutUs.team.members.cyprien.role'),
    description: t('aboutUs.team.members.cyprien.description'),
    image: imgCyprien
  },
  {
    name: 'Tom Blancheton',
    role: t('aboutUs.team.members.tom.role'),
    description: t('aboutUs.team.members.tom.description'),
    image: imgTom
  }
]);
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 py-16">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {{ t('aboutUs.team.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('aboutUs.team.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <TeamMember
          v-for="member in team"
          :key="member.name"
          :name="member.name"
          :role="member.role"
          :description="member.description"
          :image="member.image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
