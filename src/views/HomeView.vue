<script setup lang="ts">
import HeroBanner from "@/components/home/HeroBanner.vue";
import LayoutShowcase from "@/components/common/LayoutShowcase.vue";
import DatalyzBanner from "@/components/common/DatalyzBanner.vue";
import Purpose from "@/components/home/Purpose.vue";
import Research from "@/components/home/Research.vue";
import FilterYourData from "@/components/home/FilterYourData.vue";
import Testimonial from "@/components/home/Testimonial.vue";
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
            class="bg-white dark:bg-gray-700 text-[#F9AB3B] px-8 py-3 rounded-lg border border-[#F9AB3B] hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
        >
          {{ $t('home.heroBanner.learnMore') }}
        </router-link>
      </template>
    </HeroBanner>

    <Purpose/>

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

    <Research/>
    <FilterYourData/>
    <Testimonial/>
  </LayoutShowcase>
</template>

<style>
</style>