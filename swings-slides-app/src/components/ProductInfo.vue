<template>
  <div>
    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ category }}</span>
    <div :class="['text-lg font-medium', { 'mt-2': layout === 'list', 'mt-1': layout === 'grid' } ]">{{ name }}</div>
    <div class="bg-surface-100 p-1" style="border-radius: 30px">
      <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
        <span class="text-surface-900 font-medium text-sm">{{ rating }}</span>
        <i class="pi pi-star-fill text-yellow-500"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string;
  name: string;
  rating: number;
  layout?: string;
}>();
</script>
