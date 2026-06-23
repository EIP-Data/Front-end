import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface ConsentState {
  data: boolean;
  navigation: boolean;
  history: boolean;
  clicks: boolean;
  scrolls: boolean;
  fullExperience: boolean;
}

export const useConsentsStore = defineStore(
  'consents',
  () => {
    const consents = ref<ConsentState>({
      data: false,
      navigation: false,
      history: false,
      clicks: false,
      scrolls: false,
      fullExperience: false,
    });

    const hasCompletedOnboarding = ref(false);

    const setConsents = (payload: ConsentState) => {
      consents.value = { ...payload };
      hasCompletedOnboarding.value = true;
    };

    const updateConsent = (key: keyof ConsentState, value: boolean) => {
      consents.value[key] = value;
    };

    return { consents, hasCompletedOnboarding, setConsents, updateConsent };
  },
  { persist: true }
);
