import React, { useState } from "react";
import { SeverityBadge } from "../components/Charts";

function AlertsPage({ alerts, dispatch, push }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = alerts.filter((alert) =>
    (alert.message + alert.src + alert.dst + alert.rule + alert.category).toLowerCase().includes(search.toLowerCase())
  );

  const criticalCount = alerts.filter((alert) => alert.severity === "CRITICAL").length;
  const unackedCount = alerts.filter((alert) => !alert.acked).length;

  return (
    <div>
      <div className="page-title">Alerts</div>

      <div className="alerts-toolbar">
        <div className="alerts-total-card">
          <div className="alerts-total-label">Total Events</div>
          <div className="alerts-total-value">{filtered.length}</div>
          <div className="alerts-total-meta">
            <span>{criticalCount} critical</span>
            <span>{unackedCount} unacknowledged</span>
          </div>
        </div>

        <div className="filter-bar">
          <input
            placeholder="Search events, IPs, rules..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            className="btn danger"
            onClick={() => {
              dispatch({ type: "CLEAR" });
              push("All events cleared");
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ overflowX: "auto" }}>
          <table className="alert-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Severity</th>
                <th>Category</th>
                <th>Source IP</th>
                <th>Destination</th>
                <th>Rule</th>
                <th>Actions</th>
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

              {filtered.slice(0, 100).map((alert) => (
                <tr key={alert.id} className={alert.acked ? "acked" : ""} onClick={() => setSelected(alert)}>
                  <td style={{ color: "var(--text3)" }}>{alert.time}</td>
                  <td>
                    <SeverityBadge severity={alert.severity} />
                  </td>
                  <td style={{ color: "var(--text2)" }}>{alert.category}</td>
                  <td style={{ fontFamily: "var(--font-mono)", color: "var(--red)" }}>{alert.src}</td>
                  <td style={{ fontFamily: "var(--font-mono)" }}>{alert.dst}</td>
                  <td style={{ color: "var(--text1)" }}>{alert.rule}</td>
                  <td onClick={(event) => event.stopPropagation()}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="btn"
                        style={{ fontSize: 10, padding: "2px 8px" }}
                        onClick={() => {
                          dispatch({ type: "ACK", id: alert.id });
                          push("Event acknowledged");
                        }}
                      >
                        ACK
                      </button>
                      <button
                        className="btn danger"
                        style={{ fontSize: 10, padding: "2px 8px" }}
                        onClick={() => {
                          dispatch({ type: "DELETE", id: alert.id });
                          push("Event dismissed");
                        }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-title">
              <span>Event Detail</span>
              <button className="modal-close" onClick={() => setSelected(null)}>
                X
              </button>
            </div>

            <SeverityBadge severity={selected.severity} />

            {[
              ["Rule", selected.rule],
              ["Category", selected.category],
              ["Time", selected.time],
              ["Source IP", selected.src],
              ["Destination", selected.dst],
              ["Hostname", selected.hostname],
              ["User", selected.user],
              ["PID", selected.pid],
              ["Hit Count", selected.count],
              ["Acknowledged", selected.acked ? "Yes" : "No"],
            ].map(([key, value]) => (
              <div className="detail-row" key={key}>
                <span className="detail-key">{key}</span>
                <span className="detail-val">{value}</span>
              </div>
            ))}

            <div style={{ marginTop: 12, fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>RAW LOG</div>
            <div className="raw-box">{selected.raw}</div>

            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button
                className="btn primary"
                onClick={() => {
                  dispatch({ type: "ACK", id: selected.id });
                  setSelected(null);
                  push("Event acknowledged");
                }}
              >
                Acknowledge
              </button>
              <button
                className="btn danger"
                onClick={() => {
                  dispatch({ type: "DELETE", id: selected.id });
                  setSelected(null);
                  push("Event dismissed");
                }}
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
