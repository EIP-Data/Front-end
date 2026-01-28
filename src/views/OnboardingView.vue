<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import OnboardingModals from '@/components/common/OnboardingModals.vue';
import type { ConsentPayload } from '@/components/common/OnboardingModals.vue';
// import axios from 'axios'; // À décommenter quand l'endpoint API sera prêt

const { t } = useI18n();
const router = useRouter();

const showModal = ref(false);

onMounted(() => {
  // Afficher la modale dès le montage du composant
  showModal.value = true;
});

const handleComplete = async (payload: ConsentPayload) => {
  console.log('Consent payload:', payload);

  // Préparer le payload pour le serveur
  const consentData = {
    shareData: payload.data,
    shareNavigation: payload.navigation,
    shareHistory: payload.history,
    shareClicks: payload.clicks,
    shareScrolls: payload.scrolls,
    shareFullExperience: payload.fullExperience,
  };

  try {
    // Envoyer les consentements au serveur
    // Décommente et adapte cette ligne quand l'endpoint sera prêt
    // await axios.post('/api/user/consents', consentData);

    console.log('Consents to send to server:', consentData);

    // Rediriger vers le dashboard
    router.push('/user-dashboard');
  } catch (error) {
    console.error('Failed to save consents:', error);
    // En cas d'erreur, on redirige quand même vers le dashboard
    router.push('/user-dashboard');
  }
};

// Si l'utilisateur ferme la modale sans terminer, on le redirige quand même
const handleModalClose = () => {
  router.push('/user-dashboard');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
    <div class="text-center max-w-2xl">
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          {{ t('onboarding.title') }}
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          {{ t('onboarding.subtitle') }}
        </p>
      </div>

      <!-- Illustration ou animation optionnelle -->
      <div class="flex justify-center mb-8">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg animate-pulse">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
      </div>
    </div>

    <OnboardingModals
      v-model="showModal"
      @complete="handleComplete"
      @update:model-value="handleModalClose"
    />
  </div>
</template>
