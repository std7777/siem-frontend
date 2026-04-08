import React, { useState, useEffect, useReducer } from "react";

import { ThemeContext, AlertContext } from "./context/AppContext";
import { alertReducer, initialAlerts, makeAlert } from "./data/alertData";
import { useToasts } from "./hooks/useToasts";

import Sidebar        from "./components/Sidebar";
import Topbar         from "./components/Topbar";
import ToastContainer from "./components/ToastContainer";

import Dashboard      from "./pages/Dashboard";
import AlertsPage     from "./pages/AlertsPage";
import NetworkPage    from "./pages/NetworkPage";
import RulesPage      from "./pages/RulesPage";
import ThreatIntelPage from "./pages/ThreatIntelPage";
import SimulatorPage  from "./pages/SimulatorPage";
import ReportsPage    from "./pages/ReportsPage";

import "./styles/global.css";

function App() {
  const [theme,  setTheme]  = useState("dark");
  const [page,   setPage]   = useState("dashboard");
  const [alerts, dispatch]  = useReducer(alertReducer, initialAlerts);
  const { toasts, push }    = useToasts();

  // Auto-generate background noise events every 6 seconds (useEffect lifecycle demo)
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.4) {
        dispatch({ type: "ADD", payload: makeAlert() });
      }
    }, 6000);
    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  // Count unacknowledged critical alerts for sidebar badge
  const critCount = alerts.filter(a => a.severity === "CRITICAL" && !a.acked).length;

  // Page renderer — acts as client-side router
  const renderPage = () => {
    switch (page) {
      case "dashboard":  return <Dashboard      alerts={alerts} dispatch={dispatch} push={push} />;
      case "alerts":     return <AlertsPage     alerts={alerts} dispatch={dispatch} push={push} />;
      case "network":    return <NetworkPage    alerts={alerts} />;
      case "rules":      return <RulesPage      push={push} />;
      case "intel":      return <ThreatIntelPage />;
      case "simulator":  return <SimulatorPage  dispatch={dispatch} push={push} />;
      case "reports":    return <ReportsPage />;
      default:           return <Dashboard      alerts={alerts} dispatch={dispatch} push={push} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === "dark" ? "light" : "dark") }}>
      <AlertContext.Provider value={{ alerts, dispatch }}>
        <div className={`siem-root ${theme === "light" ? "light" : ""}`}>

          <Sidebar
            page={page}
            setPage={setPage}
            theme={theme}
            setTheme={setTheme}
            critCount={critCount}
          />

          <div className="main">
            <Topbar page={page} push={push} />
            <div className="content">
              {renderPage()}
            </div>
          </div>

          <ToastContainer toasts={toasts} />

        </div>
      </AlertContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
