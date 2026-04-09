import React, { useContext, useEffect } from "react";
import { SeverityBadge } from "../components/Charts";
import { RulesContext } from "../context/AppContext";
import { DEFAULT_RULES } from "../data/rules";

function RulesPage({ push }) {
  const { rules, setRules } = useContext(RulesContext);

  useEffect(() => {
    if (!rules || rules.length === 0) setRules(DEFAULT_RULES);
  }, [rules, setRules]);

  const toggle = (id) => {
    setRules((r) => r.map((x) => (x.id === id ? { ...x, on: !x.on } : x)));
    push("Rule updated");
  };

  return (
    <div>
      <div className="page-title">Detection Rules</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "var(--text2)", fontSize: 12 }}>
          {rules.filter((r) => r.on).length} / {rules.length} rules enabled
        </span>
        <button className="btn primary" onClick={() => push("rule editor currently out of scope")}>
          + New Rule
        </button>
      </div>

      {rules.map((r) => (
        <div className="rule-card" key={r.id}>
          <div className={`rule-toggle ${r.on ? "on" : ""}`} onClick={() => toggle(r.id)} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "var(--text1)", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-head)" }}>
              {r.name}
            </div>
            <div style={{ color: "var(--text3)", fontSize: 10, marginTop: 2 }}>
              {r.cat} · {r.hits} hits
            </div>
          </div>
          <SeverityBadge severity={r.sev} />
        </div>
      ))}
    </div>
  );
}

export default RulesPage;
