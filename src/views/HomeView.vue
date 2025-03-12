<script setup lang="ts">
import { useI18n } from "vue-i18n";
import HeroBanner from "@/components/home/HeroBanner.vue";
import HowTo from "@/components/home/HowTo.vue";
import TheTeam from "@/components/home/TheTeam.vue";
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import DatalyzBanner from "@/components/common/DatalyzBanner.vue";

const { t } = useI18n();
</script>

<template>
  <LayoutShowcase>
    <HeroBanner class="dark:bg-gray-800">
      <template v-slot:title>{{ $t('home.heroBanner.title') }}</template>
      <template v-slot:paragraph>{{ $t('home.heroBanner.paragraph') }}</template>
      <template v-slot:call-to-action>
        <router-link
            to="/register"
            class="bg-[#F9AB3B] text-white px-8 py-3 rounded-lg hover:bg-[#e6952e] transition duration-300"
        >
          {{ $t('home.heroBanner.getStarted') }}
        </router-link>
        <router-link
            to="/"
            class="bg-white text-[#F9AB3B] px-8 py-3 rounded-lg border border-[#F9AB3B] hover:bg-gray-100 transition duration-300"
        >
          {{ $t('home.heroBanner.learnMore') }}
        </router-link>
      </template>
    </HeroBanner>

    <section class="bg-white dark:bg-gray-900 px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-[#F9AB3B] mb-4">
          {{ $t('home.coreFeatures.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ $t('home.coreFeatures.description') }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <img src="@/assets/images/home/collect_data.png" alt="Data Collection" class="mx-auto w-40 <mb-4 rounded" />
          <h3 class="text-xl font-semibold text-[#F9AB3B] mb-2">{{ $t('home.coreFeatures.features.dataCollection.title') }}</h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('home.coreFeatures.features.dataCollection.description') }}
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <img src="@/assets/images/home/analyze_data.png" alt="Data Analysis" class="mx-auto w-40 mb-4 rounded" />
          <h3 class="text-xl font-semibold text-[#F9AB3B] mb-2">{{ $t('home.coreFeatures.features.dataAnalysis.title') }}</h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('home.coreFeatures.features.dataAnalysis.description') }}
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <img src="@/assets/images/home/visualize_data.png" alt="Data Visualization" class="mx-auto w-40 mb-4 rounded" />
          <h3 class="text-xl font-semibold text-[#F9AB3B] mb-2">{{ $t('home.coreFeatures.features.dataVisualization.title') }}</h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('home.coreFeatures.features.dataVisualization.description') }}
          </p>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 dark:bg-gray-800 py-16">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-[#F9AB3B] mb-4">
            {{ $t('home.researchGoal.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('home.researchGoal.description') }}
          </p>
        </div>
        <div class="max-w-2xl mx-auto text-center">
          <p v-for="i in 2" :key="i" class="text-gray-600 dark:text-gray-300 mb-6">
            {{ $t(`home.researchGoal.contentList.content${i}`) }}
          </p>
        </div>
      </div>
    </section>

    <HowTo />
    <TheTeam />
    <DatalyzBanner>
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          {{ $t('home.ctaBanner.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('home.ctaBanner.description') }}
        </p>
        <router-link
            to="/register"
            class="bg-[#F9AB3B] text-white px-8 py-3 rounded-lg hover:bg-[#e6952e] transition duration-300"
        >
          {{ $t('home.ctaBanner.getStarted') }}
        </router-link>
      </div>
    </DatalyzBanner>
  </LayoutShowcase>
</template>

<style>
</style>