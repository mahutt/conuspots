import { type Position } from 'geojson'

export interface Spot {
  name: string
  polygonCoordinates: Position[][]
}
