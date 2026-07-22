import React from 'react';

interface SilhouetteProps {
  type: 'nuclear_tower' | 'hydro_dam' | 'solar_field' | 'wind_turbine' | 'gas_factory' | 'geothermal_station' | 'biomass_station';
}

export default function PlantSilhouetteDrawing({ type }: SilhouetteProps) {
  switch (type) {
    case 'nuclear_tower':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-48 md:h-64 text-slate-500" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines for engineering blueprint style */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Steam / Clouds */}
          <path d="M 120 40 Q 130 15 150 25 T 180 20 T 190 40" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
          <path d="M 115 55 Q 125 35 145 42 T 170 35" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Hyperbolic Cooling Tower Silhouette */}
          <path
            d="M 90 200 
               C 105 160, 110 110, 110 80 
               L 150 80 
               C 150 110, 155 160, 170 200 
               Z"
            fill="#ffffff"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
          {/* Cooling Tower Ribs */}
          <path d="M 103 150 L 157 150 M 108 120 L 152 120 M 110 95 L 150 95" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 110 80 C 110 85, 150 85, 150 80" stroke="#2563eb" strokeWidth="2" fill="none" />
          <path d="M 90 200 C 90 205, 170 205, 170 200" stroke="#2563eb" strokeWidth="2" fill="none" />

          {/* Reactor Dome (Spherical containment building) */}
          <path d="M 230 200 L 230 130 A 45 45 0 0 1 320 130 L 320 200 Z" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2.5" />
          {/* Reactor core symbolic circle */}
          <circle cx="275" cy="150" r="18" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 2" className="animate-pulse" />
          {/* Fuel rods schematic lines */}
          <line x1="268" y1="140" x2="268" y2="160" stroke="#0ea5e9" strokeWidth="2" />
          <line x1="275" y1="135" x2="275" y2="165" stroke="#0ea5e9" strokeWidth="2" />
          <line x1="282" y1="140" x2="282" y2="160" stroke="#0ea5e9" strokeWidth="2" />

          {/* Connection pipe */}
          <path d="M 170 170 L 230 170" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 170 185 L 230 185" stroke="#2563eb" strokeWidth="2" />

          {/* Soil/Ground level */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="#64748b" strokeWidth="3" />
          
          {/* Dimension arrows */}
          <g stroke="#94a3b8" strokeWidth="1">
            {/* Height of cooling tower */}
            <line x1="70" y1="80" x2="70" y2="200" />
            <polygon points="70,80 67,86 73,86" fill="#94a3b8" />
            <polygon points="70,200 67,194 73,194" fill="#94a3b8" />
            
            {/* Diameter of dome */}
            <line x1="230" y1="220" x2="320" y2="220" />
            <polygon points="230,220 236,217 236,223" fill="#94a3b8" />
            <polygon points="320,220 314,217 314,223" fill="#94a3b8" />
          </g>
          
          <text x="50" y="140" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">~160m</text>
          <text x="275" y="234" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Ø ~45m</text>
          
          <text x="200" y="25" fill="#0ea5e9" fontSize="11" fontFamily="monospace" fontWeight="bold">DÔME DOUBLE PAROI</text>
        </svg>
      );

    case 'hydro_dam':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-48 md:h-64 text-slate-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-hydro" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid-hydro)" />

          {/* Mountains & Reservoir */}
          <path d="M 0 50 L 120 180 L 120 220 L 0 220 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 0 100 C 40 100, 80 110, 110 110 L 110 180 L 0 180 Z" fill="#2563eb" fillOpacity="0.4" />
          <text x="50" y="140" fill="#1d4ed8" fontSize="10" fontFamily="monospace" fontWeight="bold">LAC DE RETENUE</text>

          {/* Dam Wall (Barrage poids-voûte) */}
          <path d="M 110 90 L 140 90 L 180 200 L 110 200 Z" fill="#f1f5f9" stroke="#059669" strokeWidth="2.5" />
          <path d="M 110 90 L 110 200" stroke="#059669" strokeWidth="1" />
          
          {/* Penstock / Conduite forcée */}
          <path d="M 115 130 L 165 190" stroke="#d97706" strokeWidth="4.5" fill="none" />
          <path d="M 115 130 L 165 190" stroke="#ffffff" strokeWidth="1" fill="none" strokeDasharray="3 6" className="animate-pulse" />

          {/* Turbine housing in bed */}
          <rect x="165" y="180" width="40" height="25" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="185" cy="192" r="6" fill="none" stroke="#d97706" strokeWidth="1.5" className="animate-spin" style={{ transformOrigin: '185px 192px', animationDuration: '3s' }} />

          {/* River Restitution */}
          <path d="M 195 195 Q 240 190 380 200 L 380 220 L 180 220 Z" fill="#2563eb" fillOpacity="0.6" />
          <text x="270" y="215" fill="#1d4ed8" fontSize="10" fontFamily="monospace" fontWeight="bold">RECONVERSION RIVIÈRE</text>

          {/* Ground/Rock */}
          <path d="M 180 200 L 400 200" stroke="#64748b" strokeWidth="3" />

          {/* Dimension markings */}
          <g stroke="#94a3b8" strokeWidth="1">
            <line x1="100" y1="90" x2="100" y2="200" />
            <polygon points="100,90 97,96 103,96" fill="#94a3b8" />
            <polygon points="100,200 97,194 103,194" fill="#94a3b8" />
          </g>
          <text x="80" y="150" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">~180m</text>
          
          <text x="280" y="60" fill="#059669" fontSize="11" fontFamily="monospace" fontWeight="bold">CONDUITE FORCÉE BLINDÉE</text>
          <path d="M 150 150 Q 200 100 260 65" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        </svg>
      );

    case 'solar_field':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-48 md:h-64 text-slate-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-solar" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid-solar)" />

          {/* Sun */}
          <circle cx="320" cy="50" r="18" fill="#f59e0b" className="animate-pulse" />
          <g stroke="#f59e0b" strokeWidth="1.5">
            <line x1="320" y1="25" x2="320" y2="15" />
            <line x1="320" y1="75" x2="320" y2="85" />
            <line x1="295" y1="50" x2="285" y2="50" />
            <line x1="345" y1="50" x2="355" y2="50" />
            <line x1="302" y1="32" x2="295" y2="25" />
            <line x1="338" y1="68" x2="345" y2="75" />
          </g>

          {/* Solar rays */}
          <line x1="290" y1="70" x2="230" y2="120" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="270" y1="80" x2="140" y2="135" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />

          {/* Solar Panel Row 1 (Back, smaller) */}
          <g transform="translate(60, 40)">
            <line x1="60" y1="120" x2="60" y2="145" stroke="#64748b" strokeWidth="2.5" />
            <polygon points="35,110 85,100 85,120 35,130" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            <line x1="45" y1="108" x2="45" y2="128" stroke="#cbd5e1" />
            <line x1="60" y1="105" x2="60" y2="125" stroke="#cbd5e1" />
            <line x1="75" y1="102" x2="75" y2="122" stroke="#cbd5e1" />
          </g>

          {/* Solar Panel Row 2 (Front, larger) */}
          <g transform="translate(140, 50)">
            {/* Ground stake */}
            <line x1="60" y1="110" x2="60" y2="150" stroke="#64748b" strokeWidth="4" />
            {/* Rotative axis */}
            <circle cx="60" cy="110" r="4" fill="#d97706" />
            {/* Panel */}
            <polygon points="20,100 100,80 100,115 20,135" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2.5" />
            {/* Silicon Cells lines */}
            <line x1="40" y1="95" x2="40" y2="130" stroke="#38bdf8" strokeWidth="1" />
            <line x1="60" y1="90" x2="60" y2="125" stroke="#38bdf8" strokeWidth="1" />
            <line x1="80" y1="85" x2="80" y2="120" stroke="#38bdf8" strokeWidth="1" />
            <line x1="20" y1="117" x2="100" y2="97" stroke="#38bdf8" strokeWidth="1" />
          </g>

          {/* Ground/Grass line */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="#059669" strokeWidth="3" />
          <text x="320" y="218" fill="#059669" fontSize="9" fontFamily="monospace" fontWeight="bold">SOL VÉGÉTALISÉ</text>

          {/* Dimensions label */}
          <g stroke="#94a3b8" strokeWidth="1">
            <line x1="130" y1="130" x2="240" y2="130" />
            <polygon points="130,130 136,127 136,133" fill="#94a3b8" />
            <polygon points="240,130 234,127 234,133" fill="#94a3b8" />
          </g>
          <text x="185" y="122" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ENTRAXE ~8m</text>
          
          <text x="60" y="30" fill="#0ea5e9" fontSize="11" fontFamily="monospace" fontWeight="bold">MODULE PHOTOVOLTAÏQUE</text>
        </svg>
      );

    case 'wind_turbine':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-48 md:h-64 text-slate-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-wind" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid-wind)" />

          {/* Wind vectors */}
          <path d="M 20 50 Q 80 40 140 60 T 300 50" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 10" />
          <path d="M 20 120 Q 90 105 160 130 T 320 115" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 8" />

          {/* Deep Foundation (Underground) */}
          <rect x="175" y="195" width="50" height="15" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <line x1="185" y1="210" x2="185" y2="235" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="200" y1="210" x2="200" y2="238" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="215" y1="210" x2="215" y2="235" stroke="#94a3b8" strokeWidth="2.5" />
          <text x="250" y="222" fill="#64748b" fontSize="9" fontFamily="monospace" fontWeight="bold">PIEUX PROFONDS</text>

          {/* Ground level */}
          <line x1="20" y1="195" x2="380" y2="195" stroke="#64748b" strokeWidth="3" />

          {/* Wind Turbine Mast */}
          <polygon points="194,195 206,195 202,70 198,70" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          
          {/* Nacelle */}
          <rect x="194" y="62" width="16" height="8" rx="2" fill="#f1f5f9" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="210" cy="66" r="3" fill="#d97706" />

          {/* Blades (Dynamic look / rotated) */}
          <g transform="translate(210, 66)">
            {/* Blade 1 (Upwards) */}
            <path d="M -2 0 C -4 -25, -1 -50, 0 -65 C 1 -50, 4 -25, 2 0 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            {/* Blade 2 (Bottom Left) */}
            <g transform="rotate(120)">
              <path d="M -2 0 C -4 -25, -1 -50, 0 -65 C 1 -50, 4 -25, 2 0 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            </g>
            {/* Blade 3 (Bottom Right) */}
            <g transform="rotate(240)">
              <path d="M -2 0 C -4 -25, -1 -50, 0 -65 C 1 -50, 4 -25, 2 0 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            </g>
          </g>

          {/* Dimensions */}
          <g stroke="#94a3b8" strokeWidth="1">
            {/* Height arrow */}
            <line x1="165" y1="66" x2="165" y2="195" />
            <polygon points="165,66 162,72 168,72" fill="#94a3b8" />
            <polygon points="165,195 162,189 168,189" fill="#94a3b8" />
          </g>
          <text x="145" y="130" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">H ~120m</text>
          
          <text x="240" y="30" fill="#0ea5e9" fontSize="11" fontFamily="monospace" fontWeight="bold">ROTOR TRIPALE</text>
        </svg>
      );

    case 'gas_factory':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-48 md:h-64 text-slate-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-gas" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid-gas)" />

          {/* Ground */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="#64748b" strokeWidth="3" />

          {/* Boiler / HRSG Block */}
          <rect x="60" y="100" width="80" height="100" fill="#ffffff" stroke="#e11d48" strokeWidth="2.5" />
          {/* Tubes internally */}
          <path d="M 70 180 L 70 120 L 90 120 L 90 180 L 110 180 L 110 120" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <text x="100" y="90" fill="#e11d48" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CHAUDIÈRE DE RÉCUPÉRATION</text>

          {/* Turbine Hall */}
          <polygon points="140,130 220,130 220,200 140,200" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          <line x1="140" y1="130" x2="180" y2="110" stroke="#0284c7" strokeWidth="2" />
          <line x1="220" y1="130" x2="180" y2="110" stroke="#0284c7" strokeWidth="2" />
          <circle cx="180" cy="165" r="12" fill="none" stroke="#d97706" strokeWidth="2" className="animate-spin" style={{ transformOrigin: '180px 165px', animationDuration: '4s' }} />

          {/* Thin Chimney */}
          <polygon points="260,200 268,200 264,80 260,80" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
          {/* Little exhaust steam */}
          <path d="M 262 70 Q 255 50 265 40 T 260 20" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

          {/* Underground Gas pipes */}
          <path d="M 320 220 L 200 220 L 200 200" fill="none" stroke="#d97706" strokeWidth="3.5" />
          <text x="290" y="235" fill="#d97706" fontSize="9" fontFamily="monospace" fontWeight="bold">GAZODUC HP SOUSTERRAIN</text>

          {/* Siting markings */}
          <g stroke="#94a3b8" strokeWidth="1">
            <line x1="285" y1="80" x2="285" y2="200" />
            <polygon points="285,80 282,86 288,86" fill="#94a3b8" />
            <polygon points="285,200 282,194 288,194" fill="#94a3b8" />
          </g>
          <text x="315" y="145" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">H ~70m</text>
        </svg>
      );

    case 'geothermal_station':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-48 md:h-64 text-slate-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-geo" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid-geo)" />

          {/* Ground */}
          <line x1="20" y1="80" x2="380" y2="80" stroke="#64748b" strokeWidth="3" />

          {/* Surface station */}
          <rect x="150" y="40" width="100" height="40" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          <line x1="150" y1="40" x2="200" y2="20" stroke="#0284c7" strokeWidth="2" />
          <line x1="250" y1="40" x2="200" y2="20" stroke="#0284c7" strokeWidth="2" />

          {/* Deep geothermal strata */}
          <rect x="20" y="180" width="360" height="40" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
          <text x="200" y="205" fill="#ef4444" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ROCHE VOLCANIQUE CHAUDE (~250°C)</text>

          {/* Production Well (Extraction) */}
          <path d="M 120 80 L 120 185" stroke="#ef4444" strokeWidth="4" />
          <path d="M 120 185 L 120 80" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 8" className="animate-pulse" />
          <text x="65" y="130" fill="#ef4444" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PRODUCTION (VAPEUR)</text>

          {/* Injection Well (Return) */}
          <path d="M 280 80 L 280 185" stroke="#2563eb" strokeWidth="4" />
          <path d="M 280 80 L 280 185" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 8" className="animate-pulse" />
          <text x="335" y="130" fill="#1d4ed8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">RÉINJECTION (EAU COULÉE)</text>

          {/* Undergound connection path */}
          <path d="M 120 185 Q 200 200 280 185" stroke="#d97706" strokeWidth="2" strokeDasharray="4 4" />

          {/* Dimensions indicator */}
          <g stroke="#94a3b8" strokeWidth="1">
            <line x1="40" y1="80" x2="40" y2="180" />
            <polygon points="40,80 37,86 43,86" fill="#94a3b8" />
            <polygon points="40,180 37,174 43,174" fill="#94a3b8" />
          </g>
          <text x="30" y="135" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 30, 135)" fontWeight="bold">Prof. ~3000m</text>
        </svg>
      );

    case 'biomass_station':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-48 md:h-64 text-slate-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bio" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid-bio)" />

          {/* Ground */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="#64748b" strokeWidth="3" />

          {/* Hangar or platform for storage */}
          <rect x="40" y="120" width="100" height="80" fill="#ffffff" stroke="#059669" strokeWidth="2" />
          <polygon points="30,120 150,120 90,95" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
          <text x="90" y="150" fill="#047857" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">STOCKAGE</text>
          <text x="90" y="165" fill="#047857" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PLAQUETTES BOIS</text>

          {/* Feed belt */}
          <line x1="140" y1="175" x2="190" y2="155" stroke="#64748b" strokeWidth="4" />
          <circle cx="140" cy="175" r="2" fill="#94a3b8" />
          <circle cx="190" cy="155" r="2" fill="#94a3b8" />

          {/* Incinerator boiler block */}
          <rect x="190" y="110" width="80" height="90" fill="#ffffff" stroke="#d97706" strokeWidth="2.5" />
          {/* Flame icon */}
          <path d="M 220 180 Q 230 150 240 180 T 220 180" fill="#f59e0b" className="animate-pulse" />
          <text x="230" y="100" fill="#d97706" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">FOYER DE COMBUSTION</text>

          {/* Active Electrofilter and chimney */}
          <rect x="290" y="140" width="40" height="60" fill="#ffffff" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="310" y="132" fill="#0ea5e9" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">FILTRE</text>
          
          <polygon points="330,200 338,200 335,80 330,80" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
          <path d="M 332 75 Q 325 60 335 50" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Dimensions indicators */}
          <g stroke="#94a3b8" strokeWidth="1">
            <line x1="360" y1="80" x2="360" y2="200" />
            <polygon points="360,80 357,86 363,86" fill="#94a3b8" />
            <polygon points="360,200 357,194 363,194" fill="#94a3b8" />
          </g>
          <text x="370" y="145" fill="#475569" fontSize="10" fontFamily="monospace" transform="rotate(90, 370, 145)" fontWeight="bold">H ~35m</text>
        </svg>
      );

    default:
      return null;
  }
}
