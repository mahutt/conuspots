import { spotsToFeatureCollection } from './lib/adapters'
import { spots } from './lib/spots'
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
  center: [-73.58002939422165, 45.49376041794034],
  style: 'mapbox://styles/mapbox/standard',
  zoom: 9,
})

map.on('style.load', () => {
  map.setConfigProperty('basemap', 'theme', 'monochrome')
})

map.on('load', () => {
  map.addSource('spots', {
    type: 'geojson',
    data: spotsToFeatureCollection(spots),
  })

  map.addLayer({
    id: 'building-area-fill',
    type: 'fill',
    source: 'spots',
    paint: {
      'fill-color': '#d05351',
      'fill-opacity': 0.4,
    },
  })
})
