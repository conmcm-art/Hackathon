const supermarkets = [
  {
    id: "store_001",
    name: "Checkers Pietermaritzburg",
    location: "Pietermaritzburg CBD",
    verified: true,
    donations: 12,
  },
  {
    id: "store_002",
    name: "Pick n Pay Hayfields",
    location: "Hayfields",
    verified: true,
    donations: 8,
  },
  {
    id: "store_003",
    name: "Spar Midlands",
    location: "Midlands",
    verified: true,
    donations: 15,
  },
];

const ngos = [
  {
    id: "ngo_001",
    name: "Hope Kitchen",
    location: "Pietermaritzburg Central",
    distanceKm: 3.2,
    mealCapacity: 120,
    hasRefrigeration: true,
    hasHotKitchen: true,
    acceptsCookedFood: true,
    reliabilityScore: 96,
    match: 96,
    note: "Open for supper service tonight",
  },
  {
    id: "ngo_002",
    name: "Ubuntu Meals Project",
    location: "Edendale",
    distanceKm: 5.4,
    mealCapacity: 180,
    hasRefrigeration: true,
    hasHotKitchen: false,
    acceptsCookedFood: true,
    reliabilityScore: 88,
    match: 84,
    note: "Strong capacity but further away",
  },
  {
    id: "ngo_003",
    name: "PMB Community Table",
    location: "Scottsville",
    distanceKm: 4.1,
    mealCapacity: 80,
    hasRefrigeration: false,
    hasHotKitchen: true,
    acceptsCookedFood: true,
    reliabilityScore: 91,
    match: 89,
    note: "Good kitchen fit, smaller capacity",
  },
];

export { supermarkets, ngos };
