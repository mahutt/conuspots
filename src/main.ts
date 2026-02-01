import {
  campusesToFeatureCollection,
  spotsToFeatureCollection,
} from './lib/adapters'
import { loyCampus, sgwCampus, spots } from './lib/spots'
import { Colour, MapLayer, MapSource, Zoom } from './lib/types'
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
  center: [-73.6067965246496, 45.48281403704806],
  style: 'mapbox://styles/mapbox/standard',
  zoom: Zoom.Default,
})

map.on('style.load', () => {
  map.setConfigProperty('basemap', 'theme', 'monochrome')
})

map.on('load', () => {
  map.addSource(MapSource.Spots, {
    type: 'geojson',
    data: spotsToFeatureCollection(spots),
  })

  map.addLayer({
    id: MapLayer.BuildingAreaFill,
    type: 'fill',
    source: MapSource.Spots,
    paint: {
      'fill-color': Colour.Primary,
      'fill-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        Zoom.Campus,
        0,
        Zoom.Building,
        0.4,
      ],
    },
  })

  map.addSource(MapSource.Campuses, {
    type: 'geojson',
    data: campusesToFeatureCollection([sgwCampus, loyCampus]),
  })

  map.addLayer({
    id: MapLayer.CampusesFill,
    type: 'fill',
    source: MapSource.Campuses,
    paint: {
      'fill-color': Colour.Primary,
      'fill-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        Zoom.Campus,
        0.2,
        Zoom.Building,
        0,
      ],
    },
  })

  map.addLayer({
    id: MapLayer.CampusLabels,
    type: 'symbol',
    source: MapSource.Campuses,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 16,
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    },
    paint: {
      'text-color': Colour.Primary,
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        Zoom.Campus,
        1,
        Zoom.Building,
        0,
      ],
    },
  })
})
