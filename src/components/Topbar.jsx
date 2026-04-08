import React from "react";
import { PAGES } from "../data/constants";

function Topbar({ page, setPage, critCount, push }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-brand" onClick={() => setPage("dashboard")}>
          <div className="brand">SIEM</div>
          <div className="sub">Security Operations</div>
        </div>

        <div className="topnav">
          {PAGES.map((p) => (
            <button
              key={p.id}
              className={`topnav-item ${page === p.id ? "active" : ""}`}
              onClick={() => setPage(p.id)}
            >
              <span>{p.label}</span>
              {p.id === "alerts" && critCount > 0 && (
                <span className="nav-badge">{critCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="topbar-status">
        <div className="status-dot" />
        <span>System Operational</span>
      </div>

      <div style={{ fontSize: 11, color: "var(--text3)" }}>
        {new Date().toLocaleString("en-IN")}
      </div>

      <button
        className="btn primary"
        style={{ fontSize: 11 }}
        onClick={() => push("Scan initiated")}
      >
        Run Scan
      </button>
    </div>
  );
}

export default Topbar;

