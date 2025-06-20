<template>
  <Tag :value="status" :severity="getSeverity(status)" />
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue';
declare const Tag: DefineComponent;
const props = defineProps<{
  status: string;
}>();
const getSeverity = (status: string) => {
  switch (status) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warn';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return null;
  }
};
</script>
