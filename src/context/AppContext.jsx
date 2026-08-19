import React, { createContext, useState, useEffect, useRef } from 'react';
import api from '../services/api';

export const AppContext = createContext();

// Données initiales de la pépinière (Mboro / Ngaparou)
const INITIAL_PLANTS = [
  {
    id: 'p1',
    name: 'Menthe Poivrée du Sénégal',
    category: 'Aromatique & Médicinale',
    price: 1500,
    stock: 120,
    location: 'both',
    soil: 'sableux-riche',
    water: 'fort',
    sun: 'mi-ombre',
    image: '/images/menthe_poivree.jpg',
    description: 'Plante aromatique incontournable pour le thé traditionnel sénégalais (Ataya). Très facile à cultiver.',
    tips: 'Arroser abondamment matin et soir. Préfère un sol riche en compost.'
  },
  {
    id: 'p2',
    name: 'Moringa Oleifera (Nébédaye)',
    category: 'Aromatique & Médicinale',
    price: 3500,
    stock: 85,
    location: 'both',
    soil: 'sableux',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/moringa.jpg',
    description: 'Arbre miracle de l\'agroécologie sénégalaise. Toutes les parties (feuilles, graines) sont comestibles et nutritives.',
    tips: 'Supporte très bien la sécheresse. Arrosage modéré nécessaire uniquement au départ.'
  },
  {
    id: 'p3',
    name: 'Bougainvillier Fushia',
    category: 'Ornementale',
    price: 5000,
    stock: 45,
    location: 'ngaparou',
    soil: 'drainé',
    water: 'moyen',
    sun: 'plein-soleil',
    image: '/images/bougainvillier.jpg',
    description: 'Magnifique arbuste grimpant pour colorer les portails, pergolas et jardins à Ngaparou.',
    tips: 'Tailler après la floraison. Aime la chaleur et le soleil direct pour fleurir.'
  },
  {
    id: 'p4',
    name: 'Manguier Kent (Greffé)',
    category: 'Fruitier & Maraîcher',
    price: 8500,
    stock: 60,
    location: 'mboro',
    soil: 'sableux-profond',
    water: 'moyen',
    sun: 'plein-soleil',
    image: '/images/manguier_kent.jpg',
    description: 'Manguier d\'excellente qualité produisant de grosses mangues juteuses et sans fibres. Idéal pour les vergers des Niayes.',
    tips: 'Le plant greffé produit dès sa 2ème ou 3ème année. Fertiliser au compost à chaque début d\'hivernage.'
  },
  {
    id: 'p5',
    name: 'Citronnier Gallet',
    category: 'Fruitier & Maraîcher',
    price: 7500,
    stock: 50,
    location: 'both',
    soil: 'drainé',
    water: 'moyen',
    sun: 'plein-soleil',
    image: '/images/citronnier_gallet.jpg',
    description: 'Citronnier très productif donnant de petits citrons juteux et parfumés tout au long de l\'année au Sénégal.',
    tips: 'Sensible aux vents salins directs. Bien pailler le pied pour garder l\'humidité.'
  },
  {
    id: 'p6',
    name: 'Filaos Protecteur (Reboisement)',
    category: 'Ombrage',
    price: 2000,
    stock: 300,
    location: 'mboro',
    soil: 'sableux-salin',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/filaos.jpg',
    description: 'Arbre à croissance rapide, excellent pour fixer les dunes côtières de Mboro/Khondio et créer des brise-vents.',
    tips: 'Parfait pour protéger vos cultures maraîchères contre les vents côtiers chargés de sel.'
  },
  {
    id: 'p7',
    name: 'Flamboyant Rouge',
    category: 'Ombrage',
    price: 6000,
    stock: 30,
    location: 'ngaparou',
    soil: 'drainé',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/flamboyant.jpg',
    description: 'Arbre d\'ombrage majestueux qui produit une floraison rouge spectaculaire en début d\'hivernage.',
    tips: 'Fournit un ombrage large idéal pour les espaces publics et les parkings de Ngaparou.'
  },
  {
    id: 'p8',
    name: 'Aloé Vera Barbadensis',
    category: 'Aromatique & Médicinale',
    price: 2500,
    stock: 150,
    location: 'both',
    soil: 'sableux',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/aloe_vera.jpg',
    description: 'Plante succulente aux propriétés médicinales et cosmétiques exceptionnelles pour le traitement de la peau.',
    tips: 'Ne jamais laisser d\'eau stagner dans la coupelle. Arroser uniquement quand la terre est totalement sèche.'
  },
  {
    id: 'p9',
    name: 'Chanvre d\'eau ou patte-de-loup',
    category: 'Aromatique & Médicinale',
    price: 2000,
    stock: 80,
    location: 'both',
    soil: 'sableux-riche',
    water: 'fort',
    sun: 'mi-ombre',
    image: '/images/chanvre_eau.jpg',
    description: 'Cette plante herbacée vivace dicotylédone est une graminée appartenant à la famille des lamiacées. Elle améliore la mémoire, favorise la prise de masse musculaire et prévient les maladies cardiovasculaires.',
    tips: 'Ses feuilles séchées peuvent être ajoutées à des infusions pour réguler la pression artérielle et le transit.'
  },
  {
    id: 'p10',
    name: 'Sauge officinale',
    category: 'Aromatique & Médicinale',
    price: 2500,
    stock: 90,
    location: 'both',
    soil: 'drainé',
    water: 'moyen',
    sun: 'plein-soleil',
    image: '/images/sauge_officinale.jpg',
    description: 'La sauge officinale, scientifiquement connue sous le nom de Salvia officinalis, est une plante aromatique et médicinale appréciée pour ses propriétés antiseptiques, anti-inflammatoires et antioxydantes.',
    tips: 'Les feuilles de sauge séchées peuvent être infusées dans de l\'eau chaude pour préparer une tisane digestive.'
  },
  {
    id: 'p11',
    name: 'Achillée millefeuille',
    category: 'Aromatique & Médicinale',
    price: 3000,
    stock: 75,
    location: 'both',
    soil: 'drainé',
    water: 'moyen',
    sun: 'plein-soleil',
    image: '/images/achillee.jpg',
    description: 'L\'achillée millefeuille est une plante herbacée vivace de la famille des astéracées, reconnue pour ses feuilles finement découpées et ses effets cicatrisants, hémostatiques et digestifs.',
    tips: 'Préparer une infusion avec les fleurs séchées ou diluer quelques gouttes de teinture mère dans de l\'eau.'
  },
  {
    id: 'p12',
    name: 'Lavande officinale',
    category: 'Aromatique & Médicinale',
    price: 3500,
    stock: 60,
    location: 'both',
    soil: 'drainé',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/lavande.jpg',
    description: 'La lavande officinale est un arbuste aromatique du bassin méditerranéen aux multiples bienfaits, reconnue pour ses propriétés relaxantes, calmantes, antiseptiques et cicatrisantes.',
    tips: 'L\'huile essentielle peut être diffusée ou diluée dans une huile végétale pour des massages apaisants.'
  },
  {
    id: 'p13',
    name: 'Céleri',
    category: 'Fruitier & Maraîcher',
    price: 1500,
    stock: 150,
    location: 'both',
    soil: 'sableux-riche',
    water: 'moyen',
    sun: 'plein-soleil',
    image: '/images/celeri.jpg',
    description: 'Le céleri est un légume polyvalent peu calorique et riche en vitamines A, K et C. Il favorise une digestion saine, aide à éliminer les toxines et protège le système cardiovasculaire.',
    tips: 'Consommer cru en salade, en jus détox le matin à jeun, ou en soupe de légumes.'
  },
  {
    id: 'p14',
    name: 'Romarin',
    category: 'Aromatique & Médicinale',
    price: 2000,
    stock: 100,
    location: 'both',
    soil: 'drainé',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/romarin.jpg',
    description: 'Le romarin est un petit arbuste de la famille des lamiacées aux propriétés digestives, antioxydantes, anti-inflammatoires et antibactériennes qui stimulent la mémoire et soulagent les ballonnements.',
    tips: 'Préparer en infusion pour digérer ou en huile essentielle pour soulager les douleurs musculaires.'
  },
  {
    id: 'p15',
    name: 'Origan cubain',
    category: 'Aromatique & Médicinale',
    price: 2500,
    stock: 85,
    location: 'both',
    soil: 'sableux',
    water: 'moyen',
    sun: 'mi-ombre',
    image: '/images/origan_cubain.jpg',
    description: 'L\'origan cubain, aussi appelé gros thym antillais, est une plante aromatique vivace traditionnelle utilisée pour traiter les infections respiratoires comme la toux et fluidifier le mucus.',
    tips: 'Infuser les feuilles ou utiliser en inhalation pour dégager les voies respiratoires.'
  },
  {
    id: 'p16',
    name: 'Pois d\'angole',
    category: 'Fruitier & Maraîcher',
    price: 1800,
    stock: 120,
    location: 'both',
    soil: 'sableux',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/pois_angole.jpg',
    description: 'Le pois d\'angole est une légumineuse riche en protéines de haute qualité et acides aminés essentiels, parfaite pour substituer la viande et enrichir les sols en azote.',
    tips: 'Consommer les graines cuites en soupe ou utiliser comme plante de couverture pour enrichir le sol.'
  },
  {
    id: 'p17',
    name: 'Lantanier rampant',
    category: 'Ornementale',
    price: 2500,
    stock: 95,
    location: 'both',
    soil: 'drainé',
    water: 'faible',
    sun: 'plein-soleil',
    image: '/images/lantanier.jpg',
    description: 'Le lantanier rampant est une plante vivace couvre-sol idéale contre l\'érosion. Ses fleurs attirent les pollinisateurs et son huile essentielle possède des vertus calmantes.',
    tips: 'Utiliser son huile essentielle pour apaiser les douleurs d\'arthrose ou planter comme couvre-sol coloré.'
  }
];

// Matériels agricoles
const INITIAL_EQUIPMENT = [
  {
    id: 'e1',
    name: 'Kit Irrigation Goutte-à-Goutte Solaire (100 m²)',
    category: 'Matériel Agricole',
    location: 'both',
    price: 135000,
    stock: 15,
    image: '/images/irrigation.jpg',
    description: 'Système complet d\'arrosage basse pression alimenté par un petit panneau solaire. Idéal pour économiser l\'eau.',
    specs: 'Comprend 1 mini-pompe, 1 panneau solaire 20W, filtres, tuyaux capillaires et goutteurs régulés.'
  },
  {
    id: 'e2',
    name: 'Compost Organique des Niayes (Sac 25kg)',
    category: 'Fertilisants',
    location: 'mboro',
    price: 3500,
    stock: 500,
    image: '/images/compost.jpg',
    description: 'Compost organique de qualité supérieure fabriqué sur nos fermes de Mboro par compostage aérobie.',
    specs: 'Riche en azote, phosphore et potassium organique. 100% naturel sans additifs chimiques.'
  },
  {
    id: 'e3',
    name: 'Biochar Activé de Biomasse (Sac 10kg)',
    category: 'Fertilisants',
    location: 'mboro',
    price: 6000,
    stock: 200,
    image: '/images/biochar.jpg',
    description: 'Amendement de sol écologique qui retient l\'eau et les nutriments de manière permanente dans les sols sableux.',
    specs: 'Charbon végétal activé au purin de moringa. Améliore la structure du sol sur plusieurs décennies.'
  },
  {
    id: 'e4',
    name: 'Pulvérisateur Écologique Manuel 8L',
    category: 'Matériel Agricole',
    location: 'both',
    price: 18500,
    stock: 25,
    image: '/images/sprayer.jpg',
    description: 'Pulvérisateur à dos robuste, parfait pour appliquer vos bio-pesticides (purins de neem, piment, tabac).',
    specs: 'Buse réglable en laiton, sangle de transport matelassée et soupape de sécurité.'
  },
  {
    id: 'e5',
    name: 'Miel Pur des Niayes (500g)',
    category: 'Apiculture',
    location: 'mboro',
    price: 4500,
    stock: 45,
    image: '/images/honey.jpg',
    description: 'Miel pur et brut récolté dans nos ruches. Notes florales intenses d\'eucalyptus et de baobab.',
    specs: 'Non pasteurisé, extrait à froid pour conserver toutes ses propriétés antibactériennes.'
  },
  {
    id: 'e6',
    name: 'Ruche Kényane (KTBH)',
    category: 'Apiculture',
    location: 'mboro',
    price: 35000,
    stock: 8,
    image: '/images/beehives.jpg',
    description: 'Ruche écologique horizontale idéale pour l\'apiculture en Afrique, fabriquée en bois de rônier local.',
    specs: 'Facile à manipuler, respecte le comportement naturel des abeilles sans besoin de cadres.'
  },
  {
    id: 'e7',
    name: 'Savon au Neem & Moringa',
    category: 'Transformation',
    location: 'ngaparou',
    price: 1500,
    stock: 120,
    image: '/images/soaps.jpg',
    description: 'Savon saponifié à froid à partir d\'ingrédients de nos fermes. Excellent pour les problèmes de peau.',
    specs: '100% organique, sans huile de palme, parfumé naturellement aux huiles essentielles.'
  },
  {
    id: 'e8',
    name: 'Huile de Baobab Pure (100ml)',
    category: 'Transformation',
    location: 'ngaparou',
    price: 5000,
    stock: 30,
    image: '/images/oil.jpg',
    description: 'Huile végétale ultra-nourrissante pressée à froid. Protège la peau et revitalise les cheveux secs.',
    specs: 'Riche en acides gras essentiels et vitamines E, F. Cultivée et pressée au Sénégal.'
  }
];

// Formations
const INITIAL_TRAININGS = [
  {
    id: 't1',
    title: 'Perma-Niayes : Initiation à la permaculture sahélienne',
    location: 'Mboro (Khondio)',
    duration: '3 jours (vendredi - dimanche)',
    date: '12 - 14 Juin 2026',
    price: 45000,
    availablePlaces: 12,
    image: '/images/training.jpg',
    description: 'Apprenez à concevoir un écosystème nourricier productif en zone sahélienne : gestion de l\'eau, paillage, fertilité des sols sablonneux.'
  },
  {
    id: 't2',
    title: 'Gestion de pépinière professionnelle & greffage',
    location: 'Ngaparou (Mbour)',
    duration: '2 jours (samedi - dimanche)',
    date: '27 - 28 Juin 2026',
    price: 35000,
    availablePlaces: 8,
    image: '/images/garden.jpg',
    description: 'Maîtrisez les techniques de multiplication des plantes : semis, bouturage, marcottage et greffage des manguiers/agrumes.'
  },
  {
    id: 't3',
    title: 'Irrigation éco-intelligente & solaire',
    location: 'Mboro (Khondio)',
    duration: '2 jours (samedi - dimanche)',
    date: '11 - 12 Juillet 2026',
    price: 55000,
    availablePlaces: 15,
    image: '/images/irrigation.jpg',
    description: 'Formation technique pour concevoir et installer des systèmes d\'irrigation autonomes à énergie solaire sans gaspillage d\'eau.'
  }
];

// Emplacements de camping
const INITIAL_CAMPING_SPOTS = [
  {
    id: 'c1',
    name: 'Emplacement nu sous les eucalyptus',
    type: 'Nu',
    price: 7500,
    capacity: 4,
    location: 'Mboro',
    image: '/images/camping_nu.jpg',
    description: 'Installez votre propre tente sur un sol sablonneux et herbeux, ombragé naturellement par nos eucalyptus géants.'
  },
  {
    id: 'c2',
    name: 'Tente saharienne équipée premium',
    type: 'Equipe',
    price: 25000,
    capacity: 2,
    location: 'Ngaparou',
    image: '/images/camping_tente.jpg',
    description: 'Grande tente saharienne en toile de coton imperméable montée sur plancher en bois. Lit double, électricité solaire, mobilier artisanal et terrasse privée.'
  },
  {
    id: 'c3',
    name: 'Eco-campement collectif des Niayes',
    type: 'Collectif',
    price: 15000,
    capacity: 8,
    location: 'Ngaparou',
    image: '/images/construction.jpg',
    description: 'Idéal pour les groupes ou clubs de randonneurs. Grand espace partagé avec lits superposés en bambou local et grande table de pique-nique.'
  }
];

export const AppProvider = ({ children }) => {
  // Versioning pour forcer le nettoyage du cache localStorage lors des mises à jour d'images
  const CURRENT_VERSION = '1.6';
  const storedVersion = localStorage.getItem('niayes_app_version');
  if (storedVersion !== CURRENT_VERSION) {
    localStorage.removeItem('niayes_plants');
    localStorage.removeItem('niayes_equipment');
    localStorage.removeItem('niayes_trainings');
    localStorage.removeItem('niayes_camping_spots');
    localStorage.setItem('niayes_app_version', CURRENT_VERSION);
  }

// ─── Synchronisation avec la base PostgreSQL ───
  // On charge depuis l'API (base partagée) au montage, avec le localStorage
  // comme cache de secours si l'API n'est pas joignable.

  const [plants, setPlants] = useState(() => {
    const local = localStorage.getItem('niayes_plants');
    return local ? JSON.parse(local) : INITIAL_PLANTS;
  });

  const [equipment, setEquipment] = useState(() => {
    const local = localStorage.getItem('niayes_equipment');
    return local ? JSON.parse(local) : INITIAL_EQUIPMENT;
  });

  const [trainings, setTrainings] = useState(() => {
    const local = localStorage.getItem('niayes_trainings');
    return local ? JSON.parse(local) : INITIAL_TRAININGS;
  });

  const [campingSpots, setCampingSpots] = useState(() => {
    const local = localStorage.getItem('niayes_camping_spots');
    return local ? JSON.parse(local) : INITIAL_CAMPING_SPOTS;
  });

  // Panier
  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem('niayes_cart');
    return local ? JSON.parse(local) : [];
  });

  // Visiteurs du jour réels (session & localStorage)
  const [visitorCount, setVisitorCount] = useState(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const key = `niayes_visitor_count_${todayStr}`;
    const stored = localStorage.getItem(key);
    let count = stored ? parseInt(stored, 10) : 0;

    if (!sessionStorage.getItem('niayes_visited_session')) {
      sessionStorage.setItem('niayes_visited_session', 'true');
      count += 1;
      localStorage.setItem(key, count.toString());
    }
    return Math.max(count, 1);
  });

  // Base de données des réservations de camping (Locale + API)
  const [campingReservations, setCampingReservations] = useState(() => {
    const local = localStorage.getItem('niayes_camping_reservations');
    return local ? JSON.parse(local) : [];
  });

  // Base de données des inscriptions aux formations (Locale + API)
  const [trainingInscriptions, setTrainingInscriptions] = useState(() => {
    const local = localStorage.getItem('niayes_training_inscriptions');
    return local ? JSON.parse(local) : [];
  });

  // Base de données des demandes de devis (Locale + API)
  const [devisRequests, setDevisRequests] = useState(() => {
    const local = localStorage.getItem('niayes_devis_requests');
    return local ? JSON.parse(local) : [];
  });

  // Commandes e-commerce (Locale + API)
  const [shopOrders, setShopOrders] = useState(() => {
    const local = localStorage.getItem('niayes_shop_orders');
    return local ? JSON.parse(local) : [];
  });

  // Filtre géographique global de navigation
  const [activeFermeFilter, setActiveFermeFilter] = useState('all'); // 'all', 'mboro', 'ngaparou'

  // Référence pour empêcher les écritures pendant le chargement initial
  const syncingRef = useRef(false);

  // ─── Chargement initial depuis la base PostgreSQL ───
  useEffect(() => {
    let cancelled = false;

    const loadFromApi = async () => {
      syncingRef.current = true;
      try {
        const [p, e, t, c, orders, res, ins, dev] = await Promise.allSettled([
          api.plants.fetchAll(),
          api.equipment.fetchAll(),
          api.trainings.fetchAll(),
          api.campingSpots.fetchAll(),
          api.orders.fetchAll(),
          api.reservations.fetchAll(),
          api.inscriptions.fetchAll(),
          api.devis.fetchAll(),
        ]);

        // Dans la base, on construit le catalogue final = données API (si dispo)
        // sinon on garde les données locales (cache).
        const apiPlants = p.status === 'fulfilled' ? p.value : null;
        const apiEquip = e.status === 'fulfilled' ? e.value : null;
        const apiTrainings = t.status === 'fulfilled' ? t.value : null;
        const apiCamping = c.status === 'fulfilled' ? c.value : null;

        if (cancelled) return;

        if (apiPlants && apiPlants.length) {
          setPlants((prev) => mergeDefaults(apiPlants, INITIAL_PLANTS, prev));
        } else if (!apiPlants) {
          // API injoignable : on garde le cache local
        } else {
          // API vide -> on initialise avec les données par défaut
          setPlants(INITIAL_PLANTS);
        }

        if (apiEquip && apiEquip.length) {
          setEquipment(apiEquip);
        } else if (!apiEquip) {
          // cache local
        } else {
          setEquipment(INITIAL_EQUIPMENT);
        }

        if (apiTrainings && apiTrainings.length) {
          setTrainings(apiTrainings);
        } else if (!apiTrainings) {
          // cache local
        } else {
          setTrainings(INITIAL_TRAININGS);
        }

        if (apiCamping && apiCamping.length) {
          setCampingSpots(apiCamping);
        } else if (!apiCamping) {
          // cache local
        } else {
          setCampingSpots(INITIAL_CAMPING_SPOTS);
        }

        if (orders.status === 'fulfilled') setShopOrders(orders.value);
        if (res.status === 'fulfilled') setCampingReservations(res.value);
        if (ins.status === 'fulfilled') setTrainingInscriptions(ins.value);
        if (dev.status === 'fulfilled') setDevisRequests(dev.value);
      } catch (err) {
        console.warn('API injoignable, utilisation du cache local.', err);
      } finally {
        syncingRef.current = false;
      }
    };

    loadFromApi();

    return () => { cancelled = true; };
  }, []);

  // Fonction utilitaire : fusionner les données par défaut avec celles de l'API
  function mergeDefaults(apiData, defaults, prev) {
    const merged = [...apiData];
    defaults.forEach((d) => {
      if (!merged.some((x) => x.id === d.id)) {
        merged.push(d);
      }
    });
    // Si l'API a renvoyé des données, on les utilise (sinon le cache local)
    return merged.length ? merged : prev;
  }

  // ── Persistance locale (cache) ──
  useEffect(() => {
    localStorage.setItem('niayes_plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem('niayes_equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('niayes_trainings', JSON.stringify(trainings));
  }, [trainings]);

  useEffect(() => {
    localStorage.setItem('niayes_camping_spots', JSON.stringify(campingSpots));
  }, [campingSpots]);

  useEffect(() => {
    localStorage.setItem('niayes_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('niayes_camping_reservations', JSON.stringify(campingReservations));
  }, [campingReservations]);

  useEffect(() => {
    localStorage.setItem('niayes_training_inscriptions', JSON.stringify(trainingInscriptions));
  }, [trainingInscriptions]);

  useEffect(() => {
    localStorage.setItem('niayes_devis_requests', JSON.stringify(devisRequests));
  }, [devisRequests]);

  useEffect(() => {
    localStorage.setItem('niayes_shop_orders', JSON.stringify(shopOrders));
  }, [shopOrders]);

  // ── Synchronisation avec la base PostgreSQL ──
  // À chaque modification du catalogue, on pousse les données vers l'API
  // (sauf pendant le chargement initial).

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      plants.forEach((item) => api.plants.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [plants]);

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      equipment.forEach((item) => api.equipment.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [equipment]);

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      trainings.forEach((item) => api.trainings.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [trainings]);

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      campingSpots.forEach((item) => api.campingSpots.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [campingSpots]);

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      campingReservations.forEach((item) => api.reservations.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [campingReservations]);

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      trainingInscriptions.forEach((item) => api.inscriptions.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [trainingInscriptions]);

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      devisRequests.forEach((item) => api.devis.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [devisRequests]);

  useEffect(() => {
    if (syncingRef.current) return;
    const t = setTimeout(() => {
      shopOrders.forEach((item) => api.orders.add(item).catch(() => {}));
    }, 400);
    return () => clearTimeout(t);
  }, [shopOrders]);

  // Actions Panier
  const addToCart = (item, type = 'plant') => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1, itemType: type }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQty = (id, val) => {
    if (val <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: val } : i)));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Traitement d'une commande boutique / pépinière
  const checkoutCart = (customerInfo, totalAmount) => {
    // Déduire les stocks
    cart.forEach((cartItem) => {
      if (cartItem.itemType === 'plant') {
        setPlants((prev) => {
          const updated = prev.map((p) => (p.id === cartItem.id ? { ...p, stock: Math.max(0, p.stock - cartItem.qty) } : p));
          const target = updated.find((p) => p.id === cartItem.id);
          if (target) api.plants.update(target.id, target).catch(() => {});
          return updated;
        });
      } else {
        setEquipment((prev) => {
          const updated = prev.map((e) => (e.id === cartItem.id ? { ...e, stock: Math.max(0, e.stock - cartItem.qty) } : e));
          const target = updated.find((e) => e.id === cartItem.id);
          if (target) api.equipment.update(target.id, target).catch(() => {});
          return updated;
        });
      }
    });

    const newOrder = {
      id: 'ORD_' + Date.now().toString().slice(-6),
      nom_client: customerInfo.name,
      telephone: customerInfo.phone,
      items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total: totalAmount,
      statut_paiement: 'Payé',
      date: new Date().toISOString().split('T')[0]
    };

    setShopOrders((prev) => [newOrder, ...prev]);
    api.orders.add(newOrder).catch(() => {});
    clearCart();
    return newOrder.id;
  };

  // Traitement d'une inscription à une formation
  const enrollInTraining = (participantInfo, trainingId, option) => {
    const selectedTraining = trainings.find((t) => t.id === trainingId);
    if (!selectedTraining) return null;

// Déduire 1 place disponible
    setTrainings((prev) => {
      const updated = prev.map((t) => (t.id === trainingId ? { ...t, availablePlaces: Math.max(0, t.availablePlaces - 1) } : t));
      const target = updated.find((t) => t.id === trainingId);
      if (target) api.trainings.update(target.id, target).catch(() => {});
      return updated;
    });

    const price = selectedTraining.price;
    const toPay = option === 'deposit' ? price * 0.3 : price;

    const newInscription = {
      id: 'INS_' + Date.now().toString().slice(-6),
      nom_apprenant: participantInfo.name,
      telephone: participantInfo.phone,
      email: participantInfo.email,
      formation_titre: selectedTraining.title,
      statut_paiement: option === 'deposit' ? 'Acompte' : 'Total',
      montant_paye: toPay
    };

    setTrainingInscriptions((prev) => [newInscription, ...prev]);
    api.inscriptions.add(newInscription).catch(() => {});
    return newInscription.id;
  };

  // Traitement d'une réservation de camping
  const bookCampingSpot = (bookingInfo, spotId, dateDebut, dateFin, totalCost) => {
    const spot = campingSpots.find((s) => s.id === spotId);
    if (!spot) return null;

    const newReservation = {
      id: 'RES_' + Date.now().toString().slice(-6),
      nom_client: bookingInfo.name,
      telephone_client: bookingInfo.phone,
      email_client: bookingInfo.email,
      date_debut: dateDebut,
      date_fin: dateFin,
      statut_paiement: 'Payé',
      montant_total: totalCost,
      emplacement_nom: spot.name,
      ferme: spot.location
    };

    setCampingReservations((prev) => [newReservation, ...prev]);
    api.reservations.add(newReservation).catch(() => {});
    return newReservation.id;
  };

  // Soumission d'une demande de devis
  const submitDevisRequest = (devisInfo) => {
    const newRequest = {
      id: 'DEV_' + Date.now().toString().slice(-6),
      nom_demandeur: devisInfo.name,
      entreprise_collectivite: devisInfo.company || 'Particulier',
      email: devisInfo.email,
      telephone: devisInfo.phone,
      type_service: devisInfo.serviceType,
      details_projet: devisInfo.details,
      statut: 'Nouveau',
      date: new Date().toISOString().split('T')[0]
    };

    setDevisRequests((prev) => [newRequest, ...prev]);
    api.devis.add(newRequest).catch(() => {});
    return newRequest.id;
  };

  // Actions Administration CRUD pour l'utilisateur
  const adminAddPlant = (newPlant) => {
    const item = { ...newPlant, id: 'p_' + Date.now() };
    setPlants((prev) => [...prev, item]);
    api.plants.add(item).catch(() => {});
  };

  const adminAddEquipment = (newEquip) => {
    const item = { ...newEquip, id: 'e_' + Date.now() };
    setEquipment((prev) => [...prev, item]);
    api.equipment.add(item).catch(() => {});
  };

  const adminAddTraining = (newTraining) => {
    const item = { ...newTraining, id: 't_' + Date.now() };
    setTrainings((prev) => [...prev, item]);
    api.trainings.add(item).catch(() => {});
  };

  const adminAddCampingSpot = (newSpot) => {
    const item = { ...newSpot, id: 'c_' + Date.now() };
    setCampingSpots((prev) => [...prev, item]);
    api.campingSpots.add(item).catch(() => {});
  };

const adminUpdatePlantStock = (id, newStock) => {
    setPlants((prev) => prev.map((p) => (p.id === id ? { ...p, stock: parseInt(newStock) || 0 } : p)));
    api.plants.update(id, { stock: parseInt(newStock) || 0, id }).catch(() => {});
  };

const adminDeletePlant = (id) => {
    setPlants((prev) => prev.filter((p) => p.id !== id));
    api.plants.remove(id).catch(() => {});
  };

  const adminDeleteEquipment = (id) => {
    setEquipment((prev) => prev.filter((e) => e.id !== id));
    api.equipment.remove(id).catch(() => {});
  };

  const adminDeleteTraining = (id) => {
    setTrainings((prev) => prev.filter((t) => t.id !== id));
    api.trainings.remove(id).catch(() => {});
  };

  const adminDeleteCampingSpot = (id) => {
    setCampingSpots((prev) => prev.filter((c) => c.id !== id));
    api.campingSpots.remove(id).catch(() => {});
  };

  const adminUpdateDevisStatut = (id, newStatut) => {
    setDevisRequests((prev) => prev.map((d) => (d.id === id ? { ...d, statut: newStatut } : d)));
  };

const adminUpdatePlant = (id, updatedPlant) => {
    setPlants((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedPlant } : p)));
    api.plants.update(id, { ...updatedPlant, id }).catch(() => {});
  };

  const adminUpdateEquipment = (id, updatedEquipment) => {
    setEquipment((prev) => prev.map((e) => (e.id === id ? { ...e, ...updatedEquipment } : e)));
    api.equipment.update(id, { ...updatedEquipment, id }).catch(() => {});
  };

  const adminUpdateTraining = (id, updatedTraining) => {
    setTrainings((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedTraining } : t)));
    api.trainings.update(id, { ...updatedTraining, id }).catch(() => {});
  };

  const adminUpdateCampingSpot = (id, updatedSpot) => {
    setCampingSpots((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedSpot } : c)));
    api.campingSpots.update(id, { ...updatedSpot, id }).catch(() => {});
  };

  return (
    <AppContext.Provider
      value={{
        plants,
        equipment,
        trainings,
        campingSpots,
        cart,
        visitorCount,
        campingReservations,
        trainingInscriptions,
        devisRequests,
        shopOrders,
        activeFermeFilter,
        setActiveFermeFilter,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        checkoutCart,
        enrollInTraining,
        bookCampingSpot,
        submitDevisRequest,
        adminAddPlant,
        adminAddEquipment,
        adminAddTraining,
        adminAddCampingSpot,
        adminUpdatePlantStock,
        adminDeletePlant,
        adminDeleteEquipment,
        adminDeleteTraining,
        adminDeleteCampingSpot,
        adminUpdateDevisStatut,
        adminUpdatePlant,
        adminUpdateEquipment,
        adminUpdateTraining,
        adminUpdateCampingSpot
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
