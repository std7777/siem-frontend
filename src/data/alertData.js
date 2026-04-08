import { uid, now, rand, randInt } from "./utils";
import { SEVERITIES, CATEGORIES, IPS, EXT_IPS } from "./constants";

// ─── Alert Factory ────────────────────────────────────────────────────────────
export function makeAlert(overrides = {}) {
  const sev = overrides.severity || rand(SEVERITIES);
  const cat = overrides.category || rand(CATEGORIES);
  return {
    id:       uid(),
    time:     now(),
    severity: sev,
    category: cat,
    src:      overrides.src || rand(EXT_IPS) + randInt(1, 254),
    dst:      overrides.dst || rand(IPS)     + randInt(1, 254),
    rule:     overrides.rule    || `${cat} Detection Rule #${randInt(1000, 9999)}`,
    message:  overrides.message || `${cat} activity detected from external source`,
    count:    randInt(1, 99),
    acked:    false,
    raw:      overrides.raw || `GET /admin HTTP/1.1 | User-Agent: ${rand(["curl/7.8", "python-requests", "Nikto/2.1", "Nmap NSE"])}`,
    hostname: `host-${randInt(10, 99)}.internal`,
    user:     rand(["admin", "root", "service_acct", "jdoe", "backup_usr", "SYSTEM"]),
    pid:      randInt(1000, 65535),
    ...overrides,
  };
}

// ─── Alert Reducer ────────────────────────────────────────────────────────────
export const initialAlerts = [];

export function alertReducer(state, action) {
  switch (action.type) {
    case "ADD":    return [action.payload, ...state].slice(0, 500);
    case "CLEAR":  return [];
    case "ACK":    return state.map(a => a.id === action.id ? { ...a, acked: true } : a);
    case "DELETE": return state.filter(a => a.id !== action.id);
    default:       return state;
  }
}
