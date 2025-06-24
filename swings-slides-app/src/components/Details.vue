<template>
  <Card>
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
          <div v-if="images && images.length" class="grid grid-cols-6 gap-2 max-w-xs md:max-w-lg">
            <div v-for="(image, index) of images" :key="index">
              <img
                :src="image.thumbnailImageSrc"
                :alt="image.alt"
                class="w-24 h-24 min-w-24 min-h-24 max-w-24 max-h-24 md:w-32 md:h-32 md:min-w-32 md:min-h-32 md:max-w-32 md:max-h-32 cursor-pointer rounded object-cover border border-gray-200 dark:border-gray-700 transition-transform duration-200 hover:scale-105"
                @click="imageClick(index)"
              />
            </div>
          </div>
        </div>
        <!-- Park Info -->
        <div class="flex flex-col justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold mb-2" style="margin-bottom: 1rem;">{{ parkInfo.name }}</h1>
            <Tag v-if="parkInfo.status" :value="parkInfo.status.text" :severity="parkInfo.status.severity" class="mb-3" />
            <div class="flex flex-col gap-2 text-gray-700 dark:text-gray-200" style="margin-top: 1rem;">
              <template v-for="(item, idx) in parkInfoRows" :key="idx">
                <p v-if="!item.tag" class="flex items-center gap-2">
                  <i :class="item.icon + ' ' + (item.iconColor || '')"></i>
                  <span class="ml-2">{{ item.label }}<template v-if="item.value">: {{ item.value }}</template></span>
                </p>
                <p v-else class="flex items-center gap-2">
                  <i :class="item.icon + ' ' + (item.iconColor || '')"></i>
                  <span class="ml-2">{{ item.label }}
                    <Tag :value="item.tag.text" :severity="item.tag.severity" class="ml-1" />
                  </span>
                </p>
              </template>
              <div class="flex flex-col gap-1 mt-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Average rating:</span>
                  <Rating v-model="parkRating" readonly :cancel="false" class="!mt-0" />
                  <span class="text-xs text-gray-400 dark:text-gray-500">({{ parkRating.toFixed(1) }})</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex gap-3">
            <Button label="Add to Favorites" icon="pi pi-heart" outlined @click="$emit('add-favorite', parkInfo)" />
            <Button label="Plan Visit" icon="pi pi-calendar" @click="$emit('plan-visit', parkInfo)" />
          </div>
        </div>
      </div>
      <div class="mt-10 relative z-0">
        <TabView :scrollable="true">
          <TabPanel header="Description" :value="'description'">
            <div>{{ parkInfo.description }}</div>
          </TabPanel>
          <TabPanel header="Reviews" :value="'reviews'">
            <div v-if="reviews && reviews.length"
              class="w-full bg-white dark:bg-gray-900 rounded-t-xl shadow-md divide-y divide-gray-200 dark:divide-gray-700">
              <div v-for="review in reviews" :key="review.id" class="flex gap-4 py-6 px-4 first:pt-4 last:pb-2">
                <img :src="review.avatar || ('https://i.pravatar.cc/40?u=' + review.author)" :alt="review.author"
                  class="h-10 w-10 rounded-full object-cover" />
                <div>
                  <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ review.author }}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ formatDate(review.date) }}</p>
                  <div class="flex items-center mb-2">
                    <template v-for="n in 5" :key="n">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                        :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.384-2.46a1 1 0 00-1.175 0l-3.384 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
                      </svg>
                    </template>
                  </div>
                  <p class="text-sm text-gray-700 dark:text-gray-200">{{ review.comment }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-400 dark:text-gray-500 text-sm">No reviews yet.</div>
            <hr class="border-t border-gray-200 dark:border-gray-700 my-4" />
            <ReviewForm @submit="onAddReview" />
          </TabPanel>
          <TabPanel header="Map" :value="'map'">
            <GoogleMap :location="parkInfo.location" />
          </TabPanel>
        </TabView>
        <!-- Related Parks -->
        <div class="relative z-10" style="margin-top:2rem;">
          <div class="mt-16">
            <RelatedList :items="relatedParks" title="Same Parks Nearby" imageKey="image" nameKey="name" locationKey="location"
              ratingKey="rating" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              card-class="rounded-t-xl h-32 w-full object-cover" title-class="text-2xl font-semibold mb-4"
              :customCard="null" />
          </div>
        </div>
      </div>
      <div class="mb-6" style="margin-top:1rem;">
        <Button label="Back to Parks" icon="pi pi-arrow-left" outlined class="mb-4" @click="goBack" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import { ref, computed } from 'vue';
import GoogleMap from '@/components/GoogleMap.vue';
import type { ParkInfo, ParkImage, ParkReview, ParkRelated } from '../types/park';


const props = defineProps<{
  parkInfo: ParkInfo;
  images: ParkImage[];
  reviews: ParkReview[];
  relatedParks?: ParkRelated[];
}>();

const emit = defineEmits(['add-favorite', 'plan-visit', 'go-back', 'add-review']);

const activeIndex = ref(0);
const responsiveOptions = ref([
  { breakpoint: '1024px', numVisible: 5 },
  { breakpoint: '768px', numVisible: 3 },
  { breakpoint: '560px', numVisible: 1 }
]);
const displayCustom = ref(false);

const parkInfoRows = computed(() => props.parkInfo.infoRows || []);
const parkRating = computed(() => (props.parkInfo.rating ?? 0));

const goBack = () => {
  emit('go-back');
}

const imageClick = (index: number) => {
  activeIndex.value = index;
  displayCustom.value = true;
};

const onAddReview = (review: ParkReview) => {
  emit('add-review', review);
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>
<style scoped>
.yellow-stars .p-rating-icon.pi-star-fill {
  color: #facc15 !important;
  /* Tailwind yellow-400 */
}
</style>
