import React, { useState } from "react";
import { SEVERITIES, CATEGORIES, SEV_COLOR } from "../data/constants";
import { SeverityBadge } from "../components/Charts";

function AlertsPage({ alerts, dispatch, push }) {
  const [search,    setSearch]    = useState("");
  const [sevFilter, setSevFilter] = useState("ALL");
  const [catFilter, setCatFilter] = useState("ALL");
  const [selected,  setSelected]  = useState(null);

  const filtered = alerts.filter(a => {
    if (sevFilter !== "ALL" && a.severity !== sevFilter) return false;
    if (catFilter !== "ALL" && a.category !== catFilter) return false;
    if (search && !(a.message + a.src + a.dst + a.rule + a.category)
        .toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          placeholder="🔍  Search events, IPs, rules…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sevFilter} onChange={e => setSevFilter(e.target.value)}>
          <option value="ALL">All Severities</option>
          {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="ALL">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          className="btn danger"
          onClick={() => { dispatch({ type: "CLEAR" }); push("All events cleared", "🗑️"); }}
        >
          Clear All
        </button>
        <span style={{ color: "var(--text3)", fontSize: 11, marginLeft: "auto" }}>
          {filtered.length} events
        </span>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ overflowX: "auto" }}>
          <table className="alert-table">
            <thead>
              <tr>
                <th>Time</th><th>Severity</th><th>Category</th>
                <th>Source IP</th><th>Destination</th><th>Rule / Message</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--text3)", padding: 24 }}>
                    No matching events
                  </td>
                </tr>
              )}
              {filtered.slice(0, 100).map(a => (
                <tr key={a.id} className={a.acked ? "acked" : ""} onClick={() => setSelected(a)}>
                  <td style={{ color: "var(--text3)" }}>{a.time}</td>
                  <td><SeverityBadge severity={a.severity} /></td>
                  <td style={{ color: "var(--text2)" }}>{a.category}</td>
                  <td style={{ fontFamily: "var(--font-mono)", color: "var(--red)" }}>{a.src}</td>
                  <td style={{ fontFamily: "var(--font-mono)" }}>{a.dst}</td>
                  <td style={{ color: "var(--text1)" }}>{a.rule}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        className="btn"
                        style={{ fontSize: 10, padding: "2px 8px" }}
                        onClick={() => { dispatch({ type: "ACK", id: a.id }); push("ACK'd", "✅"); }}
                      >
                        ACK
                      </button>
                      <button
                        className="btn danger"
                        style={{ fontSize: 10, padding: "2px 8px" }}
                        onClick={() => { dispatch({ type: "DELETE", id: a.id }); push("Event dismissed", "🗑️"); }}
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              <span>Event Detail</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <SeverityBadge severity={selected.severity} />
            {[
              ["Rule",          selected.rule],
              ["Category",      selected.category],
              ["Time",          selected.time],
              ["Source IP",     selected.src],
              ["Destination",   selected.dst],
              ["Hostname",      selected.hostname],
              ["User",          selected.user],
              ["PID",           selected.pid],
              ["Hit Count",     selected.count],
              ["Acknowledged",  selected.acked ? "Yes" : "No"],
            ].map(([k, v]) => (
              <div className="detail-row" key={k}>
                <span className="detail-key">{k}</span>
                <span className="detail-val">{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>RAW LOG</div>
            <div className="raw-box">{selected.raw}</div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button
                className="btn primary"
                onClick={() => { dispatch({ type: "ACK", id: selected.id }); setSelected(null); push("Acknowledged", "✅"); }}
              >
                Acknowledge
              </button>
              <button
                className="btn danger"
                onClick={() => { dispatch({ type: "DELETE", id: selected.id }); setSelected(null); push("Event dismissed", "🗑️"); }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertsPage;
