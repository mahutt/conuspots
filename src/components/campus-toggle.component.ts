import { bboxPolygon, booleanWithin } from '@turf/turf'
import { loyCampus, sgwCampus } from '../lib/locations'
import stateManager from '../lib/state-manager'
import type { Campus } from '../lib/types'
import type MapboxMap from './mapbox-map.component'

export default class CampusToggle extends HTMLElement {
  private mapboxMap: MapboxMap
  private selectedCampus: Campus | null
  private loyButton: HTMLButtonElement
  private sgwButton: HTMLButtonElement

  constructor(mapboxMap: MapboxMap) {
    super()
    this.mapboxMap = mapboxMap

    this.mapboxMap.getMap().on('moveend', () => {
      const map = this.mapboxMap.getMap()
      const bounds = map.getBounds()
      if (!bounds) return
      const boundsFeature = bboxPolygon([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ])
      const loyWithin = booleanWithin(loyCampus.polygon, boundsFeature)
      const sgwWithin = booleanWithin(sgwCampus.polygon, boundsFeature)
      if (loyWithin && sgwWithin)
        return // do nothing
      else if (loyWithin) this.setSelectedCampus(loyCampus)
      else if (sgwWithin) this.setSelectedCampus(sgwCampus)
    })

    this.selectedCampus = null

    this.classList.add(
      'flex',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-l-full',
      'rounded-r-full',
      'shadow-sm',
      'text-sm',
      'p-1',
    )

    this.loyButton = document.createElement('button')
    this.loyButton.textContent = 'LOY'
    this.loyButton.classList.add(
      'pl-3',
      'pr-2',
      'h-full',
      'text-gray-500',
      'rounded-l-full',
      'cursor-pointer',
    )
    this.loyButton.addEventListener('click', () => {
      this.setSelectedCampus(loyCampus)
      stateManager.selectedLocation = loyCampus
    })

    this.sgwButton = document.createElement('button')
    this.sgwButton.textContent = 'SGW'
    this.sgwButton.classList.add(
      'pl-2',
      'pr-3',
      'h-full',
      'text-gray-500',
      'rounded-r-full',
      'cursor-pointer',
    )
    this.sgwButton.addEventListener('click', () => {
      this.setSelectedCampus(sgwCampus)
      stateManager.selectedLocation = sgwCampus
    })

    this.appendChild(this.loyButton)
    this.appendChild(this.sgwButton)
  }

  connectedCallback() {}

  setSelectedCampus(campus: Campus | null) {
    if (this.selectedCampus === campus) return
    this.selectedCampus = campus

    if (campus === loyCampus) {
      this.loyButton.classList.add('bg-gray-200/50')
      this.loyButton.classList.remove('text-gray-500')

      this.sgwButton.classList.remove('bg-gray-200/50')
      this.sgwButton.classList.add('text-gray-500')
    } else if (campus === sgwCampus) {
      this.sgwButton.classList.add('bg-gray-200/50')
      this.sgwButton.classList.remove('text-gray-500')

      this.loyButton.classList.remove('bg-gray-200/50')
      this.loyButton.classList.add('text-gray-500')
    } else {
      this.loyButton.classList.remove('bg-gray-200/50')
      this.loyButton.classList.add('text-gray-500')
      this.sgwButton.classList.remove('bg-gray-200/50')
      this.sgwButton.classList.add('text-gray-500')
    }
  }
}

customElements.define('campus-toggle', CampusToggle)
