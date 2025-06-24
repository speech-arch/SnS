<template>
  <Card>
    >
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Park Images Galleria with Thumbnails and Fullscreen -->
        <div class="mb-4 flex flex-col items-center">
          <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images"
            :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px" :circular="true"
            :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
            <template #item="slotProps">
              <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
            </template>
            <template #thumbnail="slotProps">
              <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
            </template>
          </Galleria>
          <div v-if="images" class="grid" style="max-width: 400px">
            <div v-for="(image, index) of images" :key="index" class="col-4">
              <img :src="image.thumbnailImageSrc" :alt="image.alt" style="cursor: pointer" @click="imageClick(index)" />
            </div>
          </div>
        </div>
        <!-- Park Info -->
        <div class="flex flex-col justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold mb-2">Central Park</h1>
            <Tag value="Open" severity="success" class="mb-3" />
            <div class="flex flex-col gap-2 text-gray-700">
              <p><i class="pi pi-map-marker text-primary"></i><span>Downtown</span></p>
              <p><i class="pi pi-clock text-primary"></i><span>6am - 10pm</span></p>
              <p><i class="pi pi-tree text-primary"></i><span>843 acres</span></p>
              <p>
                <i class="pi pi-sun text-yellow-500"></i><span>Weather: 24°C, Sunny</span>
              </p>
              <p>
                <i class="pi pi-cloud text-blue-500"></i><span>Air Quality:
                  <Tag value="Good (AQI 42)" severity="warning" />
                </span>
              </p>
              <p><i class="pi pi-compass text-green-600"></i><span>2.5 km from you</span></p>
              <Rating :value="4.7" readonly :cancel="false" class="mt-2" />
            </div>
          </div>
          <div class="mt-6 flex gap-3">
            <Button label="Add to Favorites" icon="pi pi-heart" outlined />
            <Button label="Plan Visit" icon="pi pi-calendar" />
          </div>
        </div>
      </div>
      <div class="mt-10 relative z-0">
        <TabView>
          <TabPanel header="Description">
            <div>A large public park in the city center with playgrounds and walking trails.</div>
          </TabPanel>
          <TabPanel header="Reviews">
                <div v-if="reviews.length" class="w-full bg-white dark:bg-gray-900 rounded-t-xl shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                  <!-- Review 1 -->
                  <div v-for="review in reviews" :key="review.id" class="flex gap-4 py-6 px-4 first:pt-4 last:pb-2">
                    <img :src="review.avatar || 'https://i.pravatar.cc/40?u=' + review.author" :alt="review.author"
                      class="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ review.author }}</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ formatDate(review.date) }}</p>
                      <!-- Stars -->
                      <div class="flex items-center mb-2">
                        <template v-for="n in 5" :key="n">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.384-2.46a1 1 0 00-1.175 0l-3.384 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
                          </svg>
                        </template>
                      </div>
                      <!-- Review text -->
                      <p class="text-sm text-gray-700 dark:text-gray-200">{{ review.comment }}</p>
                    </div>
                  </div>
                   
                  <!-- Repeat for other reviews as needed -->
                </div>
               <div v-else class="text-gray-400 dark:text-gray-500 text-sm">No reviews yet.</div>
                <hr class="border-t border-gray-200 dark:border-gray-700 my-4 mt-4" />
                <!-- Review Form -->
                <div class="w-full mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-b-xl shadow flex flex-col gap-4 mt-4">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Add a Review</h3>
                  <form @submit.prevent="submitReview" class="flex flex-col gap-3">
                    <div class="flex flex-col gap-1">
                      <label for="author" class="text-sm text-gray-700 dark:text-gray-200">Name</label>
                      <input v-model="newReview.author" id="author" type="text" required maxlength="32"
                        class="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div class="flex flex-col gap-1">
                      <label class="text-sm text-gray-700 dark:text-gray-200">Rating</label>
                      <div class="flex items-center gap-1">
                        <button v-for="n in 5" :key="n" type="button" @click="newReview.rating = n"
                          :aria-label="`Rate ${n} star${n > 1 ? 's' : ''}`"
                          class="focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="n <= newReview.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.384-2.46a1 1 0 00-1.175 0l-3.384 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="flex flex-col gap-1">
                      <label for="comment" class="text-sm text-gray-700 dark:text-gray-200">Comment</label>
                      <textarea v-model="newReview.comment" id="comment" required maxlength="300"
                        class="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                    </div>
                    <button type="submit"
                      class="self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
                      :disabled="!newReview.author || !newReview.rating || !newReview.comment">
                      Submit Review
                    </button>
                  </form>
                </div>
          </TabPanel>
            <TabPanel header="Map">
            <GoogleMap />
          </TabPanel>
        </TabView>
        <!-- Related Parks absolutely positioned below TabView -->
        <div class="relative z-10" style="margin-top:3rem;">
          <div class="mt-16">
            <RelatedList :items="[]" title="Same Parks Nearby" imageKey="image" nameKey="name" locationKey="location"
              ratingKey="rating" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              card-class="rounded-t-xl h-32 w-full object-cover" title-class="text-2xl font-semibold mb-4"
              :customCard="null" />
          </div>
        </div>
      </div>

      <div class="mb-6">
        <Button label="Back to Parks" icon="pi pi-arrow-left" outlined class="mb-4" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';
import Galleria from 'primevue/galleria';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Rating from 'primevue/rating';
import { ref } from 'vue';

const images = ref([
  { itemImageSrc: 'https://via.placeholder.com/800x400?text=Central+Park+1', thumbnailImageSrc: 'https://via.placeholder.com/800x400?text=Central+Park+1', alt: 'Central Park 1' },
  { itemImageSrc: 'https://via.placeholder.com/800x400?text=Central+Park+2', thumbnailImageSrc: 'https://via.placeholder.com/800x400?text=Central+Park+2', alt: 'Central Park 2' },
  { itemImageSrc: 'https://via.placeholder.com/800x400?text=Central+Park+3', thumbnailImageSrc: 'https://via.placeholder.com/800x400?text=Central+Park+3', alt: 'Central Park 3' }
]);
const activeIndex = ref(0);
const responsiveOptions = ref([
  { breakpoint: '1024px', numVisible: 5 },
  { breakpoint: '768px', numVisible: 3 },
  { breakpoint: '560px', numVisible: 1 }
]);
const displayCustom = ref(false);

const reviews = ref([
  { id: 1, author: 'Alice', comment: 'Beautiful park!', rating: 5, date: '2025-06-20' },
  { id: 2, author: 'Bob', comment: 'Great for families.', rating: 4, date: '2025-06-18' },
  { id: 3, author: 'Charlie', comment: 'Nice place to relax.', rating: 4, date: '2025-06-17' },
  { id: 4, author: 'David', comment: 'A bit crowded on weekends.', rating: 3, date: '2025-06-16' }
]);
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const imageClick = (index) => {
  activeIndex.value = index;
  displayCustom.value = true;
};

const newReview = ref({ author: '', rating: 0, comment: '' });
function submitReview() {
  if (!newReview.value.author || !newReview.value.rating || !newReview.value.comment) return;
  reviews.value.unshift({
    id: Date.now(),
    author: newReview.value.author,
    rating: newReview.value.rating,
    comment: newReview.value.comment,
    date: new Date().toISOString().slice(0, 10)
  });
  newReview.value = { author: '', rating: 0, comment: '' };
}
</script>
<style scoped>
.yellow-stars .p-rating-icon.pi-star-fill {
  color: #facc15 !important;
  /* Tailwind yellow-400 */
}
</style>
