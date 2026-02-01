import type { Polygon } from 'geojson'

export enum MapSource {
  Spots = 'spots',
  Campuses = 'campuses',
}

export enum MapLayer {
  BuildingFill = 'building-fill',
  BuildingLabels = 'building-labels',
  CampusFill = 'campus-fill',
  CampusLabels = 'campus-labels',
}

export enum Zoom {
  Default = 12,
  Campus = 14,
  Building = 16,
}

export enum Colour {
  Primary = '#d05351',
}

export interface Campus {
  name: string
  ref: string
  spots: Spot[]
  polygon: Polygon
}

export interface Spot {
  name: string
  ref: string
  polygon: Polygon
}
