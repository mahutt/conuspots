import type { Polygon } from 'geojson'

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
  Classroom = 'classroom',
}

export interface Location {
  type: LocationType
  name: string
  ref: string
}

export interface Campus extends Location {
  type: LocationType.Campus
  buildings: Building[]
  polygon: Polygon
}

export interface Building extends Location {
  type: LocationType.Building
  polygon: Polygon
}

export interface Classroom extends Location {
  type: LocationType.Classroom
  building: Building
}
