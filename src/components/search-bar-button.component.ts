export enum SearchBarButtonState {
  Search = 'search',
  Clear = 'clear',
}

export class SearchBarButton extends HTMLElement {
  private state: SearchBarButtonState
  private searchIcon: HTMLDivElement
  private clearButton: HTMLButtonElement

  public clearCallback?: () => void

  constructor() {
    super()
    this.state = SearchBarButtonState.Search

    this.searchIcon = document.createElement('div')
    this.searchIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>'
    this.searchIcon.classList.add('pl-2.5', 'pr-5', 'py-3', 'text-gray-500')

    this.clearButton = document.createElement('button')
    this.clearButton.type = 'button'
    this.clearButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
    this.clearButton.classList.add(
      'pl-2.5',
      'pr-5',
      'py-3',
      'text-gray-500',
      'hover:text-gray-700',
      'focus:outline-none',
      'cursor-pointer',
      'hidden', // initially hidden
    )
    this.clearButton.addEventListener('click', () => this.clearCallback?.())

    this.appendChild(this.searchIcon)
    this.appendChild(this.clearButton)
  }

  connectedCallback() {}

  public setState(state: SearchBarButtonState) {
    if (this.state === state) return
    this.state = state
    if (state === SearchBarButtonState.Search) {
      this.clearButton.classList.add('hidden')
      this.searchIcon.classList.remove('hidden')
    } else {
      this.searchIcon.classList.add('hidden')
      this.clearButton.classList.remove('hidden')
    }
  }
}

customElements.define('search-bar-button', SearchBarButton)
