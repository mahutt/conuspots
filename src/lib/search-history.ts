import type { Location } from './types'

const SEARCH_HISTORY_STORAGE_KEY = 'searchHistory'
const SEARCH_HISTORY_SIZE = 5

class SearchHistory {
  private history: Location[]
  constructor() {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY)
    this.history = savedHistory ? JSON.parse(savedHistory) : []
  }
  public push(location: Location) {
    const deduplicated = this.history.filter(
      (item) => item.ref !== location.ref,
    )
    const updatedHistory = [location, ...deduplicated]
    while (updatedHistory.length > SEARCH_HISTORY_SIZE) updatedHistory.pop()
    this.history = updatedHistory
    localStorage.setItem(
      SEARCH_HISTORY_STORAGE_KEY,
      JSON.stringify(this.history),
    )
  }
  public getHistory() {
    return [...this.history]
  }
  public has(location: Location): boolean {
    return this.history.some((item) => item.ref === location.ref)
  }
}

const searchHistory = new SearchHistory()
export default searchHistory
