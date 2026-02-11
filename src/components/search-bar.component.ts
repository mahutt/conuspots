import { searchLocations } from '../lib/fuzzy-search'
import { SearchDropdown } from './search-dropdown.component'

class SearchBar extends HTMLElement {
  private input: HTMLInputElement
  private dropdown: SearchDropdown

  constructor() {
    super()

    const container = document.createElement('div')
    container.classList.add('relative')

    this.input = document.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Search by campus, building, or room...'
    this.input.name = 'search'
    this.input.autocapitalize = 'off'
    this.input.autocomplete = 'off'
    this.input.autocorrect = false
    this.input.spellcheck = false

    this.input.classList.add(
      'bg-white',
      'px-5',
      'py-3',
      'text-sm',
      'border',
      'border-gray-300',
      'rounded-l-full',
      'rounded-r-full',
      'w-96',
      'shadow-sm',
    )

    this.dropdown = new SearchDropdown((location) => {
      this.input.value = location.name
      this.input.blur()
    })

    this.input.addEventListener('input', () => this.handleInput())
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node)) {
        this.dropdown.hideDropdown()
      }
    })

    container.appendChild(this.input)
    container.appendChild(this.dropdown)
    this.appendChild(container)
  }

  connectedCallback() {}

  private handleInput() {
    const query = this.input.value.trim()

    if (query.length === 0) {
      this.dropdown.hideDropdown()
      return
    }

    this.dropdown.showLocations(searchLocations(query))
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === '/') {
      e.preventDefault()
      this.input.focus()
    }
  }
}

customElements.define('search-bar', SearchBar)
