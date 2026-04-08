import React, { useState, useEffect, useReducer } from "react";

import { AlertContext, RulesContext } from "./context/AppContext";
import { alertReducer, initialAlerts, makeAlert } from "./data/alertData";
import { DEFAULT_RULES } from "./data/rules";
import { categoryKey } from "./data/utils";
import { useToasts } from "./hooks/useToasts";

import Topbar         from "./components/Topbar";
import ToastContainer from "./components/ToastContainer";

import Dashboard      from "./pages/Dashboard";
import AlertsPage     from "./pages/AlertsPage";
import RulesPage      from "./pages/RulesPage";
import ThreatIntelPage from "./pages/ThreatIntelPage";
import SimulatorPage  from "./pages/SimulatorPage";
import ReportsPage    from "./pages/ReportsPage";

import "./styles/global.css";

function App() {
  const [page,   setPage]   = useState("dashboard");
  const [alerts, dispatch]  = useReducer(alertReducer, initialAlerts);
  const { toasts, push }    = useToasts();
  const [rules, setRules]   = useState(DEFAULT_RULES);

  // Auto-generate background noise events every 6 seconds (useEffect lifecycle demo)
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.4) {
        dispatch({ type: "ADD", payload: makeAlert() });
      }
    }, 6000);
    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  const ruleCategoryEnabled = rules.reduce((acc, r) => {
    const key = categoryKey(r.cat);
    acc[key] = acc[key] || r.on;
    return acc;
  }, {});

  const visibleAlerts = alerts.filter((a) => {
    const key = categoryKey(a.category);
    if (Object.prototype.hasOwnProperty.call(ruleCategoryEnabled, key)) {
      return ruleCategoryEnabled[key];
    }
    return true;
  });

  // Count unacknowledged critical alerts for nav badge
  const critCount = visibleAlerts.filter((a) => a.severity === "CRITICAL" && !a.acked).length;

  // Page renderer — acts as client-side router
  const renderPage = () => {
    switch (page) {
      case "dashboard":  return <Dashboard      alerts={visibleAlerts} rules={rules} dispatch={dispatch} push={push} />;
      case "alerts":     return <AlertsPage     alerts={visibleAlerts} dispatch={dispatch} push={push} />;
      case "rules":      return <RulesPage      push={push} />;
      case "intel":      return <ThreatIntelPage />;
      case "simulator":  return <SimulatorPage  dispatch={dispatch} push={push} />;
      case "reports":    return <ReportsPage />;
      default:           return <Dashboard      alerts={visibleAlerts} rules={rules} dispatch={dispatch} push={push} />;
    }
  };

  return (
    <RulesContext.Provider value={{ rules, setRules }}>
      <AlertContext.Provider value={{ alerts, dispatch }}>
        <div className="siem-root">
          <Topbar page={page} setPage={setPage} critCount={critCount} push={push} />
          <div className="content">{renderPage()}</div>
          <ToastContainer toasts={toasts} />
        </div>
      </AlertContext.Provider>
    </RulesContext.Provider>
  );
}

export default App;
