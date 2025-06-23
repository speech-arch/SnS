<template>
  <div class="card">
    <Carousel :value="products" :numVisible="responsiveOptions[0].numVisible"
      :numScroll="responsiveOptions[0].numScroll" :responsiveOptions="responsiveOptions"
      :showNavigators="responsiveOptions[0].showNavigators" :circular="responsiveOptions[0].circular"
      :autoplayInterval="responsiveOptions[0].autoplayInterval">
      <template #item="slotProps">
        <div
          class="border-surface-200 dark:border-surface-700 rounded-xl m-2 mb-0 p-4 shadow-md transform scale-95 transition-transform duration-300 flex flex-col items-center">
          <div class="w-full flex flex-col items-center">
            <div
              class="bg-gradient-to-r from-blue-500 to-green-400 text-white p-4 shadow w-full flex flex-col items-center -mt-1 rounded-t-lg rounded-b-none">
              <h2 class="text-xl font-bold mb-1">Find Your Next Adventure!</h2>
              <p class="mb-2 text-sm">Browse, compare, and plan your visit to the best parks around you.</p>
              <Button label="Explore Parks" icon="pi pi-search"
                class="bg-white text-blue-600 font-bold px-4 py-2 rounded shadow hover:bg-blue-50"
                @click="goToDetail(slotProps.data.id)" />
            </div>
            <div class="w-full">
              <ImageCard :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
                :alt="slotProps.data.name" :status="slotProps.data.inventoryStatus"
                imgStyle="width: 100%; height: 12rem; object-fit: cover; border-radius: 0 0 0.75rem 0.75rem ;" />
            </div>

          </div>
          <div class="w-full flex flex-col items-center mt-4">
            <div class="mb-2 font-medium text-lg text-center">
              {{ slotProps.data.name }}
            </div>
            <div class="text-gray-600 text-sm mb-2 text-center">
              {{ slotProps.data.description }}
            </div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs text-gray-500">{{ slotProps.data.category }}</span>
              <span class="text-xs text-gray-500">Stock: {{ slotProps.data.quantity }}</span>
            </div>
            <div class="flex items-center gap-2 mb-4">
              <Button v-for="action in slotProps.data.actions" :key="action.icon" :icon="action.icon"
                :title="action.title" :severity="action.severity || 'secondary'" :outlined="action.outlined !== false"
                @click="action.onClick && action.onClick(slotProps.data)" />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const goToDetail = (parkId: any) => {
  router.push({ name: 'park-detail', params: { id: parkId } });
}

defineProps<{
  products: Array<{
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
  }>,
  responsiveOptions: Array<{
    breakpoint: string;
    numVisible: number;
    numScroll: number;
    circular?: boolean;
    autoplayInterval?: number;
    showNavigators?: boolean;
    showIndicators?: boolean;
  }>,
  actions?: Array<{
    icon: string;
    title?: string;
    severity?: string;
    outlined?: boolean;
    onClick?: (product: any) => void;
  }>
}>();
</script>
