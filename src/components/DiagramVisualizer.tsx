import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PowerPlant, DiagramNode, DiagramLink } from '../types';
import * as Icons from 'lucide-react';

interface DiagramVisualizerProps {
  plant: PowerPlant;
  activeStep: number | null;
}

const FLOW_COLORS: Record<string, { stroke: string; glow: string; particle: string }> = {
  heat: { stroke: '#ef4444', glow: '#fee2e2', particle: '#dc2626' }, // Red
  steam: { stroke: '#0ea5e9', glow: '#e0f2fe', particle: '#0284c7' }, // Light Blue
  water: { stroke: '#2563eb', glow: '#dbeafe', particle: '#1d4ed8' }, // Blue
  mechanical: { stroke: '#d97706', glow: '#fef3c7', particle: '#b45309' }, // Amber
  electricity: { stroke: '#059669', glow: '#d1fae5', particle: '#047857' }, // Emerald / Green energy feel
  radiation: { stroke: '#e11d48', glow: '#ffe4e6', particle: '#be123c' }, // Rose
  wind: { stroke: '#64748b', glow: '#f1f5f9', particle: '#475569' }, // Slate
  cooling: { stroke: '#0d9488', glow: '#ccfbf1', particle: '#0f766e' } // Teal
};

const NODE_TYPE_COLORS: Record<string, string> = {
  source: 'bg-orange-100 border-orange-500 text-orange-700',
  conversion: 'bg-purple-100 border-purple-500 text-purple-700',
  turbine: 'bg-amber-100 border-amber-500 text-amber-700',
  generator: 'bg-blue-100 border-blue-500 text-blue-700',
  grid: 'bg-emerald-100 border-emerald-500 text-emerald-700',
  cooling: 'bg-teal-100 border-teal-500 text-teal-700',
  storage: 'bg-indigo-100 border-indigo-500 text-indigo-700'
};

export default function DiagramVisualizer({ plant, activeStep }: DiagramVisualizerProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { nodes, links } = plant.diagram;

  // Render Lucide icon helper
  const renderNodeIcon = (type: string) => {
    switch (type) {
      case 'source':
        return <Icons.Flame className="w-5 h-5" />;
      case 'conversion':
        return <Icons.Cpu className="w-5 h-5" />;
      case 'turbine':
        return <Icons.Wind className="w-5 h-5" />;
      case 'generator':
        return <Icons.Zap className="w-5 h-5" />;
      case 'grid':
        return <Icons.Radio className="w-5 h-5" />;
      case 'cooling':
        return <Icons.Waves className="w-5 h-5" />;
      default:
        return <Icons.Settings className="w-5 h-5" />;
    }
  };

  // Convert layout % coordinates (0-100) to actual SVG viewBox coordinates (0-1000, 0-500)
  const getCoords = (nodeId: string): { x: number; y: number } => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return {
      x: (node.x / 100) * 1000,
      y: (node.y / 100) * 500
    };
  };

  return (
    <div id="diagram-section" className="relative w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden">
      {/* Absolute Header with Status */}
      <div className="absolute top-4 left-6 flex items-center space-x-3 z-10">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
        </span>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
          Flux de fonctionnement en temps réel
        </span>
      </div>

      <div className="absolute top-4 right-6 flex items-center space-x-4 z-10 text-[10px] text-slate-500 font-mono font-bold">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded bg-amber-500"></div>
          <span>Source / Entrée</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded bg-blue-600"></div>
          <span>Conversion / Réseau</span>
        </div>
      </div>

      {/* Main SVG Area */}
      <div className="relative mt-8 aspect-[2/1] w-full min-h-[300px] md:min-h-[400px]">
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Define Gradients & Markers for Arrowheads */}
          <defs>
            {Object.keys(FLOW_COLORS).map(key => (
              <linearGradient id={`grad-${key}`} key={key} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={FLOW_COLORS[key].stroke} stopOpacity="0.4" />
                <stop offset="50%" stopColor={FLOW_COLORS[key].stroke} stopOpacity="1" />
                <stop offset="100%" stopColor={FLOW_COLORS[key].stroke} stopOpacity="0.4" />
              </linearGradient>
            ))}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="35"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Render Connections/Links first so they are behind nodes */}
          {links.map((link, idx) => {
            const start = getCoords(link.from);
            const end = getCoords(link.to);
            const flow = FLOW_COLORS[link.flowType] || { stroke: '#94a3b8', glow: '#f1f5f9', particle: '#cbd5e1' };

            // Check if active step relates to this node/link
            const isStepActive = activeStep !== null && (
              (activeStep === 1 && link.from === 'source') ||
              (activeStep === 2 && link.to === 'boiler') ||
              (activeStep === 3 && link.to === 'turbine') ||
              (activeStep === 4 && link.to === 'generator') ||
              (activeStep === 5 && (link.flowType === 'cooling' || link.from === 'cooling')) ||
              (activeStep === 6 && link.to === 'grid')
            );

            return (
              <g key={`link-${idx}`}>
                {/* Glow behind the path */}
                <path
                  d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                  stroke={flow.stroke}
                  strokeWidth={isStepActive ? 12 : 6}
                  strokeOpacity={isStepActive ? 0.35 : 0.15}
                  fill="none"
                  className="transition-all duration-300"
                />

                {/* Main Path Line */}
                <path
                  id={`path-${idx}`}
                  d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                  stroke={`url(#grad-${link.flowType})`}
                  strokeWidth={isStepActive ? 4 : 2}
                  fill="none"
                  markerEnd="url(#arrow)"
                />

                {/* Moving Flow Particles */}
                <path
                  d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                  stroke={flow.particle}
                  strokeWidth={isStepActive ? 5 : 3.5}
                  strokeDasharray={isStepActive ? "15, 30" : "8, 25"}
                  fill="none"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="500;0"
                    dur={isStepActive ? "2s" : "4.5s"}
                    repeatCount="indefinite"
                  />
                </path>

                {/* Flow type indicator text (displayed at midpoint if hovered or active) */}
                {(isStepActive || hoveredNode === link.from || hoveredNode === link.to) && link.label && (
                  <g transform={`translate(${(start.x + end.x) / 2}, ${(start.y + end.y) / 2 - 12})`}>
                    <rect
                      x="-85"
                      y="-14"
                      width="170"
                      height="24"
                      rx="6"
                      fill="#ffffff"
                      stroke={flow.stroke}
                      strokeWidth="1.5"
                      className="shadow-md"
                    />
                    <text
                      fill={flow.particle}
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontWeight="bold"
                    >
                      {link.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map(node => {
            const coords = getCoords(node.id);
            const isHovered = hoveredNode === node.id;
            
            // Highlight node if related to active tutorial step
            const isNodeActive = activeStep !== null && (
              (activeStep === 1 && node.id === 'source') ||
              (activeStep === 2 && (node.id === 'boiler' || node.id === 'pipe' || node.id === 'panel')) ||
              (activeStep === 3 && (node.id === 'turbine' || node.id === 'rotor' || node.id === 'inverter')) ||
              (activeStep === 4 && (node.id === 'generator' || node.id === 'gearbox' || node.id === 'transformer')) ||
              (activeStep === 5 && (node.id === 'cooling' || node.id === 'river' || node.id === 'rejection' || node.id === 'heating')) ||
              (activeStep === 6 && node.id === 'grid')
            );

            return (
              <g
                key={node.id}
                transform={`translate(${coords.x}, ${coords.y})`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                {/* Ping animation if node is active */}
                {isNodeActive && (
                  <circle
                    r="34"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    className="animate-ping"
                    opacity="0.6"
                  />
                )}

                {/* Outer Shadow Circle */}
                <circle
                  r={isHovered ? '28' : '24'}
                  fill="#ffffff"
                  stroke={isNodeActive ? '#2563eb' : isHovered ? '#3b82f6' : '#cbd5e1'}
                  strokeWidth={isNodeActive || isHovered ? '3' : '1.5'}
                  className="transition-all duration-300 shadow-sm"
                />

                {/* Inner Icon Container */}
                <foreignObject
                  x="-14"
                  y="-14"
                  width="28"
                  height="28"
                  className="pointer-events-none"
                >
                  <div className={`flex items-center justify-center w-full h-full ${
                    isNodeActive ? 'text-blue-600' : isHovered ? 'text-blue-500' : 'text-slate-500'
                  }`}>
                    {renderNodeIcon(node.type)}
                  </div>
                </foreignObject>

                {/* Text Label Container (with backdrop) */}
                <g transform="translate(0, 42)">
                  <rect
                    x="-80"
                    y="-10"
                    width="160"
                    height="20"
                    rx="6"
                    fill={isNodeActive ? '#eff6ff' : isHovered ? '#f1f5f9' : '#ffffff'}
                    stroke={isNodeActive ? '#bfdbfe' : isHovered ? '#cbd5e1' : '#e2e8f0'}
                    strokeWidth="1"
                    className="transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                  <text
                    fill={isNodeActive ? '#1e40af' : isHovered ? '#334155' : '#475569'}
                    fontSize="10"
                    fontWeight={isNodeActive || isHovered ? 'bold' : 'normal'}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {node.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info helper block explaining the currently hovered element */}
      <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start space-x-3">
        <Icons.Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-650 leading-relaxed">
          {hoveredNode ? (
            <>
              <strong className="text-blue-700">
                {nodes.find(n => n.id === hoveredNode)?.label} :{' '}
              </strong>
              {hoveredNode === 'source' && 'Le point d\'entrée d\'énergie primaire (combustible nucléaire, vent, chute d\'eau, gaz naturel, soleil).'}
              {hoveredNode === 'boiler' && 'Transforme l\'énergie thermique en vapeur à haute pression pour alimenter le circuit.'}
              {hoveredNode === 'pipe' && 'Canalise la chute d\'eau à haute vitesse pour maximiser la pression cinétique.'}
              {hoveredNode === 'panel' && 'Capte l\'énergie des photons solaires pour forcer la circulation d\'électrons.'}
              {hoveredNode === 'turbine' && 'Reçoit l\'énergie cinétique du flux (vapeur, eau ou vent) et la convertit en énergie mécanique rotative.'}
              {hoveredNode === 'rotor' && 'Pales profilées qui captent l\'énergie cinétique du vent et entraînent l\'arbre principal.'}
              {hoveredNode === 'gearbox' && 'Accélère la vitesse de rotation lente des pales pour correspondre à la fréquence optimale de la génératrice.'}
              {hoveredNode === 'generator' && 'L\'alternateur ou génératrice convertit l\'énergie mécanique rotative en électricité alternative par magnétisme.'}
              {hoveredNode === 'inverter' && 'Convertit le courant continu issu des panneaux solaires en courant alternatif de fréquence réseau.'}
              {hoveredNode === 'transformer' && 'Élève la tension électrique pour réduire les pertes par effet Joule pendant le transport.'}
              {hoveredNode === 'grid' && 'Lignes haute tension qui acheminent l\'énergie finale vers les usagers, maisons et industries.'}
              {hoveredNode === 'cooling' && 'Refroidit et condense le fluide de travail (vapeur) pour boucler le circuit fermé.'}
              {hoveredNode === 'river' && 'Restitue l\'eau intacte et sans pollution chimique à la rivière ou au fleuve récepteur.'}
              {hoveredNode === 'rejection' && 'Réinjecte l\'eau refroidie au cœur du réservoir géothermique souterrain pour en conserver la pression.'}
              {hoveredNode === 'heating' && 'Utilise l\'excédent thermique pour chauffer directement un réseau de chaleur urbain.'}
            </>
          ) : activeStep !== null ? (
            <>
              <strong className="text-emerald-700">Étape {activeStep} en cours de mise en évidence : </strong>
              {plant.processSteps[activeStep - 1]?.description}
            </>
          ) : (
            'Survolez les différents composants ou passez les étapes à gauche pour comprendre le fonctionnement physique de la centrale.'
          )}
        </p>
      </div>
    </div>
  );
}
