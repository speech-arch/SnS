<template>
  <Card>
    <template #title>
      {{ product.name }}
    </template>
    <div class="grid">
      <!-- Product Images -->
      <div class="col-12 md:col-6">
        <Galleria :value="product.images" :numVisible="3" :showThumbnails="true">
          <template #item="slotProps">
            <img :src="slotProps.item" alt="Product Image" class="w-full" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item" alt="Thumbnail" class="w-6rem h-6rem" />
          </template>
        </Galleria>
      </div>

      <!-- Product Info -->
      <div class="col-12 md:col-6">
        <div class="flex align-items-center gap-2 mb-2">
          <Tag :value="product.stock > 0 ? 'In Stock' : 'Out of Stock'" :severity="product.stock > 0 ? 'success' : 'danger'" />
        </div>
        <h2 class="text-2xl font-bold text-primary mb-2">{{ formatCurrency(product.price) }}</h2>
        <Rating :value="product.rating" readonly :cancel="false" />
        <p class="mt-3">{{ product.shortDescription }}</p>
        <div class="mt-4 flex gap-2">
          <Button label="Add to Cart" icon="pi pi-shopping-cart" />
          <Button label="Buy Now" icon="pi pi-credit-card" severity="success" />
        </div>
      </div>
    </div>

    <Divider class="my-5" />

    <!-- Product Details Tabs -->
    <TabView>
      <TabPanel header="Description" value="description">
        <p>{{ product.description }}</p>
      </TabPanel>
      <TabPanel header="Specifications" value="specs">
        <ul>
          <li v-for="(value, key) in product.specs" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </TabPanel>
      <TabPanel header="Reviews" value="reviews">
        <p>No reviews yet.</p>
      </TabPanel>
    </TabView>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Galleria from 'primevue/galleria'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

const product = ref({
  name: 'Wireless Headphones',
  price: 129.99,
  rating: 4.2,
  stock: 12,
  shortDescription: 'High-quality wireless headphones with noise cancellation.',
  description: 'These headphones provide exceptional sound quality, long battery life, and active noise cancellation to enhance your listening experience.',
  specs: {
    Brand: 'SoundMax',
    Connectivity: 'Bluetooth 5.2',
    Battery: '30 hours',
    Weight: '250g'
  },
  images: [
    'https://via.placeholder.com/400x300?text=Front+View',
    'https://via.placeholder.com/400x300?text=Side+View',
    'https://via.placeholder.com/400x300?text=Back+View'
  ]
})

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
</script>

<style scoped>
img {
  border-radius: 8px;
}
</style>
