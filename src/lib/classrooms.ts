import {
  CC_BUILDING,
  CJ_BUILDING,
  CL_BUILDING,
  FB_BUILDING,
  FG_BUILDING,
  H_BUILDING,
  HB_BUILDING,
  HC_BUILDING,
  LS_BUILDING,
  MB_BUILDING,
  RF_BUILDING,
  SI_BUILDING,
  SP_BUILDING,
} from './buildings'
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

const CC_ROOM_CODES = [
  'CC-101',
  'CC-106',
  'CC-111',
  'CC-112',
  'CC-115',
  'CC-116',
  'CC-204',
  'CC-301',
  'CC-305',
  'CC-308',
  'CC-310',
  'CC-312',
  'CC-314',
  'CC-320',
  'CC-321',
  'CC-405',
  'CC-425',
]

const CJ_ROOM_CODES = ['CJ 1.121', 'CJ 1.125', 'CJ 1.129']

const CL_ROOM_CODES = [
  'S-CL-215:',
  'S-CL-220:',
  'S-CL-223:',
  'S-CL-225:',
  'S-CL-235:',
  'S-CL-239:',
  'S-CL-245:',
]

const FB_ROOM_CODES = [
  'FB S-109',
  'FB S-113',
  'FB S-129',
  'FB S-133',
  'FB S-143',
  'FB S-150',
]

const FG_ROOM_CODES = [
  'FG B-030',
  'FG B-040',
  'FG B-050',
  'FG B-055',
  'FG B-060',
  'FG B-070',
  'FG B-080',
  'FG C-070',
  'FG C-080',
]

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

const HB_ROOM_CODES = ['HB-130']

const HC_ROOM_CODES = ['HC-155', 'HC-157']

const LS_ROOM_CODES = [
  'LS-105',
  'LS-107',
  'LS-108',
  'LS-110',
  'LS-205',
  'LS-207',
  'LS-208',
  'LS-210',
]

const MB_ROOM_CODES = [
  'MB S2.105',
  'MB S2.115',
  'MB S2.210',
  'MB S2.285',
  'MB S2.330',
  'MB S2.401',
  'MB S2.445',
  'MB S2.455',
  'MB S2.465',
  'MB S1.105',
  'MB S1.115',
  'MB S1.235',
  'MB S1.255',
  'MB S1.401',
  'MB S1.430',
  'MB S1.435',
  'MB 1.210',
  'MB 1.301',
  'MB 1.437',
  'MB 2.210',
  'MB 2.255',
  'MB 2.265',
  'MB 2.270',
  'MB 2.285',
  'MB 3.210',
  'MB 3.255',
  'MB 3.265',
  'MB 3.270',
  'MB 3.285',
  'MB 3.430',
  'MB 3.435',
  'MB 3.445',
  'MB 5.255',
  'MB 5.265',
  'MB 5.275',
  'MB 6.240',
  'MB 6.260',
  'MB 6.425',
]

const RF_ROOM_CODES = ['RF-110', 'RF-120', 'RF-130', 'RF-310']

const SI_ROOM_CODES = ['SI-H01']

const SP_ROOM_CODES = ['SP-S110', 'SP-157']

export const ccClassrooms = generateClassrooms(CC_ROOM_CODES, CC_BUILDING)
export const cjClassrooms = generateClassrooms(CJ_ROOM_CODES, CJ_BUILDING)
export const clClassrooms = generateClassrooms(CL_ROOM_CODES, CL_BUILDING)
export const fbClassrooms = generateClassrooms(FB_ROOM_CODES, FB_BUILDING)
export const fgClassrooms = generateClassrooms(FG_ROOM_CODES, FG_BUILDING)
export const hClassrooms = generateClassrooms(H_ROOM_CODES, H_BUILDING)
export const hbClassrooms = generateClassrooms(HB_ROOM_CODES, HB_BUILDING)
export const hcClassrooms = generateClassrooms(HC_ROOM_CODES, HC_BUILDING)
export const lsClassrooms = generateClassrooms(LS_ROOM_CODES, LS_BUILDING)
export const mbClassrooms = generateClassrooms(MB_ROOM_CODES, MB_BUILDING)
export const rfClassrooms = generateClassrooms(RF_ROOM_CODES, RF_BUILDING)
export const siClassrooms = generateClassrooms(SI_ROOM_CODES, SI_BUILDING)
export const spClassrooms = generateClassrooms(SP_ROOM_CODES, SP_BUILDING)
