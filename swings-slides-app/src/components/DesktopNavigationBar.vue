<script setup>
const isMobile = inject('isMobile');
const items = inject('items')
</script>

<template>
  <div v-if="!isMobile">
    <!-- Desktop Navigation -->
    <div class="fixed top-0 left-0 right-0 z-50 w-full">
      <Menubar :model="items" class="card items-center hidden sm:flex w-full">
        <template #start >
          <Logo/>
        </template>
        <template #item="{ item, props: itemProps, hasSubmenu, root }">
          <a v-ripple class="items-center hidden sm:flex" v-bind="itemProps.action">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]" />
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
    </div>
  </div>
</template>
