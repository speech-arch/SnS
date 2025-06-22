<template>
  <div class="relative mx-auto">
    <img class="rounded w-full" :src="src" :alt="alt" :style="styleValue" />
    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
      <ProductStatusTag :status="statusText" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import ProductStatusTag from './ProductStatusTag.vue';
import { useProductImage } from '../composables/useProductImage';

const props = defineProps<{
  src: string;
  alt: string;
  status: string;
  imgStyle?: string;
}>();

const { statusText, styleValue } = useProductImage(props);
</script>
