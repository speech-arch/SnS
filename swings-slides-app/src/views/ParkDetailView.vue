<template>
  <Card>
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Park Images Galleria with Thumbnails and Fullscreen -->
        <div class="mb-4 flex flex-col items-center">
          <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images" :responsiveOptions="responsiveOptions" :numVisible="7"
            containerStyle="max-width: 850px" :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
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
                <Tag value="Good (AQI 42)" severity="warning" /></span>
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
          <TabPanel header="Map">
            <div>Map content goes here.</div>
          </TabPanel>
          <TabPanel header="Description">
            <div>A large public park in the city center with playgrounds and walking trails.</div>
          </TabPanel>
          <TabPanel header="Reviews">
            <div>
              <p><b>Alice:</b> Beautiful park! (5★)</p>
              <p><b>Bob:</b> Great for families. (4★)</p>
            </div>
          </TabPanel>
        </TabView>
        <!-- Related Parks absolutely positioned below TabView -->
        <div class="relative z-10" style="margin-top:8rem;">
          <div class="mt-16">
            <RelatedList
              :items="[]"
              title="Same Parks Nearby"
              imageKey="image"
              nameKey="name"
              locationKey="location"
              ratingKey="rating"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              card-class="rounded-t-xl h-32 w-full object-cover"
              title-class="text-2xl font-semibold mb-4"
              :customCard="null"  
            />
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

const imageClick = (index) => {
  activeIndex.value = index;
  displayCustom.value = true;
};
</script>
