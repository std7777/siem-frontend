import React from "react";
import { uid } from "../data/utils";

// ─── Network nodes in the topology ───────────────────────────────────────────
const NODES = [
  { id: "fw",     label: "Firewall",     icon: "🔥", x: "48%", y: "10%", color: "#f97316", size: 38 },
  { id: "ids",    label: "IDS/IPS",      icon: "🛡️", x: "20%", y: "30%", color: "#3b82f6", size: 32 },
  { id: "siem",   label: "SIEM",          icon: "📊", x: "75%", y: "30%", color: "#7c3aed", size: 32 },
  { id: "webSrv", label: "Web Server",    icon: "🌐", x: "10%", y: "60%", color: "#22c55e", size: 28 },
  { id: "db",     label: "DB Server",     icon: "🗄️", x: "38%", y: "62%", color: "#eab308", size: 28 },
  { id: "dc",     label: "Domain Ctrl",   icon: "🏢", x: "63%", y: "62%", color: "#ec4899", size: 28 },
  { id: "client", label: "Workstations",  icon: "💻", x: "88%", y: "60%", color: "#06b6d4", size: 28 },
  { id: "ext",    label: "Internet",      icon: "🌍", x: "48%", y: "85%", color: "#6b7280", size: 36 },
];

const LINKS = [
  ["fw", "ids"], ["fw", "siem"], ["ids", "webSrv"], ["ids", "db"],
  ["siem", "dc"], ["siem", "client"], ["fw", "ext"],
];

// ─── NetworkMap — Class Component ─────────────────────────────────────────────
// Demonstrates: constructor, componentDidMount, componentWillUnmount, setState.
class NetworkMap extends React.Component {
  constructor(props) {
    super(props);
    // Initial state set in constructor
    this.state = { active: null };
    this.timer = null;
  }

  // Lifecycle: start a refresh interval once mounted
  componentDidMount() {
    this.timer = setInterval(() => this.forceUpdate(), 5000);
  }

  // Lifecycle: clean up interval before unmount to avoid memory leaks
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { active } = this.state;
    const selectedNode = active ? NODES.find(n => n.id === active) : null;

    return (
      <div className="net-canvas">
        {/* SVG edges */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {LINKS.map(([a, b], i) => {
            const na = NODES.find(n => n.id === a);
            const nb = NODES.find(n => n.id === b);
            if (!na || !nb) return null;
            return (
              <line
                key={i}
                x1={na.x} y1={na.y}
                x2={nb.x} y2={nb.y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {/* Node circles */}
        {NODES.map(n => (
          <div
            key={n.id}
            className="net-node"
            style={{ left: n.x, top: n.y, transform: "translate(-50%,-50%)" }}
            onClick={() => this.setState(s => ({ active: s.active === n.id ? null : n.id }))}
          >
            <div
              className="net-circle"
              style={{
                width:       n.size,
                height:      n.size,
                background:  n.color + "22",
                borderColor: active === n.id ? n.color : "rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ fontSize: n.size * 0.45 }}>{n.icon}</span>
            </div>
            <span className="net-label">{n.label}</span>
          </div>
        ))}

        {/* Node detail tooltip */}
        {selectedNode && (
          <div style={{
            position: "absolute", bottom: 8, left: 8,
            background: "var(--bg1)", border: "1px solid var(--border2)",
            borderRadius: "var(--r)", padding: "8px 12px", fontSize: 11,
          }}>
            <strong style={{ color: selectedNode.color }}>{selectedNode.label}</strong>
            <div style={{ color: "var(--text3)", marginTop: 2 }}>Click to deselect</div>
          </div>
        )}

        <div style={{ position: "absolute", top: 8, right: 8, fontSize: 10, color: "var(--text3)" }}>
          Live Topology
        </div>
      </div>
    );
  }
}

export default NetworkMap;
