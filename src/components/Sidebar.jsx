import React from "react";
import { PAGES } from "../data/constants";

function Sidebar({ page, setPage, theme, setTheme, critCount }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="brand">NeXus SIEM</div>
        <div className="sub">Security Operations</div>
      </div>

      <div className="sidebar-nav">
        {PAGES.map(p => (
          <button
            key={p.id}
            className={`nav-item ${page === p.id ? "active" : ""}`}
            onClick={() => setPage(p.id)}
          >
            <span className="icon">{p.icon}</span>
            {p.label}
            {p.id === "alerts" && critCount > 0 && (
              <span className="nav-badge">{critCount}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
        <button
          className="btn"
          style={{ width: "100%" }}
          onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀ Light Mode" : "◑ Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
