import CampusToggle from './components/campus-toggle.component'
import InfoCard from './components/info-card.component'
import type MapboxMap from './components/mapbox-map.component'
import './components/mapbox-map.component'
import SearchBar from './components/search-bar.component'
import stateManager from './lib/state-manager'

const mapboxMap = document.querySelector('mapbox-map') as MapboxMap
stateManager.subscribe(mapboxMap)

const controls = document.getElementById('controls') as HTMLDivElement

const searchBar = new SearchBar()
stateManager.subscribe(searchBar)
controls.appendChild(searchBar)

const campusToggle = new CampusToggle(mapboxMap)
controls.appendChild(campusToggle)

const infoCard = new InfoCard(mapboxMap)
stateManager.subscribe(infoCard)
document.body.appendChild(infoCard)
