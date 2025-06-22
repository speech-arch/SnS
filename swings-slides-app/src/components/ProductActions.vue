<template>
  <div :class="wrapperClass">
    <ProductChips :chips="chips" />
    <div :class="buttonWrapperClass">
      <Button icon="pi pi-heart" outlined v-if="reverse" />
      <Button 
        icon="pi pi-map-marker"
        label="Map"
        @click="$emit('scroll-to-marker')"
        outlined
        severity="info"
      />
      <Button 
        icon="pi pi-eye" 
        label="View" 
        :disabled="outOfStock" 
        :class="cartClass" 
      />
      <Button icon="pi pi-heart" outlined v-if="!reverse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductActions } from '../composables/useProductActions';
import type { DefineComponent } from 'vue';
declare const Button: DefineComponent;

const props = defineProps<{
  price: number;
  outOfStock: boolean;
  layout?: string;
}>();

const emit = defineEmits(['scroll-to-marker']);
const { reverse, wrapperClass, buttonWrapperClass, cartClass, chips, } = useProductActions(props);
</script>
