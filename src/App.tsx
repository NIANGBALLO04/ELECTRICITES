import React, { useState } from 'react';
import { powerPlantsData } from './data/powerPlants';
import DiagramVisualizer from './components/DiagramVisualizer';
import PlantSilhouetteDrawing from './components/PlantSilhouetteDrawing';
import CompareTable from './components/CompareTable';
import EnergyMixSimulator from './components/EnergyMixSimulator';
import * as Icons from 'lucide-react';

export default function App() {
  const [selectedPlantId, setSelectedPlantId] = useState<string>('nuclear');
  const [activeTab, setActiveTab] = useState<'functioning' | 'shapes' | 'fabrication' | 'mix'>('functioning');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const selectedPlant = powerPlantsData.find(p => p.id === selectedPlantId) || powerPlantsData[0];

  // Helper to render plant icon dynamically
  const getPlantIcon = (id: string, className = "w-5 h-5") => {
    switch (id) {
      case 'nuclear': return <Icons.Atom className={className} />;
      case 'hydro': return <Icons.Droplets className={className} />;
      case 'solar': return <Icons.Sun className={className} />;
      case 'wind': return <Icons.Wind className={className} />;
      case 'gas_coal': return <Icons.Flame className={className} />;
      case 'geothermal': return <Icons.Activity className={className} />;
      case 'biomass': return <Icons.Leaf className={className} />;
      default: return <Icons.Zap className={className} />;
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white pb-16">
      {/* Upper Tech Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
              <Icons.Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-800 flex items-center space-x-2">
                <span>VoltExplorer</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-mono border border-blue-200/60 font-semibold uppercase tracking-wider">
                  Atlas Énergie
                </span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold hidden sm:block">
                Formes physiques, fonctionnement interne & guides de fabrication
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Icons.Layers className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-slate-600">7 Modèles Industriels</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Sidebar list of all power plants (4 cols) */}
        <section className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 font-bold flex items-center space-x-2">
              <Icons.Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Modèles de Centrales</span>
            </h2>
            <div className="space-y-2">
              {powerPlantsData.map((plant) => {
                const isSelected = plant.id === selectedPlantId;
                return (
                  <button
                    key={plant.id}
                    id={`plant-btn-${plant.id}`}
                    onClick={() => {
                      setSelectedPlantId(plant.id);
                      setActiveStep(null); // Reset step selection
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 relative group ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-200 text-blue-950 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {/* Selected Left Bar indicator */}
                    {isSelected && (
                      <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-600 rounded-r-full"></span>
                    )}

                    {/* Icon container */}
                    <div className={`p-2.5 rounded-lg transition-colors ${
                      isSelected 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-750 border border-slate-100'
                    }`}>
                      {getPlantIcon(plant.id)}
                    </div>

                    {/* Plant Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold truncate ${isSelected ? 'text-blue-800' : 'text-slate-800'}`}>
                          {plant.name}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          plant.category === 'Renouvelable'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold'
                            : plant.category === 'Décarbonée non-renouvelable'
                            ? 'bg-cyan-50 border-cyan-200 text-cyan-700 font-semibold'
                            : 'bg-rose-50 border-rose-200 text-rose-700 font-semibold'
                        }`}>
                          {plant.id === 'nuclear' ? 'Zéro CO₂' : plant.category.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {plant.shortDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick didactic summary box */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-500 leading-relaxed space-y-3">
            <h3 className="font-mono text-slate-700 uppercase tracking-wider font-bold flex items-center space-x-2">
              <Icons.Compass className="w-4 h-4 text-blue-600" />
              <span>Pourquoi cette application ?</span>
            </h3>
            <p>
              Ce portail interactif met en lumière la physique du génie civil énergétique. Découvrez pourquoi les cheminées nucléaires sont courbes, comment les barrages utilisent la gravité, et les étapes réelles pour ériger ces infrastructures de pointe.
            </p>
          </div>
        </section>

        {/* RIGHT COLUMN: Interactive Workspaces and Tabs (8 cols) */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Active Plant Info Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100/50">
                  {getPlantIcon(selectedPlant.id, "w-7 h-7")}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase font-bold">
                    {selectedPlant.category}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedPlant.name}
                  </h2>
                </div>
              </div>
              
              <div className="flex items-center space-x-1.5 bg-slate-55 px-3 py-1.5 rounded-xl border border-slate-200">
                <Icons.Clock className="w-4 h-4 text-slate-400" />
                <div className="text-left">
                  <div className="text-[9px] font-mono text-slate-400 uppercase leading-none font-bold">DURÉE DE VIE</div>
                  <div className="text-xs font-bold text-slate-700 font-mono">{selectedPlant.characteristics.lifespan}</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              {selectedPlant.longDescription}
            </p>

            {/* Quick Grid stats indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Efficacité thermique</div>
                <div className="text-sm font-bold text-blue-600 font-mono mt-0.5">{selectedPlant.characteristics.efficiency}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Puissance moyenne</div>
                <div className="text-sm font-bold text-emerald-600 font-mono mt-0.5">{selectedPlant.characteristics.typicalPower}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">CO₂ équivalent</div>
                <div className="text-sm font-bold text-rose-600 font-mono mt-0.5">{selectedPlant.characteristics.co2Emissions} g/kWh</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Pilotabilité</div>
                <div className="text-sm font-bold text-slate-700 font-mono mt-0.5">
                  {selectedPlant.characteristics.dispatchable ? '✓ Contrôlable' : '⚠ Intermittent'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs for plant-specific details */}
          <div className="flex border border-slate-200 bg-slate-100 p-1.5 rounded-2xl">
            <button
              id="tab-functioning"
              onClick={() => { setActiveTab('functioning'); setActiveStep(null); }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold font-mono flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'functioning'
                  ? 'bg-white text-blue-700 border border-slate-200/50 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
              }`}
            >
              <Icons.Cpu className="w-4 h-4" />
              <span>1. Fonctionnement</span>
            </button>
            
            <button
              id="tab-shapes"
              onClick={() => { setActiveTab('shapes'); setActiveStep(null); }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold font-mono flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'shapes'
                  ? 'bg-white text-blue-700 border border-slate-200/50 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
              }`}
            >
              <Icons.Ruler className="w-4 h-4" />
              <span>2. Architecture</span>
            </button>

            <button
              id="tab-fabrication"
              onClick={() => { setActiveTab('fabrication'); setActiveStep(null); }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold font-mono flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'fabrication'
                  ? 'bg-white text-blue-700 border border-slate-200/50 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
              }`}
            >
              <Icons.Hammer className="w-4 h-4" />
              <span>3. Guide Fabrication</span>
            </button>

            <button
              id="tab-mix"
              onClick={() => { setActiveTab('mix'); setActiveStep(null); }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold font-mono flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'mix'
                  ? 'bg-white text-blue-700 border border-slate-200/50 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
              }`}
            >
              <Icons.Sliders className="w-4 h-4" />
              <span>4. Bac à Sable Mix</span>
            </button>
          </div>

          {/* TAB CONTENT 1: functioning (Process steps and live flows) */}
          {activeTab === 'functioning' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Steps left list */}
                <div className="md:col-span-5 space-y-2">
                  <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold px-1">
                    Les Étapes du Cycle Physique
                  </h3>
                  <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                    {selectedPlant.processSteps.map((s) => {
                      const isActive = activeStep === s.step;
                      return (
                        <button
                          key={s.step}
                          id={`step-card-${s.step}`}
                          onClick={() => setActiveStep(isActive ? null : s.step)}
                          className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start space-x-3 ${
                            isActive
                              ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0 ${
                            isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {s.step}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold ${isActive ? 'text-blue-800' : 'text-slate-800'}`}>
                              {s.title}
                            </h4>
                            {isActive && <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{s.description}</p>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Animated Flow SVG */}
                <div className="md:col-span-7">
                  <DiagramVisualizer plant={selectedPlant} activeStep={activeStep} />
                </div>
              </div>

              {/* Advantages & Disadvantages Side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/60 shadow-sm">
                  <h4 className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider font-bold mb-3 flex items-center space-x-1.5">
                    <Icons.CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Points Forts / Avantages</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-650">
                    {selectedPlant.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-200/60 shadow-sm">
                  <h4 className="text-[10px] font-mono text-rose-800 uppercase tracking-wider font-bold mb-3 flex items-center space-x-1.5">
                    <Icons.XCircle className="w-4 h-4 text-rose-600" />
                    <span>Contraintes / Inconvénients</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-650">
                    {selectedPlant.disadvantages.map((dis, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-rose-500 font-bold mt-0.5">•</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: Shapes & Architecture (Silhouette, dimensions & elements explain) */}
          {activeTab === 'shapes' && (
            <div className="space-y-6">
              
              {/* Technical Drawing Blueprint Banner */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                      <Icons.Ruler className="w-4 h-4 text-blue-600" />
                      <span>Schéma Physique Architectural & Dimensions</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">Silhouette et encombrement structurel de la centrale</p>
                  </div>
                  <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200/60 font-semibold">
                    Plan Blueprint
                  </span>
                </div>
                <PlantSilhouetteDrawing type={selectedPlant.physicalShape.visualSilhouette} />
              </div>

              {/* Structural Explanations: Siting and Architectural Style */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center space-x-1.5">
                  <Icons.Compass className="w-4 h-4 text-blue-600" />
                  <span>Esthétique & Style Architectural d'Ingénierie</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{selectedPlant.physicalShape.architecturalStyle}&rdquo;
                </p>
              </div>

              {/* Dimensions Data Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold mb-4 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                    <Icons.Grid className="w-4 h-4 text-blue-600" />
                    <span>Dimensions Standard</span>
                  </h3>
                  <div className="space-y-3.5">
                    {selectedPlant.physicalShape.dimensions.map((dim, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-700">{dim.label}</span>
                          <span className="font-mono font-bold text-blue-600">{dim.value}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {dim.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Visual elements why shape */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold mb-4 flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                    <Icons.HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>Pourquoi ces formes physiques ?</span>
                  </h3>
                  <div className="space-y-3.5">
                    {selectedPlant.physicalShape.keyVisualElements.map((elem, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                        <div className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          <span>{elem.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          <strong>Description :</strong> {elem.description}
                        </div>
                        <p className="text-[11px] text-slate-500 italic mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                          {elem.shapeExplanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB CONTENT 3: Fabrication Guide (Materials, requirements, construction steps timeline) */}
          {activeTab === 'fabrication' && (
            <div className="space-y-6">
              
              {/* Siting requirements & key materials */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Implantation requirements */}
                <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center space-x-1.5 border-b border-slate-100 pb-2.5">
                    <Icons.MapPin className="w-4 h-4 text-emerald-650" />
                    <span>Critères d'Implantation Géographique</span>
                  </h3>
                  <ul className="space-y-3 text-xs text-slate-650">
                    {selectedPlant.fabricationGuide.sitingRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-2.5 rounded border border-slate-100">
                        <div className="p-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded font-bold font-mono text-[11px] h-6 w-6 flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key materials proportion meter */}
                <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center space-x-1.5 border-b border-slate-100 pb-2.5">
                    <Icons.Briefcase className="w-4 h-4 text-emerald-650" />
                    <span>Matériaux de Fabrication Majeurs</span>
                  </h3>
                  <div className="space-y-3.5">
                    {selectedPlant.fabricationGuide.keyMaterials.map((mat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="font-semibold text-slate-700">{mat.name}</span>
                          <span className="font-bold text-emerald-600">{mat.proportion || "N/A"}</span>
                        </div>
                        {/* Percentage bar if proportion is percentage */}
                        {mat.proportion && mat.proportion.includes('%') && (
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: mat.proportion }}
                            ></div>
                          </div>
                        )}
                        <p className="text-[10px] text-slate-400 leading-tight">
                          {mat.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Construction steps timeline */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center space-x-1.5">
                    <Icons.Play className="w-4 h-4 text-blue-600" />
                    <span>Chronologie de Chantier & Étapes de Construction</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">D'un sol brut à la divergence opérationnelle sur le réseau</p>
                </div>

                <div className="relative border-l-2 border-slate-200 pl-6 space-y-6 ml-2.5">
                  {selectedPlant.fabricationGuide.constructionSteps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      
                      {/* Interactive dot */}
                      <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-slate-200 bg-white group-hover:border-blue-500 transition-colors flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors"></span>
                      </span>

                      {/* Step Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-800">
                          {step.phase}
                        </h4>
                        <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200/60 self-start sm:self-auto flex items-center space-x-1">
                          <Icons.Clock className="w-3 h-3" />
                          <span>{step.duration}</span>
                        </span>
                      </div>

                      {/* Step Description */}
                      <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                        {step.description}
                      </p>

                      {/* Engineering Challenge */}
                      <div className="mt-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-200/80 flex items-start space-x-2">
                        <Icons.AlertTriangle className="w-3.5 h-3.5 text-blue-650 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-blue-850">Défi majeur d'ingénierie : </strong>
                          <span className="text-slate-600">{step.keyChallenge}</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB CONTENT 4: Energy Mix Simulator Sandbox */}
          {activeTab === 'mix' && (
            <EnergyMixSimulator plants={powerPlantsData} />
          )}

        </section>

      </main>

      {/* Global Interactive Comparative overview section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <CompareTable plants={powerPlantsData} onSelectPlant={(id) => {
          setSelectedPlantId(id);
          setActiveTab('functioning');
          setActiveStep(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </section>
    </div>
  );
}
