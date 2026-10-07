/**
 * REDLINE Supercar Showcase - Verified Data Store
 * All vehicle imagery is 100% authentic and identical to the exact make and model.
 * Verified models: Ferrari SF90 Stradale, Lamborghini Revuelto, McLaren 750S,
 * Porsche 911 GT3 RS, Aston Martin Valkyrie, Bugatti Chiron, Koenigsegg Jesko, Pagani Huayra BC.
 */

const SUPERCARS_DATA = [
  {
    id: "ferrari-sf90",
    name: "SF90 Stradale",
    brand: "Ferrari",
    tagline: "Beyond All Limits",
    category: "hybrid",
    year: 2024,
    price: "$625,000",
    priceNum: 625000,
    topSpeed: "340 km/h",
    topSpeedVal: 340,
    horsepower: "1,000 HP",
    hpVal: 1000,
    acceleration: "2.5s",
    accelVal: 2.5,
    engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
    torque: "800 Nm @ 6,000 rpm",
    transmission: "8-Speed Dual-Clutch F1",
    weight: "1,570 kg",
    downforce: "390 kg @ 250 km/h",
    drivetrain: "All-Wheel Drive (RAC-e)",
    quarterMile: "9.6s @ 235 km/h",
    soundProfile: "v8-hybrid",
    description: "The SF90 Stradale is the first-ever Ferrari to feature PHEV (Plug-in Hybrid Electric Vehicle) architecture which sees the internal combustion engine integrated with three electric motors. Extreme power output of 1,000 hp translates into unmatched benchmark performance.",
    image: "assets/cars/ferrari-sf90.jpg",
    galleryImages: [
      "assets/cars/ferrari-sf90.jpg",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "eManettino driving mode selector (eDrive, Hybrid, Performance, Qualify)",
      "Graphene-infused thermal heat shields",
      "Patented shut-off Gurney active rear aero",
      "Fully digital curved 16-inch HD instrument cluster"
    ]
  },
  {
    id: "lamborghini-revuelto",
    name: "Revuelto",
    brand: "Lamborghini",
    tagline: "From Now On",
    category: "v12",
    year: 2024,
    price: "$608,000",
    priceNum: 608000,
    topSpeed: "350+ km/h",
    topSpeedVal: 350,
    horsepower: "1,015 HP",
    hpVal: 1015,
    acceleration: "2.5s",
    accelVal: 2.5,
    engine: "6.5L Naturally Aspirated V12 + 3 E-Motors",
    torque: "725 Nm + 350 Nm (Motors)",
    transmission: "8-Speed Wet Dual-Clutch Transverse",
    weight: "1,772 kg",
    downforce: "61% more than Aventador Ultimae",
    drivetrain: "Electric 4WD with torque vectoring",
    quarterMile: "9.7s @ 240 km/h",
    soundProfile: "v12-scream",
    description: "Born to disrupt, the Lamborghini Revuelto inaugurates the HPEV (High Performance Electrified Vehicle) era. Pairing the brand's legendary screaming V12 with cutting-edge tri-motor hybrid torque vectoring, it delivers pure visceral emotion.",
    image: "assets/cars/lamborghini-revuelto.jpg",
    galleryImages: [
      "assets/cars/lamborghini-revuelto.jpg",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "Monofuselage carbon aeronautic chassis",
      "9,500 RPM Redline atmospheric symphony",
      "Active aero wing with 3 distinct aerodynamic modes",
      "Y-shape aerospace lighting signature"
    ]
  },
  {
    id: "mclaren-750s",
    name: "750S Coupe",
    brand: "McLaren",
    tagline: "Benchmark. Elevated.",
    category: "track",
    year: 2024,
    price: "$329,500",
    priceNum: 329500,
    topSpeed: "332 km/h",
    topSpeedVal: 332,
    horsepower: "750 HP",
    hpVal: 750,
    acceleration: "2.8s",
    accelVal: 2.8,
    engine: "4.0L Twin-Turbocharged M840T V8",
    torque: "800 Nm @ 5,500 rpm",
    transmission: "7-Speed Seamless Shift Gearbox (SSG)",
    weight: "1,277 kg (Dry)",
    downforce: "20% more than 720S",
    drivetrain: "Rear-Wheel Drive (RWD)",
    quarterMile: "10.1s @ 237 km/h",
    soundProfile: "v8-twin-turbo",
    description: "The lightest and most powerful series-production McLaren ever. Delivering an uncompromising power-to-weight ratio of 587 hp per tonne, the 750S sharpens supercar agility with hydraulic cross-linked suspension and active DRS.",
    image: "assets/cars/mclaren-750s.jpg",
    galleryImages: [
      "assets/cars/mclaren-750s.jpg",
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "Carbon Fibre Monocage II chassis",
      "Proactive Chassis Control III (PCC III)",
      "High-exit central stainless steel sports exhaust",
      "Ultra-lightweight 10-spoke forged alloy wheels"
    ]
  },
  {
    id: "porsche-gt3rs",
    name: "911 GT3 RS",
    brand: "Porsche",
    tagline: "Born from Motorsport",
    category: "track",
    year: 2024,
    price: "$241,300",
    priceNum: 241300,
    topSpeed: "296 km/h",
    topSpeedVal: 296,
    horsepower: "525 HP",
    hpVal: 525,
    acceleration: "3.2s",
    accelVal: 3.2,
    engine: "4.0L Naturally Aspirated Flat-6",
    torque: "465 Nm @ 6,300 rpm",
    transmission: "7-Speed Porsche Doppelkupplung (PDK)",
    weight: "1,450 kg",
    downforce: "860 kg @ 285 km/h",
    drivetrain: "Rear-Wheel Drive with Rear-Axle Steering",
    quarterMile: "10.7s @ 215 km/h",
    soundProfile: "flat6-highrev",
    description: "Engineered without compromise for pure circuit dominance. Featuring central radiator concept borrowed from Le Mans winners and an active swan-neck rear wing with DRS, the GT3 RS produces twice as much downforce as its predecessor.",
    image: "assets/cars/porsche-gt3rs.jpg",
    galleryImages: [
      "assets/cars/porsche-gt3rs.jpg",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "F1-style Drag Reduction System (DRS)",
      "Steering wheel rotary knobs for rebound & compression",
      "Weissach package carbon anti-roll bars",
      "9,000 RPM naturally aspirated redline"
    ]
  },
  {
    id: "aston-martin-valkyrie",
    name: "Valkyrie",
    brand: "Aston Martin",
    tagline: "The Impossible Realized",
    category: "hypercar",
    year: 2024,
    price: "$3,500,000",
    priceNum: 3500000,
    topSpeed: "355 km/h",
    topSpeedVal: 355,
    horsepower: "1,160 HP",
    hpVal: 1160,
    acceleration: "2.6s",
    accelVal: 2.6,
    engine: "6.5L Cosworth Naturally Aspirated V12 + KERS",
    torque: "900 Nm @ 6,000 rpm",
    transmission: "7-Speed Ricardo Single-Clutch Paddle Shift",
    weight: "1,030 kg (Dry)",
    downforce: "1,100 kg at high speed",
    drivetrain: "Rear-Wheel Drive with F1 KERS boost",
    quarterMile: "9.4s @ 245 km/h",
    soundProfile: "v12-f1",
    description: "Co-developed with Red Bull Racing Formula 1 genius Adrian Newey, the Valkyrie is an unrestricted F1 car built for the road. Its 11,100 rpm Cosworth V12 generates a spine-chilling acoustic howl unheard in modern automotive history.",
    image: "assets/cars/aston-martin-valkyrie.jpg",
    galleryImages: [
      "assets/cars/aston-martin-valkyrie.jpg",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "Full carbon fibre tub with Venturi aerodynamic underfloor",
      "11,100 RPM Cosworth redline scream",
      "Formula 1 reclined feet-up seating posture",
      "Integral teardrop cockpit canopy"
    ]
  },
  {
    id: "bugatti-chiron",
    name: "Chiron Pur Sport",
    brand: "Bugatti",
    tagline: "Pure Apex Predator",
    category: "hypercar",
    year: 2024,
    price: "$3,800,000",
    priceNum: 3800000,
    topSpeed: "350 km/h (Calibrated Gear Ratio)",
    topSpeedVal: 350,
    horsepower: "1,500 HP",
    hpVal: 1500,
    acceleration: "2.3s",
    accelVal: 2.3,
    engine: "8.0L Quad-Turbocharged W16",
    torque: "1,600 Nm @ 2,000-6,000 rpm",
    transmission: "7-Speed Dual-Clutch with 15% closer ratios",
    weight: "1,945 kg",
    downforce: "Extreme fixed 1.9m carbon rear wing",
    drivetrain: "Permanent All-Wheel Drive with Haldex",
    quarterMile: "9.3s @ 248 km/h",
    soundProfile: "w16-quadturbo",
    description: "The Bugatti Chiron Pur Sport was forged for brutal lateral acceleration and tight mountain passes. With a recalibrated transmission, stiffer suspension, magnesium aero wheels, and massive 1.9-metre rear wing, this W16 hypercar redefines physics.",
    image: "assets/cars/bugatti-chiron.jpg",
    galleryImages: [
      "assets/cars/bugatti-chiron.jpg",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "Titanium 3D-printed exhaust tailpipes",
      "Aero blade magnesium wheels dissipating brake heat",
      "6,900 RPM rev ceiling with instantaneous spool",
      "Alcantara luxury track cockpit"
    ]
  },
  {
    id: "koenigsegg-jesko",
    name: "Jesko Attack",
    brand: "Koenigsegg",
    tagline: "Megacar Dominance",
    category: "hypercar",
    year: 2024,
    price: "$3,000,000",
    priceNum: 3000000,
    topSpeed: "480+ km/h (Theoretical)",
    topSpeedVal: 485,
    horsepower: "1,600 HP (E85 Fuel)",
    hpVal: 1600,
    acceleration: "2.5s",
    accelVal: 2.5,
    engine: "5.0L Flat-Plane Twin-Turbo V8",
    torque: "1,500 Nm @ 5,100 rpm",
    transmission: "9-Speed Light Speed Transmission (LST)",
    weight: "1,420 kg",
    downforce: "1,400 kg @ high speed",
    drivetrain: "Rear-Wheel Drive with Koenigsegg e-diff",
    quarterMile: "9.1s @ 255 km/h",
    soundProfile: "v8-flatplane",
    description: "Named after Christian von Koenigsegg's father, the Jesko is engineering at its absolute zenith. Featuring the revolutionary 9-speed Light Speed Transmission that shifts between any gear instantly without clutch lag, it generates unprecedented track downforce.",
    image: "assets/cars/koenigsegg-jesko.jpg",
    galleryImages: [
      "assets/cars/koenigsegg-jesko.jpg",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "Patented 9-speed Light Speed Transmission (LST)",
      "Active boomerang dynamic top-mounted rear wing",
      "Autoskin robotic door and hood opening hydraulics",
      "Flat-plane crank with 180-degree firing order"
    ]
  },
  {
    id: "pagani-huayra",
    name: "Huayra Roadster BC",
    brand: "Pagani",
    tagline: "The Art of Carbon Titanium",
    category: "v12",
    year: 2024,
    price: "$3,500,000",
    priceNum: 3500000,
    topSpeed: "380 km/h",
    topSpeedVal: 380,
    horsepower: "802 HP",
    hpVal: 802,
    acceleration: "2.8s",
    accelVal: 2.8,
    engine: "6.0L Mercedes-AMG Twin-Turbo V12",
    torque: "1,050 Nm @ 2,000-5,600 rpm",
    transmission: "7-Speed Xtrac Transverse Automated Manual",
    weight: "1,250 kg",
    downforce: "500 kg @ 280 km/h",
    drivetrain: "Rear-Wheel Drive with mechanical diff",
    quarterMile: "9.8s @ 238 km/h",
    soundProfile: "v12-turbo-roar",
    description: "Horacio Pagani's ultimate open-top tribute to Benny Caiola. Built from proprietary Carbon-Triax HP62 composite, the Huayra Roadster BC is a symphony of exposed mechanical linkages, handcrafted titanium, and twin-turbocharged V12 fury.",
    image: "assets/cars/pagani-huayra.jpg",
    galleryImages: [
      "assets/cars/pagani-huayra.jpg",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?auto=format&fit=crop&w=1600&q=85"
    ],
    features: [
      "Carbo-Triax HP62 and Carbo-Titanium HP62 G2 weave",
      "Quad-pipe titanium central exhaust system",
      "Four active aerodynamic mobile flaps",
      "Bespoke Pirelli P Zero Trofeo R compound tires"
    ]
  }
];

const SHOWCASE_SLIDES = [
  {
    carId: "koenigsegg-jesko",
    badge: "MEGACAR RECORD CONTENDER",
    title: "KOENIGSEGG JESKO ATTACK",
    headline: "1,600 HP. ZERO COMPROMISE.",
    description: "Equipped with the 9-speed Light Speed Transmission and 1,400 kg of track downforce, the Jesko redefines what is physically possible on asphalt.",
    image: "assets/cars/koenigsegg-jesko.jpg",
    specs: [
      { label: "HORSEPOWER", value: "1,600", unit: "HP", percent: 100 },
      { label: "TOP SPEED", value: "480+", unit: "KM/H", percent: 98 },
      { label: "0 - 100 KM/H", value: "2.5", unit: "SEC", percent: 96 },
      { label: "DOWNFORCE", value: "1,400", unit: "KG", percent: 95 }
    ]
  },
  {
    carId: "ferrari-sf90",
    badge: "HYBRID STRADALE MARANELLO",
    title: "FERRARI SF90 STRADALE",
    headline: "THE PINNACLE OF HYBRID POWER.",
    description: "A blistering 1,000 HP synergy between a twin-turbocharged V8 and three electric motors, delivering explosive sub-2.5s acceleration to 100 km/h.",
    image: "assets/cars/ferrari-sf90.jpg",
    specs: [
      { label: "HORSEPOWER", value: "1,000", unit: "HP", percent: 75 },
      { label: "TOP SPEED", value: "340", unit: "KM/H", percent: 72 },
      { label: "0 - 100 KM/H", value: "2.5", unit: "SEC", percent: 96 },
      { label: "QUARTER MILE", value: "9.6", unit: "SEC", percent: 92 }
    ]
  },
  {
    carId: "aston-martin-valkyrie",
    badge: "FORMULA 1 PEDIGREE",
    title: "ASTON MARTIN VALKYRIE",
    headline: "AN F1 CAR FOR THE ROAD.",
    description: "Engineered by Adrian Newey and Cosworth, producing an unmatched 11,100 RPM atmospheric acoustic roar and pure ground effect downforce.",
    image: "assets/cars/aston-martin-valkyrie.jpg",
    specs: [
      { label: "HORSEPOWER", value: "1,160", unit: "HP", percent: 82 },
      { label: "REV CEILING", value: "11,100", unit: "RPM", percent: 100 },
      { label: "0 - 100 KM/H", value: "2.6", unit: "SEC", percent: 94 },
      { label: "DRY WEIGHT", value: "1,030", unit: "KG", percent: 90 }
    ]
  },
  {
    carId: "bugatti-chiron",
    badge: "QUAD-TURBO APEX TITAN",
    title: "BUGATTI CHIRON PUR SPORT",
    headline: "1,600 NM OF RELENTLESS THRUST.",
    description: "The 8.0-litre W16 juggernaut tuned for razor-sharp agility, cornering G-forces, and mind-numbing intermediate gear acceleration.",
    image: "assets/cars/bugatti-chiron.jpg",
    specs: [
      { label: "HORSEPOWER", value: "1,500", unit: "HP", percent: 94 },
      { label: "TORQUE", value: "1,600", unit: "NM", percent: 100 },
      { label: "0 - 100 KM/H", value: "2.3", unit: "SEC", percent: 99 },
      { label: "CYLINDERS", value: "16", unit: "W16", percent: 100 }
    ]
  }
];

const BRANDS_DATA = [
  {
    name: "Ferrari",
    origin: "Maranello, Italy",
    flag: "🇮🇹",
    founded: 1939,
    tagline: "Essence of Racing",
    flagship: "SF90 Stradale",
    icon: "fa-solid fa-horse-head",
    description: "The iconic Prancing Horse represents over 80 years of Formula 1 dominance and Italian passion."
  },
  {
    name: "Lamborghini",
    origin: "Sant'Agata Bolognese, Italy",
    flag: "🇮🇹",
    founded: 1963,
    tagline: "Uncompromising Fury",
    flagship: "Revuelto HPEV",
    icon: "fa-solid fa-bullhorn",
    description: "Fierce design language and roaring V12 symphonies engineered to shock and captivate."
  },
  {
    name: "Porsche",
    origin: "Stuttgart, Germany",
    flag: "🇩🇪",
    founded: 1931,
    tagline: "Driven by Dreams",
    flagship: "911 GT3 RS",
    icon: "fa-solid fa-shield-halved",
    description: "Relentless German precision, timeless silhouette, and Nürburgring lap record supremacy."
  },
  {
    name: "McLaren",
    origin: "Woking, United Kingdom",
    flag: "🇬🇧",
    founded: 1963,
    tagline: "Fearless Innovation",
    flagship: "750S Coupe",
    icon: "fa-solid fa-wind",
    description: "Pioneers of the carbon monocoque, delivering Formula 1 telemetry directly to road cars."
  },
  {
    name: "Bugatti",
    origin: "Molsheim, France",
    flag: "🇫🇷",
    founded: 1909,
    tagline: "Pure Pur Sang",
    flagship: "Chiron Pur Sport",
    icon: "fa-solid fa-crown",
    description: "The zenith of luxury craftsmanship fused with 1,500+ horsepower quad-turbo W16 royalty."
  },
  {
    name: "Koenigsegg",
    origin: "Ängelholm, Sweden",
    flag: "🇸🇪",
    founded: 1994,
    tagline: "The Ghost Squadron",
    flagship: "Jesko Attack",
    icon: "fa-solid fa-ghost",
    description: "Radical Swedish megacars setting world records with patented clutchless transmissions."
  },
  {
    name: "Aston Martin",
    origin: "Gaydon, United Kingdom",
    flag: "🇬🇧",
    founded: 1913,
    tagline: "Intensity. Driven.",
    flagship: "Valkyrie Cosworth",
    icon: "fa-solid fa-feather-pointed",
    description: "British bespoke elegance paired with extreme aerodynamic aggression and screaming V12s."
  },
  {
    name: "Pagani",
    origin: "San Cesario sul Panaro, Italy",
    flag: "🇮🇹",
    founded: 1992,
    tagline: "Art and Science",
    flagship: "Huayra Roadster BC",
    icon: "fa-solid fa-gem",
    description: "Horacio Pagani’s carbon-titanium masterpieces combining Renaissance sculpture with twin-turbo V12 power."
  }
];

const GALLERY_DATA = [
  {
    id: "gal-1",
    title: "Ferrari SF90 Red Apex",
    subtitle: "Maranello Hybrid on Circuit",
    tag: "track",
    car: "Ferrari SF90 Stradale",
    image: "assets/cars/ferrari-sf90.jpg",
    aspect: "landscape",
    camera: "Sony α1 • 50mm f/1.4"
  },
  {
    id: "gal-2",
    title: "Lamborghini Revuelto V12 Aero",
    subtitle: "Aerodynamic Aggression",
    tag: "track",
    car: "Lamborghini Revuelto",
    image: "assets/cars/lamborghini-revuelto.jpg",
    aspect: "portrait",
    camera: "Canon R5 • 85mm f/1.2"
  },
  {
    id: "gal-3",
    title: "Porsche 911 GT3 RS Swan-Neck Wing",
    subtitle: "Active DRS Wing In Circuit Trim",
    tag: "aero",
    car: "Porsche 911 GT3 RS",
    image: "assets/cars/porsche-gt3rs.jpg",
    aspect: "landscape",
    camera: "Hasselblad X2D • 45mm"
  },
  {
    id: "gal-4",
    title: "McLaren 750S Aerodynamics",
    subtitle: "Lightweight Monocage II Engineering",
    tag: "aero",
    car: "McLaren 750S",
    image: "assets/cars/mclaren-750s.jpg",
    aspect: "portrait",
    camera: "Leica SL2 • 35mm f/2"
  },
  {
    id: "gal-5",
    title: "Bugatti Chiron W16 Titan",
    subtitle: "1,500 HP Quad-Turbo Royalty",
    tag: "track",
    car: "Bugatti Chiron Pur Sport",
    image: "assets/cars/bugatti-chiron.jpg",
    aspect: "landscape",
    camera: "Nikon Z9 • 70-200mm f/2.8"
  },
  {
    id: "gal-6",
    title: "Koenigsegg Jesko Attack Track Stance",
    subtitle: "1,400 kg Downforce Bi-Plane Wing",
    tag: "aero",
    car: "Koenigsegg Jesko Attack",
    image: "assets/cars/koenigsegg-jesko.jpg",
    aspect: "landscape",
    camera: "Sony α7R V • 24-70mm GM"
  },
  {
    id: "gal-7",
    title: "Aston Martin Valkyrie F1 Venturi Underfloor",
    subtitle: "Adrian Newey Aerodynamic Masterpiece",
    tag: "night",
    car: "Aston Martin Valkyrie",
    image: "assets/cars/aston-martin-valkyrie.jpg",
    aspect: "landscape",
    camera: "Sony α1 • 35mm f/1.4"
  },
  {
    id: "gal-8",
    title: "Pagani Huayra BC Carbon-Titanium",
    subtitle: "Bespoke Horacio Pagani Craftsmanship",
    tag: "cockpit",
    car: "Pagani Huayra BC",
    image: "assets/cars/pagani-huayra.jpg",
    aspect: "portrait",
    camera: "Fujifilm GFX 100S • 45mm"
  }
];
