<template>
    <ScrollTop 
      target="window" 
      :threshold="100" 
      icon="pi pi-arrow-up" 
      :buttonProps="{ severity: 'contrast', raised: true, rounded: true , size: 'small', style: 'margin-bottom: 2rem;' }"
    />
    <div class="card border-surface-200 dark:border-surface-700 rounded-xl m-2 p-4 shadow-md transform scale-95 transition-transform duration-300">
      
        <DataView
          :value="paginatedProducts"
          :layout="layout"
          :sortOrder="sortOrder"
          :sortField="sortField"
          :filterValue="selectedCategories"
        >
            <template #header>
                <div class="flex flex-wrap gap-4 items-center justify-between w-full">
                  <SectionHeader
                    title="Parks"
                    :sortKey="sortKey"
                    :sortOptions="sortOptions"
                    :layout="layout"
                    :layoutOptions="options"
                    :selectedCategories="selectedCategories"
                    :categoryOptions="categoryOptions"
                    @update:sortKey="(val: any) => sortKey = val"
                    @update:layout="(val: string) => layout = val"
                    @sort-change="onSortChange"
                    @update:selectedCategories="(val: string[]) => selectedCategories = val"
                  />
                </div>
            </template>
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <Card :item="item" :layout="'list'" :index="index" @scroll-to-marker="scrollToMapMarker" @go-to-detail="goToDetail(item.id)" />
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-cols-12 gap-4">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                        <Card :item="item" :layout="'grid'" :index="index" @scroll-to-marker="scrollToMapMarker" @go-to-detail="goToDetail(item.id)" />
                    </div>
                </div>
            </template>
        </DataView>
        <div v-if="totalPages > 1" class="flex gap-2 mt-4 justify-center items-center">
            <Button :disabled="page === 1" icon="pi pi-chevron-left" label="Prev" @click="prevPage" outlined size="small" />
            <span class="text-xs text-surface-500 dark:text-surface-400">Page {{ page }} / {{ totalPages }}</span>
            <Button
              v-if="page < totalPages"
              :disabled="false"
              icon="pi pi-chevron-right"
              label="Next"
              @click="nextPage"
              outlined size="small"
            />
            <RouterLink
              v-else
              to="/events"
              custom
              v-slot="{ navigate, href }"
            >
              <Button
                :disabled="false"
                icon="pi pi-arrow-right"
                label="View More"
                :href="href"
                @click="navigate"
                severity="info"
                outlined size="small"
              />
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProductGrid } from '../composables/useGrid';
import { useSearchStore } from '../stores/search';
import { useSearchFilter } from '../composables/useSearchFilter';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useDynamicFilterSort } from '@/composables/useDynamicFilterSort';
import router from '@/router';


const searchStore = useSearchStore();
const { searchTerm } = storeToRefs(searchStore);

const dataStore = useDataStore();
const { products } = storeToRefs(dataStore);

// Use search filter composable to filter products by search term
const { filtered: searchFilteredProducts } = useSearchFilter(products, searchTerm, ['name', 'description', 'category']);

// Get grid state refs first (from sorted, not searchFilteredProducts)
const filterFields = ['category']; // Change as needed, e.g. ['date', 'type'] for events
const {
  selectedCategories,
  sortKey,
  sortOrder,
  sortField,
  layout,
  options,
  page,
  categoryOptions,
  totalPages,
  paginatedProducts,
  nextPage,
  prevPage,
  onSortChange,
  sortOptions,
} = useProductGrid(searchFilteredProducts, 6);

// Use the dynamic filter/sort composable for the grid
 useDynamicFilterSort(
  searchFilteredProducts,
  selectedCategories,
  filterFields,
  sortKey,
  sortOrder,
  sortField
);


function scrollToMapMarker(productId: string) {
  const mapDiv = document.querySelector('[ref=map]') || document.getElementById('map');
  if (mapDiv) mapDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => {
    if ((window as any).scrollToMapMarker) {
      (window as any).scrollToMapMarker(productId);
    }
  }, 800);
}

function goToDetail(parkId: any) {
  router.push({ name: 'park-detail', params: { id: parkId } });
}
</script>
