<template>
  <div class="card">
    <Carousel
      :value="products"
      :numVisible="2"
      :numScroll="2"
      :responsiveOptions="responsiveOptions"
      :showNavigators="false"
       circular 
      :autoplayInterval="5000"
    >
      <template #item="slotProps">
        <div class="border-surface-200 dark:border-surface-700 rounded-xl m-2 p-4 shadow-md transform scale-95 transition-transform duration-300">
          <div class="mb-4">
            <ProductImage
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
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-info-circle" title="info" outlined/>
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import ProductImage from './ProductImage.vue';
const products = ref([
  {
    id: '4',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'Top',
    rating: 5
  },
  {
    id: '0',
    code: 'nvklal433',
    name: 'Black Watch',
    description: 'Product Description',
    image: 'black-watch.jpg',
    price: 72,
    category: 'Accessories',
    quantity: 61,
    inventoryStatus: 'Top',
    rating: 4
  },
  {
    id: '1',
    code: 'zz21cz3c1',
    name: 'Blue Band',
    description: 'Product Description',
    image: 'blue-band.jpg',
    price: 79,
    category: 'Fitness',
    quantity: 2,
    inventoryStatus: 'Top',
    rating: 3
  },
  {
    id: '3',
    code: '244wgerg2',
    name: 'Blue T-Shirt',
    description: 'Product Description',
    image: 'blue-t-shirt.jpg',
    price: 29,
    category: 'Clothing',
    quantity: 25,
    inventoryStatus: 'Top',
    rating: 5
  },
  {
    id: '5',
    code: 'h456wer53',
    name: 'Bracelet',
    description: 'Product Description',
    image: 'bracelet.jpg',
    price: 15,
    category: 'Accessories',
    quantity: 73,
    inventoryStatus: 'Top',
    rating: 4
  }
]);

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const getSeverity = (status: string): "info" | "warn" | "secondary" | "success" | "danger" | "contrast" | undefined => {
  switch (status) {
    case "Top":
      return "secondary";
    case "Top 1":
      return "warn";
    default:
      return undefined;
  }
};


</script>
