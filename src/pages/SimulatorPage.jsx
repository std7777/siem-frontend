import React, { useState } from "react";

import { ATTACK_SIMULATIONS, buildSimulationEvents } from "../data/simulations";
import { now, uid } from "../data/utils";

function SimulatorPage({ dispatch, push }) {
  const [history, setHistory] = useState([]);
  const [activeSimulationId, setActiveSimulationId] = useState(null);

  const runSimulation = (simulation) => {
    if (activeSimulationId) {
      return;
    }

    const events = buildSimulationEvents(simulation);
    setActiveSimulationId(simulation.id);

    events.forEach((event, index) => {
      window.setTimeout(() => {
        dispatch({ type: "ADD", payload: event });

        if (index === events.length - 1) {
          setActiveSimulationId(null);
        }
      }, index * 300);
    });

    setHistory((current) => [
      { id: uid(), time: now(), sim: simulation.label, count: events.length },
      ...current.slice(0, 9),
    ]);

    push(`Simulated: ${simulation.label} (${events.length} events)`);
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
          {ATTACK_SIMULATIONS.map((simulation) => (
            <button
              key={simulation.id}
              className="attack-btn"
              style={{ borderColor: `${simulation.color}33` }}
              onClick={() => runSimulation(simulation)}
              disabled={Boolean(activeSimulationId)}
            >
              <div className="attack-name" style={{ color: simulation.color }}>
                {simulation.label}
              </div>
              <div className="attack-desc">{simulation.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="card">
          <div className="card-title">Simulation History</div>
          <div className="timeline">
            {history.map((item, index) => (
              <div className="tl-item" key={item.id}>
                {index < history.length - 1 && <div className="tl-line" />}
                <div className="tl-dot" style={{ background: "rgba(124,58,237,0.2)", color: "var(--accent2)" }}>
                  {index + 1}
                </div>
                <div className="tl-content">
                  <div className="tl-title">{item.sim}</div>
                  <div className="tl-meta">
                    {item.time} - {item.count} events injected
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
