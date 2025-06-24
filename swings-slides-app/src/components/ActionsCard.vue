<template>
  <div :class="wrapperClass">
    <!-- <ChipsCard :chips="chips" :title="title" :chipsAreaWrapperClass="chipsAreaWrapperClass" :show-toggle-button="showToggleButton"/> -->
          <div class="flex flex-col mt-2 mb-2 gap-1">
          <span class="font-bold text-lg text-black-600 mb-5">{{ title }}</span>
            <div class="flex flex-wrap gap-2 text-sm">
              <Tag
                v-for="(chip, i) in chips"
                :key="'chip' + i"
                :value="chip.label || chip"
                :severity="chip.severity || 'info'"
                :icon="chip.icon"
              />
            </div>
          </div>
          <div class="flex justify-between items-center mt-2 text-xs text-gray-600" v-if="showReviews">
          <span class="flex items-center gap-1">
            🌤️ {{ park.weather }}
          </span>
          <span class="flex items-center gap-1">
            <Rating
              :modelValue="park.rating"
              readonly
              :cancel="false"
              :pt="{
                root: 'gap-0',
                item: 'text-yellow-400 text-sm',
              }"
            />
            ({{ park.reviewCount }})
          </span>
        </div>
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
  showReviews?: boolean;
  park: {
    weather: string;
    rating: number;
    reviewCount: number;
  };
}>();

const emit = defineEmits(['scroll-to-marker', 'go-to-detail']);
const { reverse, wrapperClass, buttonWrapperClass, cartClass, chips: defaultChips } = useProductActions(props);

const chips = props.chipsFn ? props.chipsFn() : defaultChips;
</script>
