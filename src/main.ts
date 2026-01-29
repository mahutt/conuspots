import './style.css'

import mapboxgl from 'mapbox-gl'

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error('Missing Mapbox access token')
}
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

const mapContainer = document.getElementById('map')
if (!mapContainer) {
  throw new Error('Missing map container element')
}

const map = new mapboxgl.Map({
  container: mapContainer,
  center: [-74.5, 40],
  style: 'mapbox://styles/mapbox/standard',
  zoom: 9,
})

map.on('style.load', () => {
  map.setConfigProperty('basemap', 'theme', 'monochrome')
})
