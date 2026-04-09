import React from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PAGES } from "../data/constants";

function getPgId(path) {
  for (let i = 0; i < PAGES.length; i += 1) {
    const p = PAGES[i];
    if (p.path === path) {
      return p.id;
    }
  }

  return "dashboard";
}

function Topbar({ critCount, push }) {
  const nav = useNavigate();
  const loc = useLocation();
  const curPg = getPgId(loc.pathname);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-brand" onClick={() => nav("/")}>
          <div className="brand">CRON EYE</div>
        </div>

        <div className="topnav">
          {PAGES.map((p) => (
            <NavLink
              key={p.id}
              to={p.path}
              className={`topnav-item ${curPg === p.id ? "active" : ""}`}
            >
              <span>{p.label}</span>
              {p.id === "alerts" && critCount > 0 && (
                <span className="nav-badge">{critCount}</span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, color: "var(--text3)" }}>
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
 //prop validation
Topbar.propTypes = {
  critCount: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
};

export default Topbar;
