export const BUSINESS_INFO = {
  name: "Brothers Hotshot Services",
  shortName: "Brothers Hotshot",
  tagline: "Reliable Hotshot Transportation Across Western Canada",
  headline: "Reliable Hotshot Transportation Across Western Canada",
  description:
    "Brothers Hotshot Services provides reliable and professional hotshot delivery and transportation services throughout Alberta, Saskatchewan, British Columbia, and Manitoba, including Winnipeg. We specialize in fast, safe, and dependable transportation of equipment, parts, materials, and urgent loads. Whether it’s a local delivery or a long-distance job, we are committed to providing quality service and getting your load where it needs to go, on time.",
  heroDescription:
    "Fast, safe, and dependable transportation for equipment, parts, materials, and urgent loads.",
  aboutHeadline: "Dependable Transportation. Professional Service.",
  phone: "587-377-0880",
  phoneRaw: "5873770880",
  phoneTel: "tel:587-377-0880",
  email: "info.brothershotshot@gmail.com",
  emailMailto: "mailto:info.brothershotshot@gmail.com",
  address: {
    street: "5401 48 Ave",
    city: "Red Deer",
    province: "AB",
    postalCode: "T4N 3V3",
    country: "Canada",
    full: "5401 48 Ave, Red Deer, AB T4N 3V3, Canada",
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=5401+48+Ave,+Red+Deer,+AB+T4N+3V3,+Canada",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=5401%2048%20Ave,%20Red%20Deer,%20AB%20T4N%203V3,%20Canada&t=&z=14&ie=UTF8&iwloc=&output=embed",
  serviceAreas: [
    "Alberta",
    "Saskatchewan",
    "British Columbia",
    "Manitoba",
    "Winnipeg",
  ],
  dispatchAvailability: "24/7 Dispatch Coordination",
  logoUrl: "/logo.jpg",
  cloudinaryLogo:
    "https://res.cloudinary.com/dai2g47e4/image/upload/v1791539190/WhatsApp_Image_2026-10-09_at_5.33.01_AM_kldvsw.jpg",
};

export const HOTSHOT_CAPABILITIES = [
  {
    id: "pickup-trailers",
    title: "Hotshot Trucks & Gooseneck Trailers",
    category: "Primary Fleet Setup",
    badge: "Agile & Expedited",
    icon: "Truck",
    tagline: "Heavy-Duty Pickups with 30'–40' Gooseneck Decks",
    description:
      "Our main transport setup utilizes heavy-duty dually pickup trucks paired with versatile gooseneck flatbed trailers, providing rapid mobilization, exceptional highway stability, and direct point-to-point delivery without freight transfers.",
    specs: [
      { label: "Configuration", value: "Heavy-Duty Dually Pickups" },
      { label: "Trailer Setup", value: "30'–40' Gooseneck Flatbeds" },
      { label: "Dispatch", value: "Dedicated Direct Routing (No Cross-Docking)" },
      { label: "Transit Mode", value: "Expedited Point-to-Point Transit" },
    ],
    features: [
      "Rapid dispatch mobilization from our central Red Deer, AB operational hub",
      "Agile access into tight job sites, commercial yards, rural locations, and plant leases",
      "Continuous journey monitoring and direct proactive dispatch updates",
      "Dedicated carrier handling—your freight stays on our trailer from pickup to drop-off",
    ],
  },
  {
    id: "equipment-hauling",
    title: "Equipment & Machinery Hauling",
    category: "Machinery Transport",
    badge: "Drive-On & Crane Loading",
    icon: "Wrench",
    tagline: "Safe Transport for Construction, Ag & Industrial Units",
    description:
      "Engineered for moving skid steers, mini-excavators, attachments, agricultural equipment, compressors, generators, and industrial tools with safe weight distribution and high-strength anchoring.",
    specs: [
      { label: "Loading", value: "Heavy-duty full-width drive-on ramps" },
      { label: "Securement", value: "Grade-70 transport chains & ratchet binders" },
      { label: "Typical Units", value: "Skid steers, attachments, compact machinery" },
      { label: "Handling", value: "Experienced load balancing & axle compliance" },
    ],
    features: [
      "Low-angle beavertail ramps allowing safe drive-on and drive-off operations",
      "Multi-point tie-down perimeter with heavy D-rings and certified stake pockets",
      "Direct site-to-site transport between construction yards, lease sites, and shops",
      "Strict compliance with provincial axle limits and Canadian highway transport rules",
    ],
  },
  {
    id: "urgent-deliveries",
    title: "Urgent & Emergency Deliveries",
    category: "Time-Critical Freight",
    badge: "24/7 Priority Dispatch",
    icon: "Zap",
    tagline: "Immediate Response When Every Hour Counts",
    description:
      "Dedicated hotshot dispatch designed for emergency plant shutdowns, drilling rig breakdowns, replacement mechanical parts, and deadline-critical industrial freight requiring immediate non-stop transit.",
    specs: [
      { label: "Mobilization", value: "Immediate driver dispatch response" },
      { label: "Routing", value: "Non-stop dedicated direct transport" },
      { label: "Availability", value: "24/7 dispatch coordination" },
      { label: "Updates", value: "Direct driver communication & ETA alerts" },
    ],
    features: [
      "Single-carrier direct transport without co-loading or cross-dock delays",
      "Fast replacement parts delivery to curtail costly operational downtime",
      "Transparent communication with dispatchers and drivers from start to finish",
      "Direct handoff to designated site foreman, receiver, or project superintendent",
    ],
  },
  {
    id: "long-distance",
    title: "Long-Distance Western Canada Corridors",
    category: "Interprovincial Routes",
    badge: "AB • BC • SK • MB",
    icon: "Compass",
    tagline: "Interprovincial Hotshot Connecting 4 Western Provinces",
    description:
      "Proven long-haul transportation connecting Alberta, Saskatchewan, British Columbia, and Manitoba (including Winnipeg). We navigate cross-provincial corridors, mountain passes, and prairie highways safely in all seasons.",
    specs: [
      { label: "Coverage", value: "Alberta, BC, Saskatchewan, Manitoba" },
      { label: "Key Corridors", value: "Hwy 1, Yellowhead Hwy 16, QEII Hwy 2" },
      { label: "Destination Reach", value: "Winnipeg, Vancouver, Calgary, Edmonton & beyond" },
      { label: "Safety Standard", value: "National Safety Code (NSC) compliant" },
    ],
    features: [
      "Centrally dispatched from Red Deer midway between Edmonton and Calgary",
      "Experienced drivers trained for prairie highways and seasonal Canadian conditions",
      "Complete adherence to interprovincial commercial regulations and permitting",
      "Punctual delivery schedules tailored to your receiving facility hours",
    ],
  },
  {
    id: "materials-parts",
    title: "Industrial Materials & Critical Cargo",
    category: "Commercial Hauling",
    badge: "Versatile Deck Capacity",
    icon: "Layers",
    tagline: "Fabricated Steel, Pipe Bundles & Crated Supplies",
    description:
      "Safe, dependable hauling for structural materials, piping bundles, machined parts, electrical panels, industrial valves, and crated goods requiring professional tie-downs and weather protection.",
    specs: [
      { label: "Deck Access", value: "Open flatdeck for forklift & crane loading" },
      { label: "Tie-Downs", value: "Heavy-duty 4-inch straps & corner protectors" },
      { label: "Weather Tarps", value: "Fitted heavy-duty tarps available upon request" },
      { label: "Cargo Integrity", value: "Certified blocking and dunnage securement" },
    ],
    features: [
      "Full 360-degree flatdeck accessibility for crane and forklift loading",
      "Pipe stakes and certified blocking for round tubulars and steel bundles",
      "Heavy-duty tarping to protect sensitive materials against road grime and salt",
      "Careful staging and balance inspection prior to highway departure",
    ],
  },
  {
    id: "securement-safety",
    title: "Certified Securement & Safety Standards",
    category: "Safety & Compliance",
    badge: "100% NSC Compliant",
    icon: "ShieldCheck",
    tagline: "Rigorous Rigging, Ratchet Binders & Weather Tarping",
    description:
      "Every load is secured with professional-grade transport equipment in full compliance with Canadian Cargo Securement Standards, ensuring your freight arrives securely and without damage.",
    specs: [
      { label: "Chains", value: "Grade-70 transport chain & ratchet binders" },
      { label: "Straps", value: "High-tensile 4-inch polyester ratchet tie-downs" },
      { label: "Protection", value: "Heavy corner guards & weather-resistant tarps" },
      { label: "Inspection", value: "Routine pre-trip & en-route load check protocols" },
    ],
    features: [
      "Strict compliance with National Safety Code Standard 10 (Cargo Securement)",
      "Engineered weight distribution preventing cargo shifts and axle overload",
      "Corner protectors applied to prevent strap abrasion and protect finished goods",
      "Safety-first operating philosophy focused on dependable, on-time delivery",
    ],
  },
];

// Backward-compatible alias for any legacy imports
export const FLEET_IMAGES = [];

