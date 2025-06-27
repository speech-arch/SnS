<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { ParkInfo, ParkImage, ParkReview, ParkRelated } from '@/types/park';


// Example data, replace with store or API as needed
const parkInfo = ref<ParkInfo>({
  name: 'Central Park',
  status: { text: 'Open', severity: 'success' },
  rating: 4.7,
  description: 'A large public park in the city center with playgrounds and walking trails.',
  location: 'Downtown',
  infoRows: [
    { icon: 'pi pi-map-marker text-primary', label: 'Location', value: 'Downtown' },
    { icon: 'pi pi-clock text-primary', label: 'Hours', value: '6am - 10pm' },
    { icon: 'pi pi-tree text-primary', label: 'Size', value: '843 acres' },
    { icon: 'pi pi-sun text-yellow-500', label: 'Weather', value: '24°C, Sunny' },
    {
      icon: 'pi pi-cloud text-blue-500',
      label: 'Air Quality',
      value: undefined,
      tag: { text: 'Good (AQI 42)', severity: 'warning' }
    },
    { icon: 'pi pi-compass text-green-600', label: 'Distance', value: '2.5 km from you' }
  ]
});

const images = ref<ParkImage[]>([
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg', alt: 'Central Park 1' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg', alt: 'Central Park 2' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg', alt: 'Central Park 3' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg', alt: 'Central Park 4' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg', alt: 'Central Park 5' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg', alt: 'Central Park 6' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6.jpg', alt: 'Central Park 7' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg', alt: 'Central Park 8' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria8.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria8.jpg', alt: 'Central Park 9' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria9.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria9.jpg', alt: 'Central Park 10' },
  { itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg', alt: 'Central Park 3' }
]);

const reviews = ref<ParkReview[]>([
  { id: 1, author: 'Alice', comment: 'Beautiful park!', rating: 5, date: '2025-06-20' },
  { id: 2, author: 'Bob', comment: 'Great for families.', rating: 4, date: '2025-06-18' },
  { id: 3, author: 'Charlie', comment: 'Nice place to relax.', rating: 4, date: '2025-06-17' },
  { id: 4, author: 'David', comment: 'A bit crowded on weekends.', rating: 3, date: '2025-06-16' }
]);

const relatedParks = ref<ParkRelated[]>([]); // Replace with real data as needed

const router = useRouter();

const userInitialRating = ref<number>(0);

const onAddFavorite = (park: ParkInfo) => {
  // handle add to favorites
}
const onPlanVisit = (park: ParkInfo) => {
  // handle plan visit
}
const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/parks');
  }
}
const onAddReview = (review: ParkReview) => {
  const { id, ...reviewWithoutId } = review;
  reviews.value.unshift({ id: Date.now(), ...reviewWithoutId });
}
const onUserRate = (rating: number) => {
  userInitialRating.value = rating;
  // Optionally, send to API or update store
}
</script>

<template>
  <Details
    :parkInfo="parkInfo"
    :images="images"
    :reviews="reviews"
    :relatedParks="relatedParks"
    :allowUserRating="true"
    :userInitialRating="userInitialRating"
    @add-favorite="onAddFavorite"
    @plan-visit="onPlanVisit"
    @go-back="goBack"
    @add-review="onAddReview"
    @rate="onUserRate"
  />
</template>
