<template>
  <Card>
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Images Galleria -->
        <div class="mb-4 flex flex-col items-center">
          <Galleria
            v-model:activeIndex="activeIndex"
            v-model:visible="displayCustom"
            :value="images"
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
          <div v-if="images" class="grid grid-cols-3 gap-2 mt-4" style="max-width: 400px">
            <div v-for="(image, index) in images" :key="index">
              <img :src="image.thumbnailImageSrc" :alt="image.alt" style="cursor: pointer; border-radius: 0.5rem;" @click="imageClick(index)" />
            </div>
          </div>
        </div>
        <!-- Info Panel -->
        <ParkInfoPanel
          :item="entity"
          :fields="fields"
          :nameKey="nameKey"
          :ratingKey="ratingKey"
          :statusKey="statusKey"
          :statusSeverity="statusSeverity"
        >
          <template #actions="slotProps">
            <slot name="actions" v-bind="slotProps" />
          </template>
        </ParkInfoPanel>
      </div>

      <!-- Tabs -->
      <div class="mt-10 relative z-0">
        <TabView v-if="tabs && tabs.length">
          <TabPanel v-for="tab in tabs" :key="tab.header" :header="tab.header">
            <component :is="tab.component" v-bind="tab.props" />
          </TabPanel>
        </TabView>
        <!-- Related List -->
        <div v-if="relatedItems && relatedItems.length" class="relative z-10" style="margin-top:8rem;">
          <div class="mt-16">
            <RelatedList
              :items="relatedItems"
              :title="relatedTitle"
              :imageKey="relatedImageKey"
              :nameKey="relatedNameKey"
              :locationKey="relatedLocationKey"
              :ratingKey="relatedRatingKey"
              :class="relatedListClass"
              :card-class="relatedCardClass"
              :title-class="relatedTitleClass"
              :customCard="relatedCustomCard"
              @view-details="$emit('view-details', $event)"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import Galleria from 'primevue/galleria';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import ParkInfoPanel from '@/components/ParkInfoPanel.vue';
import RelatedList from '@/components/RelatedList.vue';

const props = defineProps({
  entity: { type: Object, required: true },
  images: { type: Array, default: () => [] },
  fields: { type: Array, required: true },
  nameKey: { type: String, default: 'name' },
  ratingKey: { type: String, default: 'rating' },
  statusKey: { type: String, default: '' },
  statusSeverity: { type: Function, default: null },
  tabs: { type: Array, default: () => [] },
  relatedItems: { type: Array, default: () => [] },
  relatedTitle: { type: String, default: '' },
  relatedImageKey: { type: String, default: 'image' },
  relatedNameKey: { type: String, default: 'name' },
  relatedLocationKey: { type: String, default: 'location' },
  relatedRatingKey: { type: String, default: 'rating' },
  relatedListClass: { type: String, default: '' },
  relatedCardClass: { type: String, default: '' },
  relatedTitleClass: { type: String, default: '' },
  relatedCustomCard: { type: [Object, Function], default: null },
});

const activeIndex = ref(0);
const displayCustom = ref(false);
const responsiveOptions = ref([
  { breakpoint: '1024px', numVisible: 5 },
  { breakpoint: '768px', numVisible: 3 },
  { breakpoint: '560px', numVisible: 1 }
]);

function imageClick(index) {
  activeIndex.value = index;
  displayCustom.value = true;
}
</script>
