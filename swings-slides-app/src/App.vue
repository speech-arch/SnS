<template>
  <div class="bg-white dark:bg-black dark:text-white min-h-screen">
    <DesktopNavigationBar />
    <MobileNavigationBar />
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
  // {
  //   label: 'Projects',
  //   icon: 'pi pi-search',
  //   badge: 3,
  //   items: [
  //     {
  //       label: 'Core',
  //       icon: 'pi pi-bolt',
  //       shortcut: '⌘+S'
  //     },
  //     {
  //       label: 'Blocks',
  //       icon: 'pi pi-server',
  //       shortcut: '⌘+B'
  //     },
  //     {
  //       separator: true
  //     },
  //     {
  //       label: 'UI Kit',
  //       icon: 'pi pi-pencil',
  //       shortcut: '⌘+U'
  //     }
  //   ]
  // }
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
