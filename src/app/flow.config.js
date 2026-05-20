export const FLOW_STEPS = [
  { id: "landing", label: "Home", note: "Starting point loaded. You can choose a role or jump into the demo." },
  { id: "supermarket", label: "List", note: "Surplus food was listed and tagged for donation." },
  { id: "processing", label: "Process", note: "The app simulated quality checks and prepared safe handoff data." },
  { id: "match", label: "Match", note: "A matching engine paired supply with community demand." },
  { id: "delivery", label: "Deliver", note: "Pickup and route steps were simulated for the driver." },
  { id: "receipt", label: "Confirm", note: "Receipt confirmation was logged for traceability." },
  { id: "impact", label: "Impact", note: "Impact metrics were updated using the latest completed flow." },
];

export const DEFAULT_FLOW_STATE = {
  screen: "landing",
  role: "Judge Preview",
  donationCreated: false,
};

export const FLOW_STORAGE_KEY = "foodbridge.flow.v1";
