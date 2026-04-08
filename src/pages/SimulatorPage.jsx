import React, { useState } from "react";
import { ATTACK_SIMULATIONS } from "../data/simulations";
import { uid, now } from "../data/utils";

function SimulatorPage({ dispatch, push }) {
  const [firing,  setFiring]  = useState(null);
  const [history, setHistory] = useState([]);

  const fire = (sim) => {
    setFiring(sim.id);
    const events = sim.generate();

    // Stagger event injection for realistic effect
    events.forEach((e, i) =>
      setTimeout(() => dispatch({ type: "ADD", payload: e }), i * 180)
    );

    setHistory(h => [
      { id: uid(), time: now(), sim: sim.label, count: events.length },
      ...h.slice(0, 9),
    ]);

    push(`Simulated: ${sim.label} (${events.length} events)`, sim.icon);
    setTimeout(() => setFiring(null), 600);
  };

  return (
    <div>
      {/* Simulation Engine */}
      <div className="card" style={{ marginBottom: 16, borderColor: "rgba(124,58,237,0.3)" }}>
        <div className="card-title" style={{ color: "var(--accent2)" }}>⚡ Attack Simulation Engine</div>
        <p style={{ color: "var(--text2)", fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>
          Click any attack below to inject synthetic events into the SIEM. Events appear in Dashboard
          and Alerts in real-time, triggering relevant detection rules.
        </p>
        <div className="attack-grid">
          {ATTACK_SIMULATIONS.map(sim => (
            <button
              key={sim.id}
              className={`attack-btn ${firing === sim.id ? "firing" : ""}`}
              style={{ borderColor: `${sim.color}33` }}
              onClick={() => fire(sim)}
            >
              {firing === sim.id && <div className="attack-flash" />}
              <div className="attack-icon">{sim.icon}</div>
              <div className="attack-name" style={{ color: sim.color }}>{sim.label}</div>
              <div className="attack-desc">{sim.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Simulation History */}
      {history.length > 0 && (
        <div className="card">
          <div className="card-title">🕐 Simulation History</div>
          <div className="timeline">
            {history.map((h, i) => (
              <div className="tl-item" key={h.id}>
                {i < history.length - 1 && <div className="tl-line" />}
                <div className="tl-dot" style={{ background: "rgba(124,58,237,0.2)", color: "var(--accent2)" }}>
                  ⚡
                </div>
                <div className="tl-content">
                  <div className="tl-title">{h.sim}</div>
                  <div className="tl-meta">{h.time} · {h.count} events injected</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SimulatorPage;
