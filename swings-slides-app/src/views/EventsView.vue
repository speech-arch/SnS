<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Events</h1>
    <p>Welcome to the Events page. Here you can find all upcoming and past events.</p>
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="event in events" :key="event.id" class="shadow-md">
        <template #title>
          {{ event.title }}
        </template>
        <template #content>
          <img :src="event.image" :alt="event.title" class="w-full h-48 object-cover rounded mb-4" />
          <div class="flex items-center gap-2 mb-2">
            <Tag :value="event.status" :severity="event.status === 'Upcoming' ? 'success' : 'secondary'" />
            <span class="text-xs text-gray-500">{{ event.date }}</span>
          </div>
          <p class="mb-2 text-sm text-gray-700">{{ event.description }}</p>
          <Button label="View Details" icon="pi pi-eye" class="mt-2" @click="goToDetail(event.id)" />
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

const events = ref([
  {
    id: 1,
    title: 'Summer Music Festival',
    date: '2025-07-15',
    status: 'Upcoming',
    image: 'https://via.placeholder.com/400x200?text=Music+Festival',
    description: 'Join us for a day of live music, food, and fun in the sun!'
  },
  {
    id: 2,
    title: 'Art Expo',
    date: '2025-06-30',
    status: 'Upcoming',
    image: 'https://via.placeholder.com/400x200?text=Art+Expo',
    description: 'Explore the latest works from local and international artists.'
  },
  {
    id: 3,
    title: 'Charity Run',
    date: '2025-05-20',
    status: 'Past',
    image: 'https://via.placeholder.com/400x200?text=Charity+Run',
    description: 'Thank you for supporting our annual charity run!'
  }
]);

function goToDetail(eventId: any) {
  router.push({ name: 'event-detail', params: { id: eventId } });
}
</script>
