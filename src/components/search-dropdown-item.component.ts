import searchHistory from '../lib/search-history'
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
      'p-3',
      'hover:bg-gray-100', // renders as unhighlighted by default
      'cursor-pointer',
      'text-sm',
      'rounded-xl',
      'flex',
      'flex-row',
      'justify-between',
      'items-center',
      'gap-2',
    )

    const infoContainer = document.createElement('div')
    infoContainer.classList.add('flex', 'flex-col')

    const nameDiv = document.createElement('div')
    nameDiv.textContent = location.name
    nameDiv.classList.add('font-medium')
    infoContainer.appendChild(nameDiv)

    const detailsDiv = document.createElement('div')
    detailsDiv.textContent = `${location.ref} • ${capitalize(location.type)}`
    detailsDiv.classList.add('text-gray-500', 'text-xs')
    infoContainer.appendChild(detailsDiv)

    this.appendChild(infoContainer)

    if (!searchHistory.has(location)) return
    const historyIcon = document.createElement('div')
    historyIcon.classList.add('text-gray-500')
    historyIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history-icon lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>'
    this.appendChild(historyIcon)
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
