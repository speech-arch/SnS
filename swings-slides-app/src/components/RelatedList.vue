<template>
  <div>
    <h2 :class="titleClass">{{ title }}</h2>
    <div :class="listClass">
      <component
        v-for="item in items"
        :key="item[idKey] || item[nameKey]"
        :is="customCard || 'DefaultCard'"
        :item="item"
        :image-key="imageKey"
        :name-key="nameKey"
        :location-key="locationKey"
        :rating-key="ratingKey"
        :card-class="cardClass"
        @view-details="$emit('view-details', item)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  title: { type: String, default: '' },
  imageKey: { type: String, default: 'image' },
  nameKey: { type: String, default: 'name' },
  locationKey: { type: String, default: 'location' },
  ratingKey: { type: String, default: 'rating' },
  idKey: { type: String, default: 'id' },
  class: { type: String, default: '' },
  cardClass: { type: String, default: '' },
  titleClass: { type: String, default: '' },
  customCard: { type: [Object, Function, String], default: null }
});

const emit = defineEmits(['view-details']);

const listClass = props.class || 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
const titleClass = props.titleClass || 'text-2xl font-semibold mb-4';
const cardClass = props.cardClass || 'rounded-t-xl h-32 w-full object-cover';
</script>
