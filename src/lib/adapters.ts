import type { Campus, Spot } from './types'

export function campusToFeature(campus: Campus): GeoJSON.Feature {
  return {
    type: 'Feature',
    properties: {
      name: campus.name,
      ref: campus.ref,
    },
    geometry: campus.polygon,
  }
}

export function campusesToFeatureCollection(
  campuses: Campus[],
): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: campuses.map(campusToFeature),
  }
}

export function spotToFeature(spot: Spot): GeoJSON.Feature {
  return {
    type: 'Feature',
    properties: {
      name: spot.name,
      ref: spot.ref,
    },
    geometry: spot.polygon,
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
