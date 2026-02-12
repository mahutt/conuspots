import './components/mapbox-map.component'
import type MapboxMap from './components/mapbox-map.component'
import SearchBar from './components/search-bar.component'
import './components/search-dropdown.component'
import stateManager from './lib/state-manager'

const mapboxMap = document.querySelector('mapbox-map') as MapboxMap
stateManager.subscribe(mapboxMap)

const searchBar = document.querySelector('search-bar') as SearchBar
stateManager.subscribe(searchBar)
