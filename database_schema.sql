-- ==========================================
-- SCHEMA DE BASE DE DONNÉES - ENERGETIX
-- SGBD supporté : PostgreSQL (12+)
-- ==========================================

-- Active l'extension uuid si nécessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. TABLE PRINCIPALE : LES CENTRALES
-- ==========================================
CREATE TABLE power_plants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Renouvelable', 'Décarbonée non-renouvelable', 'Fossile')),
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    visual_silhouette VARCHAR(50) NOT NULL CHECK (visual_silhouette IN ('nuclear_tower', 'hydro_dam', 'solar_field', 'wind_turbine', 'gas_factory', 'geothermal_station', 'biomass_station')),
    architectural_style TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE power_plants IS 'Table principale répertoriant les différents types de centrales de production d''énergie.';

-- ==========================================
-- 2. TABLE : CARACTÉRISTIQUES TECHNIQUES (Relation 1:1)
-- ==========================================
CREATE TABLE plant_characteristics (
    plant_id VARCHAR(50) PRIMARY KEY REFERENCES power_plants(id) ON DELETE CASCADE,
    efficiency VARCHAR(50) NOT NULL,
    typical_power VARCHAR(100) NOT NULL,
    co2_emissions INT NOT NULL, -- g CO2 eq / kWh
    construction_cost VARCHAR(20) NOT NULL CHECK (construction_cost IN ('Très Faible', 'Faible', 'Moyen', 'Élevé', 'Très Élevé')),
    operating_cost VARCHAR(20) NOT NULL CHECK (operating_cost IN ('Très Faible', 'Faible', 'Moyen', 'Élevé')),
    construction_time VARCHAR(50) NOT NULL,
    lifespan VARCHAR(50) NOT NULL,
    intermittency VARCHAR(20) NOT NULL CHECK (intermittency IN ('Aucune', 'Faible', 'Modérée', 'Élevée')),
    dispatchable BOOLEAN NOT NULL DEFAULT TRUE,
    fuel_type VARCHAR(100) NOT NULL
);

COMMENT ON TABLE plant_characteristics IS 'Paramètres de performance, économiques et d''intermittence associés à chaque centrale.';

-- ==========================================
-- 3. TABLES EN RELATION 1:N AVEC LES CENTRALES
-- ==========================================

-- Avantages des centrales
CREATE TABLE plant_advantages (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    advantage TEXT NOT NULL
);
CREATE INDEX idx_advantages_plant ON plant_advantages(plant_id);

-- Inconvénients des centrales
CREATE TABLE plant_disadvantages (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    disadvantage TEXT NOT NULL
);
CREATE INDEX idx_disadvantages_plant ON plant_disadvantages(plant_id);

-- Étapes du procédé de fonctionnement
CREATE TABLE plant_process_steps (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    CONSTRAINT uq_plant_step UNIQUE (plant_id, step_number)
);
CREATE INDEX idx_process_steps_plant ON plant_process_steps(plant_id);

-- Contraintes d'implantation géographique
CREATE TABLE plant_siting_requirements (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    requirement TEXT NOT NULL
);
CREATE INDEX idx_siting_plant ON plant_siting_requirements(plant_id);

-- Matériaux principaux utilisés pour la construction
CREATE TABLE plant_key_materials (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    proportion VARCHAR(50), -- e.g., '80%', 'Faible'
    purpose TEXT NOT NULL
);
CREATE INDEX idx_materials_plant ON plant_key_materials(plant_id);

-- Étapes de fabrication/construction
CREATE TABLE plant_construction_steps (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    phase VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    key_challenge TEXT NOT NULL
);
CREATE INDEX idx_construction_steps_plant ON plant_construction_steps(plant_id);

-- Dimensions physiques
CREATE TABLE plant_visual_dimensions (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    explanation TEXT NOT NULL
);
CREATE INDEX idx_dimensions_plant ON plant_visual_dimensions(plant_id);

-- Éléments visuels clés du schéma
CREATE TABLE plant_key_visual_elements (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    shape_explanation TEXT NOT NULL
);
CREATE INDEX idx_key_visual_plant ON plant_key_visual_elements(plant_id);

-- ==========================================
-- 4. TABLES RELATIVES AU SCHÉMA TECHNIQUE (DIAGRAMME DE FLUX)
-- ==========================================

-- Nœuds du diagramme de flux
CREATE TABLE diagram_nodes (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    node_id VARCHAR(50) NOT NULL, -- e.g., 'source', 'boiler', 'turbine'
    label VARCHAR(100) NOT NULL,
    x INT NOT NULL CHECK (x >= 0 AND x <= 100), -- Pourcentage X dans le canvas SVG
    y INT NOT NULL CHECK (y >= 0 AND y <= 100), -- Pourcentage Y dans le canvas SVG
    type VARCHAR(50) NOT NULL CHECK (type IN ('source', 'conversion', 'turbine', 'generator', 'grid', 'cooling', 'storage')),
    CONSTRAINT uq_plant_node_id UNIQUE (plant_id, node_id)
);
CREATE INDEX idx_diagram_nodes_plant ON diagram_nodes(plant_id);

-- Liens/Flux entre les nœuds
CREATE TABLE diagram_links (
    id SERIAL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    from_node VARCHAR(50) NOT NULL,
    to_node VARCHAR(50) NOT NULL,
    label VARCHAR(200),
    flow_type VARCHAR(50) NOT NULL CHECK (flow_type IN ('heat', 'steam', 'water', 'mechanical', 'electricity', 'radiation', 'wind', 'cooling'))
);
CREATE INDEX idx_diagram_links_plant ON diagram_links(plant_id);


-- ==========================================
-- 5. TABLES DE PERSISTANCE DU SIMULATEUR DE MIX ÉNERGÉTIQUE
-- ==========================================

-- Sauvegarde d'un scénario ou mix complet par un utilisateur
CREATE TABLE saved_simulations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    weather_scenario VARCHAR(50) NOT NULL CHECK (weather_scenario IN ('normal', 'sunny_no_wind', 'cloudy_stormy', 'winter_peak')),
    total_production_mw INT NOT NULL,
    target_load_mw INT NOT NULL,
    carbon_intensity_g_kwh INT NOT NULL,
    security_score INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Détails des centrales contenues dans la simulation sauvegardée
CREATE TABLE simulation_items (
    id SERIAL PRIMARY KEY,
    simulation_id INT NOT NULL REFERENCES saved_simulations(id) ON DELETE CASCADE,
    plant_id VARCHAR(50) NOT NULL REFERENCES power_plants(id) ON DELETE CASCADE,
    count INT NOT NULL CHECK (count >= 0),
    active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE INDEX idx_sim_items_simulation ON simulation_items(simulation_id);


-- ==========================================
-- 6. EXEMPLE DE JEU DE DONNÉES D'INITIALISATION (SEEDING)
-- ==========================================

-- Insertion d'une centrale : Nucléaire
INSERT INTO power_plants (id, name, icon_name, category, short_description, long_description, visual_silhouette, architectural_style)
VALUES (
    'nuclear',
    'Centrale Nucléaire',
    'Atom',
    'Décarbonée non-renouvelable',
    'Produit une énorme quantité d''électricité de manière continue et pilotable à partir de la fission d''atomes d''uranium, sans émission directe de CO2.',
    'Une centrale nucléaire utilise la chaleur libérée par la fission nucléaire de l''uranium dans un réacteur pour chauffer de l''eau. Cette eau sous haute pression produit de la vapeur qui fait tourner une turbine géante couplée à un alternateur pour générer de l''électricité.' ,
    'nuclear_tower',
    'Gigantisme industriel moderniste, caractérisé par un dôme double confinement en béton précontraint et des tours aéroréfrigérantes de forme hyperboloïde.'
);

-- Insertion des caractéristiques techniques
INSERT INTO plant_characteristics (plant_id, efficiency, typical_power, co2_emissions, construction_cost, operating_cost, construction_time, lifespan, intermittency, dispatchable, fuel_type)
VALUES (
    'nuclear',
    '33% - 37%',
    '900 - 1650 MW par réacteur',
    12,
    'Très Élevé',
    'Faible',
    '7 - 12 ans',
    '40 - 60 ans (extensible)',
    'Aucune',
    TRUE,
    'Uranium 235 / MOX'
);

-- Avantages du nucléaire
INSERT INTO plant_advantages (plant_id, advantage) VALUES
('nuclear', 'Production massive d''électricité en continu (facteur de charge > 85%)'),
('nuclear', 'Très faible empreinte carbone (équivalente à l''éolien)'),
('nuclear', 'Haute densité énergétique (1g d''uranium = 3 tonnes de charbon)');

-- Inconvénients du nucléaire
INSERT INTO plant_disadvantages (plant_id, disadvantage) VALUES
('nuclear', 'Production de déchets radioactifs à longue durée de vie'),
('nuclear', 'Coûts et délais de construction extrêmement élevés');

-- Étapes de procédé du nucléaire
INSERT INTO plant_process_steps (plant_id, step_number, title, description) VALUES
('nuclear', 1, 'Fission Nucléaire dans le Réacteur', 'Les neutrons percutent les atomes d''uranium dans la cuve du réacteur, provoquant leur division (fission). Ce processus dégage une chaleur thermique colossale.'),
('nuclear', 2, 'Génération de Vapeur', 'L''eau du circuit primaire, chauffée à plus de 300°C sous haute pression pour l''empêcher de bouillir, circule dans un générateur de vapeur où elle chauffe l''eau d''un circuit secondaire indépendant.');

-- Noeuds du diagramme de flux
INSERT INTO diagram_nodes (plant_id, node_id, label, x, y, type) VALUES
('nuclear', 'source', 'Cœur du Réacteur (Fission)', 15, 55, 'source'),
('nuclear', 'boiler', 'Générateur de Vapeur', 38, 35, 'conversion'),
('nuclear', 'turbine', 'Turbine à Vapeur', 60, 35, 'turbine'),
('nuclear', 'generator', 'Alternateur', 78, 35, 'generator'),
('nuclear', 'grid', 'Réseau Électrique', 92, 35, 'grid');

-- Liens du diagramme de flux
INSERT INTO diagram_links (plant_id, from_node, to_node, label, flow_type) VALUES
('nuclear', 'source', 'boiler', 'Eau sous pression (320°C)', 'heat'),
('nuclear', 'boiler', 'turbine', 'Vapeur sèche', 'steam'),
('nuclear', 'turbine', 'generator', 'Arbre rotatif (1500 tr/min)', 'mechanical'),
('nuclear', 'generator', 'grid', 'Électricité brute', 'electricity');
