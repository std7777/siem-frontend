import React, { useState } from "react";

const IOCS = [
  { type: "IP", val: "185.220.101.47", threat: "Tor Exit Node", conf: 97 },
  { type: "IP", val: "91.108.56.130", threat: "C2 Server", conf: 89 },
  { type: "Domain", val: "evil-corp.ru", threat: "Phishing Host", conf: 94 },
  { type: "Hash", val: "a1b2c3d4e5f6...", threat: "WannaCry Variant", conf: 99 },
  { type: "URL", val: "/wp-admin/load.php", threat: "Webshell Path", conf: 72 },
  { type: "Domain", val: "update-secure.net", threat: "Malware C2", conf: 88 },
  { type: "Hash", val: "deadbeef1234...", threat: "Ransomware Payload", conf: 95 },
];

const MITRE = [
  { id: "T1110", name: "Brute Force", tactic: "Credential Access", seen: true },
  { id: "T1190", name: "Exploit Public-Facing App", tactic: "Initial Access", seen: true },
  { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact", seen: true },
  { id: "T1046", name: "Network Service Scan", tactic: "Discovery", seen: true },
  { id: "T1550", name: "Use Alternate Auth", tactic: "Lateral Movement", seen: false },
  { id: "T1041", name: "Exfil over C2 Channel", tactic: "Exfiltration", seen: false },
];

const FEEDS = [
  { name: "AlienVault OTX", status: "active", last: "2 min ago", count: 12453 },
  { name: "Abuse.ch", status: "active", last: "1 hr ago", count: 5432 },
  { name: "Shodan Monitor", status: "error", last: "3 hr ago", count: 0 },
  { name: "VirusTotal Feed", status: "active", last: "5 min ago", count: 3210 },
];

const REPORTS = [
  { title: "Daily Threat Summary", date: "Today, 06:00", type: "Automated", size: "124 KB" },
  { title: "Brute Force Incident Report", date: "Yesterday", type: "Manual", size: "87 KB" },
  { title: "Weekly Executive Summary", date: "Mar 24, 2026", type: "Automated", size: "341 KB" },
  { title: "Compliance Audit - PCI DSS", date: "Mar 20, 2026", type: "Compliance", size: "2.1 MB" },
  { title: "Vulnerability Scan Report", date: "Mar 15, 2026", type: "Automated", size: "567 KB" },
];

function ThreatIntelPage() {
  const [tab, setTab] = useState("ioc");

  return (
    <div>
      <div className="page-title">Threat Intel</div>
      <div className="tabs">
        {[
          ["ioc", "IOC Database"],
          ["mitre", "MITRE ATT&CK"],
          ["feeds", "Threat Feeds"],
        ].map(([id, label]) => (
          <button key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "ioc" && (
        <div className="card" style={{ padding: 0 }}>
          <table className="alert-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Indicator</th>
                <th>Threat</th>
                <th>Confidence</th>
              </tr>
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
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: ioc.conf > 90 ? "#ef4444" : ioc.conf > 75 ? "#f97316" : "#eab308",
                      }}
                    >
                      {ioc.conf}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "mitre" && (
        <div className="grid-2">
          {MITRE.map((item) => (
            <div key={item.id} className="rule-card">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.seen ? "#ef4444" : "var(--bg3)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700, color: item.seen ? "var(--text1)" : "var(--text3)" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
                  {item.id} - {item.tactic}
                </div>
              </div>
              {item.seen && (
                <span style={{ fontSize: 10, color: "#ef4444", background: "#3f1515", padding: "2px 6px", borderRadius: 4 }}>OBSERVED</span>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "feeds" && (
        <div>
          {FEEDS.map((feed, index) => (
            <div key={index} className="rule-card">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: feed.status === "active" ? "#22c55e" : "#ef4444" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700, color: "var(--text1)" }}>{feed.name}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
                  Last sync: {feed.last} - {feed.count.toLocaleString()} indicators
                </div>
              </div>
              <span style={{ fontSize: 10, color: feed.status === "active" ? "#22c55e" : "#ef4444" }}>{feed.status.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}

        <div className="card-title" style={{ marginTop: 16, marginLeft:7}}>Report History</div>
      <div className="card" style={{ padding:0 }}>
        <table className="alert-table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Date</th>
              <th>Type</th>
              <th>Size</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {REPORTS.map((report, index) => (
              <tr key={index}>
                <td style={{ color: "var(--text1)", fontWeight: 600 }}>{report.title}</td>
                <td style={{ color: "var(--text3)" }}>{report.date}</td>
                <td>
                  <span className="report-type-pill">{report.type}</span>
                </td>
                <td style={{ color: "var(--text3)" }}>{report.size}</td>
                <td>
                  <button className="btn" style={{ fontSize: 10, padding: "2px 8px" }}>
                    Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ThreatIntelPage;
