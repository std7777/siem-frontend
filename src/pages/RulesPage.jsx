import React, { useState } from "react";
import { SeverityBadge } from "../components/Charts";

const DEFAULT_RULES = [
  { id: 1,  name: "SSH Brute Force Detection",     cat: "Brute Force",   sev: "HIGH",     on: true,  hits: 341 },
  { id: 2,  name: "SQL Injection Pattern",          cat: "Intrusion",     sev: "CRITICAL", on: true,  hits: 89  },
  { id: 3,  name: "Mass File Encryption",           cat: "Ransomware",    sev: "CRITICAL", on: true,  hits: 4   },
  { id: 4,  name: "Port Scan SYN Flood",            cat: "Recon",         sev: "MEDIUM",   on: true,  hits: 213 },
  { id: 5,  name: "NTLM Hash Reuse",                cat: "Lateral Move.", sev: "CRITICAL", on: false, hits: 12  },
  { id: 6,  name: "Volumetric DDoS",                cat: "DDoS",          sev: "HIGH",     on: true,  hits: 67  },
  { id: 7,  name: "Suspicious Macro Execution",     cat: "Malware",       sev: "HIGH",     on: true,  hits: 31  },
  { id: 8,  name: "Outbound Large Data Transfer",   cat: "Data Exfil",    sev: "HIGH",     on: false, hits: 8   },
  { id: 9,  name: "Privilege Escalation via Token", cat: "Privilege Esc", sev: "CRITICAL", on: true,  hits: 19  },
  { id: 10, name: "DNS Tunneling",                  cat: "Data Exfil",    sev: "MEDIUM",   on: true,  hits: 55  },
  { id: 11, name: "Credential Store Access",        cat: "Malware",       sev: "HIGH",     on: true,  hits: 26  },
  { id: 12, name: "Beaconing Behaviour",            cat: "Malware",       sev: "MEDIUM",   on: false, hits: 144 },
];

function RulesPage({ push }) {
  const [rules, setRules] = useState(DEFAULT_RULES);

  const toggle = (id) => {
    setRules(r => r.map(x => x.id === id ? { ...x, on: !x.on } : x));
    push("Rule updated", "⚙️");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "var(--text2)", fontSize: 12 }}>
          {rules.filter(r => r.on).length} / {rules.length} rules enabled
        </span>
        <button className="btn primary" onClick={() => push("New rule editor — coming soon", "✨")}>
          + New Rule
        </button>
      </div>

      {rules.map(r => (
        <div className="rule-card" key={r.id}>
          <div
            className={`rule-toggle ${r.on ? "on" : ""}`}
            onClick={() => toggle(r.id)}
          />
          <div style={{ flex: 1 }}>
            <div style={{ color: "var(--text1)", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-head)" }}>
              {r.name}
            </div>
            <div style={{ color: "var(--text3)", fontSize: 10, marginTop: 2 }}>
              {r.cat} · {r.hits} hits
            </div>
          </div>
          <SeverityBadge severity={r.sev} />
        </div>
      ))}
    </div>
  );
}

export default RulesPage;
