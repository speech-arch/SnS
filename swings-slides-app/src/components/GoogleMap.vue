<template>
    <Card class="card border-surface-200 dark:border-surface-700 rounded-xl m-2 mt-0 p-4 shadow-md transform scale-100 transition-transform duration-300">
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
import { computed, ref, watch, onMounted, toRefs } from 'vue';
import { getDistanceKm, setUserMarkerAndCenter, addLocationMarkers } from '../composables/useMapUtils';
import { useMapWindowEvents } from '../composables/useMapWindowEvents';
import Card from 'primevue/card';

const props = defineProps<{ filteredProducts?: any[] }>();

const locations = [
  { id: '1', lat: 41.6176, lng: 0.6200, title: 'Lleida City Park' },
  { id: '5', lat: 41.6167, lng: 0.6222, title: 'Lleida Playground' },
  { id: '2', lat: 41.6185, lng: 0.6290, title: 'Lleida Riverside' },
  { id: '3', lat: 41.6200, lng: 0.6300, title: 'Lleida Gardens' },
  { id: '4', lat: 41.6100, lng: 0.6400, title: 'Lleida Sports Area' },
];

const map = ref<HTMLElement | null>(null);
const userLocationStore = useUserLocationStore();
const { userLocation } = storeToRefs(userLocationStore);

const apiKey = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg' // Dev/Test only!

const userMarker = ref<any>(null);
const locationMarkers = ref<any[]>([]);


const filteredLocations = computed(() => {
  // If filteredProducts is passed as a prop, use it to filter locations
  if (props.filteredProducts && props.filteredProducts.length > 0) {
    // Only show locations that match filtered products by id
    const ids = props.filteredProducts.map(p => String(p.id));
    return locations.filter(loc => ids.includes(String(loc.id)));
  }
  // Fallback: filter by user location (legacy behavior)
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
    gmap.value.setCenter(DEFAULT_CENTER);
    if (userMarker.value) {
      userMarker.value.setMap(null);
      userMarker.value = null;
    }
  }
  addLocationMarkersWithClick(gmap.value, locationMarkers, filteredLocations.value, scrollToProduct);
};

function scrollToProduct(productIdOrIndex: string | number) {
  const el = document.getElementById(`product-card-${productIdOrIndex}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('ring-2', 'ring-blue-400');
    setTimeout(() => el.classList.remove('ring-2', 'ring-blue-400'), 1200);
  }
}

function addLocationMarkersWithClick(map: any, markersRef: any, locations: any[], onMarkerClick: (id: string | number) => void) {
  if (markersRef.value && Array.isArray(markersRef.value)) {
    markersRef.value.forEach((m: any) => m.setMap(null));
  }
  markersRef.value = [];
  locations.forEach((loc, idx) => {
    const marker = new window.google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.title,
    });
    marker.addListener('click', () => {
      onMarkerClick((loc as any).id ?? idx);
    });
    markersRef.value.push(marker);
  });
}

const initializeMap = async () => {
  await loadGoogleMapsApi();
  gmap.value = createMapInstance();
  setupInitialMarkers();
};

onMounted(() => {
  initializeMap();
});

watch(filteredLocations, (newLocs) => {
  addLocationMarkersWithClick(gmap.value, locationMarkers, newLocs, scrollToProduct);
});

watch(userLocation, (newLoc) => {
  updateMapCenterAndMarkers();
});

useMapWindowEvents({
  map,
  gmap,
  locationMarkers,
  filteredLocations,
});
</script>

<style scoped>
</style>

<script lang="ts">
declare global {
  interface Window {
    google: any;
    scrollToMapMarker?: (productId: string) => void;
    _markerInfoWindow?: any;
  }
}
</script>
