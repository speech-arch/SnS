<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from '../stores/search';
import Menu from 'primevue/menu';
import { useRouter } from 'vue-router';
defineProps<{ avatarClass?: string; colorModeClass?: string; searchClass?: string , wrapperClass?: string}>();
const searchStore = useSearchStore();
const menu = ref();
const router = useRouter();
const menuItems = [
  { label: 'Login', icon: 'pi pi-sign-in', command: () => { router.push({ name: 'login' }); } },
  { label: 'Signup', icon: 'pi pi-user-plus', command: () => { router.push({ name: 'signup' }); } },
];
function showMenu(event: Event) {
  menu.value.toggle(event);
}
</script>

<template>
  <div class="flex items-center gap-2 w-full" :class="wrapperClass ?? ''">
    <InputText v-model="searchStore.searchTerm" placeholder="Search" type="text" :class="searchClass ?? 'w-full'" />
    <ColorMode :class="colorModeClass" />
    <Avatar
      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
      shape="circle"
      :class="avatarClass ?? 'w-10 h-10 rounded-full object-cover aspect-square ml-4'"
      @click="showMenu"
      style="cursor:pointer;"
    />
    <Menu ref="menu" :model="menuItems" :popup="true" class="w-40" />
  </div>
</template>
