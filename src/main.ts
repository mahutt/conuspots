import {
  campusesToFeatureCollection,
  buildingsToFeatureCollection,
} from './lib/adapters'
import { isBuildingLayer, isCampusLayer, MapLayer } from './lib/layers'
import { MapSource } from './lib/sources'
import { campuses, buildings } from './lib/spots'
import { Colour, Zoom } from './lib/types'
import './style.css'

import mapboxgl, { MapMouseEvent, type GeoJSONFeature } from 'mapbox-gl'

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
  map.addSource(MapSource.Buildings, {
    type: 'geojson',
    data: buildingsToFeatureCollection(buildings),
  })

  map.addLayer({
    id: MapLayer.BuildingFill,
    type: 'fill',
    source: MapSource.Buildings,
    paint: {
      'fill-color': [
        'case',
        ['get', 'selected'],
        Colour.Selected,
        Colour.Primary,
      ],
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

  map.addLayer({
    id: MapLayer.BuildingLabels,
    type: 'symbol',
    source: MapSource.Buildings,
    layout: {
      'text-field': ['get', 'ref'],
      'text-size': 12,
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-allow-overlap': true,
    },
    paint: {
      'text-color': [
        'case',
        ['get', 'selected'],
        Colour.Selected,
        Colour.Primary,
      ],
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        Zoom.Campus,
        0,
        Zoom.Building,
        1,
      ],
    },
  })

  map.addSource(MapSource.Campuses, {
    type: 'geojson',
    data: campusesToFeatureCollection(campuses),
  })

  map.addLayer({
    id: MapLayer.CampusFill,
    type: 'fill',
    source: MapSource.Campuses,
    paint: {
      'fill-color': [
        'case',
        ['get', 'selected'],
        Colour.Selected,
        Colour.Primary,
      ],
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
      'text-color': [
        'case',
        ['get', 'selected'],
        Colour.Selected,
        Colour.Primary,
      ],
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

  // Adding hover effect over fill layers only for simplicity
  const fillLayers = [MapLayer.BuildingFill, MapLayer.CampusFill]
  fillLayers.forEach((layer) => {
    map.on('mouseenter', layer, () => {
      if (isBuildingLayer(layer) && map.getZoom() > Zoom.Campus) {
        map.getCanvas().style.cursor = 'pointer'
      } else if (isCampusLayer(layer) && map.getZoom() < Zoom.Building) {
        map.getCanvas().style.cursor = 'pointer'
      }
    })

    map.on('mouseleave', layer, () => {
      if (isBuildingLayer(layer) && map.getZoom() > Zoom.Campus) {
        map.getCanvas().style.cursor = ''
      } else if (isCampusLayer(layer) && map.getZoom() < Zoom.Building) {
        map.getCanvas().style.cursor = ''
      }
    })
  })

  map.on('click', (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: Object.values(MapLayer),
    })

    const buildingBucket: GeoJSONFeature[] = []
    const campusBucket: GeoJSONFeature[] = []

    for (const feature of features) {
      if (isBuildingLayer(feature.layer!.id)) {
        buildingBucket.push(feature)
      } else if (isCampusLayer(feature.layer!.id)) {
        campusBucket.push(feature)
      }
    }

    let selectedFeature: GeoJSONFeature | null = null
    let selectedSource: MapSource | null = null

    for (const feature of [...buildingBucket, ...campusBucket]) {
      const layer = feature.layer!.id
      if (isBuildingLayer(layer) && map.getZoom() > Zoom.Campus) {
        selectedFeature = feature
        selectedSource = MapSource.Buildings
        break
      } else if (isCampusLayer(layer) && map.getZoom() < Zoom.Building) {
        selectedFeature = feature
        selectedSource = MapSource.Campuses
        break
      }
    }

    const buildingSource = map.getSource(
      MapSource.Buildings,
    ) as mapboxgl.GeoJSONSource
    const campusSource = map.getSource(
      MapSource.Campuses,
    ) as mapboxgl.GeoJSONSource

    if (!selectedFeature || !selectedSource) {
      // reset both sources
      buildingSource.setData(buildingsToFeatureCollection(buildings))
      campusSource.setData(campusesToFeatureCollection(campuses))
      return
    }

    if (selectedSource === MapSource.Buildings) {
      buildingSource.setData(
        buildingsToFeatureCollection(
          buildings,
          selectedFeature.properties?.ref,
        ),
      )
      campusSource.setData(
        campusesToFeatureCollection(campuses, selectedFeature.properties?.ref),
      )
    } else if (selectedSource === MapSource.Campuses) {
      buildingSource.setData(buildingsToFeatureCollection(buildings))
      campusSource.setData(
        campusesToFeatureCollection(campuses, selectedFeature.properties?.ref),
      )
    }
  })
})
