<template>
  <div class="min-h-screen bg-white dark:bg-black dark:text-white">
    <DesktopNavigationBar />
    <MobileNavigationBar />
    <main class="pt-20 pb-20 bg-gray-100 dark:bg-gray-800 rounded shadow w-full min-h-screen flex flex-col max-w-none mx-0">
      <RouterView />
    </main>
    <footer class="w-full py-4 px-6 bg-white dark:bg-black border-t border-surface-200 dark:border-surface-700 text-center text-sm text-gray-500 dark:text-gray-400 hidden sm:block sticky bottom-0 left-0">
      © {{ new Date().getFullYear() }} Swings & Slides Parks App. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, provide } from 'vue';
import { useUserLocationStore } from './stores/userLocation';

const userLocationStore = useUserLocationStore();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home'
  },
  {
    label: 'Parks',
    icon: 'pi pi-image'
  },
  {
    label: 'Events',
    icon: 'pi pi-calendar'
  },
  {
    label: 'places',
    icon: 'pi pi-map-marker'
  },
  {
    label: 'Create',
    icon: 'pi pi-plus',
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle'
  },
]);

const isMobile = ref(window.innerWidth < 640);
function updateIsMobile() {
  isMobile.value = window.innerWidth < 640;
}
onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
  userLocationStore.fetchUserLocationFromIP();
});
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

provide('items', items);
provide('isMobile', isMobile);
</script>
