import { uid, now, rand, randInt, categoryKey } from "./utils";
import { SEVERITIES, CATEGORIES, IPS, EXT_IPS } from "./constants";

function getCandidateRules(rules, overrides = {}) {
  const enabledRules = (rules || []).filter((rule) => rule.on);

  if (!enabledRules.length) {
    return [];
  }

  if (overrides.ruleId != null) {
    return enabledRules.filter((rule) => rule.id === overrides.ruleId);
  }

  if (overrides.rule) {
    const exactRuleMatch = enabledRules.filter((rule) => rule.name === overrides.rule);
    if (exactRuleMatch.length > 0) {
      return exactRuleMatch;
    }
  }

  if (overrides.category) {
    const alertCategory = categoryKey(overrides.category);
    const categoryMatches = enabledRules.filter((rule) => categoryKey(rule.cat) === alertCategory);
    if (categoryMatches.length > 0) {
      return categoryMatches;
    }
  }

  return enabledRules;
}

function resolveRule(rules, overrides = {}) {
  const candidateRules = getCandidateRules(rules, overrides);
  return candidateRules.length > 0 ? rand(candidateRules) : null;
}

export function makeAlert(overrides = {}, rules = []) {
  const matchedRule = resolveRule(rules, overrides);
  const severity = overrides.severity || matchedRule?.sev || rand(SEVERITIES);
  const category = overrides.category || matchedRule?.cat || rand(CATEGORIES);

  return {
    id: uid(),
    time: now(),
    severity,
    category,
    ruleId: matchedRule?.id ?? overrides.ruleId ?? null,
    src: overrides.src || rand(EXT_IPS) + randInt(1, 254),
    dst: overrides.dst || rand(IPS) + randInt(1, 254),
    rule: overrides.rule || matchedRule?.name || `${category} Detection Rule #${randInt(1000, 9999)}`,
    message: overrides.message || `${category} activity detected from external source`,
    count: randInt(1, 99),
    acked: false,
    raw: overrides.raw || `GET /admin HTTP/1.1 | User-Agent: ${rand(["curl/7.8", "python-requests", "Nikto/2.1", "Nmap NSE"])}`,
    hostname: `host-${randInt(10, 99)}.internal`,
    user: rand(["admin", "root", "service_acct", "jdoe", "backup_usr", "SYSTEM"]),
    pid: randInt(1000, 65535),
    ...overrides,
  };
}

export const initialAlerts = [];

export function alertReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state].slice(0, 500);
    case "CLEAR":
      return [];
    case "ACK":
      return state.map((alert) => (alert.id === action.id ? { ...alert, acked: true } : alert));
    case "DELETE":
      return state.filter((alert) => alert.id !== action.id);
    default:
      return state;
  }
}
