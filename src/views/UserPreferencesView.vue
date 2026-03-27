<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import LayoutDashboard from "@/components/common/LayoutDashboard.vue";
import axios from 'axios';

const { t } = useI18n();

// Messages de feedback
const successMessage = ref('');
const errorMessage = ref('');

// Préférences
interface UserPreferences {
  emailNotifications: 'all' | 'important' | 'none';
  dataSharing: 'public' | 'private' | 'anonymous';
  reportFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
}

const preferences = ref<UserPreferences>({
  emailNotifications: 'important',
  dataSharing: 'private',
  reportFrequency: 'weekly'
});

const isLoading = ref(false);
const isSaving = ref(false);

// Charger les préférences au montage
onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('/user/preferences');
    if (response.data) {
      preferences.value = response.data;
    }
  } catch (error: any) {
    console.error('Error loading preferences:', error);
    // Ne pas afficher d'erreur au chargement si les préférences n'existent pas encore
  } finally {
    isLoading.value = false;
  }
});

// Sauvegarder les préférences
const handleSave = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  isSaving.value = true;

  try {
    await axios.put('/user/preferences', preferences.value);
    successMessage.value = t('preferences.saveSuccess');

    // Faire disparaître le message de succès après 5 secondes
    setTimeout(() => {
      successMessage.value = '';
    }, 5000);
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || t('preferences.saveError');
    console.error('Error saving preferences:', error);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <LayoutDashboard>
    <div class="max-w-3xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {{ t('preferences.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ t('preferences.subtitle') }}
        </p>
      </div>

      <!-- Messages de feedback -->
      <div v-if="successMessage"
           class="mb-6 p-4 text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage"
           class="mb-6 p-4 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded">
        {{ errorMessage }}
      </div>

      <!-- Loader pendant le chargement initial -->
      <div v-if="isLoading" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-400 border-r-transparent"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300">{{ t('preferences.loading') }}</p>
      </div>

      <!-- Formulaire de préférences -->
      <form v-else @submit.prevent="handleSave" class="space-y-6">

        <!-- Section Notifications Email -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {{ t('preferences.emailNotifications.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ t('preferences.emailNotifications.description') }}
          </p>

          <div class="space-y-3">
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.emailNotifications"
                type="radio"
                value="all"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.emailNotifications.all') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.emailNotifications.allDescription') }}
                </p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.emailNotifications"
                type="radio"
                value="important"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.emailNotifications.important') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.emailNotifications.importantDescription') }}
                </p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.emailNotifications"
                type="radio"
                value="none"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.emailNotifications.none') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.emailNotifications.noneDescription') }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- Section Partage de données -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {{ t('preferences.dataSharing.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ t('preferences.dataSharing.description') }}
          </p>

          <div class="space-y-3">
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.dataSharing"
                type="radio"
                value="public"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.dataSharing.public') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.dataSharing.publicDescription') }}
                </p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.dataSharing"
                type="radio"
                value="private"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.dataSharing.private') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.dataSharing.privateDescription') }}
                </p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.dataSharing"
                type="radio"
                value="anonymous"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.dataSharing.anonymous') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.dataSharing.anonymousDescription') }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- Section Fréquence des rapports -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {{ t('preferences.reportFrequency.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ t('preferences.reportFrequency.description') }}
          </p>

          <div class="space-y-3">
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.reportFrequency"
                type="radio"
                value="daily"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.reportFrequency.daily') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.reportFrequency.dailyDescription') }}
                </p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.reportFrequency"
                type="radio"
                value="weekly"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.reportFrequency.weekly') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.reportFrequency.weeklyDescription') }}
                </p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.reportFrequency"
                type="radio"
                value="monthly"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.reportFrequency.monthly') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.reportFrequency.monthlyDescription') }}
                </p>
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                v-model="preferences.reportFrequency"
                type="radio"
                value="never"
                class="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-400 focus:ring-2 cursor-pointer"
              />
              <div class="flex-1">
                <span class="text-gray-800 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {{ t('preferences.reportFrequency.never') }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('preferences.reportFrequency.neverDescription') }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- Bouton de sauvegarde -->
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="isSaving"
            class="px-8 py-3 bg-amber-400 text-slate-900 text-lg font-semibold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            <span v-if="!isSaving">{{ t('preferences.saveButton') }}</span>
            <span v-else class="flex items-center gap-2">
              <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-slate-900 border-r-transparent"></span>
              {{ t('preferences.saving') }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </LayoutDashboard>
</template>
