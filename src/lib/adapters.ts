import type { Spot } from './types'

export function spotToFeature(spot: Spot): GeoJSON.Feature {
  return {
    type: 'Feature',
    properties: {
      name: spot.name,
    },
    geometry: {
      type: 'Polygon',
      coordinates: spot.polygonCoordinates,
    },
  }
}

export function spotsToFeatureCollection(
  spots: Spot[],
): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: spots.map(spotToFeature),
  }
}
