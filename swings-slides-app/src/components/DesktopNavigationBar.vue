<script setup>
import { useUserLocationStore } from '../stores/userLocation';

const isMobile = inject('isMobile');
const items = inject('items');
const userLocationStore = useUserLocationStore();

function fetchLocationFromIP() {
  userLocationStore.fetchUserLocationWithWatch();
}
</script>

<template>
  <header v-if="!isMobile">
    <!-- Desktop Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 w-full">
      <Menubar :model="items" class="card items-center hidden sm:flex w-full">
        <template #start >
          <Logo/>
        </template>
        <template #item="{ item, root, hasSubmenu, props }">
          <RouterLink
            v-if="!item.items && item.label.toLowerCase() !== 'places'"
            :to="{ name: (item.label || '').toLowerCase() }"
            class="items-center hidden sm:flex px-2 py-1 rounded transition-colors hover:bg-blue-100 dark:hover:bg-blue-900"
            active-class="bg-blue-600 text-white"
            style="text-decoration: none;"
          >
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"/>
          </RouterLink>
          <a v-else v-ripple class="flex items-center" v-bind="props.action" @click="item.label.toLowerCase() === 'places' ? fetchLocationFromIP() : null">
            <span>{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
          </a>
        </template>
        <template #end>
          <NavBarUserSection 
            avatar-class="w-10 h-10 rounded-full object-cover aspect-square ml-4"
            color-mode-class=""
            search-class="w-full"
          />
        </template>
      </Menubar>
    </nav>
  </header>
</template>
