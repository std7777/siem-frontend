import React from "react";
import NetworkMap from "../components/NetworkMap";

function NetworkPage({ alerts }) {
  const topSrc = [...new Set(alerts.map(a => a.src))].slice(0, 8);
  const topDst = [...new Set(alerts.map(a => a.dst))].slice(0, 8);

  const IpBar = ({ ip, count, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{ fontFamily: "var(--font-mono)", color, fontSize: 11, width: 120 }}>{ip}</span>
      <div style={{ flex: 1, background: "var(--bg3)", height: 6, borderRadius: 3 }}>
        <div style={{ width: `${Math.min(100, count * 10)}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 11, color: "var(--text3)" }}>{count}</span>
    </div>
  );

  return (
    <div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">🗺️ Network Topology</div>
        <NetworkMap alerts={alerts} />
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">🔥 Top Source IPs</div>
          {topSrc.map(ip => (
            <IpBar key={ip} ip={ip} count={alerts.filter(a => a.src === ip).length} color="#ef4444" />
          ))}
          {topSrc.length === 0 && <div style={{ color: "var(--text3)", fontSize: 11 }}>No data yet</div>}
        </div>

        <div className="card">
          <div className="card-title">🎯 Top Destinations</div>
          {topDst.map(ip => (
            <IpBar key={ip} ip={ip} count={alerts.filter(a => a.dst === ip).length} color="#3b82f6" />
          ))}
          {topDst.length === 0 && <div style={{ color: "var(--text3)", fontSize: 11 }}>No data yet</div>}
        </div>
      </div>
    </div>
  );
}

export default NetworkPage;
