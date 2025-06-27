<script setup lang="ts">
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

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
</script>

<template>
  <section class="flex flex-col">
    <MainCarousel :products="products" :responsiveOptions="responsiveOptions" />
    <TabView>
      <TabPanel header="Parks" :value="'parks'">
            <ContentGrid viewMoreRoute="/parks"/>
      </TabPanel>
      <TabPanel header="Events" :value="'events'">
        <ContentGrid viewMoreRoute="/events" :title="'Explore Events'"/>
      </TabPanel>
    </TabView>
      <GoogleMap />
  </section>
</template>
