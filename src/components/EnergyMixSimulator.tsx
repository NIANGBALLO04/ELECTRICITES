import React, { useState } from 'react';
import { PowerPlant, SimulationPlantState } from '../types';
import * as Icons from 'lucide-react';

interface EnergyMixSimulatorProps {
  plants: PowerPlant[];
}

export default function EnergyMixSimulator({ plants }: EnergyMixSimulatorProps) {
  // Target consumption: 60,000 MW (approx France average demand)
  const TARGET_LOAD = 60000; 

  const [mix, setMix] = useState<SimulationPlantState[]>([
    { plantId: 'nuclear', count: 25, active: true },      // 25 * 1000 = 25,000 MW
    { plantId: 'hydro', count: 12, active: true },        // 12 * 500 = 6,000 MW
    { plantId: 'solar', count: 40, active: true },        // 40 * 100 = 4,000 MW
    { plantId: 'wind', count: 35, active: true },         // 35 * 150 = 5,250 MW
    { plantId: 'gas_coal', count: 15, active: true },     // 15 * 500 = 7,500 MW
    { plantId: 'geothermal', count: 2, active: true },    // 2 * 50 = 100 MW
    { plantId: 'biomass', count: 4, active: true }        // 4 * 100 = 400 MW
  ]);

  // Weather scenarios
  const [weather, setWeather] = useState<'normal' | 'sunny_no_wind' | 'cloudy_stormy' | 'winter_peak'>('normal');

  // Change count helper
  const handleCountChange = (plantId: string, delta: number) => {
    setMix(prev => prev.map(item => {
      if (item.plantId === plantId) {
        return { ...item, count: Math.max(0, item.count + delta) };
      }
      return item;
    }));
  };

  // Toggle active
  const handleToggleActive = (plantId: string) => {
    setMix(prev => prev.map(item => {
      if (item.plantId === plantId) {
        return { ...item, active: !item.active };
      }
      return item;
    }));
  };

  // Weather coefficients for solar and wind
  const getWeatherCoeffs = () => {
    switch (weather) {
      case 'sunny_no_wind':
        return { solar: 1.0, wind: 0.1, hydro: 0.8, loadDelta: 0 };
      case 'cloudy_stormy':
        return { solar: 0.2, wind: 0.95, hydro: 1.1, loadDelta: -2000 };
      case 'winter_peak':
        return { solar: 0.15, wind: 0.4, hydro: 0.7, loadDelta: 15000 }; // massive peak load
      default: // normal
        return { solar: 0.6, wind: 0.45, hydro: 0.9, loadDelta: 0 };
    }
  };

  const weatherCoeffs = getWeatherCoeffs();
  const currentTargetLoad = TARGET_LOAD + weatherCoeffs.loadDelta;

  // Plant static specs for simulation
  const getPlantSimSpecs = (id: string) => {
    switch (id) {
      case 'nuclear':
        return { name: 'Réacteur Nucléaire EPR', unitPower: 1200, coeff: 0.9, co2: 12, cost: 8 }; // Base load
      case 'hydro':
        return { name: 'Barrage Réservoir', unitPower: 500, coeff: weatherCoeffs.hydro, co2: 24, cost: 2 }; // Peak load
      case 'solar':
        return { name: 'Grand Parc Solaire', unitPower: 100, coeff: weatherCoeffs.solar, co2: 41, cost: 1.5 }; // Intermittent
      case 'wind':
        return { name: 'Parc Éolien Offshore', unitPower: 200, coeff: weatherCoeffs.wind, co2: 11, cost: 3.5 }; // Intermittent
      case 'gas_coal':
        return { name: 'Tranche Gaz CCG', unitPower: 500, coeff: 0.95, co2: 370, cost: 12 }; // Peak high CO2
      case 'geothermal':
        return { name: 'Station Géothermique', unitPower: 50, coeff: 0.95, co2: 38, cost: 4 }; // Base clean
      case 'biomass':
        return { name: 'Centrale Biomasse', unitPower: 100, coeff: 0.85, co2: 23, cost: 6 }; // Base clean
      default:
        return { name: 'Inconnu', unitPower: 0, coeff: 0, co2: 0, cost: 0 };
    }
  };

  // Calculate stats
  let totalProduction = 0;
  let totalCO2Weighted = 0;
  let totalCostBillions = 0;
  let intermittentPower = 0;
  let basePower = 0;

  mix.forEach(item => {
    if (!item.active) return;
    const specs = getPlantSimSpecs(item.plantId);
    const actualPower = item.count * specs.unitPower * specs.coeff;
    totalProduction += actualPower;
    totalCO2Weighted += actualPower * specs.co2;
    totalCostBillions += item.count * (specs.cost * 0.15); // scaled construction + fuel metric

    if (item.plantId === 'solar' || item.plantId === 'wind') {
      intermittentPower += actualPower;
    } else {
      basePower += actualPower;
    }
  });

  const averageCO2 = totalProduction > 0 ? Math.round(totalCO2Weighted / totalProduction) : 0;
  const loadSatisfaction = totalProduction > 0 ? (totalProduction / currentTargetLoad) * 100 : 0;
  const gap = totalProduction - currentTargetLoad;

  // Intermittency ratio
  const intermittencyRatio = totalProduction > 0 ? (intermittentPower / totalProduction) * 100 : 0;

  // Security score
  let securityScore = 100;
  if (gap < -2000) securityScore -= 30;
  if (gap < -5000) securityScore -= 40;
  if (intermittencyRatio > 40 && basePower < currentTargetLoad * 0.5) securityScore -= 25; // risk of collapse without storage
  securityScore = Math.max(0, securityScore);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-6">
        <div>
          <h3 className="text-xl font-display font-bold text-slate-900 flex items-center space-x-2">
            <Icons.Layers className="w-5 h-5 text-blue-600" />
            <span>Simulateur de Mix Énergétique</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Devenez le planificateur : assemblez et fabriquez les centrales pour alimenter le pays tout en respectant l'environnement.
          </p>
        </div>

        {/* Weather Scenarios */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button
            id="weather-normal"
            onClick={() => setWeather('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
              weather === 'normal'
                ? 'bg-blue-50 text-blue-750 border-blue-200 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            ⛅ Printemps Normal
          </button>
          <button
            id="weather-sunny"
            onClick={() => setWeather('sunny_no_wind')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
              weather === 'sunny_no_wind'
                ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            ☀️ Anticyclone Solaire
          </button>
          <button
            id="weather-storm"
            onClick={() => setWeather('cloudy_stormy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
              weather === 'cloudy_stormy'
                ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            💨 Tempête Nuageuse
          </button>
          <button
            id="weather-winter"
            onClick={() => setWeather('winter_peak')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
              weather === 'winter_peak'
                ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            ❄️ Grand Froid d'Hiver
          </button>
        </div>
      </div>

      {/* Grid: Indicators and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Real-Time Gauge Monitors (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
              Indicateurs de Stabilité du Réseau
            </h4>

            {/* Demande vs Production */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 font-mono mb-1.5 font-semibold">
                <span>Production Générée</span>
                <span className="font-bold text-slate-800">
                  {Math.round(totalProduction).toLocaleString()} MW / {currentTargetLoad.toLocaleString()} MW
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    loadSatisfaction < 95 ? 'bg-amber-500' :
                    loadSatisfaction > 105 ? 'bg-orange-500 animate-pulse' :
                    'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, loadSatisfaction)}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-500">Statut :</span>
                {gap < -1000 ? (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded flex items-center space-x-1 animate-pulse">
                    <Icons.AlertOctagon className="w-3.5 h-3.5" />
                    <span>Blackout (Déficit de {Math.round(Math.abs(gap)).toLocaleString()} MW)</span>
                  </span>
                ) : gap > 5000 ? (
                  <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded flex items-center space-x-1">
                    <Icons.Radio className="w-3.5 h-3.5" />
                    <span>Surcharge réseau (+{Math.round(gap).toLocaleString()} MW)</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded flex items-center space-x-1">
                    <Icons.CheckCircle className="w-3.5 h-3.5" />
                    <span>Équilibre parfait ({Math.round(loadSatisfaction)}%)</span>
                  </span>
                )}
              </div>
            </div>

            {/* CO2 Emissions */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex justify-between text-xs text-slate-500 font-mono mb-1.5 font-semibold">
                <span>Intensité Carbone moyenne</span>
                <span className={`font-bold ${averageCO2 < 50 ? 'text-emerald-700' : averageCO2 < 150 ? 'text-amber-700' : 'text-rose-700'}`}>
                  {averageCO2} g CO₂/kWh
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    averageCO2 < 50 ? 'bg-emerald-500' :
                    averageCO2 < 150 ? 'bg-yellow-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, (averageCO2 / 300) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                L'objectif européen est d'être à moins de 50 g CO₂ eq / kWh d'ici 2030.
              </p>
            </div>

            {/* Intermittency Gauge */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex justify-between text-xs text-slate-500 font-mono mb-1.5 font-semibold">
                <span>Part d'Énergies Intermittentes</span>
                <span className="font-bold text-slate-800">{Math.round(intermittencyRatio)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${intermittencyRatio}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {intermittencyRatio > 35 ? '⚠️ Risque d\'instabilité météo s\'il n\'y a pas de barrages ou de batteries de secours.' : '✓ Mix stable pilotable.'}
              </p>
            </div>

            {/* Cost and security score */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Coût du Parc</div>
                <div className="text-base font-bold text-slate-800 mt-0.5 font-mono">
                  {totalCostBillions.toFixed(1)} Md€
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Indice Sûreté</div>
                <div className={`text-base font-bold mt-0.5 font-mono ${securityScore > 80 ? 'text-emerald-700' : securityScore > 50 ? 'text-amber-700' : 'text-rose-700'}`}>
                  {securityScore}/100
                </div>
              </div>
            </div>
          </div>

          {/* Quick explanations box */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start space-x-2.5">
            <Icons.Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-650 leading-relaxed">
              <strong className="text-blue-800">Conseil de fabrication :</strong> Utilisez le <strong>Nucléaire</strong> pour la base stable, les <strong>Barrages (Hydro)</strong> pour lisser instantanément les pics d'hiver, et minimisez le <strong>Gaz</strong> car bien que flexible, sa fabrication rejette d'importantes quantités de CO₂.
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Controls / Centrales List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold px-1">
            Gestion des Centrales Actives
          </h4>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {mix.map(item => {
              const plantData = plants.find(p => p.id === item.plantId);
              if (!plantData) return null;
              const specs = getPlantSimSpecs(item.plantId);
              const actualProduction = item.count * specs.unitPower * specs.coeff;

              return (
                <div
                  key={item.plantId}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    item.active
                      ? 'bg-white border-slate-200 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.01)]'
                      : 'bg-slate-50 border-slate-200 opacity-40'
                  }`}
                >
                  {/* Left: Checkbox + icon + Title */}
                  <div className="flex items-center space-x-3">
                    <button
                      id={`toggle-mix-${item.plantId}`}
                      onClick={() => handleToggleActive(item.plantId)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                        item.active ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-slate-100 border-slate-200 text-transparent hover:border-slate-300'
                      }`}
                    >
                      <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-tight">
                        {plantData.category}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 flex items-center space-x-1.5">
                        <span>{plantData.name}</span>
                        {item.active && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.2 rounded font-mono font-bold">
                            {specs.unitPower}MW/unité
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Middle/Right: Counter and Production info */}
                  <div className="flex items-center space-x-4">
                    {/* Active Production meter */}
                    {item.active && (
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-blue-600">
                          {Math.round(actualProduction).toLocaleString()} MW
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          efficience: {Math.round(specs.coeff * 100)}%
                        </div>
                      </div>
                    )}

                    {/* Counter widget */}
                    <div className="flex items-center space-x-1 bg-slate-50 rounded-lg p-1 border border-slate-200">
                      <button
                        id={`minus-${item.plantId}`}
                        disabled={!item.active || item.count <= 0}
                        onClick={() => handleCountChange(item.plantId, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold cursor-pointer shadow-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800 font-mono">
                        {item.count}
                      </span>
                      <button
                        id={`plus-${item.plantId}`}
                        disabled={!item.active}
                        onClick={() => handleCountChange(item.plantId, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold cursor-pointer shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
