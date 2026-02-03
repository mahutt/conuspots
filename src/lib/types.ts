import type { Polygon } from 'geojson'

export enum CustomEventType {
  LocationSelected = 'location-selected',
}

export enum Zoom {
  Default = 12,
  Campus = 14,
  Building = 16,
}

export enum Colour {
  Primary = '#d05351',
  Selected = '#2563EB',
}

export enum LocationType {
  Campus = 'campus',
  Building = 'building',
}

export interface Location {
  type: LocationType
  name: string
  ref: string
}

export interface Campus extends Location {
  type: LocationType.Campus
  polygon: Polygon
  buildings: Building[]
}

export interface Building extends Location {
  type: LocationType.Building
  polygon: Polygon
}
