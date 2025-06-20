<template>
  <div :class="wrapperClass">
    <ProductChips :chips="chips" />
    <div :class="buttonWrapperClass">
      <Button icon="pi pi-heart" outlined v-if="reverse" />
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
import type { DefineComponent } from 'vue';
declare const Button: DefineComponent;
import ProductChips from './ProductChips.vue';
import { ref, onMounted } from 'vue';

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
  const chips: ChipData[] = [
  { label: 'Amy', image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png' },
  { label: 'Asiya', image: 'https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png' },
  { label: 'Onyama', image: 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png' },
  { label: 'Xuxue Feng', image: 'https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png', removable: true },
];

const showAll = ref(false);
const displayedChips = computed(() => showAll.value ? chips : chips.slice(0, 2));

const isMobile = ref(false);
onMounted(() => {
  isMobile.value = window.innerWidth < 640;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 640;
  });
});
</script>
