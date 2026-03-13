import mapboxgl from 'mapbox-gl'
import type AppState from '../lib/app-state'
import type Subscriber from '../lib/subscriber'
import { type Building, type Classroom } from '../lib/types'
import { capitalize } from '../lib/utils'
import type MapboxMap from './mapbox-map.component'
import { bbox } from '@turf/turf'
import { isBuilding, isClassroom } from '../lib/type-guards'

export default class InfoCard implements Subscriber {
  private mapboxMap: MapboxMap
  private location: Classroom | Building | null
  private popup: mapboxgl.Popup | null

  constructor(mapboxMap: MapboxMap) {
    this.mapboxMap = mapboxMap
    this.location = null
    this.popup = null
    this.render()
  }

  public update(state: AppState) {
    const { selectedLocation } = state

    if (
      !selectedLocation ||
      isClassroom(selectedLocation) ||
      isBuilding(selectedLocation)
    ) {
      this.location = selectedLocation
    } else {
      this.location = null
    }

    this.render()
  }

  public setMapboxMap(mapboxMap: MapboxMap) {
    this.mapboxMap = mapboxMap
    this.render()
  }

  private render() {
    this.popup?.remove()

    if (!this.location) {
      this.popup = null
      return
    }

    const polygon = isClassroom(this.location)
      ? this.location.building.polygon
      : this.location.polygon

    const [minLng, minLat, maxLng, maxLat] = bbox(polygon)
    const lngLat: [number, number] = [
      (minLng + maxLng) / 2,
      (minLat + maxLat) / 2,
    ]

    this.popup = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
    })
      .setHTML(this.generatePopupHTML())
      .setLngLat(lngLat)
      .addTo(this.mapboxMap.getMap())
  }

  private generatePopupHTML() {
    if (!this.location) return ''

    return `
      <div class="font-medium">${this.location.name}</div>
      <div class="text-gray-500 text-xs">${this.location.ref} • ${capitalize(this.location.type)}</div>
    `
  }
}
