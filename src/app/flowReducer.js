import { DEFAULT_FLOW_STATE, FLOW_STORAGE_KEY } from "@/app/flow.config";

function sanitizeState(raw) {
  if (!raw || typeof raw !== "object") return DEFAULT_FLOW_STATE;

  return {
    screen: typeof raw.screen === "string" ? raw.screen : DEFAULT_FLOW_STATE.screen,
    role: typeof raw.role === "string" ? raw.role : DEFAULT_FLOW_STATE.role,
    donationCreated: Boolean(raw.donationCreated),
  };
}

export function loadFlowState() {
  try {
    const saved = window.localStorage.getItem(FLOW_STORAGE_KEY);
    if (!saved) return DEFAULT_FLOW_STATE;
    return sanitizeState(JSON.parse(saved));
  } catch {
    return DEFAULT_FLOW_STATE;
  }
}

export function flowReducer(state, action) {
  switch (action.type) {
    case "NAVIGATE":
      return {
        ...state,
        screen: action.screen,
        role: action.role ?? state.role,
      };
    case "SET_ROLE":
      return { ...state, role: action.role };
    case "SET_DONATION_CREATED":
      return { ...state, donationCreated: Boolean(action.value) };
    case "GO_BACK": {
      const history = action.history ?? [];
      const previous = history[history.length - 2];
      if (!previous) return state;
      return { ...state, screen: previous };
    }
    case "RESTART":
      return DEFAULT_FLOW_STATE;
    default:
      return state;
  }
}

export function persistFlowState(state) {
  try {
    window.localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Best-effort save only.
  }
}
