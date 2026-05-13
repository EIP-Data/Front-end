<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { usePermissionsStore } from '@/stores/permissionsStore';
import { useBrandStore } from '@/stores/brandStore';
import { deleteToken } from '@/client/clientCommon';
import logo from '@/assets/images/common/logo.webp';
const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const permissionsStore = usePermissionsStore();
const brandStore = useBrandStore();


interface MenuItem {
  label: string;
  route?: string;
  requiredRoute?: string;
  children?: MenuItem[];
}

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: []
}>();

const expandedCategory = ref<string | null>(null);

const menuItems: MenuItem[] = [
  {
    label: t('sidebar.categories.overview'),
    children: [
      { label: t('sidebar.dashboard'), route: '/user-dashboard', requiredRoute: 'UserDashboard' }
    ]
  },
  {
    label: t('sidebar.categories.dataManagement'),
    children: [
      { label: t('sidebar.myData'),         route: '/user-data',       requiredRoute: 'UserData' },
      { label: t('sidebar.research'),       route: '/research',        requiredRoute: 'Research' },
      { label: t('sidebar.dataManagement'), route: '/data-management', requiredRoute: 'DataManagement' },
    ]
  },
  {
    label: t('sidebar.categories.administration'),
    children: [
      { label: t('sidebar.adminPanel'), route: '/admin-panel', requiredRoute: 'AdminPanel' },
    ]
  },
  {
    label: t('sidebar.categories.userSettings'),
    children: [
      { label: t('sidebar.preferences'),      route: '/user-preferences',   requiredRoute: 'UserPreferences' },
      { label: t('sidebar.settings'),         route: '/user-settings',      requiredRoute: 'UserSettings' },
      { label: t('sidebar.vpnInstallation'),  route: '/vpn-installation',   requiredRoute: 'VpnInstallation' },
    ]
  }
];

const filteredMenuItems = computed(() => {
  return menuItems
    .map(category => ({
      ...category,
      children: category.children?.filter(item =>
        !item.requiredRoute || permissionsStore.canAccessRoute(item.requiredRoute)
      )
    }))
    .filter(category => category.children && category.children.length > 0)
});

const toggleCategory = (categoryLabel: string) => {
  if (expandedCategory.value === categoryLabel) {
    expandedCategory.value = null;
  } else {
    expandedCategory.value = categoryLabel;
  }
};

const handleLogout = () => {
  userStore.logout();
  deleteToken();
  router.push('/');
  emit('close');
};

const navigateTo = (route: string) => {
  router.push(route);
  emit('close');
};
</script>

<template>
  <div
    v-if="isOpen"
    @click="emit('close')"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
  ></div>

  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-80 h-screen bg-[#f7f7f7] dark:bg-gray-800 shadow-2xl flex flex-col py-10 px-6 transition-all duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <button
      @click="emit('close')"
      class="lg:hidden absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-brand transition-colors"
      :aria-label="t('sidebar.close')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <div class="flex items-center gap-3 mb-12">
      <img :src="logo" class="w-12 h-12" :alt="brandStore.appName + ' logo'" />
      <h1 class="text-4xl font-light text-brand tracking-wide">{{ brandStore.appName }}</h1>
    </div>

    <nav class="flex flex-col gap-6 flex-1 overflow-y-auto mb-8">
      <div
          v-for="category in filteredMenuItems"
          :key="category.label"
          class="border-b border-gray-300 dark:border-gray-700 pb-4"
      >
        <button
            @click="toggleCategory(category.label)"
            class="w-full flex items-center justify-between text-gray-700 dark:text-gray-300 font-medium text-lg mb-3 hover:text-brand transition-colors"
        >
          <span>{{ category.label }}</span>
          <svg
              class="w-5 h-5 transition-transform"
              :class="expandedCategory === category.label ? 'rotate-180' : ''"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
        >
          <div
              v-if="expandedCategory === category.label && category.children"
              class="flex flex-col gap-2 ml-4 overflow-hidden"
          >
            <button
                v-for="item in category.children"
                :key="item.route"
                @click="item.route && navigateTo(item.route)"
                class="text-left text-brand hover:text-brand-dark dark:hover:text-amber-400 font-light text-base py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {{ item.label }}
            </button>
          </div>
        </Transition>
      </div>
    </nav>

    <div class="mt-auto">
      <button
        @click="handleLogout"
        class="w-full bg-brand text-white py-4 rounded-xl text-xl font-light flex items-center justify-center gap-3 hover:bg-brand-dark transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {{ t('sidebar.logout') }}
      </button>
    </div>
  </aside>
</template>
