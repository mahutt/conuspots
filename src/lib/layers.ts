export enum MapLayer {
  CampusLabels = 'campus-labels',
  CampusFill = 'campus-fill',
  BuildingLabels = 'building-labels',
  BuildingFill = 'building-fill',
}

export const campusLayers = [MapLayer.CampusLabels, MapLayer.CampusFill]

export const buildingLayers = [MapLayer.BuildingLabels, MapLayer.BuildingFill]

export const isCampusLayer = (layer: string): boolean => {
  return campusLayers.includes(layer as MapLayer)
}

export const isBuildingLayer = (layer: string): boolean => {
  return buildingLayers.includes(layer as MapLayer)
}
