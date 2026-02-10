import Fuse from 'fuse.js'
import { locations } from './locations'
import { type Location } from './types'

const FUSE_OPTIONS = {
  isCaseSensitive: true,
  ignoreDiacritics: true,
  includeScore: false,
  includeMatches: false,
  minMatchCharLength: 1,
  shouldSort: true,
  findAllMatches: false,
  keys: ['name'],
}

const SEARCH_RESULTS_LIMIT = 5

const fuse = new Fuse(locations, FUSE_OPTIONS)

function searchLocations(query: string): Location[] {
  return fuse
    .search(query)
    .slice(0, SEARCH_RESULTS_LIMIT)
    .map((result) => result.item)
}

export { searchLocations }
