<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { deleteToken } from '@/client/clientCommon';
import { deleteAccount, forgotPassword } from '@/client/clientAuth';
import LayoutDashboard from '@/components/common/LayoutDashboard.vue';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const passwordResetState = ref<'idle' | 'loading' | 'success' | 'error'>('idle');

const handleChangePassword = async () => {
  passwordResetState.value = 'loading';
  try {
    await forgotPassword({ email: userStore.email });
    passwordResetState.value = 'success';
  } catch {
    passwordResetState.value = 'error';
  }
};

const showDeleteModal = ref(false);
const deleteConfirmInput = ref('');
const isDeleting = ref(false);

const deleteConfirmed = () => deleteConfirmInput.value === userStore.email;

const handleDeleteAccount = async () => {
  if (!deleteConfirmed()) return;
  isDeleting.value = true;
  try {
    await deleteAccount();
    userStore.logout();
    deleteToken();
    router.push('/');
  } catch {
    isDeleting.value = false;
  }
};
</script>

<template>
  <LayoutDashboard>
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {{ t('userSettings.title') }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        {{ t('userSettings.subtitle') }}
      </p>
    </div>

    <div class="flex flex-col gap-6 max-w-3xl">

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-800 dark:text-white mb-4">
          {{ t('userSettings.account.title') }}
        </h2>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {{ t('userSettings.account.email') }}
            </label>
            <p class="text-gray-800 dark:text-white">{{ userStore.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {{ t('userSettings.account.password') }}
            </label>
            <div class="flex items-center gap-3">
              <button
                @click="handleChangePassword"
                :disabled="passwordResetState === 'loading' || passwordResetState === 'success'"
                class="text-sm text-amber-600 dark:text-amber-400 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
              >
                <span v-if="passwordResetState === 'loading'">{{ t('userSettings.account.sendingReset') }}</span>
                <span v-else>{{ t('userSettings.account.changePassword') }}</span>
              </button>
              <span v-if="passwordResetState === 'success'" class="text-sm text-green-600 dark:text-green-400">
                {{ t('userSettings.account.resetEmailSent') }}
              </span>
              <span v-if="passwordResetState === 'error'" class="text-sm text-red-500">
                {{ t('userSettings.account.resetEmailError') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-red-200 dark:border-red-800 p-6">
        <h2 class="text-base font-semibold text-red-600 dark:text-red-400 mb-1">
          {{ t('userSettings.danger.title') }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {{ t('userSettings.danger.subtitle') }}
        </p>

        <div class="flex items-center justify-between gap-4 py-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p class="text-sm font-medium text-gray-800 dark:text-white">
              {{ t('userSettings.danger.deleteAccount') }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ t('userSettings.danger.deleteAccountDesc') }}
            </p>
          </div>
          <button
            @click="showDeleteModal = true"
            class="flex-shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {{ t('userSettings.danger.deleteButton') }}
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          @click.self="showDeleteModal = false"
        >
          <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ t('userSettings.deleteModal.title') }}
              </h3>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {{ t('userSettings.deleteModal.warning') }}
            </p>

            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('userSettings.deleteModal.confirm', { email: userStore.email }) }}
            </label>
            <input
              v-model="deleteConfirmInput"
              type="email"
              :placeholder="userStore.email"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
            />

            <div class="flex gap-3">
              <button
                @click="showDeleteModal = false; deleteConfirmInput = ''"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {{ t('userSettings.deleteModal.cancel') }}
              </button>
              <button
                @click="handleDeleteAccount"
                :disabled="!deleteConfirmed() || isDeleting"
                class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
              >
                {{ isDeleting ? t('userSettings.deleteModal.deleting') : t('userSettings.deleteModal.confirm_button') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </LayoutDashboard>
</template>
