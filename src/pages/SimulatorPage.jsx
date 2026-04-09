import React, { useState } from "react";

import { ATTACK_SIMULATIONS, buildSimulationEvents } from "../data/simulations";

function SimulatorPage({ dispatch, push }) {
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
              className={`attack-btn ${activeSimulationId === simulation.id ? "active" : ""}`}
              onClick={() => runSimulation(simulation)}
              disabled={Boolean(activeSimulationId)}
            >
              <div className="attack-name">{simulation.label}</div>
              <div className="attack-desc">{simulation.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimulatorPage;
