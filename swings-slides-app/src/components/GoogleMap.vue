
<template>
    <Card class="border-surface-200 dark:border-surface-700 rounded-xl m-2 p-4 shadow-md transform scale-95 transition-transform duration-300">
        <template #title class="m-0 font-bold text-[30px]">Location</template>
        <template #content>
         <div ref="map" class="w-full h-[300px] rounded shadow"></div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const map = ref<HTMLElement | null>(null)

const apiKey = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg' // Dev/Test only!

const markers = [
  { lat: 41.3851, lng: 2.1734, title: 'Hola Barcelona!', icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
  { lat: 41.39, lng: 2.16, title: 'Custom 1', icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
  { lat: 41.38, lng: 2.18, title: 'Custom 2', icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
  { lat: 41.387, lng: 2.17, title: 'Custom 3', icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' },
  { lat: 41.384, lng: 2.175, title: 'Custom 4', icon: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png' }
]

declare global {
  interface Window {
    google: any;
  }
}
onMounted(async () => {
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

  const { Map: GoogleMap } = await window.google.maps.importLibrary('maps')
  const center = { lat: 41.3851, lng: 2.1734 }

  if (!map.value) return

  const gmap = new GoogleMap(map.value, {
    center,
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  })

markers.forEach(({ lat, lng, title, icon }) => {
  const _ = new window.google.maps.Marker({
    position: { lat, lng },
    map: gmap,
    title,
    icon: {
      url: icon,
      scaledSize: new window.google.maps.Size(32, 32),
    },
  })
})
})

</script>
