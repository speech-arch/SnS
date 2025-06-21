<template>
    <Card class="border-surface-200 dark:border-surface-700 rounded-xl m-2 p-4 shadow-md transform scale-95 transition-transform duration-300">
        <template #title class="m-0 font-bold text-[30px]">Location</template>
        <template #content>
         <div class="relative w-full h-[300px] rounded shadow">
          <div ref="map" class="w-full h-full rounded"></div>
          <div v-if="userLocationStore.isLocationLoading" class="absolute inset-0 flex items-center justify-center bg-black opacity-20">
            <MapLoader />
          </div>
          <div v-else-if="!userLocation || !userLocation.coords" class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="bg-white/80 dark:bg-black/80 rounded p-4 shadow text-center text-red-700 dark:text-red-300 text-sm font-semibold">
              Unable to access your location. Showing default map view.
            </div>
          </div>
         </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { useUserLocationStore } from '../stores/userLocation';
import { computed, ref, watch, onMounted } from 'vue';
import { getDistanceKm, setUserMarkerAndCenter, addLocationMarkers } from '../composables/useMapUtils';

const locations = [
  { lat: 41.6176, lng: 0.6200, title: 'Lleida City Park' },
  { lat: 41.6167, lng: 0.6222, title: 'Lleida Playground' },
  { lat: 41.6185, lng: 0.6290, title: 'Lleida Riverside' },
  { lat: 41.6200, lng: 0.6300, title: 'Lleida Gardens' },
  { lat: 41.6100, lng: 0.6400, title: 'Lleida Sports Area' },
];

const map = ref<HTMLElement | null>(null);
const userLocationStore = useUserLocationStore();
const { userLocation } = storeToRefs(userLocationStore);

const apiKey = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg' // Dev/Test only!

const userMarker = ref<any>(null);
const locationMarkers = ref<any[]>([]);


const filteredLocations = computed(() => {
  if (!userLocation.value || !userLocation.value.coords) return [];
  const { latitude, longitude } = userLocation.value.coords;
  return locations.filter(loc => getDistanceKm(latitude, longitude, loc.lat, loc.lng) <= 30);
});

const gmap = ref<any>(null);
const DEFAULT_CENTER = { lat: 41.3851, lng: 2.1734 };

const setupInitialMarkers = () => {
  if (userLocation.value && userLocation.value.coords) {
    setUserMarkerAndCenter(gmap.value, userMarker, userLocation.value.coords.latitude, userLocation.value.coords.longitude);
  }
  addLocationMarkers(gmap.value, locationMarkers, filteredLocations.value);
};

const loadGoogleMapsApi = async () => {
  if (!window.google || !window.google.maps) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps&v=beta`
      script.async = true
      script.onload = () => resolve(null)
      script.onerror = () => reject(new Error('Google Maps failed to load'))
      document.head.appendChild(script)
    })
  }
};

const createMapInstance = () => {
  let center = DEFAULT_CENTER;
  if (userLocation.value && userLocation.value.coords) {
    center = {
      lat: userLocation.value.coords.latitude,
      lng: userLocation.value.coords.longitude
    };
  }
  if (!map.value) return null;
  const GoogleMap = window.google.maps.Map;
  const mapInstance = new GoogleMap(map.value, {
    center,
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });
  return mapInstance;
};

const updateMapCenterAndMarkers = () => {
  if (!gmap.value) return;
  if (userLocation.value && userLocation.value.coords) {
    setUserMarkerAndCenter(gmap.value, userMarker, userLocation.value.coords.latitude, userLocation.value.coords.longitude);
  } else {
    // No user location: center to default and remove user marker
    gmap.value.setCenter(DEFAULT_CENTER);
    if (userMarker.value) {
      userMarker.value.setMap(null);
      userMarker.value = null;
    }
  }
  addLocationMarkers(gmap.value, locationMarkers, filteredLocations.value);
};

const initializeMap = async () => {
  await loadGoogleMapsApi();
  gmap.value = createMapInstance();
  setupInitialMarkers();
};

onMounted(() => {
  initializeMap();
});

watch(filteredLocations, (newLocs) => {
  addLocationMarkers(gmap.value, locationMarkers, newLocs);
});

watch(userLocation, (newLoc) => {
  updateMapCenterAndMarkers();
});

// Optionally, show a message if user location fails
</script>

<style scoped>
</style>

<!-- Add this global type declaration to fix TypeScript errors about 'google' not existing on type Window -->
<script lang="ts">
declare global {
  interface Window {
    google: any;
  }
}
</script>
