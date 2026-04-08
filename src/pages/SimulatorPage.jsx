import React, { useState } from "react";
import { ATTACK_SIMULATIONS } from "../data/simulations";
import { uid, now } from "../data/utils";

function SimulatorPage({ dispatch, push }) {
  const [history, setHistory] = useState([]);

  const fire = (sim) => {
    const events = sim.generate();

    events.forEach((e, i) => setTimeout(() => dispatch({ type: "ADD", payload: e }), i * 180));

    setHistory((h) => [{ id: uid(), time: now(), sim: sim.label, count: events.length }, ...h.slice(0, 9)]);
    push(`Simulated: ${sim.label} (${events.length} events)`);
  };

  return (
    <div>
      <div className="page-title">Attack Sim</div>
      <div className="card" style={{ marginBottom: 16, borderColor: "rgba(124,58,237,0.3)" }}>
        <div className="card-title" style={{ color: "var(--accent2)" }}>
          Attack Simulation Engine
        </div>
        <p style={{ color: "var(--text2)", fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>
          Run a simulation to inject synthetic events into the SIEM. Events appear in Dashboard and Alerts in real-time.
        </p>
        <div className="attack-grid">
          {ATTACK_SIMULATIONS.map((sim) => (
            <button
              key={sim.id}
              className="attack-btn"
              style={{ borderColor: `${sim.color}33` }}
              onClick={() => fire(sim)}
            >
              <div className="attack-name" style={{ color: sim.color }}>
                {sim.label}
              </div>
              <div className="attack-desc">{sim.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="card">
          <div className="card-title">Simulation History</div>
          <div className="timeline">
            {history.map((h, i) => (
              <div className="tl-item" key={h.id}>
                {i < history.length - 1 && <div className="tl-line" />}
                <div className="tl-dot" style={{ background: "rgba(124,58,237,0.2)", color: "var(--accent2)" }}>
                  {i + 1}
                </div>
                <div className="tl-content">
                  <div className="tl-title">{h.sim}</div>
                  <div className="tl-meta">
                    {h.time} · {h.count} events injected
                  </div>
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
