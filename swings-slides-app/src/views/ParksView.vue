<template>
   <section class="flex flex-col">
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Parks</h1>
      <p>Welcome to the Parks page. Explore all parks and their features here.</p>
      <div v-if="products.length === 0" class="text-center text-lg text-gray-500 my-12">
        <span class="pi pi-info-circle text-2xl mr-2"></span> No parks available at the moment. Please check back soon!
      </div>
      <TabView v-else  :scrollable="true">
        <TabPanel v-for="tab in tabs" :key="tab.label" :header="tab.label" :value="tab.slot">
          <component :is="tab.component" />
        </TabPanel>
      </TabView>
    </div>
    <GoogleMap />
  </section>  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';
import PrimeCard from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import GoogleMap from '@/components/GoogleMap.vue';
import ContentGrid from '@/components/ContentGrid.vue';

const router = useRouter();
const dataStore = useDataStore();
const { products } = storeToRefs(dataStore);
function goToDetail(parkId: any) {
  router.push({ name: 'park-detail', params: { id: parkId } });
}

const tabs = [
  { label: 'All Parks', slot: 'all', component: ContentGrid },
  { label: 'Water Parks', slot: 'water', component: ContentGrid },
  { label: 'Amusement Parks', slot: 'amusement', component:  ContentGrid },
  { label: 'National Parks', slot: 'national', component: ContentGrid },
  { label: 'Indoor Parks', slot: 'indoor', component: ContentGrid }
];
</script>

<style scoped>
.p-tabview-nav {
  font-size: 0.95rem;
}
.p-tabview-nav .p-tabview-nav-link {
  padding: 0.4rem 0.75rem;
  font-size: 0.92rem;
}
@media (max-width: 640px) {
  .p-tabview-nav {
    font-size: 0.85rem;
  }
  .p-tabview-nav .p-tabview-nav-link {
    padding: 0.3rem 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
