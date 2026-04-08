import React, { useState } from "react";

const IOCS = [
  { type: "IP",     val: "185.220.101.47",    threat: "Tor Exit Node",        conf: 97 },
  { type: "IP",     val: "91.108.56.130",     threat: "C2 Server",            conf: 89 },
  { type: "Domain", val: "evil-corp.ru",      threat: "Phishing Host",        conf: 94 },
  { type: "Hash",   val: "a1b2c3d4e5f6…",    threat: "WannaCry Variant",     conf: 99 },
  { type: "URL",    val: "/wp-admin/load.php",threat: "Webshell Path",        conf: 72 },
  { type: "IP",     val: "198.51.100.23",     threat: "Port Scanner",         conf: 81 },
  { type: "Domain", val: "update-secure.net", threat: "Malware C2",           conf: 88 },
  { type: "Hash",   val: "deadbeef1234…",     threat: "Ransomware Payload",   conf: 95 },
];

const MITRE = [
  { id: "T1110", name: "Brute Force",               tactic: "Credential Access", seen: true  },
  { id: "T1190", name: "Exploit Public-Facing App",  tactic: "Initial Access",   seen: true  },
  { id: "T1486", name: "Data Encrypted for Impact",  tactic: "Impact",           seen: true  },
  { id: "T1046", name: "Network Service Scan",        tactic: "Discovery",        seen: true  },
  { id: "T1550", name: "Use Alternate Auth",          tactic: "Lateral Movement", seen: false },
  { id: "T1041", name: "Exfil over C2 Channel",      tactic: "Exfiltration",     seen: false },
];

const FEEDS = [
  { name: "AlienVault OTX",   status: "active", last: "2 min ago",  count: 12453 },
  { name: "Emerging Threats", status: "active", last: "15 min ago", count: 8901  },
  { name: "Abuse.ch",         status: "active", last: "1 hr ago",   count: 5432  },
  { name: "Shodan Monitor",   status: "error",  last: "3 hr ago",   count: 0     },
  { name: "VirusTotal Feed",  status: "active", last: "5 min ago",  count: 3210  },
];

function ThreatIntelPage() {
  const [tab, setTab] = useState("ioc");

  return (
    <div>
      {/* Tabs */}
      <div className="tabs">
        {[["ioc", "IOC Database"], ["mitre", "MITRE ATT&CK"], ["feeds", "Threat Feeds"]].map(([id, label]) => (
          <button key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {/* IOC Table */}
      {tab === "ioc" && (
        <div className="card" style={{ padding: 0 }}>
          <table className="alert-table">
            <thead>
              <tr><th>Type</th><th>Indicator</th><th>Threat</th><th>Confidence</th></tr>
            </thead>
            <tbody>
              {IOCS.map((ioc, idx) => (
                <tr key={idx}>
                  <td>
                    <span style={{ background: "var(--bg3)", color: "var(--accent2)", padding: "1px 6px", borderRadius: 4, fontSize: 10 }}>
                      {ioc.type}
                    </span>
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)", color: "var(--text1)" }}>{ioc.val}</td>
                  <td style={{ color: "var(--text2)" }}>{ioc.threat}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 60, background: "var(--bg3)", height: 5, borderRadius: 3 }}>
                        <div style={{
                          width:      `${ioc.conf}%`,
                          height:     "100%",
                          background: ioc.conf > 90 ? "#ef4444" : ioc.conf > 75 ? "#f97316" : "#eab308",
                          borderRadius: 3,
                        }} />
                      </div>
                      <span style={{ fontSize: 10, color: "var(--text3)" }}>{ioc.conf}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MITRE ATT&CK */}
      {tab === "mitre" && (
        <div className="grid-2">
          {MITRE.map(m => (
            <div key={m.id} className="rule-card">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.seen ? "#ef4444" : "var(--bg3)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700, color: m.seen ? "var(--text1)" : "var(--text3)" }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>{m.id} · {m.tactic}</div>
              </div>
              {m.seen && (
                <span style={{ fontSize: 10, color: "#ef4444", background: "#3f1515", padding: "2px 6px", borderRadius: 4 }}>
                  OBSERVED
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Threat Feeds */}
      {tab === "feeds" && (
        <div>
          {FEEDS.map((f, i) => (
            <div key={i} className="rule-card">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.status === "active" ? "#22c55e" : "#ef4444" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700, color: "var(--text1)" }}>{f.name}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
                  Last sync: {f.last} · {f.count.toLocaleString()} indicators
                </div>
              </div>
              <span style={{ fontSize: 10, color: f.status === "active" ? "#22c55e" : "#ef4444" }}>
                {f.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThreatIntelPage;
