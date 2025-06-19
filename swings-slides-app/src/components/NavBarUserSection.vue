<script setup lang="ts">
defineProps<{ avatarClass?: string; colorModeClass?: string; searchClass?: string , wrapperClass?: string}>();
</script>

<template>
  <div class="flex items-center gap-2 w-full" :class="wrapperClass ?? ''">
    <InputText placeholder="Search" type="text" :class="searchClass ?? 'w-full'" />
    <ColorMode :class="colorModeClass" />
    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" :class="avatarClass ?? 'w-10 h-10 rounded-full object-cover aspect-square ml-4'" />
  </div>
</template>
