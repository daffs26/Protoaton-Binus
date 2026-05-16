export type UserRole = "operations" | "driver" | "marketplace";

export type ShipmentStatus = "in_transit" | "at_risk" | "rerouting" | "delivered";

export type Shipment = {
  id: string;
  code: string;
  product: string;
  origin: string;
  destination: string;
  eta: string;
  freshnessPct: number;
  tempC: number;
  status: ShipmentStatus;
  driver: string;
  vehicle: string;
  riskNote?: string;
};
