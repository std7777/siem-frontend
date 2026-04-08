import React from "react";
import { randInt } from "../data/utils";
import { MiniBar } from "../components/Charts";

const REPORTS = [
  { title: "Daily Threat Summary", date: "Today, 06:00", type: "Automated", size: "124 KB" },
  { title: "Brute Force Incident Report", date: "Yesterday", type: "Manual", size: "87 KB" },
  { title: "Weekly Executive Summary", date: "Mar 24, 2026", type: "Automated", size: "341 KB" },
  { title: "Compliance Audit - PCI DSS", date: "Mar 20, 2026", type: "Compliance", size: "2.1 MB" },
  { title: "Vulnerability Scan Report", date: "Mar 15, 2026", type: "Automated", size: "567 KB" },
];

const SLA_METRICS = [
  { label: "Mean Time to Detect", val: "4m 23s", good: true },
  { label: "Mean Time to Respond", val: "18m 07s", good: true },
  { label: "Alert Fatigue Rate", val: "32%", good: false },
  { label: "False Positive Rate", val: "8.4%", good: true },
];

function ReportsPage() {
  const heatData = Array.from({ length: 24 }, () => randInt(0, 100));
  const maxH = Math.max(...heatData);

  const heatColor = (v) => {
    const pct = v / maxH;
    if (pct < 0.2) return "var(--bg3)";
    if (pct < 0.5) return "#3b82f640";
    if (pct < 0.75) return "#f9731680";
    return "#ef444480";
  };

  const freqData = Array.from({ length: 12 }, (_, i) => ({
    label: `${i * 2}h`,
    val: randInt(2, 30),
  }));

  return (
    <div>
      <div className="page-title">Reports</div>
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Alert Heatmap (24h)</div>
          <div style={{ marginBottom: 6, fontSize: 10, color: "var(--text3)" }}>Hourly event density - today</div>
          <div className="heatmap">
            {heatData.map((v, i) => (
              <div key={i} className="hm-cell" style={{ background: heatColor(v) }} title={`${i}:00 - ${v} events`} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "var(--text3)" }}>
            <span>00:00</span>
            <span>12:00</span>
            <span>23:00</span>
          </div>
        </div>

        <div className="card">
          <div className="card-title">SLA Metrics</div>
          {SLA_METRICS.map((m) => (
            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12 }}>
              <span style={{ color: "var(--text2)" }}>{m.label}</span>
              <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, color: m.good ? "#22c55e" : "#f97316" }}>{m.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Event Volume (Last 24h)</div>
        <MiniBar data={freqData} colors={["#7c3aed"]} />
      </div>

      <div className="card">
        <div className="card-title">Report History</div>
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
            {REPORTS.map((r, i) => (
              <tr key={i}>
                <td style={{ color: "var(--text1)", fontWeight: 600 }}>{r.title}</td>
                <td style={{ color: "var(--text3)" }}>{r.date}</td>
                <td>
                  <span style={{ fontSize: 10, background: "var(--bg3)", color: "var(--text2)", padding: "2px 6px", borderRadius: 4 }}>{r.type}</span>
                </td>
                <td style={{ color: "var(--text3)" }}>{r.size}</td>
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

export default ReportsPage;
