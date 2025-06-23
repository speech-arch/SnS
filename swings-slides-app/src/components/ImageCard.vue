<template>
  <div class="relative mx-auto">
    <img class="rounded w-full" :src="src" :alt="alt" :style="styleValue" />
    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
      <StatusTag :status="statusText" :tag-style="tagStyle" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useProductImage } from '../composables/useImage';

const props = defineProps<{
  src: string;
  alt: string;
  status: string;
  imgStyle?: string;
  tagStyle?: string;
}>();

const { statusText, styleValue } = useProductImage(props);
</script>
