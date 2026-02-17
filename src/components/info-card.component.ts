import mapboxgl from 'mapbox-gl'
import type AppState from '../lib/app-state'
import type Subscriber from '../lib/subscriber'
import { type Building } from '../lib/types'
import { capitalize } from '../lib/utils'
import type MapboxMap from './mapbox-map.component'
import { bbox } from '@turf/turf'
import { isBuilding } from '../lib/type-guards'

export default class InfoCard extends HTMLElement implements Subscriber {
  private mapboxMap: MapboxMap
  private location: Building | null
  private marker: mapboxgl.Marker | null

  constructor(mapboxMap: MapboxMap) {
    super()
    this.mapboxMap = mapboxMap
    this.location = null
    this.marker = null

    this.classList.add(
      'fixed',
      'p-4',
      'flex',
      'flex-col',
      'bg-white',
      'shadow-sm',
      'rounded-xl',
      'max-w-xs',
    )
    this.render()
  }

  connectedCallback() {}

  public update(state: AppState) {
    const { selectedLocation } = state

    if (!selectedLocation || isBuilding(selectedLocation)) {
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
    if (!this.location) {
      this.marker?.remove()
      this.marker = null
      return
    }

    this.innerHTML = `
      <div class="font-medium">${this.location.name}</div>
      <div class="text-gray-500 text-xs">${this.location.ref} • ${capitalize(this.location.type)}</div>
    `

    const [, minLat, maxLng, maxLat] = bbox(this.location.polygon)
    const lngLat: [number, number] = [maxLng, (minLat + maxLat) / 2]
    this.marker = new mapboxgl.Marker({
      element: this,
      anchor: 'left',
      offset: [10, 0],
    })
      .setLngLat(lngLat)
      .addTo(this.mapboxMap.getMap())
  }
}

customElements.define('info-card', InfoCard)
