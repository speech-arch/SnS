import type { Ref } from 'vue';

interface UseMapWindowEventsOptions {
  map: Ref<HTMLElement | null>;
  gmap: Ref<any>;
  locationMarkers: Ref<any[]>;
  filteredLocations: Ref<any[]>;
}

export function useMapWindowEvents({ map, gmap, locationMarkers, filteredLocations }: UseMapWindowEventsOptions) {
  window.scrollToMapMarker = function(productId: string) {
    const mapDiv = map.value as HTMLElement | null;
    if (mapDiv) {
      mapDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (!gmap.value || !locationMarkers.value) return;
    const idx = filteredLocations.value.findIndex((loc: any) => String(loc.id) === String(productId));
    if (idx !== -1 && locationMarkers.value[idx]) {
      const marker = locationMarkers.value[idx];
      gmap.value.panTo(marker.getPosition());
      gmap.value.setZoom(14);
      // highlightMarker logic can be extracted if needed
      marker.setIcon({
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new window.google.maps.Size(40, 40)
      });
      if (!window._markerInfoWindow) {
        window._markerInfoWindow = new window.google.maps.InfoWindow();
      }
      window._markerInfoWindow.setContent(`<b>${filteredLocations.value[idx].title}</b>`);
      window._markerInfoWindow.open(gmap.value, marker);
      setTimeout(() => {
        marker.setIcon(null);
        window._markerInfoWindow.close();
      }, 2000);
      if (marker.setAnimation) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1200);
      }
      console.log('[GoogleMap] Panned to marker for product:', productId);
    } else {
      console.warn('[GoogleMap] No marker found for product:', productId);
    }
  };
}
