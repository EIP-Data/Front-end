<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const activeStep = ref(1);

const toggleStep = (step: number) => {
  activeStep.value = step;
};

const steps = computed(() => [
  {
    id: 1,
    title: t("home.process.steps[0].title"),
    description: t("home.process.steps[0].description"),
    videoUrl: t("home.process.steps[0].videoUrl")
  },
  {
    id: 2,
    title: t("home.process.steps[1].title"),
    description: t("home.process.steps[1].description"),
    videoUrl: t("home.process.steps[1].videoUrl")
  },
  {
    id: 3,
    title: t("home.process.steps[2].title"),
    description: t("home.process.steps[2].description"),
    videoUrl: t("home.process.steps[2].videoUrl")
  },
  {
    id: 4,
    title: t("home.process.steps[3].title"),
    description: t("home.process.steps[3].description"),
    videoUrl: t("home.process.steps[3].videoUrl")
  }
]);

const videoIframe = ref<HTMLIFrameElement | null>(null);

const nextStep = () => {
  if (activeStep.value < steps.value.length) {
    activeStep.value += 1;
  } else {
    activeStep.value = 1;
  }
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const iframe = videoIframe.value;
  if (iframe) {
    observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const src = iframe.src;
              if (!src.includes("autoplay=1")) {
                iframe.src = `${src}?autoplay=1&mute=1`;
              }
            }
          });
        },
        { threshold: 0.5 }
    );

    observer.observe(iframe);

    iframe.addEventListener("load", () => {
      const player = iframe.contentWindow?.postMessage;
      if (player) {
        player(
            JSON.stringify({
              event: "command",
              func: "addEventListener",
              args: ["onStateChange", nextStep],
            }),
            "*"
        );
      }
    });
  }
});

onUnmounted(() => {
  if (observer && videoIframe.value) {
    observer.unobserve(videoIframe.value);
  }
});
</script>

<template>
  <section class="px-6 py-16 bg-white dark:bg-gray-900">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-[#F9AB3B] dark:text-[#F9AB3B] mb-4">
        {{ t("home.process.title") }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t("home.process.description") }}
      </p>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/2">
        <div
            v-for="step in steps"
            :key="step.id"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer"
            :class="{
          'border-l-4 border-[#F9AB3B]': activeStep === step.id,
          'rounded-t-none': step.id !== 1,
          'rounded-b-none': step.id !== steps.length
        }"
            @click="toggleStep(step.id)"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-[#F9AB3B] dark:text-[#F9AB3B]">
              {{ step.title }}
            </h3>
            <span class="text-gray-600 dark:text-gray-300">{{ step.id }}</span>
          </div>
          <p v-if="activeStep === step.id" class="text-gray-600 dark:text-gray-300 mt-4">
            {{ step.description }}
          </p>
        </div>
      </div>

      <div class="w-full md:w-1/2">
        <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <iframe
              ref="videoIframe"
              :src="steps.find(step => step.id === activeStep)?.videoUrl"
              class="w-full h-64 md:h-96 rounded-lg"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
