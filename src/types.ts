export interface PlantCharacteristics {
  efficiency: string; // e.g., "33% - 40%"
  typicalPower: string; // e.g., "900 - 1450 MW"
  co2Emissions: number; // g CO2 eq / kWh
  constructionCost: 'Très Faible' | 'Faible' | 'Moyen' | 'Élevé' | 'Très Élevé';
  operatingCost: 'Très Faible' | 'Faible' | 'Moyen' | 'Élevé';
  constructionTime: string; // e.g., "5 - 10 ans"
  lifespan: string; // e.g., "40 - 60 ans"
  intermittency: 'Aucune' | 'Faible' | 'Modérée' | 'Élevée';
  dispatchable: boolean; // Pilotable ou non
  fuelType: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  x: number; // percentage width (0-100)
  y: number; // percentage height (0-100)
  type: 'source' | 'conversion' | 'turbine' | 'generator' | 'grid' | 'cooling' | 'storage';
}

export interface DiagramLink {
  from: string;
  to: string;
  label?: string;
  flowType: 'heat' | 'steam' | 'water' | 'mechanical' | 'electricity' | 'radiation' | 'wind' | 'cooling';
}

export interface VisualDimension {
  label: string;
  value: string;
  explanation: string;
}

export interface KeyVisualElement {
  name: string;
  description: string;
  shapeExplanation: string;
}

export interface KeyMaterial {
  name: string;
  proportion?: string;
  purpose: string;
}

export interface ConstructionStep {
  phase: string;
  duration: string;
  description: string;
  keyChallenge: string;
}

export interface PowerPlant {
  id: string;
  name: string;
  iconName: string;
  category: 'Renouvelable' | 'Décarbonée non-renouvelable' | 'Fossile';
  shortDescription: string;
  longDescription: string;
  characteristics: PlantCharacteristics;
  advantages: string[];
  disadvantages: string[];
  processSteps: ProcessStep[];
  diagram: {
    nodes: DiagramNode[];
    links: DiagramLink[];
  };
  physicalShape: {
    visualSilhouette: 'nuclear_tower' | 'hydro_dam' | 'solar_field' | 'wind_turbine' | 'gas_factory' | 'geothermal_station' | 'biomass_station';
    architecturalStyle: string;
    dimensions: VisualDimension[];
    keyVisualElements: KeyVisualElement[];
  };
  fabricationGuide: {
    sitingRequirements: string[];
    keyMaterials: KeyMaterial[];
    constructionSteps: ConstructionStep[];
  };
}

export interface SimulationPlantState {
  plantId: string;
  count: number;
  active: boolean;
}
