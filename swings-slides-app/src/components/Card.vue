<template>
  <div v-if="layout === 'list'" :id="`product-card-${item.id}`" class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
    <div class="md:w-40 relative">
      <ImageCard :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" :status="item.inventoryStatus" />
    </div>
    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
      <!-- <div class="flex flex-row md:flex-col justify-between items-start gap-2">
        <InfoCard :category="item.category" :name="item.name" :rating="item.rating" :layout="layout"/>
      </div> -->
      <div class="flex flex-row md:flex-col justify-between items-start gap-2">
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
        />
      </div>
      <div class="flex flex-col md:items-end gap-8">
         <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: item.name, image: '', removable: true },
            { label: 'gag', image: '', icon: 'pi pi-star-fill text-yellow-500', removable: false },
            { label: `Stock: ${item.quantity}`, image: 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png', removable: false },
            { label: 'Xuxue Feng', image: 'https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png', removable: true }
          ]"
          @scroll-to-marker="$emit('scroll-to-marker', item.id)" 
          @go-to-detail="$emit('go-to-detail', item.id)" 
          title="Information"
          :show-buttons="true"
        />
      </div>
    </div>
  </div>
  <div v-else :id="`product-card-${item.id}`" class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
    <div class="bg-surface-50 flex justify-center rounded p-4">
      <div class="relative mx-auto">
        <ImageCard :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" :status="item.inventoryStatus" imgStyle="max-width: 300px" />
      </div>
    </div>
    <div class="pt-6 gap-4 flex flex-col">
      <!-- <div class="flex flex-row justify-between items-start gap-2">
        <InfoCard :category="item.category" :name="item.name" :rating="item.rating" :layout="layout"/>
      </div> -->
          <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
          ]"
          title="Park Lucas"
        />
      <div class="flex flex-row justify-between items-start gap-2">
          <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: 'Park Lucas', image: '', removable: false },
            { label: 'Park Lucas', image: '', removable: false },
            { label: 'Park Lucas', image: '', removable: false },
          ]"
          title="Amenities"
        />
        <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: '', image: '', icon: 'pi pi-cloud', removable: false },
            { label: '', image: '', icon: 'pi pi-cloud', removable: false },
            { label: '', image: '', icon: 'pi pi-cloud', removable: false },

          ]"
          title="wheather"
          :show-toggle-button="true"
        />
        </div>
      <div class="flex flex-col gap-6 mt-6">
        <div class="flex flex-row justify-between items-start gap-2">
       <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => [
            { label: item.name, image: '', removable: true },
            { label: 'gag', image: '', icon: 'pi pi-star-fill text-yellow-500', removable: false },
            { label: `Stock: ${item.quantity}`, image: 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png', removable: false },
            { label: 'Xuxue Feng', image: 'https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png', removable: true },
            { label: 'Air quality', image: '', icon: '', removable: true },
          ]"
          @scroll-to-marker="$emit('scroll-to-marker', item.id)" 
          @go-to-detail="$emit('go-to-detail', item.id)" 
          title="Information and services"
          :show-toggle-button="true"
        />
        </div>
        <ActionsCard 
          :price="item.price" 
          :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" 
          :layout="layout" 
          :chipsFn="() => []"
          @scroll-to-marker="$emit('scroll-to-marker', item.id)" 
          @go-to-detail="$emit('go-to-detail', item.id)" 
          :show-buttons="true"
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
