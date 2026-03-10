import type AppState from '../lib/app-state'
import { searchLocations } from '../lib/fuzzy-search'
import type Subscriber from '../lib/subscriber'
import {
  SearchBarButton,
  SearchBarButtonState,
} from './search-bar-button.component'
import { SearchDropdown } from './search-dropdown.component'

export default class SearchBar extends HTMLElement implements Subscriber {
  private input: HTMLInputElement
  private button: SearchBarButton
  private dropdown: SearchDropdown

  constructor() {
    super()

    this.classList.add(
      'pointer-events-auto',
      'block',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-l-full',
      'rounded-r-full',
      'w-96',
      'shadow-sm',
      'focus-within:ring-2',
      'focus-within:ring-blue-200',
    )

    const container = document.createElement('div')
    container.classList.add('relative', 'flex', 'items-center')

    this.input = document.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Search by campus, building, or room...'
    this.input.name = 'search'
    this.input.autocapitalize = 'off'
    this.input.autocomplete = 'off'
    this.input.autocorrect = false
    this.input.spellcheck = false

    this.input.classList.add(
      'flex-1',
      'pl-5',
      'pr-2.5',
      'py-3',
      'text-sm',
      'focus:outline-none',
    )

    this.button = new SearchBarButton()
    this.button.clearCallback = () => {
      this.input.value = ''
      this.dropdown.hideDropdown()
      this.input.focus()
      this.button.setState(SearchBarButtonState.Search)
    }

    this.dropdown = new SearchDropdown()

    this.input.addEventListener('input', () => this.handleInput())
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node)) {
        this.dropdown.hideDropdown()
      }
    })

    container.appendChild(this.input)
    container.appendChild(this.button)
    container.appendChild(this.dropdown)
    this.appendChild(container)
  }

  connectedCallback() {}

  public update(state: AppState) {
    const { selectedLocation } = state
    if (!selectedLocation) return
    this.input.value = selectedLocation.name
    this.input.blur()
  }

  private handleInput() {
    const query = this.input.value.trim()

    if (query.length === 0) {
      this.button.setState(SearchBarButtonState.Search)
      this.dropdown.hideDropdown()
      return
    }

    this.button.setState(SearchBarButtonState.Clear)
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
