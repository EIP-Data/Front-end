<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LayoutDashboard from '@/components/common/LayoutDashboard.vue';

const { t } = useI18n();

// État de la modal d'ajout
const isModalOpen = ref(false);
const newScientistUsername = ref('');
const newScientistEmail = ref('');
const usernameError = ref('');
const emailError = ref('');

// État de la modal de suppression
const isDeleteModalOpen = ref(false);
const scientistToDelete = ref<Scientist | null>(null);

// Interface pour un scientifique
interface Scientist {
  id: number;
  username: string;
  email: string;
  registrationDate: string;
}

// Données mockées
const scientists = ref<Scientist[]>([
  {
    id: 1,
    username: 'dr.smith',
    email: 'john.smith@research.org',
    registrationDate: '2024-01-15',
  },
  {
    id: 2,
    username: 'marie.curie',
    email: 'marie.curie@science.edu',
    registrationDate: '2024-02-20',
  },
  {
    id: 3,
    username: 'alan.turing',
    email: 'a.turing@computing.ac.uk',
    registrationDate: '2024-03-10',
  },
  {
    id: 4,
    username: 'ada.lovelace',
    email: 'ada.lovelace@algorithm.com',
    registrationDate: '2024-04-05',
  },
]);

// Ouvrir la modal d'ajout
const openModal = () => {
  isModalOpen.value = true;
  newScientistUsername.value = '';
  newScientistEmail.value = '';
  usernameError.value = '';
  emailError.value = '';
};

// Fermer la modal d'ajout
const closeModal = () => {
  isModalOpen.value = false;
  newScientistUsername.value = '';
  newScientistEmail.value = '';
  usernameError.value = '';
  emailError.value = '';
};

// Validation username
const validateUsername = (username: string): boolean => {
  // Min 3 caractères, alphanumérique avec points, underscores et tirets
  const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
  return usernameRegex.test(username);
};

// Validation email simple
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Soumettre le formulaire d'ajout
const handleSubmit = () => {
  // Reset des erreurs
  usernameError.value = '';
  emailError.value = '';

  // Validation username
  if (!newScientistUsername.value) {
    usernameError.value = t('scientistManagement.errors.usernameRequired');
    return;
  }

  if (!validateUsername(newScientistUsername.value)) {
    usernameError.value = t('scientistManagement.errors.usernameInvalid');
    return;
  }

  // Validation email
  if (!newScientistEmail.value) {
    emailError.value = t('scientistManagement.errors.emailRequired');
    return;
  }

  if (!validateEmail(newScientistEmail.value)) {
    emailError.value = t('scientistManagement.errors.emailInvalid');
    return;
  }

  // Pour l'instant, juste log dans la console
  console.log('New scientist:', {
    username: newScientistUsername.value,
    email: newScientistEmail.value,
  });

  // TODO: Appel API backend pour ajouter le scientifique
  // await addScientist({ username: newScientistUsername.value, email: newScientistEmail.value });

  // Fermer la modal
  closeModal();
};

// Ouvrir la modal de suppression
const openDeleteModal = (scientist: Scientist) => {
  scientistToDelete.value = scientist;
  isDeleteModalOpen.value = true;
};

// Fermer la modal de suppression
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  scientistToDelete.value = null;
};

// Confirmer la suppression
const confirmDelete = () => {
  if (scientistToDelete.value) {
    const index = scientists.value.findIndex(s => s.id === scientistToDelete.value!.id);
    if (index !== -1) {
      scientists.value.splice(index, 1);
      console.log('Scientist deleted:', scientistToDelete.value.username);

      // TODO: Appel API backend pour supprimer le scientifique
      // await deleteScientist(scientistToDelete.value.id);
    }
  }
  closeDeleteModal();
};
</script>

<template>
  <LayoutDashboard>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 transition-colors">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-semibold text-slate-800 dark:text-white mb-2">
            {{ t('scientistManagement.title') }}
          </h1>
          <p class="text-lg text-slate-600 dark:text-gray-300">
            {{ t('scientistManagement.subtitle') }}
          </p>
        </div>
        <button
          @click="openModal"
          class="bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ t('scientistManagement.addButton') }}
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b-2 border-gray-200 dark:border-gray-700">
              <th class="text-left py-4 px-6 text-slate-700 dark:text-gray-300 font-semibold">
                {{ t('scientistManagement.table.username') }}
              </th>
              <th class="text-left py-4 px-6 text-slate-700 dark:text-gray-300 font-semibold">
                {{ t('scientistManagement.table.email') }}
              </th>
              <th class="text-left py-4 px-6 text-slate-700 dark:text-gray-300 font-semibold">
                {{ t('scientistManagement.table.registrationDate') }}
              </th>
              <th class="text-right py-4 px-6 text-slate-700 dark:text-gray-300 font-semibold">
                {{ t('scientistManagement.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="scientist in scientists"
              :key="scientist.id"
              class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td class="py-4 px-6 text-slate-800 dark:text-gray-200">
                {{ scientist.username }}
              </td>
              <td class="py-4 px-6 text-slate-600 dark:text-gray-400">
                {{ scientist.email }}
              </td>
              <td class="py-4 px-6 text-slate-600 dark:text-gray-400">
                {{ new Date(scientist.registrationDate).toLocaleDateString() }}
              </td>
              <td class="py-4 px-6 text-right">
                <button
                  @click="openDeleteModal(scientist)"
                  class="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  :title="t('scientistManagement.deleteModal.title')"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty state -->
        <div
          v-if="scientists.length === 0"
          class="text-center py-12 text-slate-500 dark:text-gray-400"
        >
          {{ t('scientistManagement.noScientists') }}
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click.self="closeModal"
        >
          <Transition
            enter-active-class="transition-all duration-300"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isModalOpen"
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <!-- Modal Header -->
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">
                  {{ t('scientistManagement.modal.title') }}
                </h2>
                <button
                  @click="closeModal"
                  class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Body -->
              <form @submit.prevent="handleSubmit">
                <!-- Username Field -->
                <div class="mb-6">
                  <label
                    for="scientist-username"
                    class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                  >
                    {{ t('scientistManagement.modal.usernameLabel') }}
                  </label>
                  <input
                    id="scientist-username"
                    v-model="newScientistUsername"
                    type="text"
                    :placeholder="t('scientistManagement.modal.usernamePlaceholder')"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': usernameError }"
                  />
                  <p
                    v-if="usernameError"
                    class="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {{ usernameError }}
                  </p>
                </div>

                <!-- Email Field -->
                <div class="mb-6">
                  <label
                    for="scientist-email"
                    class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                  >
                    {{ t('scientistManagement.modal.emailLabel') }}
                  </label>
                  <input
                    id="scientist-email"
                    v-model="newScientistEmail"
                    type="email"
                    :placeholder="t('scientistManagement.modal.emailPlaceholder')"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': emailError }"
                  />
                  <p
                    v-if="emailError"
                    class="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {{ emailError }}
                  </p>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-5 py-2.5 text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                  >
                    {{ t('scientistManagement.modal.cancelButton') }}
                  </button>
                  <button
                    type="submit"
                    class="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg font-semibold transition-colors"
                  >
                    {{ t('scientistManagement.modal.submitButton') }}
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isDeleteModalOpen"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click.self="closeDeleteModal"
        >
          <Transition
            enter-active-class="transition-all duration-300"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isDeleteModalOpen"
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <!-- Modal Header -->
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">
                  {{ t('scientistManagement.deleteModal.title') }}
                </h2>
                <button
                  @click="closeDeleteModal"
                  class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Body -->
              <div class="mb-8">
                <p class="text-slate-600 dark:text-gray-300 text-lg">
                  {{ t('scientistManagement.deleteModal.message', { username: scientistToDelete?.username || '' }) }}
                </p>
              </div>

              <!-- Modal Footer -->
              <div class="flex items-center justify-end gap-3">
                <button
                  type="button"
                  @click="closeDeleteModal"
                  class="px-5 py-2.5 text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  {{ t('scientistManagement.deleteModal.cancelButton') }}
                </button>
                <button
                  type="button"
                  @click="confirmDelete"
                  class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {{ t('scientistManagement.deleteModal.confirmButton') }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </LayoutDashboard>
</template>
