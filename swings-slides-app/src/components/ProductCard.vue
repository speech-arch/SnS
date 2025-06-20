<template>
  <div v-if="layout === 'list'" class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
    <div class="md:w-40 relative">
      <ProductImage :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" :status="item.inventoryStatus" />
    </div>
    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
      <div class="flex flex-row md:flex-col justify-between items-start gap-2">
        <ProductInfo :category="item.category" :name="item.name" :rating="item.rating" :layout="layout">
        </ProductInfo>
      </div>
      <div class="flex flex-col md:items-end gap-8">
        <ProductActions :price="item.price" :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" :layout="layout" />
      </div>
    </div>
  </div>
  <div v-else class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
    <div class="bg-surface-50 flex justify-center rounded p-4">
      <div class="relative mx-auto">
        <ProductImage :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" :status="item.inventoryStatus" imgStyle="max-width: 300px" />
      </div>
    </div>
    <div class="pt-6">
      <div class="flex flex-row justify-between items-start gap-2">
        <ProductInfo :category="item.category" :name="item.name" :rating="item.rating" :layout="layout"/>
      </div>
      <div class="flex flex-col gap-6 mt-6">
        <ProductActions :price="item.price" :outOfStock="item.inventoryStatus === 'OUTOFSTOCK'" :layout="layout" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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
</script>
