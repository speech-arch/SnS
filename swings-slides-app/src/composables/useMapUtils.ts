export const getDistanceKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const setUserMarkerAndCenter = (
  gmap: any,
  userMarkerRef: { value: any },
  lat: number,
  lng: number
) => {
  const latLng = { lat, lng };
  if (gmap) {
    gmap.setCenter(latLng);
    if (userMarkerRef.value) {
      userMarkerRef.value.setPosition(latLng);
    } else {
      userMarkerRef.value = new window.google.maps.Marker({
        position: latLng,
        map: gmap,
        title: 'You are here',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });
    }
  }
};

export const addLocationMarkers = (
  gmap: any,
  locationMarkersRef: { value: any[] },
  locationsToAdd: Array<{ lat: number; lng: number; title?: string }>
) => {
  // Remove old markers
  locationMarkersRef.value.forEach(m => m.setMap(null));
  locationMarkersRef.value = [];
  if (gmap) {
    locationsToAdd.forEach(loc => {
      const marker = new window.google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: gmap,
        title: loc.title || 'Nearby Location',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });
      locationMarkersRef.value.push(marker);
    });
  }
};

