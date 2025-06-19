<template>
  <div class="min-h-screen bg-white dark:bg-black dark:text-white">
    <DesktopNavigationBar />
    <MobileNavigationBar />
    <main class="pt-20 pb-20 bg-gray-100 dark:bg-gray-800 rounded shadow w-full min-h-screen flex flex-col max-w-none mx-0">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home'
  },
  {
    label: 'Parks',
    icon: 'pi pi-tree'
  },
    {
    label: 'Events',
    icon: 'pi pi-tree'
  },
      {
    label: 'places',
    icon: 'pi pi-globe'
  },
]);

const isMobile = ref(window.innerWidth < 640);
function updateIsMobile() {
  isMobile.value = window.innerWidth < 640;
}
onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

provide('items', items);
provide('isMobile', isMobile);
</script>
