import { Trie } from '../lib/trie'
import { locations } from '../lib/spots'
import { CustomEventType } from '../lib/types'

class SearchBar extends HTMLElement {
  private trie: Trie
  private input: HTMLInputElement
  private dropdown: HTMLDivElement

  constructor() {
    super()

    this.trie = new Trie()
    for (const location of locations) this.trie.insert(location)

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

    this.dropdown = document.createElement('div')
    this.dropdown.classList.add(
      'absolute',
      'top-full',
      'mt-1',
      'w-92',
      'left-1/2',
      '-translate-x-1/2',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-lg',
      'shadow-lg',
      'hidden',
      'max-h-80',
      'overflow-y-auto',
    )

    this.input.addEventListener('input', () => this.handleInput())
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node)) {
        this.hideDropdown()
      }
    })

    container.appendChild(this.input)
    container.appendChild(this.dropdown)
    this.appendChild(container)
  }

  private handleInput() {
    const query = this.input.value.trim()

    if (query.length === 0) {
      this.hideDropdown()
      return
    }

    const results = this.trie.search(query).slice(0, 5)

    if (results.length === 0) {
      this.hideDropdown()
      return
    }

    this.showResults(results)
  }

  private showResults(results: any[]) {
    this.dropdown.innerHTML = ''

    results.forEach((location) => {
      const item = document.createElement('div')
      item.classList.add(
        'px-5',
        'py-3',
        'hover:bg-gray-100',
        'cursor-pointer',
        'text-sm',
      )

      item.textContent = location.name || location.toString()

      item.addEventListener('click', () => {
        this.input.value = location.name || location.toString()
        this.hideDropdown()
        const event = new CustomEvent(CustomEventType.LocationSelected, {
          detail: location,
          bubbles: true,
        })
        this.dispatchEvent(event)
      })

      this.dropdown.appendChild(item)
    })

    this.dropdown.classList.remove('hidden')
  }

  private hideDropdown() {
    this.dropdown.classList.add('hidden')
  }

  connectedCallback() {}
}

customElements.define('search-bar', SearchBar)
