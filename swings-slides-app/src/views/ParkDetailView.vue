<template>
  <Card>
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Park Images Galleria with Thumbnails and Fullscreen -->
        <div class="mb-4 flex flex-col items-center">
          <Galleria
            v-model:activeIndex="activeIndex"
            v-model:visible="displayCustom"
            :value="parkImages"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            containerStyle="max-width: 850px"
            :circular="true"
            :fullScreen="true"
            :showItemNavigators="true"
            :showThumbnails="false"
          >
            <template #item="slotProps">
              <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block; border-radius: 1rem; max-height: 400px; object-fit: cover;" />
            </template>
          </Galleria>
          <div v-if="parkImages" class="grid grid-cols-3 gap-2 mt-4" style="max-width: 400px">
            <div v-for="(image, index) in parkImages" :key="index">
              <img :src="image.thumbnailImageSrc" :alt="image.alt" style="cursor: pointer; border-radius: 0.5rem;" @click="imageClick(index)" />
            </div>
          </div>
        </div>
        <!-- Park Info -->
        <ParkInfoPanel
          :item="park"
          :fields="parkInfoFields"
          nameKey="name"
          ratingKey="rating"
          class="flex flex-col justify-between gap-6"
        />
      </div>

      <!-- Tabs -->
      <div class="mt-10 relative z-0">
        <TabView>
          <TabPanel v-for="tab in park.tabs" :key="tab.header" :header="tab.header">
            <component :is="tab.component" v-bind="tab.props" />
          </TabPanel>
        </TabView>
        <!-- Related Parks absolutely positioned below TabView -->
        <div class="relative z-10" style="margin-top:8rem;">
          <div class="mt-16">
            <RelatedList
              :items="relatedParks"
              title="Same Parks Nearby"
              imageKey="image"
              nameKey="name"
              locationKey="location"
              ratingKey="rating"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              card-class="rounded-t-xl h-32 w-full object-cover"
              title-class="text-2xl font-semibold mb-4"
              :customCard="null"  
              @view-details="(item) => $emit('view-details', item)"
            />
          </div>
        </div>
      </div>

      <div class="mb-6">
        <Button label="Back to Parks" icon="pi pi-arrow-left" @click="goBack" outlined class="mb-4" />
      </div>
    </template>
  </Card>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router';
import ParkInfoPanel from '@/components/ParkInfoPanel.vue';

const route = useRoute();
const router = useRouter();

const parks = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const response = await fetch('/api/parks'); // Example endpoint
  if (response.ok) {
    parks.value = await response.json();
  } else {
    parks.value = [];
  }
  loading.value = false;
});

const park = computed(() => {
  const id = Number(route.params.id);
  return parks.value.find(p => p.id === id) || parks.value[0] || {};
});

const relatedParks = computed(() => {
if (!park.value.name) return [];
  return parks.value.filter(p =>
    p.id !== park.value.id &&
    p.name && park.value.name &&
    p.name.toLowerCase() === park.value.name.toLowerCase()
  );
});

function goBack() {
  router.push({ name: 'parks' });
}

const activeIndex = ref(0);
const displayCustom = ref(false);
const responsiveOptions = ref([
  { breakpoint: '1024px', numVisible: 5 },
  { breakpoint: '768px', numVisible: 3 },
  { breakpoint: '560px', numVisible: 1 }
]);

const parkImages = computed(() => {
  if (!park.value.images) return [];
  return park.value.images.map((url, i) => ({
    itemImageSrc: url,
    thumbnailImageSrc: url,
    alt: `${park.value.name} Image ${i + 1}`
  }));
});

const imageClick = (index) => {
  activeIndex.value = index;
  displayCustom.value = true;
};

const parkInfoFields = [
  { icon: 'pi pi-map-marker text-primary', valueKey: 'location', label: 'Location' },
  { icon: 'pi pi-clock text-primary', valueKey: 'hours', label: 'Hours' },
  { icon: 'pi pi-tree text-primary', valueKey: 'size', label: 'Size', format: (val) => val ? `${val} acres` : '-' },
  { icon: 'pi pi-sun text-yellow-500', valueKey: 'weather', label: 'Weather', format: (val) => val ? `${val.temperature}°C, ${val.condition}` : '-' },
  { icon: 'pi pi-cloud text-blue-500', valueKey: 'airQuality', label: 'Air Quality', format: (val) => val ? `${val.status} (AQI ${val.index})` : '-' },
  { icon: 'pi pi-compass text-green-600', valueKey: 'distanceFromUserKm', label: 'Distance', format: (val) => val ? `${val} km from you` : '-' },
];
</script>

<style scoped>
</style>
