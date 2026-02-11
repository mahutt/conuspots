import { type Location } from '../lib/types'
import { capitalize } from '../lib/utils'

export class SearchDropdownItem extends HTMLElement {
  private location: Location
  private selectCallback: () => void

  constructor(location: Location, selectCallback: () => void) {
    super()
    this.location = location
    this.selectCallback = selectCallback
    this.addEventListener('click', this.selectCallback)
    this.classList.add(
      'block',
      'px-3',
      'py-3',
      'hover:bg-gray-100', // renders as unhighlighted by default
      'cursor-pointer',
      'text-sm',
      'rounded-xl',
      'flex',
      'flex-col',
    )

    const nameDiv = document.createElement('div')
    nameDiv.textContent = location.name
    nameDiv.classList.add('font-medium')
    this.appendChild(nameDiv)

    const detailsDiv = document.createElement('div')
    detailsDiv.textContent = `${location.ref} • ${capitalize(location.type)}`
    detailsDiv.classList.add('text-gray-500', 'text-xs')
    this.appendChild(detailsDiv)
  }

  connectedCallback() {}

  public highlight() {
    this.classList.add('bg-blue-100/40')
    this.classList.remove('hover:bg-gray-100')
  }

  public unhighlight() {
    this.classList.remove('bg-blue-100/40')
    this.classList.add('hover:bg-gray-100')
  }

  public getLocation() {
    return this.location
  }
}

customElements.define('search-dropdown-item', SearchDropdownItem)
