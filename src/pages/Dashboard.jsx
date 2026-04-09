import React from "react";
import { SEVERITIES, SEV_COLOR } from "../data/constants";
import { SeverityBadge, DonutChart } from "../components/Charts";
import { categoryKey } from "../data/utils";

function Dashboard({ alerts, rules, dispatch, push }) {
  const crit = alerts.filter((alert) => alert.severity === "CRITICAL").length;
  const unacked = alerts.filter((alert) => !alert.acked).length;
  const recent = alerts.slice(0, 6);
  const activeRules = (rules || []).filter((rule) => rule.on).length;

  const sevData = SEVERITIES.map((severity) => ({
    label: severity.slice(0, 4),
    val: alerts.filter((alert) => alert.severity === severity).length,
    color: SEV_COLOR[severity],
  }));

  const alertCategories = Object.values(
    alerts.reduce((acc, alert) => {
      const key = categoryKey(alert.category);
      if (!key) {
        return acc;
      }

      if (!acc[key]) {
        acc[key] = { category: alert.category, count: 0 };
      }

      acc[key].count += Number(alert.count) > 0 ? Number(alert.count) : 1;
      return acc;
    }, {})
  );

  const categoriesByCount = alertCategories
    .sort((left, right) => right.count - left.count)
    .slice(0, 5);

  const catCounts = categoriesByCount.map((item) => ({
    label: item.category,
    val: item.count,
  }));

  const topIps = (key, limit = 6) => {
    const counts = alerts.reduce((acc, alert) => {
      const ip = alert[key];
      if (!ip) return acc;
      acc[ip] = (acc[ip] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((left, right) => right[1] - left[1])
      .slice(0, limit)
      .map(([ip, count]) => ({ ip, count }));
  };

  const topSrc = topIps("src", 6);
  const topDst = topIps("dst", 6);

  const IpBar = ({ ip, count, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{ fontFamily: "var(--font-mono)", color, fontSize: 11, width: 120 }}>{ip}</span>
      <div style={{ flex: 1, background: "var(--bg3)", height: 6, borderRadius: 3 }}>
        <div style={{ width: `${Math.min(100, count * 12)}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 11, color: "var(--text3)" }}>{count}</span>
    </div>
  );

  const maxCategoryCount = Math.max(...catCounts.map((item) => item.val), 1);

  const CategoryBar = ({ label, count, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span
        style={{
          color,
          fontSize: 11,
          width: 120,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, background: "var(--bg3)", height: 6, borderRadius: 3 }}>
        <div
          style={{
            width: `${Math.max(8, Math.round((count / maxCategoryCount) * 100))}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
          }}
        />
      </div>
      <span style={{ fontSize: 11, color: "var(--text3)" }}>{count}</span>
    </div>
  );

  return (
    <div>
      <div className="page-title">Dashboard</div>

      <div className="grid-4">
        <div className="stat">
          <div className="stat-label">By Severity</div>
          <div className="donut-wrap" style={{ gap: 14 }}>
            <DonutChart data={sevData} size={92} />
            <div className="donut-legend" style={{ gap: 6 }}>
              {sevData.slice(0, 4).map((item) => (
                <div key={item.label} className="legend-item" style={{ fontSize: 10 }}>
                  <div className="legend-dot" style={{ background: item.color }} />
                  <span style={{ color: "var(--text2)" }}>{item.label}</span>
                  <span style={{ marginLeft: "auto", color: "var(--text1)", fontWeight: 600 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-label">Critical</div>
          <div className="stat-val" style={{ color: "#ef4444" }}>
            {crit}
          </div>
          <div className="stat-sub">Require immediate action</div>
        </div>

        <div className="stat">
          <div className="stat-label">Unacknowledged</div>
          <div className="stat-val" style={{ color: "#f97316" }}>
            {unacked}
          </div>
          <div className="stat-sub">Pending analyst review</div>
        </div>

        <div className="stat">
          <div className="stat-label">Rules Active</div>
          <div className="stat-val" style={{ color: "#22c55e" }}>
            {activeRules}
          </div>
          <div className="stat-sub">Enabled detection rules</div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-title">Top Categories</div>
          {catCounts.map((item, index) => (
            <CategoryBar
              key={item.label}
              label={item.label}
              count={item.val}
              color={["#7c3aed", "#3b82f6", "#f97316", "#22c55e", "#eab308"][index % 5]}
            />
          ))}
          {catCounts.length === 0 && <div style={{ color: "var(--text3)", fontSize: 11, marginTop: 10 }}>No data yet</div>}
        </div>

        <div className="card">
          <div className="card-title">Top Source IPs</div>
          {topSrc.map((item) => (
            <IpBar key={item.ip} ip={item.ip} count={item.count} color="#ef4444" />
          ))}
          {topSrc.length === 0 && <div style={{ color: "var(--text3)", fontSize: 11 }}>No data yet</div>}
        </div>

        <div className="card">
          <div className="card-title">Top Destination IPs</div>
          {topDst.map((item) => (
            <IpBar key={item.ip} ip={item.ip} count={item.count} color="#3b82f6" />
          ))}
          {topDst.length === 0 && <div style={{ color: "var(--text3)", fontSize: 11 }}>No data yet</div>}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Live Event Feed</div>
        <div style={{ maxHeight: 200, overflowY: "auto" }}>
          {recent.length === 0 && (
            <div style={{ color: "var(--text3)", fontSize: 12, padding: "20px 0", textAlign: "center" }}>
              No events yet.
            </div>
          )}
          {recent.map((alert) => (
            <div key={alert.id} className="feed-item">
              <div className="feed-dot" style={{ background: SEV_COLOR[alert.severity] }} />
              <div style={{ flex: 1 }}>
                <span style={{ color: "var(--text3)", fontSize: 10, marginRight: 8 }}>{alert.time}</span>
                <SeverityBadge severity={alert.severity} />
                <span style={{ marginLeft: 8, color: "var(--text1)" }}>{alert.message}</span>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
