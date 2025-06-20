<template>
  <div class="relative mx-auto">
    <img class="rounded w-full" :src="src" :alt="alt" :style="imgStyle" />
    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
      <ProductStatusTag :status="status" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import ProductStatusTag from './ProductStatusTag.vue';
const props = defineProps<{
  src: string;
  alt: string;
  status: string;
  imgStyle?: string;
}>();
</script>
