import type { Shipment } from "../types";

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: "1",
    code: "SHP-2048",
    product: "Ikan & Seafood Beku",
    origin: "Cold Hub BSD City",
    destination: "RS Siloam Semanggi",
    eta: "18:42",
    freshnessPct: 72,
    tempC: 6.2,
    status: "at_risk",
    driver: "Budi Santoso",
    vehicle: "Reefer B 1782 XYZ",
    riskNote: "Suhu naik +2.1°C di atas baseline + kemacetan koridor Tol Dalam Kota",
  },
  {
    id: "2",
    code: "SHP-2011",
    product: "Sayur Hidroponik Premium",
    origin: "Agropark Sentul Bogor",
    destination: "DC Alfamart Bekasi Utara",
    eta: "19:05",
    freshnessPct: 91,
    tempC: 4.1,
    status: "in_transit",
    driver: "Siti Aminah",
    vehicle: "Chiller B 9021 ABC",
  },
  {
    id: "3",
    code: "SHP-1993",
    product: "Daging Sapi Segar Grade A",
    origin: "Slaughterhouse Karawang Barat",
    destination: "Hotel Grand Indonesia",
    eta: "17:20",
    freshnessPct: 88,
    tempC: 2.8,
    status: "in_transit",
    driver: "Rizky Pratama",
    vehicle: "Reefer B 4410 DEF",
  },
  {
    id: "4",
    code: "SHP-2051",
    product: "Buah Tropis Mixed (Mangga, Rambutan)",
    origin: "Sentra Buah Indramayu",
    destination: "Pasar Induk Kramat Jati",
    eta: "20:15",
    freshnessPct: 95,
    tempC: 8.0,
    status: "in_transit",
    driver: "Ahmad Fauzi",
    vehicle: "Chiller B 3312 GHI",
  },
  {
    id: "5",
    code: "SHP-2033",
    product: "Susu Pasteurisasi UHT",
    origin: "Dairy Farm Lembang",
    destination: "Hypermart Kelapa Gading",
    eta: "18:55",
    freshnessPct: 83,
    tempC: 5.5,
    status: "at_risk",
    driver: "Dewi Rahayu",
    vehicle: "Reefer B 7760 JKL",
    riskNote: "Fluktuasi suhu tidak stabil karena pintu kontainer dibuka berulang kali",
  },
  {
    id: "6",
    code: "SHP-1987",
    product: "Telur Ayam Kampung Organik",
    origin: "Peternakan Organik Sukabumi",
    destination: "Ranch Market Pondok Indah",
    eta: "16:40",
    freshnessPct: 97,
    tempC: 18.0,
    status: "in_transit",
    driver: "Hendra Wijaya",
    vehicle: "Van Berinsulasi B 5522 MNO",
  },
];

export function getShipment(id: string): Shipment | undefined {
  return MOCK_SHIPMENTS.find((s) => s.id === id);
}

export const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    type: "ai_alert" as const,
    title: "AI Risk Detected — SHP-2048",
    body: "Suhu kabin naik melebihi ambang batas. Reroute direkomendasikan segera.",
    time: "2 mnt lalu",
    unread: true,
    shipmentId: "1",
  },
  {
    id: "n2",
    type: "ai_alert" as const,
    title: "Freshness Warning — SHP-2033",
    body: "Freshness index turun ke 83% akibat fluktuasi suhu. Pantau kondisi kabin.",
    time: "12 mnt lalu",
    unread: true,
    shipmentId: "5",
  },
  {
    id: "n3",
    type: "shipment" as const,
    title: "SHP-2011 On Schedule",
    body: "Sayur hidroponik sedang dalam perjalanan. ETA tetap 19:05. Freshness stabil 91%.",
    time: "25 mnt lalu",
    unread: false,
    shipmentId: "2",
  },
  {
    id: "n4",
    type: "marketplace" as const,
    title: "Slot Reefer Baru Tersedia",
    body: "PT Sejuk Logistik menawarkan 3 slot reefer 8-ton untuk rute Jakarta Selatan.",
    time: "38 mnt lalu",
    unread: false,
  },
  {
    id: "n5",
    type: "shipment" as const,
    title: "SHP-1993 Memasuki Jakarta",
    body: "Daging sapi segar melewati checkpoint Bekasi. ETA dipercepat menjadi 17:15.",
    time: "1 jam lalu",
    unread: false,
    shipmentId: "3",
  },
  {
    id: "n6",
    type: "ai_alert" as const,
    title: "AI Reroute Berhasil — SHP-2048",
    body: "Rute baru diaktifkan via Jl. Gatot Subroto. Estimasi freshness terjaga 78%.",
    time: "1 jam lalu",
    unread: false,
    shipmentId: "1",
  },
  {
    id: "n7",
    type: "marketplace" as const,
    title: "Booking Dikonfirmasi",
    body: "Cold Hub Cipinang mengkonfirmasi ketersediaan penyimpanan darurat untuk SHP-2048.",
    time: "2 jam lalu",
    unread: false,
  },
  {
    id: "n8",
    type: "shipment" as const,
    title: "SHP-2051 Meninggalkan Gudang",
    body: "Buah tropis mixed berangkat dari Indramayu pukul 15:30.",
    time: "3 jam lalu",
    unread: false,
    shipmentId: "4",
  },
];

export const MOCK_HISTORY = [
  {
    id: "h1",
    code: "SHP-2040",
    product: "Ayam Potong Segar",
    date: "15 Mei 2026",
    origin: "RPH Cikande",
    destination: "Hotel Mulia Jakarta",
    result: "saved" as const,
    finalFreshness: 84,
    rerouted: true,
    duration: "4j 12m",
  },
  {
    id: "h2",
    code: "SHP-2037",
    product: "Sayur Organik Campur",
    date: "15 Mei 2026",
    origin: "Farm Cibodas",
    destination: "Superindo Sudirman",
    result: "success" as const,
    finalFreshness: 96,
    rerouted: false,
    duration: "3j 45m",
  },
  {
    id: "h3",
    code: "SHP-2031",
    product: "Ikan Tuna Segar",
    date: "14 Mei 2026",
    origin: "TPI Muara Baru",
    destination: "Restoran Japfa Bogor",
    result: "success" as const,
    finalFreshness: 91,
    rerouted: false,
    duration: "5j 20m",
  },
  {
    id: "h4",
    code: "SHP-2028",
    product: "Buah Impor (Anggur Chile)",
    date: "14 Mei 2026",
    origin: "Bandara Soetta Cargo",
    destination: "Cold Store Cipinang",
    result: "saved" as const,
    finalFreshness: 79,
    rerouted: true,
    duration: "2j 05m",
  },
  {
    id: "h5",
    code: "SHP-2022",
    product: "Daging Beku Import",
    date: "13 Mei 2026",
    origin: "Pelabuhan Tanjung Priok",
    destination: "Wholesaler Tangerang",
    result: "at_risk" as const,
    finalFreshness: 61,
    rerouted: false,
    duration: "6j 40m",
  },
  {
    id: "h6",
    code: "SHP-2019",
    product: "Susu Segar Murni",
    date: "12 Mei 2026",
    origin: "Koperasi Susu Boyolali",
    destination: "Indomaret DC Depok",
    result: "success" as const,
    finalFreshness: 93,
    rerouted: false,
    duration: "8j 15m",
  },
];

export const MOCK_FLEET = [
  {
    id: "f1",
    company: "PT Sejuk Ekspres Nusantara",
    type: "Reefer Truck 8-Ton",
    rating: 4.9,
    eta: "18 mnt",
    pricePerKm: 4200,
    available: 2,
    tempRange: "-5°C s/d +8°C",
    badge: "AI Recommended",
  },
  {
    id: "f2",
    company: "CV Dinar Logistics",
    type: "Chiller Van 3-Ton",
    rating: 4.7,
    eta: "26 mnt",
    pricePerKm: 3100,
    available: 1,
    tempRange: "0°C s/d +12°C",
    badge: "Nearby",
  },
  {
    id: "f3",
    company: "Kargo Dingin Indonesia",
    type: "Reefer Container 20ft",
    rating: 4.8,
    eta: "35 mnt",
    pricePerKm: 6500,
    available: 3,
    tempRange: "-18°C s/d +5°C",
    badge: null,
  },
  {
    id: "f4",
    company: "PT Rapidcool Transportasi",
    type: "Refrigerated Bike (Urban Last-mile)",
    rating: 4.6,
    eta: "8 mnt",
    pricePerKm: 1800,
    available: 5,
    tempRange: "+2°C s/d +10°C",
    badge: "Fastest",
  },
];

export const MOCK_COLD_HUBS = [
  {
    id: "ch1",
    name: "Cold Hub Cipinang",
    address: "Pasar Induk Cipinang, Jakarta Timur",
    distance: "4.2 km",
    capacity: "120 Ton",
    available: "28 Ton",
    minTemp: -20,
  },
  {
    id: "ch2",
    name: "Coldstore Mangga Dua",
    address: "Jl. Mangga Dua Raya, Jakarta Utara",
    distance: "7.1 km",
    capacity: "80 Ton",
    available: "12 Ton",
    minTemp: -18,
  },
  {
    id: "ch3",
    name: "Cold Hub BSD",
    address: "Kawasan Industri BSD, Tangerang Selatan",
    distance: "11.8 km",
    capacity: "200 Ton",
    available: "65 Ton",
    minTemp: -25,
  },
];

export const MOCK_ANALYTICS = {
  otif7d: 96.4,
  freshnessSuccess: 91,
  rerouteSuccess: 74,
  freshnessSaved: 27,
  totalShipments: 142,
  aiAlerts: 38,
  barData: [82, 88, 79, 91, 94, 96, 91],
  barLabels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
  lineData: [70, 74, 80, 84, 88, 91, 94],
};

export const MOCK_HEATMAP_ZONES = [
  { id: "z1", name: "Jakarta Selatan", demand: "high", risk: "medium", x: 45, y: 55 },
  { id: "z2", name: "Jakarta Pusat", demand: "critical", risk: "high", x: 50, y: 42 },
  { id: "z3", name: "Jakarta Utara", demand: "medium", risk: "low", x: 52, y: 28 },
  { id: "z4", name: "Bekasi", demand: "high", risk: "medium", x: 72, y: 45 },
  { id: "z5", name: "Depok", demand: "medium", risk: "low", x: 44, y: 70 },
  { id: "z6", name: "Tangerang", demand: "high", risk: "low", x: 28, y: 46 },
  { id: "z7", name: "Bogor", demand: "low", risk: "low", x: 38, y: 85 },
  { id: "z8", name: "Karawang", demand: "medium", risk: "medium", x: 88, y: 40 },
];

export type DriverStatus = "on_duty" | "available";

export type Driver = {
  id: string;
  name: string;
  vehicle: string;
  vehicleType: string;
  phone: string;
  rating: number;
  totalTrips: number;
  status: DriverStatus;
  currentShipmentId?: string;
  otifPct: number;
  avgFreshness: number;
};

export const MOCK_DRIVERS: Driver[] = [
  {
    id: "d1",
    name: "Budi Santoso",
    vehicle: "Reefer B 1782 XYZ",
    vehicleType: "Reefer Truck 8-Ton",
    phone: "0812-3456-7890",
    rating: 4.9,
    totalTrips: 142,
    status: "on_duty",
    currentShipmentId: "1",
    otifPct: 97,
    avgFreshness: 89,
  },
  {
    id: "d2",
    name: "Siti Aminah",
    vehicle: "Chiller B 9021 ABC",
    vehicleType: "Chiller Van 3-Ton",
    phone: "0813-2345-6789",
    rating: 4.7,
    totalTrips: 98,
    status: "on_duty",
    currentShipmentId: "2",
    otifPct: 94,
    avgFreshness: 91,
  },
  {
    id: "d3",
    name: "Rizky Pratama",
    vehicle: "Reefer B 4410 DEF",
    vehicleType: "Reefer Truck 8-Ton",
    phone: "0814-3456-7890",
    rating: 4.8,
    totalTrips: 115,
    status: "on_duty",
    currentShipmentId: "3",
    otifPct: 96,
    avgFreshness: 88,
  },
  {
    id: "d4",
    name: "Ahmad Fauzi",
    vehicle: "Chiller B 3312 GHI",
    vehicleType: "Chiller Van 3-Ton",
    phone: "0815-4567-8901",
    rating: 4.6,
    totalTrips: 76,
    status: "on_duty",
    currentShipmentId: "4",
    otifPct: 92,
    avgFreshness: 86,
  },
  {
    id: "d5",
    name: "Dewi Rahayu",
    vehicle: "Reefer B 7760 JKL",
    vehicleType: "Reefer Truck 8-Ton",
    phone: "0816-5678-9012",
    rating: 4.8,
    totalTrips: 131,
    status: "on_duty",
    currentShipmentId: "5",
    otifPct: 95,
    avgFreshness: 87,
  },
  {
    id: "d6",
    name: "Hendra Wijaya",
    vehicle: "Van Berinsulasi B 5522 MNO",
    vehicleType: "Insulated Van",
    phone: "0817-6789-0123",
    rating: 4.7,
    totalTrips: 89,
    status: "available",
    otifPct: 93,
    avgFreshness: 92,
  },
  {
    id: "d7",
    name: "Eko Prasetyo",
    vehicle: "Reefer B 2231 PQR",
    vehicleType: "Reefer Truck 8-Ton",
    phone: "0818-7890-1234",
    rating: 4.9,
    totalTrips: 203,
    status: "available",
    otifPct: 98,
    avgFreshness: 93,
  },
  {
    id: "d8",
    name: "Rina Susanti",
    vehicle: "Chiller B 6643 STU",
    vehicleType: "Chiller Van 3-Ton",
    phone: "0819-8901-2345",
    rating: 4.6,
    totalTrips: 54,
    status: "available",
    otifPct: 91,
    avgFreshness: 90,
  },
];

export type RequestStatus = "pending" | "approved" | "rejected";

export type MarketplaceRequest = {
  id: string;
  requester: string;           // Nama marketplace partner
  cargo: string[];             // Jenis kargo
  cargoEmoji: string[];
  weight: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  tempC: string;
  notes: string;
  status: RequestStatus;
  submittedAt: string;
  zoneId?: string;             // Dari heatmap zone jika ada
};

export const MOCK_MARKETPLACE_REQUESTS: MarketplaceRequest[] = [
  {
    id: "req-1",
    requester: "Superindo Sudirman",
    cargo: ["Sayur", "Buah"],
    cargoEmoji: ["🥬", "🍑"],
    weight: "320",
    origin: "Farm Organik Cibodas",
    destination: "Superindo Sudirman, Jakarta",
    date: "2026-05-18",
    time: "06:00",
    tempC: "4",
    notes: "Tolong pastikan suhu stabil, produk premium.",
    status: "pending",
    submittedAt: "2026-05-17 10:24",
    zoneId: "z2",
  },
  {
    id: "req-2",
    requester: "RS Siloam Semanggi",
    cargo: ["Daging"],
    cargoEmoji: ["🥩"],
    weight: "150",
    origin: "Cold Hub BSD City",
    destination: "RS Siloam Semanggi",
    date: "2026-05-18",
    time: "08:30",
    tempC: "2",
    notes: "Untuk kebutuhan dapur RS, prioritas tinggi.",
    status: "approved",
    submittedAt: "2026-05-17 09:05",
    zoneId: "z2",
  },
  {
    id: "req-3",
    requester: "PT Sejuk Ekspres",
    cargo: ["Seafood"],
    cargoEmoji: ["🐟"],
    weight: "800",
    origin: "Pelabuhan Muara Baru",
    destination: "Pasar Swalayan Kelapa Gading",
    date: "2026-05-19",
    time: "05:00",
    tempC: "-2",
    notes: "Ikan segar, harus tiba sebelum toko buka.",
    status: "pending",
    submittedAt: "2026-05-17 11:50",
    zoneId: "z3",
  },
];
