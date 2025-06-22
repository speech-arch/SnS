<template>
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
                    @update:sortKey="val => sortKey = val"
                    @update:layout="val => layout = val"
                    @sort-change="onSortChange"
                    @update:selectedCategories="val => selectedCategories = val"
                  />
                </div>
            </template>
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <ProductCard :item="item" :layout="'list'" :index="index" @scroll-to-marker="scrollToMapMarker" />
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-cols-12 gap-4">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                        <ProductCard :item="item" :layout="'grid'" :index="index" @scroll-to-marker="scrollToMapMarker" />
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
import { useProductGrid } from '../composables/useProductGrid';
import type { ProductFilterFn, ProductSortFn } from '../composables/useProductGrid';
import { useSearchStore } from '../stores/search';
import { useSearchFilter } from '../composables/useSearchFilter';
import { storeToRefs } from 'pinia';

const customFilter: ProductFilterFn = (products, selectedCategories) => {
  // Custom filter logic (can be replaced or extended)
  let result = products;
  if (selectedCategories.length) {
    result = result.filter(p => selectedCategories.includes(p.category));
  }
  // Add more custom filtering if needed
  return result;
};

const customSort: ProductSortFn = (products, sortKey, sortOrder, sortField) => {
  // Custom sort logic (can be replaced or extended)
  if (!sortField) return products;
  return [...products].sort((a, b) => {
    if (sortOrder === -1) {
      return b[sortField] - a[sortField];
    } else {
      return a[sortField] - b[sortField];
    }
  });
};

const searchStore = useSearchStore();
const { searchTerm } = storeToRefs(searchStore);

const products = ref([
  {
    id: '1', code: 'f230fh0g3', name: 'Bamboo Watch', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'Top', rating: 5
  },
  {
    id: '5', code: 'nvklal433', name: 'Black Watch', description: 'Product Description', image: 'black-watch.jpg', price: 72, category: 'Accessories', quantity: 61, inventoryStatus: 'Top', rating: 4
  },
  {
    id: '2', code: 'zz21cz3c1', name: 'Blue Band', description: 'Product Description', image: 'blue-band.jpg', price: 79, category: 'Fitness', quantity: 2, inventoryStatus: 'Top', rating: 3
  },
  {
    id: '3', code: '244wgerg2', name: 'Blue T-Shirt', description: 'Product Description', image: 'blue-t-shirt.jpg', price: 29, category: 'Clothing', quantity: 25, inventoryStatus: 'Top', rating: 5
  },
  {
    id: '4', code: 'h456wer53', name: 'Bracelet', description: 'Product Description', image: 'bracelet.jpg', price: 15, category: 'Accessories', quantity: 73, inventoryStatus: 'Top', rating: 4
  },
  { id: '1005', code: 'a1', name: 'Red Ball', description: 'Fun toy', image: 'red-ball.jpg', price: 10, category: 'Toys', quantity: 10, inventoryStatus: 'Top', rating: 4 },
  { id: '1006', code: 'a2', name: 'Green Ball', description: 'Fun toy', image: 'green-ball.jpg', price: 12, category: 'Toys', quantity: 8, inventoryStatus: 'Top', rating: 3 },
  { id: '1007', code: 'a3', name: 'Yellow Ball', description: 'Fun toy', image: 'yellow-ball.jpg', price: 11, category: 'Toys', quantity: 12, inventoryStatus: 'Top', rating: 5 },
  { id: '1008', code: 'a4', name: 'Blue Ball', description: 'Fun toy', image: 'blue-ball.jpg', price: 13, category: 'Toys', quantity: 7, inventoryStatus: 'Top', rating: 2 },
  { id: '1009', code: 'a5', name: 'Purple Ball', description: 'Fun toy', image: 'purple-ball.jpg', price: 14, category: 'Toys', quantity: 9, inventoryStatus: 'Top', rating: 4 },
  { id: '1010', code: 'a6', name: 'Orange Ball', description: 'Fun toy', image: 'orange-ball.jpg', price: 15, category: 'Toys', quantity: 6, inventoryStatus: 'Top', rating: 3 },
  { id: '1011', code: 'a7', name: 'Pink Ball', description: 'Fun toy', image: 'pink-ball.jpg', price: 16, category: 'Toys', quantity: 5, inventoryStatus: 'Top', rating: 5 },
]);

// Use search filter composable to filter products by search term
const { filtered: searchFilteredProducts } = useSearchFilter(products, searchTerm, ['name', 'description', 'category']);

const {
  selectedCategories,
  sortKey,
  sortOrder,
  sortField,
  sortOptions,
  layout,
  options,
  page,
  categoryOptions,
  totalPages,
  paginatedProducts,
  nextPage,
  prevPage,
  onSortChange,
} = useProductGrid(searchFilteredProducts, 6, customFilter, customSort);

function scrollToMapMarker(productId: string) {
  const mapDiv = document.querySelector('[ref=map]') || document.getElementById('map');
  if (mapDiv) mapDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => {
    if ((window as any).scrollToMapMarker) {
      (window as any).scrollToMapMarker(productId);
    }
  }, 800);
}
</script>
