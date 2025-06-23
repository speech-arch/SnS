<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Parks</h1>
    <p>Welcome to the Parks page. Explore all parks and their features here.</p>
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="park in products" :key="park.id" class="shadow-md" :item="park" layout="grid"/>
            <!-- <Card v-for="park in products" :key="park.id" class="shadow-md">
        <template #title>
          {{ park.name }}
        </template>
        <template #content>
          <img :src="park.image" :alt="park.name" class="w-full h-48 object-cover rounded mb-4" />
          <div class="flex items-center gap-2 mb-2">
            <Tag :value="park.inventoryStatus" :severity="park.inventoryStatus === 'Top' ? 'success' : 'secondary'" />
            <span class="text-xs text-gray-500">{{ park.category }}</span>
          </div>
          <p class="mb-2 text-sm text-gray-700">{{ park.description }}</p>
          <Button label="View Details" icon="pi pi-eye" class="mt-2" @click="goToDetail(park.id)" />
        </template>
      </Card> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/data';

import Card from '@/components/Card.vue';


const router = useRouter();
const dataStore = useDataStore();
const { products } = storeToRefs(dataStore);
function goToDetail(parkId: any) {
  router.push({ name: 'park-detail', params: { id: parkId } });
}
</script>
