import { H_BUILDING } from './buildings'
import { type Building, type Classroom, LocationType } from './types'

function generateClassrooms(
  roomCodes: string[],
  building: Building,
): Classroom[] {
  return roomCodes.map((code) => ({
    type: LocationType.Classroom,
    name: code,
    ref: code,
    building,
  }))
}

const H_ROOM_CODES = [
  'H-407',
  'H-411',
  'H-420',
  'H-421',
  'H-423',
  'H-429',
  'H-431',
  'H-501',
  'H-507',
  'H-509',
  'H-513',
  'H-520',
  'H-521',
  'H-529',
  'H-531',
  'H-535',
  'H-537',
  'H-539',
  'H-540',
  'H-544',
  'H-553',
  'H-557',
  'H-561',
  'H-562',
  'H-564',
  'H-565',
  'H-601',
  'H-605',
  'H-607',
  'H-609',
  'H-613',
  'H-620',
  'H-621',
  'H-625',
  'H-670',
  'H-820',
  'H-920',
  'H-937',
  'H-1070',
  'H-1011',
  'H-1252',
  'H-1254',
  'H-1269',
  'H-1271',
]

export const hClassrooms = generateClassrooms(H_ROOM_CODES, H_BUILDING)
