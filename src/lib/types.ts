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

export interface Campus {
  name: string
  ref: string
  buildings: Building[]
  polygon: Polygon
}

export interface Building {
  name: string
  ref: string
  polygon: Polygon
}
