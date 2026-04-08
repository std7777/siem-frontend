import React from "react";
import { PAGES } from "../data/constants";

function Topbar({ page, push }) {
  const currentPage = PAGES.find(p => p.id === page);

  return (
    <div className="topbar">
      <div className="topbar-title">{currentPage?.label}</div>

      <div className="topbar-status">
        <div className="pulse" />
        <span>System Operational</span>
      </div>

      <div style={{ fontSize: 11, color: "var(--text3)" }}>
        {new Date().toLocaleString("en-IN")}
      </div>

      <button
        className="btn primary"
        style={{ fontSize: 11 }}
        onClick={() => push("Scan initiated", "🔍")}
      >
        Run Scan
      </button>
    </div>
  );
}

export default Topbar;
