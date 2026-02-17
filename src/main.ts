import { InfoCard } from './components/info-card.component'
import './components/info-card.component'
import './components/mapbox-map.component'
import type MapboxMap from './components/mapbox-map.component'
import SearchBar from './components/search-bar.component'
import './components/search-dropdown.component'
import stateManager from './lib/state-manager'

const mapboxMap = document.querySelector('mapbox-map') as MapboxMap
stateManager.subscribe(mapboxMap)

const searchBar = document.querySelector('search-bar') as SearchBar
stateManager.subscribe(searchBar)

const infoCard = new InfoCard(mapboxMap)
stateManager.subscribe(infoCard)
document.body.appendChild(infoCard)
