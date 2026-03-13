import {
  LocationType,
  type Location,
  type Building,
  type Classroom,
  type Campus,
} from './types'

export function isClassroom(location: Location | null): location is Classroom {
  return !location || location.type === LocationType.Classroom
}

export function isBuilding(location: Location | null): location is Building {
  return !location || location.type === LocationType.Building
}

export function isCampus(location: Location | null): location is Campus {
  return !location || location.type === LocationType.Campus
}
