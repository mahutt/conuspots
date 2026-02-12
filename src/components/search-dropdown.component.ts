import stateManager from '../lib/state-manager'
import { type Location } from '../lib/types'
import { SearchDropdownItem } from './search-dropdown-item.component'

export class SearchDropdown extends HTMLElement {
  private selectedIndex: number = 0

  constructor() {
    super()
    this.classList.add(
      'absolute',
      'top-full',
      'mt-1',
      'w-92',
      'left-1/2',
      '-translate-x-1/2',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-xl',
      'shadow-lg',
      'hidden',
      'max-h-80',
      'overflow-y-auto',
      'p-2',
    )
    document.addEventListener('click', this.handleClick.bind(this))
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  connectedCallback() {}

  public showDropdown() {
    this.classList.remove('hidden')
  }

  public hideDropdown() {
    this.classList.add('hidden')
  }

  public showLocations(locations: Location[]) {
    this.innerHTML = ''

    if (locations.length === 0) {
      this.hideDropdown()
      return
    }

    locations.forEach((location) => {
      const item = new SearchDropdownItem(location, () => {
        stateManager.selectedLocation = location
        this.hideDropdown()
      })
      this.appendChild(item)
    })
    this.updateSelection(0)
    this.showDropdown()
  }

  private handleClick(e: MouseEvent) {
    if (!this.contains(e.target as Node)) {
      this.hideDropdown()
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.classList.contains('hidden')) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      this.updateSelection(
        Math.min(this.selectedIndex + 1, this.children.length - 1),
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      this.updateSelection(Math.max(this.selectedIndex - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selectedItem = this.children[this.selectedIndex] as HTMLElement
      selectedItem.click()
    }
  }

  private updateSelection(index: number) {
    this.selectedIndex = index
    Array.from(this.children).forEach((child, index) => {
      const item = child as SearchDropdownItem
      if (index === this.selectedIndex) {
        item.highlight()
      } else {
        item.unhighlight()
      }
    })
  }
}

customElements.define('search-dropdown', SearchDropdown)
