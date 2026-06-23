<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

export interface ConsentPayload {
  data: boolean;
  navigation: boolean;
  history: boolean;
  clicks: boolean;
  scrolls: boolean;
  fullExperience: boolean;
}

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'complete', payload: ConsentPayload): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const currentStep = ref(0);
const consents = ref<ConsentPayload>({
  data: false,
  navigation: false,
  history: false,
  clicks: false,
  scrolls: false,
  fullExperience: false,
});

const consentKeys = ['data', 'navigation', 'history', 'clicks', 'scrolls', 'fullExperience'] as const;
const totalSteps = consentKeys.length;

const currentConsentKey = computed(() => consentKeys[currentStep.value]);
const currentConsent = computed({
  get: () => consents.value[currentConsentKey.value],
  set: (value: boolean) => {
    consents.value[currentConsentKey.value] = value;
  },
});

const progressPercentage = computed(() => ((currentStep.value + 1) / totalSteps) * 100);

const handleNext = () => {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  } else {
    handleFinish();
  }
};

const handleSkip = () => {
  currentConsent.value = false;
  handleNext();
};

const handleFinish = () => {
  emit('complete', consents.value);
  emit('update:modelValue', false);
};

const closeModal = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="props.modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        @click.self="closeModal"
      >
        <Transition name="modal-slide" mode="out-in">
          <div
            :key="currentStep"
            class="relative w-full max-w-2xl bg-white dark:bg-slate-800 shadow-2xl overflow-hidden"
          >
            <!-- Progress Bar -->
            <div class="h-1.5 bg-gray-200 dark:bg-slate-700">
              <div
                class="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ease-out"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>

            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Modal Content -->
            <div class="p-8 md:p-12">
              <!-- Step Indicator -->
              <div class="text-sm font-medium text-amber-500 dark:text-amber-400 mb-2">
                {{ t('onboarding.step') }} {{ currentStep + 1 }} {{ t('onboarding.of') }} {{ totalSteps }}
              </div>

              <!-- Title -->
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                {{ t(`onboarding.consents.${currentConsentKey}.title`) }}
              </h2>

              <!-- Description -->
              <p class="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {{ t(`onboarding.consents.${currentConsentKey}.description`) }}
              </p>

              <!-- Benefit Box -->
              <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 mb-8">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-amber-500 dark:text-amber-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  <div>
                    <p class="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                      How this helps our research:
                    </p>
                    <p class="text-sm text-amber-800 dark:text-amber-300">
                      {{ t(`onboarding.consents.${currentConsentKey}.benefit`) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Consent Checkbox -->
              <div class="mb-8">
                <label class="flex items-start gap-4 cursor-pointer group">
                  <div class="relative flex items-center justify-center">
                    <input
                      v-model="currentConsent"
                      type="checkbox"
                      class="peer h-6 w-6 cursor-pointer appearance-none border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 checked:bg-amber-500 checked:border-amber-500 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all"
                    />
                    <svg
                      class="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-base text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    {{ currentConsent ? t('onboarding.consent.agree') : t('onboarding.consent.disagree') }}
                  </span>
                </label>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="handleSkip"
                  class="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:border-gray-400 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
                >
                  {{ t('onboarding.skip') }}
                </button>
                <button
                  @click="handleNext"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold hover:from-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  {{ currentStep === totalSteps - 1 ? t('onboarding.finish') : t('onboarding.next') }}
                </button>
              </div>
            </div>

            <!-- Step Dots -->
            <div class="flex justify-center gap-2 pb-6">
              <div
                v-for="(_, index) in consentKeys"
                :key="index"
                class="h-2 rounded-full transition-all duration-300"
                :class="[
                  index === currentStep
                    ? 'w-8 bg-amber-500'
                    : index < currentStep
                    ? 'w-2 bg-amber-400'
                    : 'w-2 bg-gray-300 dark:bg-slate-600'
                ]"
              ></div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.modal-slide-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.95);
}

.modal-slide-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.95);
}
</style>
