import React from "react";
import { SEVERITIES, CATEGORIES, SEV_COLOR } from "../data/constants";
import { randInt } from "../data/utils";
import { SeverityBadge, SparkLine, MiniBar, DonutChart } from "../components/Charts";

function Dashboard({ alerts, dispatch, push }) {
  const crit    = alerts.filter(a => a.severity === "CRITICAL").length;
  const unacked = alerts.filter(a => !a.acked).length;
  const recent  = alerts.slice(0, 6);

  const catCounts = CATEGORIES.slice(0, 5).map(c => ({
    label: c.slice(0, 6),
    val:   alerts.filter(a => a.category === c).length,
  }));

  const sevData = SEVERITIES.map(s => ({
    label: s.slice(0, 4),
    val:   alerts.filter(a => a.severity === s).length,
    color: SEV_COLOR[s],
  }));

  const sparkData = Array.from({ length: 12 }, (_, i) =>
    alerts.filter(a => a.id % 12 === i).length || randInt(0, 5)
  );

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid-4">
        <div className="stat">
          <div className="stat-label">Total Events</div>
          <div className="stat-val">{alerts.length}</div>
          <SparkLine values={sparkData} />
        </div>
        <div className="stat">
          <div className="stat-label">Critical</div>
          <div className="stat-val" style={{ color: "#ef4444" }}>{crit}</div>
          <div className="stat-sub">Require immediate action</div>
        </div>
        <div className="stat">
          <div className="stat-label">Unacknowledged</div>
          <div className="stat-val" style={{ color: "#f97316" }}>{unacked}</div>
          <div className="stat-sub">Pending analyst review</div>
        </div>
        <div className="stat">
          <div className="stat-label">Rules Active</div>
          <div className="stat-val" style={{ color: "#22c55e" }}>48</div>
          <div className="stat-sub">3 triggered today</div>
        </div>
      </div>

      {/* Live Feed + Donut */}
      <div className="grid-3">
        <div className="card" style={{ gridColumn: "span 2" }}>
          <div className="card-title">📡 Live Event Feed</div>
          <div style={{ maxHeight: 260, overflowY: "auto" }}>
            {recent.length === 0 && (
              <div style={{ color: "var(--text3)", fontSize: 12, padding: "20px 0", textAlign: "center" }}>
                No events yet — simulate an attack below
              </div>
            )}
            {recent.map(a => (
              <div key={a.id} className="feed-item">
                <div className="feed-dot" style={{ background: SEV_COLOR[a.severity] }} />
                <div style={{ flex: 1 }}>
                  <span style={{ color: "var(--text3)", fontSize: 10, marginRight: 8 }}>{a.time}</span>
                  <SeverityBadge severity={a.severity} />
                  <span style={{ marginLeft: 8, color: "var(--text1)" }}>{a.message}</span>
                </div>
                <button
                  className="btn"
                  style={{ fontSize: 10, padding: "2px 8px" }}
                  onClick={() => { dispatch({ type: "ACK", id: a.id }); push("Event acknowledged", "✅"); }}
                >
                  ACK
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">📊 By Severity</div>
          <div className="donut-wrap">
            <DonutChart data={sevData} size={100} />
            <div className="donut-legend">
              {sevData.map(d => (
                <div key={d.label} className="legend-item">
                  <div className="legend-dot" style={{ background: d.color }} />
                  <span style={{ color: "var(--text2)" }}>{d.label}</span>
                  <span style={{ marginLeft: "auto", color: "var(--text1)", fontWeight: 600 }}>{d.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">📂 Top Categories</div>
          <MiniBar
            data={catCounts}
            colors={["#7c3aed", "#3b82f6", "#f97316", "#22c55e", "#eab308"]}
          />
        </div>
        <div className="card">
          <div className="card-title">🕐 Event Frequency (12h)</div>
          <MiniBar
            data={sparkData.map((v, i) => ({ label: `${i}h`, val: v }))}
            colors={["#a78bfa"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
