import { PowerPlant } from '../types';

export const powerPlantsData: PowerPlant[] = [
  {
    id: 'nuclear',
    name: 'Centrale Nucléaire',
    iconName: 'Atom',
    category: 'Décarbonée non-renouvelable',
    shortDescription: 'Produit une énorme quantité d\'électricité de manière continue et pilotable à partir de la fission d\'atomes d\'uranium, sans émission directe de CO2.',
    longDescription: 'Une centrale nucléaire utilise la chaleur libérée par la fission nucléaire de l\'uranium dans un réacteur pour chauffer de l\'eau. Cette eau sous haute pression produit de la vapeur qui fait tourner une turbine géante couplée à un alternateur pour générer de l\'électricité. C\'est une source d\'énergie de base hautement fiable qui fournit de grands volumes de puissance électrique en continu, indépendamment de la météo.',
    characteristics: {
      efficiency: '33% - 37%',
      typicalPower: '900 - 1650 MW par réacteur',
      co2Emissions: 12,
      constructionCost: 'Très Élevé',
      operatingCost: 'Faible',
      constructionTime: '7 - 12 ans',
      lifespan: '40 - 60 ans (extensible)',
      intermittency: 'Aucune',
      dispatchable: true,
      fuelType: 'Uranium 235 / MOX'
    },
    advantages: [
      'Production massive d\'électricité en continu (facteur de charge > 85%)',
      'Très faible empreinte carbone (équivalente à l\'éolien)',
      'Haute densité énergétique (1g d\'uranium = 3 tonnes de charbon)',
      'Faible coût du combustible par rapport à l\'électricité produite',
      'Pilotabilité pour répondre à la demande de base du réseau'
    ],
    disadvantages: [
      'Production de déchets radioactifs à longue durée de vie',
      'Coûts et délais de construction extrêmement élevés',
      'Risque d\'accident majeur (bien que statistiquement très faible)',
      'Dépendance aux ressources d\'eau pour le refroidissement des réacteurs',
      'Démantèlement long et coûteux en fin de vie'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Fission Nucléaire dans le Réacteur',
        description: 'Les neutrons percutent les atomes d\'uranium dans la cuve du réacteur, provoquant leur division (fission). Ce processus dégage une chaleur thermique colossale.'
      },
      {
        step: 2,
        title: 'Génération de Vapeur',
        description: 'L\'eau du circuit primaire, chauffée à plus de 300°C sous haute pression pour l\'empêcher de bouillir, circule dans un générateur de vapeur où elle chauffe l\'eau d\'un circuit secondaire indépendant, la transformant en vapeur sèche.'
      },
      {
        step: 3,
        title: 'Entraînement de la Turbine',
        description: 'La vapeur sous forte pression est projetée à grande vitesse sur les aubes d\'une turbine, la faisant tourner rapidement.'
      },
      {
        step: 4,
        title: 'Production d\'Électricité',
        description: 'La rotation de la turbine entraîne un alternateur géant. Les aimants de l\'alternateur tournent à l\'intérieur de bobines de cuivre, générant un courant alternatif.'
      },
      {
        step: 5,
        title: 'Refroidissement et Condensation',
        description: 'La vapeur d\'eau ayant actionné la turbine est refroidie par un troisième circuit d\'eau froide provenant de la mer, d\'un fleuve ou d\'une tour aéroréfrigérante, se transformant à nouveau en eau liquide pour recommencer le cycle.'
      },
      {
        step: 6,
        title: 'Injection dans le Réseau',
        description: 'La tension électrique est élevée par un transformateur pour minimiser les pertes, puis injectée dans les lignes très haute tension du réseau.'
      }
    ],
    diagram: {
      nodes: [
        { id: 'source', label: 'Cœur du Réacteur (Fission)', x: 15, y: 55, type: 'source' },
        { id: 'boiler', label: 'Générateur de Vapeur', x: 38, y: 35, type: 'conversion' },
        { id: 'turbine', label: 'Turbine à Vapeur', x: 60, y: 35, type: 'turbine' },
        { id: 'generator', label: 'Alternateur', x: 78, y: 35, type: 'generator' },
        { id: 'grid', label: 'Réseau Électrique', x: 92, y: 35, type: 'grid' },
        { id: 'cooling', label: 'Tour de Refroidissement', x: 48, y: 78, type: 'cooling' }
      ],
      links: [
        { from: 'source', to: 'boiler', label: 'Eau sous pression (320°C)', flowType: 'heat' },
        { from: 'boiler', to: 'turbine', label: 'Vapeur sèche', flowType: 'steam' },
        { from: 'turbine', to: 'generator', label: 'Arbre rotatif (1500 tr/min)', flowType: 'mechanical' },
        { from: 'generator', to: 'grid', label: 'Électricité brute', flowType: 'electricity' },
        { from: 'turbine', to: 'cooling', label: 'Vapeur basse pression', flowType: 'cooling' },
        { from: 'cooling', to: 'boiler', label: 'Eau condensée froide', flowType: 'water' }
      ]
    },
    physicalShape: {
      visualSilhouette: 'nuclear_tower',
      architecturalStyle: 'Gigantisme industriel moderniste, caractérisé par un dôme double confinement en béton précontraint et des tours aéroréfrigérantes de forme hyperboloïde.',
      dimensions: [
        { label: 'Hauteur de la Tour', value: '150 - 180 mètres', explanation: 'La forme hyperbolique favorise un tirage d\'air naturel ascendant optimal pour refroidir la vapeur sans moteurs de soufflage supplémentaires.' },
        { label: 'Diamètre de la Tour', value: '110 mètres à la base', explanation: 'Une assise extrêmement large pour assurer la stabilité structurelle et la circulation d\'immenses volumes de courants d\'air frais.' },
        { label: 'Épaisseur du Dôme', value: '1,2 à 1,8 mètres', explanation: 'Béton armé d\'acier précontraint conçu pour retenir la pression interne en cas d\'accident et résister aux chocs d\'avions de ligne.' },
        { label: 'Bâtiment Turbine', value: '200m (L) x 50m (H)', explanation: 'Un hall de taille immense destiné à loger la turbine à vapeur et l\'arbre d\'alternateur qui pèsent plusieurs milliers de tonnes.' }
      ],
      keyVisualElements: [
        {
          name: 'La Tour Hyperbolique',
          description: 'Immense cheminée évasée émettant de la vapeur d\'eau blanche.',
          shapeExplanation: 'Sa forme incurvée n\'est pas esthétique, elle est physique : elle rétrécit au milieu pour accélérer le flux d\'air (effet Venturi) et s\'élargit en haut pour faciliter l\'expansion de la vapeur.'
        },
        {
          name: 'Le Dôme de Confinement (Bâtiment Réacteur)',
          description: 'Un dôme cylindro-sphérique gris, sans fenêtres.',
          shapeExplanation: 'Une forme de dôme répartit parfaitement les forces de pression internes et externes. Il est constitué de deux parois étanches avec un espace maintenu en dépression.'
        },
        {
          name: 'La Piscine d\'Assemblage',
          description: 'Un bassin de stockage d\'eau bleue translucide et ultra-pure sous le dôme.',
          shapeExplanation: 'L\'eau fait écran aux rayonnements radioactifs. Sa profondeur (~12 mètres) permet de manipuler les crayons de combustible usagés en toute sécurité visuelle directe.'
        }
      ]
    },
    fabricationGuide: {
      sitingRequirements: [
        'Proximité immédiate d\'un fleuve à fort débit ou d\'un littoral maritime (besoin d\'eau froide pour la condensation).',
        'Stabilité tectonique absolue du sous-sol (absence de failles actives, risque sismique minime).',
        'Éloignement suffisant des zones urbaines denses et des couloirs aériens commerciaux stratégiques.',
        'Sol rocheux de très haute capacité portante capable de supporter la charge du dôme et de la cuve.'
      ],
      keyMaterials: [
        { name: 'Béton Armé Précontraint', proportion: '75%', purpose: 'Gros œuvre, dôme de confinement robuste, piscine de stockage et fondations.' },
        { name: 'Acier Spécial au Carbone / Inox', proportion: '15%', purpose: 'Cuve du réacteur (forgée d\'un seul tenant), tuyauteries haute pression et turbines.' },
        { name: 'Zirconium', proportion: '1%', purpose: 'Gaine entourant les pastilles d\'uranium en raison de sa très faible absorption des neutrons.' },
        { name: 'Cuivre et Laiton', proportion: '4%', purpose: 'Bobinages électromagnétiques de l\'alternateur principal et tubes du condenseur.' }
      ],
      constructionSteps: [
        {
          phase: '1. Terrassement et Excavation Sismique',
          duration: '1 - 2 ans',
          description: 'Creusement d\'une souille géante jusqu\'au socle rocheux sain. Pose d\'un réseau dense d\'amortisseurs parasismiques en néoprène-acier.',
          keyChallenge: 'Garantir l\'étanchéité absolue des fondations contre les nappes phréatiques environnantes.'
        },
        {
          phase: '2. Coulage du Radier de Base',
          duration: '1 an',
          description: 'Mise en œuvre d\'une dalle de béton armé continue de plus de 4 mètres d\'épaisseur, coulée sans interruption pour éviter toute fissure.',
          keyChallenge: 'Contrôler l\'exothermie du béton lors de la prise pour empêcher les micro-fissures structurelles.'
        },
        {
          phase: '3. Montage de la Cuve et du Double Dôme',
          duration: '3 - 4 ans',
          description: 'Moulage et hissage de la cuve en acier spécial. Construction de la paroi interne en béton précontraint tendu par des milliers de câbles d\'acier.',
          keyChallenge: 'Forger la cuve avec une précision millimétrique, une pièce d\'acier unique de 400 tonnes sans aucune soudure dans la zone active.'
        },
        {
          phase: '4. Installation de la Turbine et de l\'Alternateur',
          duration: '2 ans',
          description: 'Installation de la turbine, de l\'alternateur, des tuyaux haute pression du circuit secondaire et montage de la tour de refroidissement.',
          keyChallenge: 'Aligner parfaitement l\'arbre rotatif de la turbine (plus de 60 mètres de long) pour éviter toute vibration destructrice à 1500 tr/min.'
        },
        {
          phase: '5. Essais à Chaud et Chargement de l\'Uranium',
          duration: '1 - 2 ans',
          description: 'Tests complets des circuits à l\'aide de vapeur artificielle. Chargement des assemblages de combustible et démarrage de la première réaction en chaîne.',
          keyChallenge: 'Valider les systèmes d\'arrêt d\'urgence et de refroidissement passif sous contrôle d\'autorités de sûreté nucléaire strictes.'
        }
      ]
    }
  },
  {
    id: 'hydro',
    name: 'Centrale Hydroélectrique',
    iconName: 'Droplets',
    category: 'Renouvelable',
    shortDescription: 'Exploite l\'énergie de la gravité terrestre et la force motrice de l\'eau stockée ou en mouvement pour générer une électricité propre et instantanément modulable.',
    longDescription: 'Les centrales hydrauliques exploitent l\'énergie potentielle de l\'eau retenue par un barrage en altitude ou le débit continu d\'un fleuve. En ouvrant les vannes, l\'eau s\'engouffre dans des conduites forcées à grande vitesse pour percuter les aubes d\'une turbine. La turbine entraîne un alternateur pour produire de l\'électricité. C\'est la reine de la flexibilité sur le réseau grâce à son démarrage ultra-rapide (en quelques minutes).',
    characteristics: {
      efficiency: '85% - 92%',
      typicalPower: '10 - 2000+ MW (selon barrage)',
      co2Emissions: 24,
      constructionCost: 'Élevé',
      operatingCost: 'Très Faible',
      constructionTime: '3 - 8 ans',
      lifespan: '80 - 100+ ans',
      intermittency: 'Faible',
      dispatchable: true,
      fuelType: 'Énergie Gravitaire de l\'Eau'
    },
    advantages: [
      'Énergie 100% renouvelable et sans émissions de gaz à effet de serre en fonctionnement',
      'Démarrage ultra-rapide (< 5 min) idéal pour stabiliser les pics de demande',
      'Capacité de stockage d\'énergie massive (barrages-réservoirs & STEP)',
      'Très longue durée de vie des infrastructures (plus d\'un siècle)',
      'Coût de production de l\'électricité parmi les plus bas après amortissement'
    ],
    disadvantages: [
      'Impact écologique majeur sur la faune aquatique, la sédimentation et les cours d\'eau',
      'Inondations de vallées entières lors de la création du réservoir (déplacement de populations)',
      'Disponibilité dépendante de la pluviosité et de la fonte des neiges',
      'Risque de rupture de barrage (hautes conséquences, bien que extrêmement surveillé)',
      'Rareté des nouveaux sites exploitables en Europe'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Retenue et Accumulation de l\'Eau',
        description: 'Le barrage bloque le cours d\'eau naturel pour créer un lac de retenue en altitude, accumulant ainsi une immense quantité d\'énergie potentielle gravitationnelle.'
      },
      {
        step: 2,
        title: 'Chute et Conduite Forcée',
        description: 'En ouvrant les vannes, l\'eau s\'écoule dans de longues conduites d\'acier en pente raide. La gravité transforme l\'énergie potentielle de l\'eau en énergie cinétique sous haute pression.'
      },
      {
        step: 3,
        title: 'Rotation de la Turbine',
        description: 'Au bas de la conduite, l\'eau sous pression est projetée avec force contre les aubes d\'une turbine (Pelton, Francis ou Kaplan selon la hauteur de chute), la faisant tourner énergiquement.'
      },
      {
        step: 4,
        title: 'Génération de l\'Électricité',
        description: 'L\'axe rotatif de la turbine entraîne le rotor d\'un alternateur placé au-dessus d\'elle, convertissant le mouvement mécanique rotatif en courant électrique alternatif.'
      },
      {
        step: 5,
        title: 'Restitution au Cours d\'Eau',
        description: 'L\'eau ressort de la turbine sans avoir subi aucune pollution chimique et rejoint son cours d\'eau naturel en aval.'
      },
      {
        step: 6,
        title: 'Élévation de Tension',
        description: 'L\'électricité produite passe par un transformateur qui élève sa tension afin qu\'elle puisse être transportée efficacement sur de longues distances.'
      }
    ],
    diagram: {
      nodes: [
        { id: 'source', label: 'Lac de Retenue (Eau)', x: 15, y: 25, type: 'source' },
        { id: 'pipe', label: 'Conduite Forcée', x: 40, y: 50, type: 'conversion' },
        { id: 'turbine', label: 'Turbine Hydraulique', x: 60, y: 75, type: 'turbine' },
        { id: 'generator', label: 'Alternateur', x: 60, y: 45, type: 'generator' },
        { id: 'grid', label: 'Réseau Électrique', x: 88, y: 45, type: 'grid' },
        { id: 'river', label: 'Restitution (Fleuve)', x: 85, y: 80, type: 'cooling' }
      ],
      links: [
        { from: 'source', to: 'pipe', label: 'Chute d\'eau', flowType: 'water' },
        { from: 'pipe', to: 'turbine', label: 'Eau sous pression', flowType: 'water' },
        { from: 'turbine', to: 'generator', label: 'Arbre vertical', flowType: 'mechanical' },
        { from: 'generator', to: 'grid', label: 'Courant alternatif', flowType: 'electricity' },
        { from: 'turbine', to: 'river', label: 'Débit sortant', flowType: 'water' }
      ]
    },
    physicalShape: {
      visualSilhouette: 'hydro_dam',
      architecturalStyle: 'Génie civil d\'intégration géographique et géologique. De la courbure gracieuse du barrage-voûte à la rigueur triangulaire du barrage-poids.',
      dimensions: [
        { label: 'Hauteur du Barrage', value: '50 - 285 mètres', explanation: 'Détermine la hauteur de chute de l\'eau. Plus la chute est haute, plus la pression cinétique finale de l\'eau est élevée.' },
        { label: 'Épaisseur à la Base', value: 'Jusqu\'à 35 mètres', explanation: 'Pour un barrage-poids, la base doit être ultra-épaisse pour contrer la poussée monumentale du lac artificiel.' },
        { label: 'Longueur du Couronnement', value: '200 - 1200 mètres', explanation: 'Représente la largeur de la crête du barrage reliant les deux flancs de la vallée montagneuse.' },
        { label: 'Diamètre Conduite Forcée', value: '3 - 8 mètres', explanation: 'Canaux d\'acier massif forcé acheminant de monstrueux débits d\'eau sous une pression de plusieurs dizaines de bars.' }
      ],
      keyVisualElements: [
        {
          name: 'La Voûte en Béton / Mur du Barrage',
          description: 'Immense rempart de béton gris barrant la vallée, courbé vers l\'amont.',
          shapeExplanation: 'Sa forme arquée (voûte) renvoie la force de poussée de l\'eau directement vers les parois rocheuses latérales de la montagne, tirant profit de la résistance de la roche.'
        },
        {
          name: 'L\'Évacuateur de Crue (Saut de Ski)',
          description: 'Toboggan géant en béton lisse intégré au barrage ou construit à côté.',
          shapeExplanation: 'La forme de saut de ski projette l\'eau de crue loin des fondations pour éviter que l\'énergie de la chute ne creuse le pied du barrage, ce qui le déstabiliserait.'
        },
        {
          name: 'La Centrale Semi-Enterrée',
          description: 'Bâtiment trapu au pied de la montagne abritant les alternateurs.',
          shapeExplanation: 'Placée le plus bas possible pour maximiser la hauteur de chute totale. Elle est souvent encastrée dans la roche pour résister aux chutes de pierres et à la pression hydraulique.'
        }
      ]
    },
    fabricationGuide: {
      sitingRequirements: [
        'Relief montagneux marqué offrant une gorge étroite (réduit la quantité de béton nécessaire).',
        'Bassin versant suffisant alimenté par des précipitations régulières ou une fonte des neiges constante.',
        'Qualité de la roche d\'ancrage (socle sain, non friable, capable de résister à des forces titanesques).',
        'Faible densité de population en amont pour minimiser l\'impact social du lac de retenue.'
      ],
      keyMaterials: [
        { name: 'Béton de Masse Plastifié', proportion: '88%', purpose: 'Corps principal du barrage, étanchéité globale et fondations ancrées en profondeur.' },
        { name: 'Acier à Haute Limite Élastique', proportion: '8%', purpose: 'Armatures structurelles, blindage intérieur des conduites forcées et vannes de sécurité.' },
        { name: 'Bronze d\'Aluminium', proportion: '1%', purpose: 'Fabrication des pales des turbines (résistance optimale à la cavitation et à l\'érosion sableuse).' },
        { name: 'Argile compactée / Enrochement', proportion: '3%', purpose: 'Alternative de noyau d\'étanchéité pour les barrages en terre.' }
      ],
      constructionSteps: [
        {
          phase: '1. Dérivation Provisoire de la Rivière',
          duration: '1 - 2 ans',
          description: 'Creusement de tunnels de dérivation dans les flancs de la montagne pour contourner la zone de chantier à sec.',
          keyChallenge: 'Maîtriser les crues saisonnières subites qui pourraient inonder les travaux d\'excavation.'
        },
        {
          phase: '2. Excavation et Injection de Ciment',
          duration: '1 an',
          description: 'Creusement du lit de la rivière jusqu\'au roc sain et réalisation d\'un "voile d\'étanchéité" en injectant du ciment liquide sous pression dans les micro-fissures de la roche.',
          keyChallenge: 'Éliminer toute possibilité d\'infiltration d\'eau sous le futur barrage qui provoquerait son soulèvement.'
        },
        {
          phase: '3. Coulage Continu par Blocs (Plots)',
          duration: '2 - 4 ans',
          description: 'Bétonnage par sections verticales appelées "plots", intégrant des joints d\'étanchéité et des circuits de refroidissement d\'eau pour dissiper la chaleur du ciment.',
          keyChallenge: 'Éviter le retrait thermique du béton de masse, qui provoquerait des fractures internes invisibles.'
        },
        {
          phase: '4. Percement des Conduites Forcées et Montage des Turbines',
          duration: '1 - 2 ans',
          description: 'Installation des canalisations en acier blindé et montage des turbines Pelton ou Francis et des alternateurs géants.',
          keyChallenge: 'Ajuster les roulements hydrauliques au centième de millimètre pour résister à des pressions de plus de 50 bars.'
        },
        {
          phase: '5. Remplissage du Réservoir (Mise en eau)',
          duration: '6 mois - 1 an',
          description: 'Fermeture des vannes de dérivation et montée progressive du niveau de l\'eau sous surveillance permanente des capteurs de déformation du barrage.',
          keyChallenge: 'Surveiller la sismicité induite par le poids colossal du nouveau lac artificiel créé.'
        }
      ]
    }
  },
  {
    id: 'solar',
    name: 'Centrale Solaire Photovoltaïque',
    iconName: 'Sun',
    category: 'Renouvelable',
    shortDescription: 'Convertit directement le rayonnement lumineux du Soleil en électricité grâce à l\'effet photovoltaïque dans des cellules de silicium.',
    longDescription: 'Les centrales solaires captent les photons émis par le soleil à l\'aide de panneaux composés de matériaux semi-conducteurs (comme le silicium). Les photons heurtent les électrons de ces plaques de silicium, créant un courant électrique continu. Un équipement crucial, l\'onduleur, transforme ensuite ce courant continu en courant alternatif compatible avec le réseau électrique.',
    characteristics: {
      efficiency: '18% - 23%',
      typicalPower: '1 - 100+ MW (selon surface)',
      co2Emissions: 41,
      constructionCost: 'Faible',
      operatingCost: 'Très Faible',
      constructionTime: '6 mois - 2 ans',
      lifespan: '25 - 35 ans',
      intermittency: 'Élevée',
      dispatchable: false,
      fuelType: 'Lumière Solaire (Photons)'
    },
    advantages: [
      'Source d\'énergie virtuellement inépuisable et universellement disponible',
      'Aucun élément mobile (pas d\'usure mécanique, maintenance extrêmement réduite)',
      'Rapidité d\'installation et d\'évolutivité (de la toiture de maison à la giga-ferme au sol)',
      'Excellente acceptabilité pour les applications d\'autoconsommation locale',
      'Matériaux des panneaux recyclables à plus de 95% (silicium, verre, alu)'
    ],
    disadvantages: [
      'Intermittence intrinsèque (production nulle la nuit, très réduite en hiver ou ciel nuageux)',
      'Nécessite de grandes superficies au sol pour des puissances équivalentes aux centrales thermiques',
      'Fabrication initiale énergivore (souvent concentrée dans des pays au mix électrique carboné)',
      'Besoin de stockage par batterie ou de centrales de soutien pour lisser la production',
      'Rendement énergétique relativement bas par rapport aux technologies thermiques'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Absorption de la Lumière',
        description: 'Les panneaux solaires sont orientés vers le ciel. La lumière du soleil est composée de paquets d\'énergie appelés photons.'
      },
      {
        step: 2,
        title: 'Effet Photovoltaïque',
        description: 'Les photons frappent les cellules de silicium. L\'énergie du photon est transférée aux électrons du silicium, qui se mettent en mouvement et créent une tension électrique.'
      },
      {
        step: 3,
        title: 'Production de Courant Continu',
        description: 'Le déplacement ordonné de ces électrons le long des circuits intégrés de la cellule crée un courant électrique continu (DC).'
      },
      {
        step: 4,
        title: 'Conversion par l\'Onduleur',
        description: 'Le courant continu généré par le champ solaire est envoyé à un onduleur. Cet appareil électronique le convertit en courant alternatif (AC) à 50 Hz ou 60 Hz.'
      },
      {
        step: 5,
        title: 'Adaptation de Tension',
        description: 'Un transformateur augmente la tension du courant alternatif pour qu\'elle corresponde aux caractéristiques de transport de la ligne électrique locale.'
      },
      {
        step: 6,
        title: 'Réseau et Consommation',
        description: 'L\'électricité solaire est injectée sur le réseau et consommée instantanément par les habitations et industries les plus proches.'
      }
    ],
    diagram: {
      nodes: [
        { id: 'source', label: 'Soleil (Photons)', x: 15, y: 25, type: 'source' },
        { id: 'panel', label: 'Panneaux Photovoltaïques', x: 40, y: 55, type: 'conversion' },
        { id: 'inverter', label: 'Onduleur (Convertisseur AC/DC)', x: 65, y: 55, type: 'generator' },
        { id: 'transformer', label: 'Transformateur HTA', x: 82, y: 55, type: 'generator' },
        { id: 'grid', label: 'Réseau Électrique', x: 92, y: 55, type: 'grid' }
      ],
      links: [
        { from: 'source', to: 'panel', label: 'Rayonnement lumineux', flowType: 'radiation' },
        { from: 'panel', to: 'inverter', label: 'Courant Continu (DC)', flowType: 'electricity' },
        { from: 'inverter', to: 'transformer', label: 'Courant Alternatif (AC)', flowType: 'electricity' },
        { from: 'transformer', to: 'grid', label: 'Électricité Moyenne Tension', flowType: 'electricity' }
      ]
    },
    physicalShape: {
      visualSilhouette: 'solar_field',
      architecturalStyle: 'Architecture modulaire répétitive et plate. Alignements parfaits de tables de silicium adaptées à la topographie.',
      dimensions: [
        { label: 'Surface requise', value: '1 à 2 hectares par MW', explanation: 'La faible densité d\'énergie lumineuse reçue par mètre carré nécessite d\'occuper de grands espaces pour égaler le thermique.' },
        { label: 'Taille d\'un Panneau', value: '1,7 x 1,0 mètre (standard)', explanation: 'Un format optimisé pour la manipulation humaine, la résistance au vent et la standardisation des supports industriels.' },
        { label: 'Épaisseur de la cellule', value: '0,18 millimètre', explanation: 'Une feuille ultra-fine de silicium purifié prise en sandwich entre des couches protectrices de verre trempé et d\'EVA.' },
        { label: 'Angle d\'inclinaison', value: '30° à 45° (selon latitude)', explanation: 'Incliné pour faire face au soleil de manière orthogonale et assurer l\'auto-nettoyage naturel des poussières par la pluie.' }
      ],
      keyVisualElements: [
        {
          name: 'Les Tables de Panneaux',
          description: 'Longues rangées de miroirs bleu foncé ou noirs, mates, montées sur des cadres d\'aluminium.',
          shapeExplanation: 'Les panneaux sont groupés en séries inclinées. Leur couleur très sombre indique qu\'ils absorbent la quasi-totalité du spectre lumineux pour capter le plus de photons.'
        },
        {
          name: 'Les Trackers (Suiveurs Solaires)',
          description: 'Moteurs électriques faisant pivoter lentement les tables de l\'Est à l\'Ouest.',
          shapeExplanation: 'Ils maintiennent les panneaux perpendiculaires aux rayons du soleil toute la journée, augmentant le rendement quotidien de 25% par rapport à une structure fixe.'
        },
        {
          name: 'Le Poste d\'Ondulation (Container)',
          description: 'Petit bâtiment ou container métallique gris réparti au milieu des rangées.',
          shapeExplanation: 'Placé au plus près des panneaux pour réduire la longueur des câbles transportant le courant continu (sujet à plus de pertes électriques que l\'alternatif).'
        }
      ]
    },
    fabricationGuide: {
      sitingRequirements: [
        'Excellent taux d\'ensoleillement annuel moyen (insolation directe élevée).',
        'Terrains plats ou doucement inclinés vers le sud, sans obstacles d\'ombrage (arbres, montagnes).',
        'Proximité d\'un point de raccordement réseau (Poste source) pour minimiser le coût des tranchées de câbles.',
        'Valorisation préférentielle de terres dégradées (friches industrielles, anciennes décharges, carrières).'
      ],
      keyMaterials: [
        { name: 'Silicium Cristallin', proportion: '5%', purpose: 'Matériau semi-conducteur actif créant l\'effet photovoltaïque par libération d\'électrons.' },
        { name: 'Verre Trempé Haute Transparence', proportion: '65%', purpose: 'Face avant protectrice contre la grêle, l\'humidité et les intempéries sans bloquer la lumière.' },
        { name: 'Aluminium anodisé', proportion: '20%', purpose: 'Cadre extérieur de rigidité mécanique des modules et structures portantes légères.' },
        { name: 'Cuivre et Argent', proportion: '2%', purpose: 'Grille de collecte métallique sérigraphiée sur les cellules et câblages inter-panneaux.' }
      ],
      constructionSteps: [
        {
          phase: '1. Préparation du terrain et Piquetage',
          duration: '1 - 2 mois',
          description: 'Débroussaillage léger sans bétonnage des sols (conservation de l\'herbe). Mesures de géomètres pour implanter les rangées.',
          keyChallenge: 'Éviter le nivellement excessif des terres pour ne pas détruire la couche arable et la biodiversité locale.'
        },
        {
          phase: '2. Enfoncement des Pieux (Battage)',
          duration: '2 - 3 mois',
          description: 'Enfoncement direct de pieux en acier galvanisé dans le sol à l\'aide d\'une machine de battage, sans fondations en béton armé.',
          keyChallenge: 'Garantir une profondeur d\'ancrage suffisante pour résister à l\'arrachement lors de tempêtes violentes.'
        },
        {
          phase: '3. Assemblage des structures et Trackers',
          duration: '2 mois',
          description: 'Montage des bras métalliques horizontaux, des axes de rotation et des moteurs électriques de pivotement.',
          keyChallenge: 'Assurer une planéité et un parallélisme parfaits pour que la rotation motorisée ne coince pas sur des centaines de mètres.'
        },
        {
          phase: '4. Pose des Modules et Câblage DC',
          duration: '2 - 3 mois',
          description: 'Fixation rapide des modules photovoltaïques par brides auto-bloquantes et connexion des câbles étanches "Plug & Play".',
          keyChallenge: 'Gérer la logistique de milliers de cartons de panneaux fragiles à stocker et manipuler au sol sans chocs.'
        },
        {
          phase: '5. Raccordement des Onduleurs et Tests',
          duration: '1 - 2 mois',
          description: 'Pose des cabines d\'onduleurs et des transformateurs. Passage des câbles AC souterrains de haute puissance et tests de bon raccordement.',
          keyChallenge: 'Éliminer les risques d\'arcs électriques sous courant continu qui sont difficiles à éteindre spontanément.'
        }
      ]
    }
  },
  {
    id: 'wind',
    name: 'Centrale Éolienne',
    iconName: 'Wind',
    category: 'Renouvelable',
    shortDescription: 'Capte l\'énergie cinétique du vent à l\'aide d\'hélices géantes pour actionner un générateur électrique logé au sommet d\'une mâture.',
    longDescription: 'Une éolienne moderne se compose d\'un mât surmonté d\'une nacelle contenant un générateur et un multiplicateur de vitesse. La force du vent fait tourner des pales profilées comme des ailes d\'avion. Ce mouvement de rotation lente est accéléré par le multiplicateur de vitesse pour faire tourner le rotor d\'un alternateur très rapidement, générant une électricité renouvelable.',
    characteristics: {
      efficiency: '35% - 50% (Limite théorique de Betz à 59%)',
      typicalPower: '2 - 5 MW (terrestre), 8 - 15 MW (en mer)',
      co2Emissions: 11,
      constructionCost: 'Moyen',
      operatingCost: 'Faible',
      constructionTime: '1 - 3 ans',
      lifespan: '20 - 25 ans',
      intermittency: 'Élevée',
      dispatchable: false,
      fuelType: 'Énergie Cinétique du Vent'
    },
    advantages: [
      'Énergie verte avec une excellente empreinte carbone globale',
      'Faible emprise au sol agricole (possibilité de cultures ou élevages sous les éoliennes)',
      'Éolien en mer (offshore) offrant des vents plus stables et des puissances impressionnantes',
      'Démantèlement simple et rapide en fin de vie avec recyclage quasi-intégral',
      'Production complémentaire au solaire (souvent plus de vent en hiver et de nuit)'
    ],
    disadvantages: [
      'Production intermittente dépendant de la météo (pas de vent = pas d\'électricité)',
      'Impact esthétique/paysager et nuisances sonores résiduelles pour les riverains',
      'Fluctuations rapides de puissance injectée nécessitant un réseau intelligent et réactif',
      'Coûts et contraintes logistiques d\'installation élevés pour le secteur offshore',
      'Risques accidentels d\'impacts avec l\'avifaune (oiseaux et chauves-souris)'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Force du Vent sur les Pales',
        description: 'Le vent souffle sur les trois pales de l\'éolienne. Grâce à leur profil aérodynamique, la différence de pression crée une force de portance qui fait tourner le rotor.'
      },
      {
        step: 2,
        title: 'Rotation du Rotor Lent',
        description: 'Les pales tournent à une vitesse lente mais avec un couple mécanique extrêmement puissant (entre 8 et 15 tours par minute).'
      },
      {
        step: 3,
        title: 'Multiplication de la Vitesse',
        description: 'Dans la nacelle, un multiplicateur de vitesse (engrenages) accélère cette rotation lente près de 100 fois pour atteindre environ 1500 tours par minute.'
      },
      {
        step: 4,
        title: 'Génération Électrique',
        description: 'L\'axe rapide entraîne un alternateur (génératrice) qui produit un courant électrique alternatif de tension intermédiaire.'
      },
      {
        step: 5,
        title: 'Ajustement et Transport',
        description: 'Le courant descend à l\'intérieur du mât via de gros câbles jusqu\'à un convertisseur de fréquence et un transformateur situés au pied de l\'éolienne.'
      },
      {
        step: 6,
        title: 'Raccordement au Réseau',
        description: 'L\'électricité est acheminée par câble souterrain jusqu\'au poste de livraison électrique pour être distribuée sur le réseau régional.'
      }
    ],
    diagram: {
      nodes: [
        { id: 'source', label: 'Vent (Mouvement d\'air)', x: 12, y: 50, type: 'source' },
        { id: 'rotor', label: 'Rotor et Pales', x: 35, y: 50, type: 'conversion' },
        { id: 'gearbox', label: 'Multiplicateur (Engrenages)', x: 55, y: 50, type: 'turbine' },
        { id: 'generator', label: 'Génératrice (Alternateur)', x: 75, y: 50, type: 'generator' },
        { id: 'grid', label: 'Réseau Électrique', x: 92, y: 50, type: 'grid' }
      ],
      links: [
        { from: 'source', to: 'rotor', label: 'Poussée d\'air', flowType: 'wind' },
        { from: 'rotor', to: 'gearbox', label: 'Rotation lente (12 RPM)', flowType: 'mechanical' },
        { from: 'gearbox', to: 'generator', label: 'Rotation rapide (1500 RPM)', flowType: 'mechanical' },
        { from: 'generator', to: 'grid', label: 'Énergie électrique', flowType: 'electricity' }
      ]
    },
    physicalShape: {
      visualSilhouette: 'wind_turbine',
      architecturalStyle: 'Élégance cinétique épurée. Une silhouette aérodynamique svelte conçue pour minimiser la traînée et maximiser la hauteur opérationnelle.',
      dimensions: [
        { label: 'Hauteur du Mât', value: '80 - 140 mètres', explanation: 'Le mât est élancé car le vent souffle plus fort et est plus régulier à mesure que l\'on s\'élève au-dessus des obstacles du sol.' },
        { label: 'Longueur d\'une Pale', value: '55 - 80 mètres', explanation: 'Une seule pale de 75m balaie une surface aérienne équivalente à deux terrains de football lors de sa rotation.' },
        { label: 'Diamètre à la Base', value: '4,5 à 6 mètres', explanation: 'La mâture conique en acier s\'élargit vers le bas pour répartir les monstrueuses forces de levier exercées par le vent.' },
        { label: 'Poids de la Nacelle', value: '70 - 150 tonnes', explanation: 'La structure abrite le multiplicateur de vitesse et l\'alternateur, hissés au sommet d\'une structure svelte.' }
      ],
      keyVisualElements: [
        {
          name: 'La Pale Aérodynamique',
          description: 'Grande aile effilée blanche en fibre de verre incurvée.',
          shapeExplanation: 'Profilée exactement comme une aile d\'avion : l\'air s\'écoule plus vite sur la face bombée supérieure, créant une dépression (portance) qui aspire littéralement la pale et force la rotation.'
        },
        {
          name: 'La Nacelle Orientable',
          description: 'Boîtier rectangulaire profilé pivotant au sommet du mât.',
          shapeExplanation: 'Profilée pour réduire la résistance de l\'air. Elle intègre un moteur d\'orientation électrique pour toujours maintenir le rotor parfaitement face au vent.'
        },
        {
          name: 'La Fondation Gravitaire',
          description: 'Une dalle circulaire invisible, enfouie sous terre sous le mât.',
          shapeExplanation: 'Un disque massif en béton armé de 15 à 20m de diamètre, lesté par la terre de remblai, qui agit comme un contrepoids physique pour empêcher l\'éolienne de basculer.'
        }
      ]
    },
    fabricationGuide: {
      sitingRequirements: [
        'Vitesse moyenne de vent annuelle supérieure à 20 km/h (minimum pour rentabilité économique).',
        'Absence d\'obstacles topographiques majeurs en amont du vent dominant (falaises proches, forêts épaisses).',
        'Respect d\'une distance légale minimale des habitations (généralement 500 mètres) pour le confort acoustique.',
        'Accessibilité routière l\'été pour des convois exceptionnels acheminant des pales monoblocs de 75 mètres.'
      ],
      keyMaterials: [
        { name: 'Acier de Construction', proportion: '70%', purpose: 'Sections creuses cylindriques du mât et brides de jonction boulonnées.' },
        { name: 'Fibre de Verre / Carbone Résine', proportion: '12%', purpose: 'Pales légères, flexibles et résistantes à la fatigue mécanique et aux orages.' },
        { name: 'Béton Armé Standard', proportion: '15%', purpose: 'Fondation gravitaire de lestage enterrée dans le sol.' },
        { name: 'Terres Rares (Néodyme)', proportion: '0.5%', purpose: 'Aimants permanents puissants dans les génératrices sans multiplicateur (Direct Drive).' }
      ],
      constructionSteps: [
        {
          phase: '1. Création des Voies et Fondation',
          duration: '3 - 5 mois',
          description: 'Aménagement de chemins renforcés pour les convois de grues. Ferraillage dense et coulage de la fondation gravitaire circulaire.',
          keyChallenge: 'Réaliser le coulage du béton de la fondation en une seule fois pour éviter les discontinuités structurelles fragiles.'
        },
        {
          phase: '2. Acheminement des Convois Exceptionnels',
          duration: '1 mois',
          description: 'Livraison nocturne des tronçons de mât, de la nacelle et des trois pales par des véhicules de transport télescopiques spéciaux.',
          keyChallenge: 'Négocier les virages serrés et les ronds-points routiers avec des pales indéformables de plus de 70 mètres de long.'
        },
        {
          phase: '3. Montage des Tronçons du Mât',
          duration: '1 - 2 semaines',
          description: 'Levage à l\'aide d\'une grue géante des 3 ou 4 tronçons en acier, assemblés par de robustes boulons serrés sous haute tension contrôlée.',
          keyChallenge: 'Opérer le grutage uniquement par vent très faible (inférieur à 30 km/h) pour éviter l\'effet de balancier mortel.'
        },
        {
          phase: '4. Hissage de la Nacelle et du Rotor',
          duration: '3 - 5 jours',
          description: 'Hissage de la nacelle complète, suivi du levage de la "tête" (moyeu assemblé au sol avec ses trois pales) pour l\'emboîter sur la nacelle.',
          keyChallenge: 'Aligner avec précision de l\'ordre du dixième de millimètre l\'axe du rotor à 100 mètres de hauteur.'
        },
        {
          phase: '5. Câblage Interne et Mise en Service',
          duration: '1 - 2 mois',
          description: 'Tirage des câbles de puissance descendants, pose du transformateur de pied, tests des logiciels de contrôle météo et de freinage d\'urgence.',
          keyChallenge: 'Équilibrer parfaitement le poids des trois pales pour éviter des vibrations asymétriques sur les roulements principaux.'
        }
      ]
    }
  },
  {
    id: 'gas_coal',
    name: 'Centrale Thermique à Flamme (Gaz / CCG)',
    iconName: 'Flame',
    category: 'Fossile',
    shortDescription: 'Brûle un combustible (principalement du gaz naturel) pour actionner des turbines à haute température, offrant une flexibilité totale mais émettant du CO2.',
    longDescription: 'Les centrales thermiques modernes à cycle combiné gaz (CCG) utilisent une double turbine : une première turbine est activée directement par les gaz chauds issus de la combustion du gaz naturel. Les gaz d\'échappement brûlants servent ensuite à chauffer de l\'eau dans une chaudière pour générer de la vapeur, qui actionne une seconde turbine. Ce procédé permet d\'obtenir d\'excellents rendements tout en étant extrêmement réactif face aux besoins du réseau.',
    characteristics: {
      efficiency: '55% - 63% (Cycle Combiné)',
      typicalPower: '400 - 900 MW',
      co2Emissions: 370,
      constructionCost: 'Faible',
      operatingCost: 'Élevé',
      constructionTime: '2 - 4 ans',
      lifespan: '25 - 35 ans',
      intermittency: 'Aucune',
      dispatchable: true,
      fuelType: 'Gaz Naturel / Méthane'
    },
    advantages: [
      'Flexibilité maximale (démarrage et modulation de puissance en quelques dizaines de minutes)',
      'Excellent rendement pour les Cycles Combinés Gaz (> 60%)',
      'Faible coût d\'installation et emprise au sol réduite',
      'Technologie mature et fiable',
      'Indispensable pour compenser les fluctuations brutales des énergies intermittentes'
    ],
    disadvantages: [
      'Émissions importantes de gaz à effet de serre (CO2)',
      'Dépendance géopolitique et économique vis-à-vis des pays producteurs de gaz',
      'Consommation de ressources fossiles non renouvelables',
      'Sensibilité aux variations des cours mondiaux des hydrocarbures',
      'Sujet à des taxes carbone de plus en plus lourdes dans de nombreux pays'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Combustion du Gaz sous Pression',
        description: 'Le gaz naturel et de l\'air comprimé sont injectés dans une chambre de combustion. Le mélange s\'enflamme et dégage des gaz à très haute température (jusqu\'à 1200°C).'
      },
      {
        step: 2,
        title: 'Turbine à Combustion (Cycle Gaz)',
        description: 'La dilatation rapide des gaz de combustion entraîne une première turbine (turbine à gaz), qui actionne l\'alternateur principal.'
      },
      {
        step: 3,
        title: 'Récupération de la Chaleur',
        description: 'Les gaz d\'échappement, sortant encore brûlants de la turbine à gaz (environ 500°C), sont dirigés vers une chaudière de récupération.'
      },
      {
        step: 4,
        title: 'Génération de Vapeur',
        description: 'Dans la chaudière, les gaz d\'échappement chauffent des tubes remplis d\'eau sous pression, générant de la vapeur d\'eau à haute température.'
      },
      {
        step: 5,
        title: 'Turbine à Vapeur (Cycle Vapeur)',
        description: 'Cette vapeur fait tourner une seconde turbine reliée au même alternateur (ou un alternateur secondaire). C\'est le "Cycle Combiné" qui booste le rendement.'
      },
      {
        step: 6,
        title: 'Alternateur et Réseau',
        description: 'L\'alternateur produit le courant électrique qui, élevé par un transformateur, est envoyé vers les grandes lignes de transport électrique.'
      }
    ],
    diagram: {
      nodes: [
        { id: 'source', label: 'Chambre de Combustion (Gaz)', x: 15, y: 50, type: 'source' },
        { id: 'gas_turbine', label: 'Turbine à Gaz', x: 38, y: 35, type: 'turbine' },
        { id: 'boiler', label: 'Chaudière de Récupération', x: 50, y: 65, type: 'conversion' },
        { id: 'steam_turbine', label: 'Turbine à Vapeur', x: 70, y: 65, type: 'turbine' },
        { id: 'generator', label: 'Alternateur Commun', x: 75, y: 35, type: 'generator' },
        { id: 'grid', label: 'Réseau Électrique', x: 92, y: 35, type: 'grid' }
      ],
      links: [
        { from: 'source', to: 'gas_turbine', label: 'Gaz brûlants', flowType: 'heat' },
        { from: 'gas_turbine', to: 'boiler', label: 'Chaleur résiduelle', flowType: 'heat' },
        { from: 'boiler', to: 'steam_turbine', label: 'Vapeur d\'eau', flowType: 'steam' },
        { from: 'gas_turbine', to: 'generator', label: 'Rotation arbre 1', flowType: 'mechanical' },
        { from: 'steam_turbine', to: 'generator', label: 'Rotation arbre 2', flowType: 'mechanical' },
        { from: 'generator', to: 'grid', label: 'Électricité triphasée', flowType: 'electricity' }
      ]
    },
    physicalShape: {
      visualSilhouette: 'gas_factory',
      architecturalStyle: 'Complexe industriel compact métallique dense. Dominé par de hauts modules de récupération thermique et une fine cheminée d\'évacuation.',
      dimensions: [
        { label: 'Hauteur de la Cheminée', value: '60 - 80 mètres', explanation: 'Une évacuation élancée mais beaucoup plus étroite qu\'un refroidisseur nucléaire, car les volumes de fumée sont limités grâce à un combustible gazeux propre.' },
        { label: 'Hauteur de la Chaudière', value: '35 - 45 mètres', explanation: 'Un grand module rectangulaire vertical contenant des kilomètres de tuyauteries où s\'effectue la récupération de chaleur.' },
        { label: 'Emprise au Sol', value: '15 - 25 hectares', explanation: 'Un format extrêmement compact par rapport aux énergies renouvelables, idéal pour s\'intégrer en lisière de zone industrielle.' },
        { label: 'Température Turbine', value: '1400°C maximum', explanation: 'Une tenue thermique colossale exigeant des revêtements de pales en céramique de haute technicité.' }
      ],
      keyVisualElements: [
        {
          name: 'La Turbine à Combustion (Duo-étage)',
          description: 'Un énorme carter cylindrique métallique horizontal hérissé de tuyaux de gaz.',
          shapeExplanation: 'Sa forme s\'évase progressivement d\'un bout à l\'autre. Cela permet de détendre graduellement les gaz de combustion sous pression pour en extraire l\'énergie rotative maximale.'
        },
        {
          name: 'La Chaudière de Récupération (HRSG)',
          description: 'Un immense parallélépipède vertical en tôles d\'acier.',
          shapeExplanation: 'Sa structure verticale permet aux gaz d\'échappement chauds de monter naturellement à travers de fins serpentins d\'eau pour optimiser le transfert de chaleur sans ventilateurs énergivores.'
        },
        {
          name: 'Le Gazoduc d\'Alimentation',
          description: 'Réseau de grosses canalisations peintes en jaune s\'enfonçant sous terre.',
          shapeExplanation: 'Des tubes en acier à haute résistance soudés sous radiographie constante pour assurer l\'acheminement continu du méthane sous forte pression sans aucun stockage sur site.'
        }
      ]
    },
    fabricationGuide: {
      sitingRequirements: [
        'Proximité immédiate d\'un gazoduc de transport de gaz naturel à haute pression.',
        'Accès à un poste source électrique haute tension à forte capacité pour injecter la puissance rapidement.',
        'Classement en zone industrielle autorisant les installations thermiques (bruit des turbines).',
        'Ressource d\'eau d\'appoint modérée disponible (pour compenser les pertes de vapeur d\'eau).'
      ],
      keyMaterials: [
        { name: 'Superalliages de Nickel-Cobalt', proportion: '2%', purpose: 'Pales de la turbine à gaz soumises à la force centrifuge à plus de 1200°C.' },
        { name: 'Revêtements Céramiques Thermiques', proportion: '0.5%', purpose: 'Barrières thermiques isolantes projetées au plasma sur les métaux sensibles.' },
        { name: 'Acier de Structure Standard', proportion: '68%', purpose: 'Charpentes métalliques des halls, chaudières, tuyaux secondaires et condenseurs.' },
        { name: 'Béton Armé Industriel', proportion: '29.5%', purpose: 'Dalles de support vibratoires et fondations de pieux profonds.' }
      ],
      constructionSteps: [
        {
          phase: '1. Fondations Spéciales Anti-Vibrations',
          duration: '6 - 9 mois',
          description: 'Forage de pieux profonds en béton et coulage de dalles massives isolées acoustiquement pour supporter les machines tournantes.',
          keyChallenge: 'Désolidariser le bloc turbine des dalles de structure pour ne pas fendre le béton par résonance.'
        },
        {
          phase: '2. Montage de la Charpente et de la Chaudière',
          duration: '1 an',
          description: 'Hissage des structures porteuses en acier lourd et assemblage des faisceaux tubulaires complexes de la chaudière de récupération.',
          keyChallenge: 'Souder et tester par radiographie des milliers de jonctions de tuyaux haute pression sans le moindre défaut.'
        },
        {
          phase: '3. Clavage de la Turbine à Gaz',
          duration: '4 - 6 mois',
          description: 'Acheminement par convoi exceptionnel lourd du bloc turbine-alternateur monobloc pré-assemblé en usine de haute précision.',
          keyChallenge: 'Manœuvrer et poser un équipement unique de 350 tonnes avec une tolérance de positionnement inférieure à un millimètre.'
        },
        {
          phase: '4. Installation du Circuit Vapeur et Condenseur',
          duration: '6 - 8 mois',
          description: 'Raccordement de la turbine à vapeur secondaire, mise en place des aérocondenseurs (ventilateurs géants en toiture) pour condenser la vapeur.',
          keyChallenge: 'Garantir un vide d\'air quasi-parfait dans le condenseur pour aspirer activement la vapeur et doper le rendement.'
        },
        {
          phase: '5. Essais de Boucle Fermée et Raccordement',
          duration: '3 - 5 mois',
          description: 'Mise en gaz, premiers allumages de la chambre de combustion (premier feu), montée en vitesse de l\'alternateur et couplage au réseau.',
          keyChallenge: 'Ajuster les régulateurs électroniques pour stabiliser la fréquence à exactement 50,00 Hz lors de variations de charges abruptes.'
        }
      ]
    }
  },
  {
    id: 'geothermal',
    name: 'Centrale Géothermique',
    iconName: 'Activity',
    category: 'Renouvelable',
    shortDescription: 'Récupère la chaleur naturelle stockée sous l\'écorce terrestre pour vaporiser un fluide et faire tourner des turbines génératrices.',
    longDescription: 'Une centrale géothermique puise l\'eau chaude ou la vapeur naturellement présente à grande profondeur (jusqu\'à plusieurs kilomètres) dans le sous-sol terrestre. La vapeur remonte sous pression, est purifiée et dirigée vers une turbine à vapeur qui fait tourner l\'alternateur. Le fluide condensé est ensuite réinjecté dans le sous-sol afin de maintenir la pression du gisement et d\'assurer la pérennité de la ressource.',
    characteristics: {
      efficiency: '10% - 20% (Températures plus basses que le nucléaire)',
      typicalPower: '10 - 150 MW',
      co2Emissions: 38,
      constructionCost: 'Élevé',
      operatingCost: 'Faible',
      constructionTime: '3 - 5 ans',
      lifespan: '30 - 50 ans',
      intermittency: 'Aucune',
      dispatchable: true,
      fuelType: 'Chaleur Interne de la Terre'
    },
    advantages: [
      'Énergie 100% renouvelable disponible 24h/24 et 7j/7 sans interruption',
      'Très faible empreinte visuelle et emprise au sol minimale en surface',
      'Production de base pilotable et stable (facteur de charge élevé > 90%)',
      'Possibilité de cogénération (fournit de l\'électricité ET de la chaleur pour un réseau de chauffage urbain)',
      'Émissions de CO2 très limitées'
    ],
    disadvantages: [
      'Coûts de forage initiaux extrêmement élevés et risqués (incertitude géologique)',
      'Localisation géographique restreinte aux zones à fort gradient géothermique (failles, volcans)',
      'Risque sismique mineur provoqué par la fracturation ou l\'injection d\'eau sous haute pression',
      'Risque de relâchement de gaz souterrains nocifs (H2S, radon) nécessitant un captage rigoureux',
      'Refroidissement progressif possible du réservoir souterrain si mal géré'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Forage et Extraction du Fluide',
        description: 'Un puits de production est foré à grande profondeur (1500m à 3000m) pour extraire de l\'eau chaude ou de la vapeur sous pression à plus de 150°C.'
      },
      {
        step: 2,
        title: 'Séparation de la Vapeur',
        description: 'L\'eau remonte sous pression et s\'expanse dans un séparateur (ballon de flash). La baisse de pression transforme instantanément une partie de l\'eau en vapeur sèche.'
      },
      {
        step: 3,
        title: 'Turbine à Vapeur',
        description: 'La vapeur sous pression est projetée sur les aubes d\'une turbine à vapeur, générant un mouvement mécanique rotatif rapide.'
      },
      {
        step: 4,
        title: 'Production Électrique',
        description: 'La turbine fait tourner un alternateur qui convertit cette force rotative mécanique en électricité de moyenne tension.'
      },
      {
        step: 5,
        title: 'Condensation et Refroidissement',
        description: 'En sortie de turbine, la vapeur passe dans un condenseur qui la liquéfie de nouveau en utilisant de l\'eau froide d\'un circuit de refroidissement.'
      },
      {
        step: 6,
        title: 'Réinjection Souterraine',
        description: 'L\'eau refroidie est renvoyée dans le gisement souterrain par un puits d\'injection pour se réchauffer à nouveau et maintenir la pression du gisement.'
      }
    ],
    diagram: {
      nodes: [
        { id: 'source', label: 'Réservoir de Chaleur (Roche Profonde)', x: 15, y: 80, type: 'source' },
        { id: 'separator', label: 'Séparateur / Ballon Flash', x: 38, y: 50, type: 'conversion' },
        { id: 'turbine', label: 'Turbine à Vapeur', x: 62, y: 35, type: 'turbine' },
        { id: 'generator', label: 'Alternateur', x: 78, y: 35, type: 'generator' },
        { id: 'grid', label: 'Réseau Électrique', x: 92, y: 35, type: 'grid' },
        { id: 'rejection', label: 'Puits d\'Injection Réseau', x: 60, y: 80, type: 'cooling' }
      ],
      links: [
        { from: 'source', to: 'separator', label: 'Fluide géothermique brûlant', flowType: 'heat' },
        { from: 'separator', to: 'turbine', label: 'Vapeur de flash pure', flowType: 'steam' },
        { from: 'turbine', to: 'generator', label: 'Mouvement rotatif', flowType: 'mechanical' },
        { from: 'generator', to: 'grid', label: 'Électricité bas carbone', flowType: 'electricity' },
        { from: 'turbine', to: 'rejection', label: 'Condensat liquide tiède', flowType: 'water' },
        { from: 'rejection', to: 'source', label: 'Retour de la ressource au sous-sol', flowType: 'water' }
      ]
    },
    physicalShape: {
      visualSilhouette: 'geothermal_station',
      architecturalStyle: 'Installation de surface minimaliste et discrète. Dominée par des conduites calorifugées de surface reliant des puits de forages isolés.',
      dimensions: [
        { label: 'Profondeur des Puits', value: '1500 - 3500 mètres', explanation: 'La ressource est profondément enfouie. Il faut descendre là où la température des roches dépasse les 150°C à 250°C.' },
        { label: 'Diamètre des Forages', value: '30 à 60 centimètres', explanation: 'Trous de forages chemisés de tubes d\'acier cimentés à la roche pour isoler les nappes phréatiques superficielles de l\'eau profonde.' },
        { label: 'Diamètre Séparateur', value: '4 mètres (Hauteur: 12m)', explanation: 'Un ballon vertical robuste en acier épais destiné à encaisser la détente violente et corrosive de l\'eau liquide en vapeur.' },
        { label: 'Hauteur du condenseur', value: '15 - 20 mètres', explanation: 'Tour d\'échange thermique compacte refroidie par ventilateurs pour boucler le circuit sans utiliser d\'eau extérieure.' }
      ],
      keyVisualElements: [
        {
          name: 'La Tête de Puits (Sapin de Noël)',
          description: 'Un enchevêtrement de grosses vannes manuelles et motorisées posé au ras du sol.',
          shapeExplanation: 'Sa forme croisée en sapin permet d\'orienter le flux, d\'injecter des inhibiteurs de corrosion et de mesurer la pression au cœur de la terre tout en contenant une pression souterraine hostile.'
        },
        {
          name: 'Les Conduites Calorifugées en Boucle',
          description: 'Tuyaux de surface enveloppés de laine de roche et de tôles d\'aluminium brillant.',
          shapeExplanation: 'Les conduites serpentent avec des coudes d\'expansion en forme de "U" pour autoriser la dilatation et la contraction thermique des métaux soumis à plus de 180°C sans casser.'
        },
        {
          name: 'L\'Échangeur de Fluide Organique (ORC)',
          description: 'Série de longs tubes horizontaux alignés.',
          shapeExplanation: 'Utilisé pour la géothermie de basse température. Il fait circuler l\'eau de la terre d\'un côté, et un fluide organique à bas point d\'ébullition de l\'autre pour actionner la turbine.'
        }
      ]
    },
    fabricationGuide: {
      sitingRequirements: [
        'Zone à fort gradient géothermique (volcanique ou d\'effondrement tectonique favorisant la remontée de chaleur).',
        'Présence d\'une ressource d\'eau souterraine profonde piégée dans une roche poreuse ou fracturée (réservoir).',
        'Stabilité relative du sol en surface (éviter les flancs de volcans actifs à éruptions fréquentes).',
        'Possibilité de creuser des forages profonds sans traverser de gisements de gaz toxiques hors contrôle.'
      ],
      keyMaterials: [
        { name: 'Tubes d\'acier anticorrosion (Inconel)', proportion: '25%', purpose: 'Chemises intérieures des puits soumis à des fluides très acides et chauds.' },
        { name: 'Ciment Géothermique Spécial', proportion: '35%', purpose: 'Scellement des puits entre l\'acier et la roche rocheuse pour interdire toute fuite inter-nappes.' },
        { name: 'Alliage de Titane', proportion: '5%', purpose: 'Aubes de la turbine à vapeur en contact avec des gaz souterrains corrosifs (soufre, chlore).' },
        { name: 'Béton de Surface Standard', proportion: '35%', purpose: 'Dalles de l\'usine, cuves d\'eau de réinjection et structures de bureaux.' }
      ],
      constructionSteps: [
        {
          phase: '1. Forage Exploratoire de Haute Précision',
          duration: '1 - 2 ans',
          description: 'Installation d\'un derrick géant de forage pétrolier. Creusement incliné d\'un doublet (un puits de production, un puits de réinjection).',
          keyChallenge: 'Atteindre la cible géologique poreuse à 3 km sous terre avec une déviation contrôlée au degré près.'
        },
        {
          phase: '2. Tubage et Cimentation des Puits',
          duration: '6 mois',
          description: 'Descente de sections de tubes d\'acier imbriquées, suivies de l\'injection de ciment spécial entre le tube et le forage rocheux.',
          keyChallenge: 'Assurer une cimentation homogène continue sur des kilomètres pour éviter les effondrements de parois.'
        },
        {
          phase: '3. Stimulation et Essais de Débit (Lissage)',
          duration: '3 - 6 mois',
          description: 'Injection d\'eau froide sous pression contrôlée pour rincer et fracturer naturellement les conduits rocheux profonds et doper la perméabilité.',
          keyChallenge: 'Contrôler la pression pour éviter de déclencher des micro-séismes ressentis par les populations de surface.'
        },
        {
          phase: '4. Construction de la Centrale de Surface',
          duration: '1 an',
          description: 'Assemblage des séparateurs de vapeur, de la turbine à vapeur basse pression, de l\'alternateur et de l\'usine de traitement des gaz.',
          keyChallenge: 'Concevoir un réseau de canalisations capable de tolérer les mouvements de terrain dus aux variations de pression souterraine.'
        },
        {
          phase: '5. Bouclage Thermique et Démarrage',
          duration: '3 mois',
          description: 'Ouverture du puits de production, séparation de la première vapeur, mise en rotation et mise en place de la boucle de réinjection intégrale.',
          keyChallenge: 'Équilibrer le débit injecté et extrait pour ne pas refroidir prématurément le gisement de roche chaude.'
        }
      ]
    }
  },
  {
    id: 'biomass',
    name: 'Centrale à Biomasse',
    iconName: 'Leaf',
    category: 'Renouvelable',
    shortDescription: 'Brûle des matières organiques (résidus forestiers, agricoles, déchets ménagers) pour produire de la vapeur et actionner une turbine.',
    longDescription: 'Une centrale biomasse valorise des combustibles organiques renouvelables (plaquettes forestières, paille, coques de fruits, déchets de scierie ou biogaz issu de la fermentation). La matière est brûlée dans une chaudière pour chauffer de l\'eau sous pression. La vapeur dégagée fait tourner une turbine accouplée à un alternateur. Bien qu\'elle émette du CO2 lors de la combustion, celle-ci est considérée comme neutre à l\'échelle globale, car le CO2 émis correspond à celui capturé par les plantes lors de leur croissance.',
    characteristics: {
      efficiency: '25% - 35% (Jusqu\'à 80% en cogénération)',
      typicalPower: '5 - 50 MW',
      co2Emissions: 23,
      constructionCost: 'Moyen',
      operatingCost: 'Moyen',
      constructionTime: '2 - 3 ans',
      lifespan: '25 - 30 ans',
      intermittency: 'Aucune',
      dispatchable: true,
      fuelType: 'Bois, Déchets Agricoles, Biogaz'
    },
    advantages: [
      'Énergie renouvelable de base, disponible continuellement (non soumise à la météo)',
      'Valorisation intelligente des résidus agricoles et forestiers (économie circulaire)',
      'Neutre en carbone sur le long terme (cycle de vie du CO2 absorbé par photosynthèse)',
      'Possibilité de cogénération majeure (distribution de chaleur urbaine ou industrielle)',
      'Soutien à l\'économie locale (filières d\'approvisionnement régionales courtes)'
    ],
    disadvantages: [
      'Risque de déforestation ou de pression sur les sols si l\'approvisionnement est mal contrôlé',
      'Logistique importante et énergivore pour le transport des matières encombrantes',
      'Rendement électrique pur inférieur aux centrales à énergies fossiles denses',
      'Émissions de polluants atmosphériques (particules fines, NOx) nécessitant des filtres avancés',
      'Compétition potentielle d\'usage des sols entre alimentation et cultures énergétiques'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Approvisionnement et Préparation',
        description: 'La matière première (bois, paille, résidus) est acheminée, séchée et broyée afin d\'homogénéiser sa combustion.'
      },
      {
        step: 2,
        title: 'Combustion dans la Chaudière',
        description: 'La biomasse est introduite dans la chambre de combustion de la chaudière où elle est brûlée à haute température.'
      },
      {
        step: 3,
        title: 'Génération de Vapeur Haute Pression',
        description: 'La chaleur intense réchauffe de l\'eau circulant dans des tubes de la chaudière, la transformant en vapeur sous haute pression et haute température.'
      },
      {
        step: 4,
        title: 'Turbine à Vapeur',
        description: 'La vapeur sous pression est projetée vers la turbine à vapeur pour la faire tourner à une vitesse élevée.'
      },
      {
        step: 5,
        title: 'Production d\'Électricité',
        description: 'La turbine fait tourner un alternateur qui génère de l\'électricité alternative. Un transformateur élève la tension électrique.'
      },
      {
        step: 6,
        title: 'Condensation et valorisation thermique',
        description: 'La vapeur est refroidie pour retourner à l\'état liquide. La chaleur résiduelle est souvent récupérée pour chauffer des logements ou des installations industrielles alentour (cogénération).'
      }
    ],
    diagram: {
      nodes: [
        { id: 'source', label: 'Stockage Biomasse (Bois/Déchets)', x: 15, y: 55, type: 'source' },
        { id: 'boiler', label: 'Chambre de Combustion / Chaudière', x: 42, y: 55, type: 'conversion' },
        { id: 'turbine', label: 'Turbine à Vapeur', x: 65, y: 35, type: 'turbine' },
        { id: 'generator', label: 'Alternateur', x: 80, y: 35, type: 'generator' },
        { id: 'grid', label: 'Réseau Électrique', x: 92, y: 35, type: 'grid' },
        { id: 'heating', label: 'Réseau de Chauffage Urbain', x: 65, y: 75, type: 'cooling' }
      ],
      links: [
        { from: 'source', to: 'boiler', label: 'Alimentation combustible', flowType: 'water' },
        { from: 'boiler', to: 'turbine', label: 'Vapeur HP', flowType: 'steam' },
        { from: 'turbine', to: 'generator', label: 'Arbre moteur', flowType: 'mechanical' },
        { from: 'generator', to: 'grid', label: 'Électricité injectée', flowType: 'electricity' },
        { from: 'boiler', to: 'heating', label: 'Chaleur perdue valorisée', flowType: 'heat' }
      ]
    },
    physicalShape: {
      visualSilhouette: 'biomass_station',
      architecturalStyle: 'Architecture agro-industrielle fonctionnelle, marquée par de grands silos de stockage d\'aspect agricole accolés à une usine thermique.',
      dimensions: [
        { label: 'Hauteur des Silos', value: '25 - 35 mètres', explanation: 'Silos fermés et ventilés pour stocker des milliers de tonnes de plaquettes de bois à l\'abri de l\'humidité.' },
        { label: 'Longueur du Hall', value: '80 - 120 mètres', explanation: 'Permet le déchargement automatique des camions bennes par pont-bascule et le tapis d\'alimentation continue.' },
        { label: 'Hauteur de la Grille', value: '8 mètres (dans la chaudière)', explanation: 'Une grille mobile inclinée sur laquelle le bois avance lentement pendant qu\'il brûle.' },
        { label: 'Hauteur Filtre Électronique', value: '15 mètres', explanation: 'Une structure de filtrage électrostatique majeure pour capturer 99,9% des poussières et suies avant la cheminée.' }
      ],
      keyVisualElements: [
        {
          name: 'Les Silos / Plateforme de Broyage',
          description: 'Immenses cylindres métalliques ou hangars ouverts abritant des collines de copeaux de bois.',
          shapeExplanation: 'Les silos sont surélevés et coniques à la base pour permettre l\'écoulement gravitaire naturel de la matière solide vers les vis sans fin d\'alimentation de la chaudière.'
        },
        {
          name: 'La Chaudière à Grille Mobile / Lit Fluidisé',
          description: 'Grande structure métallique contenant le foyer de combustion.',
          shapeExplanation: 'La grille métallique au fond du foyer avance lentement pour évacuer les cendres de manière automatique en continu, évitant ainsi d\'interrompre la combustion.'
        },
        {
          name: 'L\'Électrofiltre (Dépoussiéreur)',
          description: 'Grand boîtier cubique placé juste avant la cheminée d\'échappement.',
          shapeExplanation: 'Il soumet les fumées à un champ électrique haute tension qui charge les particules fines pour qu\'elles s\'aimantent sur des plaques collectrices, purifiant l\'air rejeté.'
        }
      ]
    },
    fabricationGuide: {
      sitingRequirements: [
        'Proximité d\'un bassin forestier ou agricole actif à moins de 50 - 80 km pour limiter les coûts de transport de la biomasse.',
        'Accès routier lourd robuste pour supporter le va-et-vient quotidien de dizaines de camions de livraison.',
        'Possibilité de connexion à un réseau de chaleur urbain existant ou industriel pour valoriser la chaleur (cogénération).',
        'Présence d\'un espace suffisant pour la manutention, le tri et le séchage à l\'air libre du bois de chauffage.'
      ],
      keyMaterials: [
        { name: 'Acier de Structure Réfractaire', proportion: '45%', purpose: 'Chaudière, grille de combustion, conduits de fumée chauds et tubes d\'eau.' },
        { name: 'Briques et Matériaux Réfractaires', proportion: '10%', purpose: 'Doublage isolant intérieur du foyer pour conserver la chaleur à plus de 900°C.' },
        { name: 'Béton Armé Courant', proportion: '40%', purpose: 'Dalle de la zone de stockage lourd, fondations de silos et charpente de l\'usine.' },
        { name: 'Charbon Actif / Chaux (Filtres)', proportion: '5%', purpose: 'Traitement chimique de neutralisation des fumées acides dans le laveur.' }
      ],
      constructionSteps: [
        {
          phase: '1. Aménagement des Zones Logistiques',
          duration: '4 - 6 mois',
          description: 'Terrassement lourd des aires de déchargement, coulage de dalles étanches en béton pour prévenir l\'infiltration des jus de bois mouillés.',
          keyChallenge: 'Créer un circuit routier fluide à double entrée pour éviter tout embouteillage de camions bennes.'
        },
        {
          phase: '2. Génie Civil des Silos et Logements de Stockage',
          duration: '6 mois',
          description: 'Coulage des fondations en béton et montage des silos verticaux métalliques de stockage automatisés.',
          keyChallenge: 'Intégrer des systèmes de détection d\'échauffement et d\'incendie (auto-combustion naturelle des copeaux humides).'
        },
        {
          phase: '3. Montage de la Chaudière de Combustion',
          duration: '1 an',
          description: 'Pose du foyer réfractaire, de la grille mobile articulée en acier spécial et raccordement des faisceaux tubulaires d\'eau pressurisée.',
          keyChallenge: 'Poser les briques réfractaires avec des joints de dilatation capables de subir des écarts de température de 1000°C.'
        },
        {
          phase: '4. Installation de la Turbine et de l\'Électrofiltre',
          duration: '6 - 8 mois',
          description: 'Pose de la turbine à vapeur compacte, raccordement de l\'alternateur, de l\'électrofiltre géant et raccordement au réseau de chauffage urbain.',
          keyChallenge: 'Ajuster les réseaux de captage de fumées pour garantir l\'étanchéité absolue aux microparticules nocives.'
        },
        {
          phase: '5. Essais de Combustion et Lancement',
          duration: '3 - 4 mois',
          description: 'Mise en température progressive de la chaudière, essais de régulation de l\'alimentation par vis sans fin, réglage des émissions de fumées.',
          keyChallenge: 'Stabiliser la puissance de la chaudière malgré la variabilité du taux d\'humidité de la biomasse livrée.'
        }
      ]
    }
  }
];
