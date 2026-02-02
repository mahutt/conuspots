import type { Campus, Building } from './types'

export function campusToFeature(
  campus: Campus,
  selectedRef: string | null = null,
): GeoJSON.Feature {
  return {
    type: 'Feature',
    properties: {
      name: campus.name,
      ref: campus.ref,
      selected: campus.ref === selectedRef,
    },
    geometry: campus.polygon,
  }
}

export function campusesToFeatureCollection(
  campuses: Campus[],
  selectedRef: string | null = null,
): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: campuses.map((campus) => campusToFeature(campus, selectedRef)),
  }
}

export function buildingToFeature(
  building: Building,
  selectedRef: string | null = null,
): GeoJSON.Feature {
  return {
    type: 'Feature',
    properties: {
      name: building.name,
      ref: building.ref,
      selected: building.ref === selectedRef,
    },
    geometry: building.polygon,
  }
}

export function buildingsToFeatureCollection(
  buildings: Building[],
  selectedRef: string | null = null,
): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: buildings.map((building) =>
      buildingToFeature(building, selectedRef),
    ),
  }
}
