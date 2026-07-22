import React from 'react';
import { PowerPlant } from '../types';
import * as Icons from 'lucide-react';

interface CompareTableProps {
  plants: PowerPlant[];
  onSelectPlant: (id: string) => void;
}

export default function CompareTable({ plants, onSelectPlant }: CompareTableProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xl font-display font-bold text-slate-900 flex items-center space-x-2">
          <Icons.GitCompare className="w-5 h-5 text-blue-600" />
          <span>Tableau Comparatif Technique & Visuel</span>
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Comparez les formes, les coûts de fabrication, les performances thermiques et les contraintes écologiques des centrales.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
              <th className="py-4 px-6 font-semibold">Centrale</th>
              <th className="py-4 px-4 font-semibold text-center">Silhouette / Forme</th>
              <th className="py-4 px-4 font-semibold text-center">Rendement</th>
              <th className="py-4 px-4 font-semibold text-center">Émissions CO₂</th>
              <th className="py-4 px-4 font-semibold text-center">Coût Fab.</th>
              <th className="py-4 px-4 font-semibold text-center">Durée de vie</th>
              <th className="py-4 px-4 font-semibold text-center">Pilotabilité</th>
              <th className="py-4 px-6 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {plants.map((plant) => {
              const co2 = plant.characteristics.co2Emissions;
              const efficiency = plant.characteristics.efficiency;
              const cost = plant.characteristics.constructionCost;
              const lifespan = plant.characteristics.lifespan;
              const dispatchable = plant.characteristics.dispatchable;

              // Render simple silhouette indicator
              let silhouetteLabel = "Tour";
              if (plant.physicalShape.visualSilhouette === 'hydro_dam') silhouetteLabel = "Barrage";
              if (plant.physicalShape.visualSilhouette === 'solar_field') silhouetteLabel = "Champ Plat";
              if (plant.physicalShape.visualSilhouette === 'wind_turbine') silhouetteLabel = "Éolienne";
              if (plant.physicalShape.visualSilhouette === 'gas_factory') silhouetteLabel = "Usine fine";
              if (plant.physicalShape.visualSilhouette === 'geothermal_station') silhouetteLabel = "Puits d'Injec.";
              if (plant.physicalShape.visualSilhouette === 'biomass_station') silhouetteLabel = "Hangar & Silos";

              return (
                <tr key={plant.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${
                        plant.category === 'Renouvelable' ? 'bg-emerald-50 text-emerald-700' :
                        plant.category === 'Décarbonée non-renouvelable' ? 'bg-blue-50 text-blue-750' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {plant.id === 'nuclear' && <Icons.Atom className="w-5 h-5" />}
                        {plant.id === 'hydro' && <Icons.Droplets className="w-5 h-5" />}
                        {plant.id === 'solar' && <Icons.Sun className="w-5 h-5" />}
                        {plant.id === 'wind' && <Icons.Wind className="w-5 h-5" />}
                        {plant.id === 'gas_coal' && <Icons.Flame className="w-5 h-5" />}
                        {plant.id === 'geothermal' && <Icons.Activity className="w-5 h-5" />}
                        {plant.id === 'biomass' && <Icons.Leaf className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{plant.name}</div>
                        <div className="text-xs text-slate-450 font-mono">{plant.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Silhouette */}
                  <td className="py-4 px-4 text-center font-mono text-xs">
                    <span className="px-2 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200 font-semibold">
                      {silhouetteLabel}
                    </span>
                  </td>

                  {/* Efficiency */}
                  <td className="py-4 px-4 text-center font-bold font-mono text-slate-700">
                    {efficiency}
                  </td>

                  {/* CO2 Emissions */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className={`font-mono font-bold ${
                        co2 < 20 ? 'text-emerald-600' :
                        co2 < 50 ? 'text-blue-600' :
                        co2 < 100 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {co2} <span className="text-xs font-normal text-slate-450">g/kWh</span>
                      </span>
                      {/* Bar indicator */}
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full ${co2 > 100 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(100, (co2 / 400) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Construction Cost */}
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold font-mono border ${
                      cost === 'Très Élevé' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                      cost === 'Élevé' ? 'bg-orange-50 border-orange-200 text-orange-700' :
                      cost === 'Moyen' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                      'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}>
                      {cost}
                    </span>
                  </td>

                  {/* Lifespan */}
                  <td className="py-4 px-4 text-center font-mono text-sm font-bold text-slate-700">
                    {lifespan}
                  </td>

                  {/* Dispatchable / Pilotable */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      {dispatchable ? (
                        <span className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full text-xs font-mono font-semibold">
                          <Icons.CheckCircle className="w-3.5 h-3.5" />
                          <span>Oui (Pilotable)</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full text-xs font-mono font-semibold">
                          <Icons.AlertTriangle className="w-3.5 h-3.5" />
                          <span>Intermittent</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-center">
                    <button
                      id={`select-plant-${plant.id}`}
                      onClick={() => onSelectPlant(plant.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold font-mono transition-all flex items-center space-x-1 mx-auto hover:shadow-md cursor-pointer"
                    >
                      <span>Examiner</span>
                      <Icons.ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
