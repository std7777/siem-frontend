// ─── Severity Config ──────────────────────────────────────────────────────────
export const SEVERITIES = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"];

export const SEV_COLOR = {
  CRITICAL: "#ef4444",
  HIGH:     "#f97316",
  MEDIUM:   "#eab308",
  LOW:      "#22c55e",
  INFO:     "#3b82f6",
};

export const SEV_BG = {
  CRITICAL: "#3f1515",
  HIGH:     "#3f1f0a",
  MEDIUM:   "#3f3100",
  LOW:      "#0f2f0f",
  INFO:     "#0a1f3f",
};

// ─── Event Categories ─────────────────────────────────────────────────────────
export const CATEGORIES = [
  "Intrusion", "Malware", "Brute Force", "Data Exfil",
  "Privilege Esc.", "Lateral Move.", "Recon", "DDoS", "Phishing", "Ransomware",
];

// ─── IP Ranges ────────────────────────────────────────────────────────────────
export const IPS     = ["192.168.1.", "10.0.0.", "172.16.0.", "203.0.113."];
export const EXT_IPS = ["45.33.32.", "185.220.101.", "198.51.100.", "91.108.56."];

// ─── Navigation Pages ─────────────────────────────────────────────────────────
export const PAGES = [
  { id: "dashboard",  label: "Dashboard",      icon: "◈" },
  { id: "alerts",     label: "Alerts",         icon: "⚠" },
  { id: "network",    label: "Network",         icon: "⬡" },
  { id: "rules",      label: "Detection Rules", icon: "⚙" },
  { id: "intel",      label: "Threat Intel",   icon: "🛡" },
  { id: "simulator",  label: "Attack Sim",     icon: "⚡" },
  { id: "reports",    label: "Reports",        icon: "📋" },
];
