<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import LayoutDashboard from '@/components/common/LayoutDashboard.vue';
import { getAllUsers, promoteUser, demoteUser, deleteAdminUser, type BackendUser } from '@/client/clientAdmin';

const { t } = useI18n();
const router = useRouter();

const users = ref<BackendUser[]>([]);
const isLoading = ref(true);
const loadError = ref('');

const userToDelete = ref<BackendUser | null>(null);
const isDeleting = ref(false);

const actionLoading = ref<Record<number, 'promote' | 'demote' | null>>({});

const stats = computed(() => ({
  total: users.value.length,
  admins: users.value.filter(u => u.role === 'admin').length,
  scientists: users.value.filter(u => u.role === 'scientist').length,
  regularUsers: users.value.filter(u => u.role === 'user').length,
}));

const roleBadgeClass = (role: BackendUser['role']) => {
  switch (role) {
    case 'admin':      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'scientist':  return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    case 'user':       return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
  }
};

const fetchUsers = async () => {
  isLoading.value = true;
  loadError.value = '';
  try {
    users.value = await getAllUsers();
  } catch {
    loadError.value = t('adminPanelView.users.loadError');
  } finally {
    isLoading.value = false;
  }
};

const handlePromote = async (user: BackendUser) => {
  actionLoading.value[user.id] = 'promote';
  try {
    await promoteUser(user.id);
    await fetchUsers();
  } finally {
    actionLoading.value[user.id] = null;
  }
};

const handleDemote = async (user: BackendUser) => {
  actionLoading.value[user.id] = 'demote';
  try {
    await demoteUser(user.id);
    await fetchUsers();
  } finally {
    actionLoading.value[user.id] = null;
  }
};

const handleDelete = async () => {
  if (!userToDelete.value) return;
  isDeleting.value = true;
  try {
    await deleteAdminUser(userToDelete.value.id);
    userToDelete.value = null;
    await fetchUsers();
  } finally {
    isDeleting.value = false;
  }
};

onMounted(fetchUsers);
</script>

<template>
  <LayoutDashboard>
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {{ t('sidebar.adminPanel') }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        {{ t('adminPanelView.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <button
        @click="router.push('/scientist-management')"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4 hover:border-brand dark:hover:border-brand transition-colors text-left"
      >
        <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ t('adminPanelView.actions.scientists') }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('adminPanelView.actions.scientistsDesc') }}</p>
        </div>
      </button>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ stats.total }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('adminPanelView.stats.totalUsers') }}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ stats.scientists }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('adminPanelView.stats.scientists') }}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ stats.regularUsers }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('adminPanelView.stats.regularUsers') }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-base font-semibold text-gray-800 dark:text-white">{{ t('adminPanelView.users.title') }}</h2>
        <button
          @click="fetchUsers"
          class="p-2 text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          :title="t('adminPanelView.users.refresh')"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
      </div>

      <div v-if="isLoading" class="flex items-center justify-center py-16">
        <svg class="animate-spin w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>

      <div v-else-if="loadError" class="flex flex-col items-center justify-center py-16 gap-3">
        <p class="text-sm text-red-500">{{ loadError }}</p>
        <button @click="fetchUsers" class="text-sm text-brand hover:underline">{{ t('adminPanelView.users.retry') }}</button>
      </div>

      <div v-else-if="users.length > 0" class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              <th class="px-6 py-3">{{ t('adminPanelView.users.columns.user') }}</th>
              <th class="px-6 py-3">{{ t('adminPanelView.users.columns.email') }}</th>
              <th class="px-6 py-3">{{ t('adminPanelView.users.columns.role') }}</th>
              <th class="px-6 py-3 text-right">{{ t('adminPanelView.users.columns.actions') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand font-semibold text-sm flex-shrink-0">
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                  <span class="font-medium text-gray-800 dark:text-white">{{ user.username }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="roleBadgeClass(user.role)">
                  {{ t(`permissions.roles.${user.role === 'admin' ? 'Administrator' : user.role === 'scientist' ? 'Scientist' : 'User'}`) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button
                    v-if="user.role !== 'admin'"
                    @click="handlePromote(user)"
                    :disabled="!!actionLoading[user.id]"
                    class="px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :title="t('adminPanelView.users.promote')"
                  >
                    <span v-if="actionLoading[user.id] === 'promote'">...</span>
                    <span v-else>▲ {{ t('adminPanelView.users.promote') }}</span>
                  </button>

                  <button
                    v-if="user.role === 'scientist'"
                    @click="handleDemote(user)"
                    :disabled="!!actionLoading[user.id]"
                    class="px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :title="t('adminPanelView.users.demote')"
                  >
                    <span v-if="actionLoading[user.id] === 'demote'">...</span>
                    <span v-else>▼ {{ t('adminPanelView.users.demote') }}</span>
                  </button>

                  <button
                    v-if="user.role !== 'admin'"
                    @click="userToDelete = user"
                    :disabled="!!actionLoading[user.id]"
                    class="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ t('adminPanelView.users.delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-600">
        <svg class="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <p class="text-sm">{{ t('adminPanelView.overview.empty') }}</p>
      </div>
    </div>

    <Teleport to="body">
      <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-200" leave-to-class="opacity-0">
        <div
          v-if="userToDelete"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          @click.self="userToDelete = null"
        >
          <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('adminPanelView.deleteModal.title') }}</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {{ t('adminPanelView.deleteModal.message', { username: userToDelete.username }) }}
            </p>
            <div class="flex gap-3">
              <button
                @click="userToDelete = null"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {{ t('adminPanelView.deleteModal.cancel') }}
              </button>
              <button
                @click="handleDelete"
                :disabled="isDeleting"
                class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isDeleting ? '...' : t('adminPanelView.deleteModal.confirm') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </LayoutDashboard>
</template>
