import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useGeolocation } from '../composables/useGeolocation';

export const useUserLocationStore = defineStore('userLocation', () => {
  const userLocation = ref<GeolocationPosition | null>(null);
  const locationError = ref<string | null>(null);
  const isLocationLoading = ref(false);
  const city: Ref<string | null> = ref(null);
  const region: Ref<string | null> = ref(null);
  const country: Ref<string | null> = ref(null);
  const ip = ref<string | null>(null);

  const setLocationState = (position: any, start?: number, source?: string) => {
    console.log('[userLocationStore] setLocationState called', { position, start, source });
    userLocation.value = position;
    isLocationLoading.value = false;
  };
  const setLocationError = (error: any, start?: number, source?: string) => {
    locationError.value = error.message || error;
    isLocationLoading.value = false;
  };

  const { getUserLocationWithWatch, getUserLocationFromIP } = useGeolocation();

  const fetchUserLocationWithWatch = () => {
    isLocationLoading.value = true;
    getUserLocationWithWatch(
      (position) => {
        setLocationState(position);
      },
      (error) => {
        setLocationError(error);
      }
    );
  };

  const fetchUserLocationFromIP = async () => {
    isLocationLoading.value = true;
    await getUserLocationFromIP(
      (data) => {
        userLocation.value = {
          coords: {
            latitude: data.latitude,
            longitude: data.longitude,
            accuracy: 10000,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            toJSON: () => ({}) // Dummy to satisfy TS
          },
          timestamp: Date.now(),
          toJSON: () => ({}) // Dummy to satisfy TS
        };
        city.value = data.city;
        region.value = data.region;
        country.value = data.country_name;
        ip.value = data.ip;
        isLocationLoading.value = false;
      },
      (err) => {
        setLocationError(err);
      }
    );
  };

  const clearUserLocation = () => {
    userLocation.value = null;
    locationError.value = null;
    isLocationLoading.value = false;
    city.value = null;
    region.value = null;
    country.value = null;
    ip.value = null;
  };

  return {
    userLocation,
    locationError,
    isLocationLoading,
    city,
    region,
    country,
    ip,
    setLocationState,
    setLocationError,
    fetchUserLocationWithWatch,
    fetchUserLocationFromIP,
    clearUserLocation
  };
});
