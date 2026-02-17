import { LocationType, type Location, type Building } from './types'

export function isBuilding(
  location: Location | null,
): location is Building | null {
  return !location || location.type === LocationType.Building
}
