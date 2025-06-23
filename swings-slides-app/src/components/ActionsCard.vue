<template>
  <div :class="wrapperClass">
    <ChipsCard :chips="chips" :title="title" :chipsAreaWrapperClass="chipsAreaWrapperClass" :show-toggle-button="showToggleButton"/>
    <div v-if="props.showButtons !== false" :class="buttonWrapperClass">
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
        @click="$emit('go-to-detail')"
      />
      <Button icon="pi pi-heart" outlined v-if="!reverse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductActions } from '../composables/useActions';
import type { DefineComponent } from 'vue';
declare const Button: DefineComponent;

const props = defineProps<{
  price: number;
  outOfStock: boolean;
  layout?: string;
  chipsFn?: () => any[];
  chipsAreaWrapperClass?: string;
  title?: string;
  showButtons?: boolean;
  showToggleButton?: boolean;
}>();

const emit = defineEmits(['scroll-to-marker', 'go-to-detail']);
const { reverse, wrapperClass, buttonWrapperClass, cartClass, chips: defaultChips } = useProductActions(props);

const chips = props.chipsFn ? props.chipsFn() : defaultChips;
</script>
