<template>
  <div v-if="layout === 'list'" :id="`product-card-${item.id}`" class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
    <div class="md:w- relative">
      <ImageCard :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" :status="item.inventoryStatus" />
      <div class="absolute left-0 bottom-0 w-full bg-black/60 text-white p-3 z-10">
        <div class="text-xl font-semibold">{{ item.name }}</div>
        <div class="text-sm text-gray-200">{{ item.description }}</div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
      <div class="flex flex-row md:flex-col justify-between items-start self-stretch gap-4 min-h-full">
        <span class="flex flex-col gap-4">
          <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: 'Park Lucas', image: '', removable: false },
            { label: 'wheather', image: '', icon: 'pi pi-cloud', removable: false },
            { label: 'Air quality', image: '', icon: 'pi pi-smog', removable: true },
            { label: 'Distance:', image: '', removable: true },
          ]"
          @scroll-to-marker="$emit('scroll-to-marker', item.id)" 
          @go-to-detail="$emit('go-to-detail', item.id)" 
          :title="amenities"
          :park="{
            weather: 'Sunny',
            rating: 4.5,
            reviewCount: 120
          }"
        />
          <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: 'Park Lucas', image: '', removable: false },
            { label: 'wheather', image: '', icon: 'pi pi-cloud', removable: false },
            { label: 'Air quality', image: '', icon: 'pi pi-smog', removable: true },
            { label: 'Distance:', image: '', removable: true },
          ]"
          @scroll-to-marker="$emit('scroll-to-marker', item.id)" 
          @go-to-detail="$emit('go-to-detail', item.id)" 
          title="Location and Access"
          :park="{
            weather: 'Sunny',
            rating: 4.5,
            reviewCount: 120
          }"
        />
        </span>
        
      </div>
      <div class="flex flex-col md:items-end gap-8 flex-1 self-stretch min-h-full">
        <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: 'Park Lucas', image: '', removable: false },
            { label: 'wheather', image: '', icon: 'pi pi-cloud', removable: false },
            { label: 'Air quality', image: '', icon: 'pi pi-smog', removable: true },
            { label: 'Distance:', image: '', removable: true },
          ]"
          @scroll-to-marker="$emit('scroll-to-marker', item.id)" 
          @go-to-detail="$emit('go-to-detail', item.id)" 
          title="Recommendations"
          :show-buttons="true"
          :show-reviews="true"
          :park="{
            weather: 'Sunny',
            rating: 4.5,
            reviewCount: 120
          }"
        />
      </div>
    </div>
  </div>
  <div v-else :id="`product-card-${item.id}`" class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
    <div class="bg-surface-50 flex justify-center rounded p-4 relative">
      <div class="relative mx-auto">
        <ImageCard :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" :status="item.inventoryStatus" imgStyle="max-width: 300px" />
        <div class="absolute left-0 bottom-0 w-full bg-black/60 text-white p-3 z-10">
          <div class="text-xl font-semibold">{{ item.name }}</div>
          <div class="text-sm text-gray-200">{{ item.description }}</div>
        </div>
      </div>
    </div>
    <div class="pt-6 gap-4 flex flex-col">
          <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: 'Playground', severity: 'primary' },
            { label: 'Picnic Area', severity: 'primary' },
            { label: 'Restrooms', severity: 'primary' },
            { label: 'Bring water', severity: 'primary' },
            { label: 'Wear sunscreen', severity: 'primary' }
          ]"
          title="Amenities"
          :park="{
            weather: 'Sunny',
            rating: 4.5,
            reviewCount: 120
          }"
        />
          <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
          { label: 'Playground', severity: 'secondary' },
          { label: 'Picnic Area', severity: 'secondary' },
          { label: 'Restrooms', severity: 'secondary' },
          { label: 'Bring water', severity: 'secondary' },
          { label: 'Wear sunscreen', severity: 'secondary' }
        ]"
          title="Location and Access"
          :park="{
            weather: 'Sunny',
            rating: 4.5,
            reviewCount: 120
          }"
        />
          <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
          { label: 'Playground', severity: 'info' },
          { label: 'Picnic Area', severity: 'info' },
          { label: 'Restrooms', severity: 'info' },
          { label: 'Bring water', severity: 'info' },
          { label: 'Wear sunscreen', severity: 'info' }
        ]"
          title="Recommendations"
          :park="{
            weather: 'Sunny',
            rating: 4.5,
            reviewCount: 120
          }"
        />
      <div class="flex flex-col gap-6 mt-2">
        <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => []"
          @scroll-to-marker="$emit('scroll-to-marker', item.id)" 
          @go-to-detail="$emit('go-to-detail', item.id)" 
          :show-buttons="true"
          :show-reviews="true"
          :park="{

            weather: 'Sunny',
            rating: 4.5,
            reviewCount: 120
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">;
import { useProductCard } from '../composables/useCard';
import ActionsCard from './ActionsCard.vue';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}
const props = defineProps<{
  item: Product;
  layout?: string;
  index?: number;
}>();
const amenities ='Amenities';
const emit = defineEmits(['scroll-to-marker', 'go-to-detail']);
useProductCard(props, emit);
</script>
