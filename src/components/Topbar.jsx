import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PAGES } from "../data/constants";

function Topbar({ critCount, push }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = PAGES.find((page) => page.path === location.pathname)?.id || "dashboard";

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-brand" onClick={() => navigate("/")}>
          <div className="brand">SIEM</div>
        </div>

        <div className="topnav">
          {PAGES.map((p) => (
            <NavLink
              key={p.id}
              to={p.path}
              className={`topnav-item ${currentPage === p.id ? "active" : ""}`}
            >
              <span>{p.label}</span>
              {p.id === "alerts" && critCount > 0 && (
                <span className="nav-badge">{critCount}</span>
              )}
            </NavLink>
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
