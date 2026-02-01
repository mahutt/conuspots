import type { Polygon } from 'geojson'

export enum MapSource {
  Spots = 'spots',
  Campuses = 'campuses',
}

export enum MapLayer {
  BuildingAreaFill = 'building-area-fill',
  CampusesFill = 'campuses-fill',
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
  spots: Spot[]
  polygon: Polygon
}

export interface Spot {
  name: string
  polygon: Polygon
}
