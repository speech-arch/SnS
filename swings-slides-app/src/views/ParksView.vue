<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Parks</h1>
    <p>Welcome to the Parks page. Explore all parks and their features here.</p>
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="park in parks" :key="park.id" class="shadow-md">
        <template #title>
          {{ park.name }}
        </template>
        <template #content>
          <img :src="park.image" :alt="park.name" class="w-full h-48 object-cover rounded mb-4" />
          <div class="flex items-center gap-2 mb-2">
            <Tag :value="park.status" :severity="park.status === 'Open' ? 'success' : 'secondary'" />
            <span class="text-xs text-gray-500">{{ park.location }}</span>
          </div>
          <p class="mb-2 text-sm text-gray-700">{{ park.description }}</p>
          <Button label="View Details" icon="pi pi-eye" class="mt-2" @click="goToDetail(park.id)" />
        </template>
      </Card>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

const router = useRouter();

const parks = ref([
  {
    id: 1,
    name: 'Central Park',
    location: 'Downtown',
    status: 'Open',
    image: 'https://via.placeholder.com/400x200?text=Central+Park',
    description: 'A large public park in the city center with playgrounds and walking trails.'
  },
  {
    id: 2,
    name: 'Riverside Park',
    location: 'Riverside',
    status: 'Open',
    image: 'https://via.placeholder.com/400x200?text=Riverside+Park',
    description: 'A scenic park along the river, perfect for picnics and jogging.'
  },
  {
    id: 3,
    name: 'Hilltop Park',
    location: 'Uptown',
    status: 'Closed',
    image: 'https://via.placeholder.com/400x200?text=Hilltop+Park',
    description: 'A park with beautiful views of the city, currently under renovation.'
  }
]);

function goToDetail(parkId: any) {
  router.push({ name: 'park-detail', params: { id: parkId } });
}
</script>
