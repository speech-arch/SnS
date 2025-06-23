<template>
  <div class="card">
    <Carousel
      :value="products"
      :numVisible="responsiveOptions[0].numVisible"
      :numScroll="responsiveOptions[0].numScroll"
      :responsiveOptions="responsiveOptions"
      :showNavigators="responsiveOptions[0].showNavigators"
      :circular ="responsiveOptions[0].circular"
      :autoplayInterval="responsiveOptions[0].autoplayInterval"
    >
      <template #item="slotProps">
        <div class="border-surface-200 dark:border-surface-700 rounded-xl m-2 p-4 shadow-md transform scale-95 transition-transform duration-300">
          <div class="mb-4">
            <ImageCard
              :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
              :alt="slotProps.data.name"
              :status="slotProps.data.inventoryStatus"
              imgStyle="width: 100%; height: 12rem; object-fit: cover; border-radius: 0.75rem;"
            />
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-2 font-medium text-lg text-center">
              {{ slotProps.data.name }}
            </div>
            <span class="flex items-center gap-2" style="margin-top:1rem;">
              <Button
                v-for="action in slotProps.data.actions"
                :key="action.icon"
                :icon="action.icon"
                :title="action.title"
                :severity="action.severity || 'secondary'"
                :outlined="action.outlined !== false"
                @click="action.onClick && action.onClick(slotProps.data)"
              />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">

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
