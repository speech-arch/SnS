<template>
  <Card :class="cardClass">
    <img :src="item[imageKey]" alt="Related Image" class="rounded-t-xl h-32 w-full object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-1">{{ item[nameKey] }}</h3>
      <p class="text-sm text-gray-600 mb-2 flex items-center gap-2">
        <i class="pi pi-map-marker"></i>{{ item[locationKey] }}
      </p>
      <Rating :value="item[ratingKey]" readonly :cancel="false" />
    </div>
    <template #footer>
      <Button label="View Details" icon="pi pi-eye" class="w-full" @click="$emit('view-details', item)" />
    </template>
  </Card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Rating from 'primevue/rating';

const props = defineProps({
  item: { type: Object, required: true },
  imageKey: { type: String, default: 'image' },
  nameKey: { type: String, default: 'name' },
  locationKey: { type: String, default: 'location' },
  ratingKey: { type: String, default: 'rating' },
  cardClass: { type: String, default: '' }
});

const emit = defineEmits(['view-details']);
</script>
