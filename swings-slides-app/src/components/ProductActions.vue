<template>
  <div :class="wrapperClass">
    <span :class="priceClass">${{ price }}</span>
    <div :class="buttonWrapperClass">
      <Button icon="pi pi-heart" outlined v-if="reverse" />
      <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="outOfStock" :class="cartClass" />
      <Button icon="pi pi-heart" outlined v-if="!reverse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue';
declare const Button: DefineComponent;

const props = defineProps<{
  price: number;
  outOfStock: boolean;
  layout?: string;
}>();

const reverse = props.layout === 'list';
const wrapperClass = props.layout === 'list'
  ? 'flex flex-col md:items-end gap-8'
  : 'flex flex-col gap-6 mt-6';
const priceClass = props.layout === 'list'
  ? 'text-xl font-semibold'
  : 'text-2xl font-semibold';
const buttonWrapperClass = props.layout === 'list'
  ? 'flex flex-row-reverse md:flex-row gap-2'
  : 'flex gap-2';
const cartClass = props.layout === 'list'
  ? 'flex-auto md:flex-initial whitespace-nowrap'
  : 'flex-auto whitespace-nowrap';
</script>
