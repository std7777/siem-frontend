import React, { useEffect, useReducer, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AlertContext, RulesContext } from "./context/AppContext";
import { alertReducer, initialAlerts, makeAlert } from "./data/alertData";
import { DEFAULT_RULES } from "./data/rules";
import { useToasts } from "./hooks/useToasts";

import Topbar from "./components/Topbar";
import ToastContainer from "./components/ToastContainer";

import Dashboard from "./pages/Dashboard";
import AlertsPage from "./pages/AlertsPage";
import RulesPage from "./pages/RulesPage";
import ThreatIntelPage from "./pages/ThreatIntelPage";
import SimulatorPage from "./pages/SimulatorPage";

import "./styles/index.css";

function buildEnabledRuleIds(rules) {
  return new Set(rules.filter((rule) => rule.on).map((rule) => rule.id));
}

function filterVisibleAlerts(alerts, enabledRuleIds) {
  return alerts.filter((alert) => {
    if (alert.ruleId == null) {
      return true;
    }

    return enabledRuleIds.has(alert.ruleId);
  });
}

function App() {
  const [alerts, dispatch] = useReducer(alertReducer, initialAlerts);
  const { toasts, push } = useToasts();
  const [rules, setRules] = useState(DEFAULT_RULES);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.4) {
        dispatch({ type: "ADD", payload: makeAlert({}, rules) });
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [rules]);

  const enabledRuleIds = buildEnabledRuleIds(rules);
  const visibleAlerts = filterVisibleAlerts(alerts, enabledRuleIds);

  const critCount = visibleAlerts.filter((alert) => alert.severity === "CRITICAL" && !alert.acked).length;

  return (
    <RulesContext.Provider value={{ rules, setRules }}>
      <AlertContext.Provider value={{ alerts, dispatch }}>
        <div className="siem-root">
          <Topbar critCount={critCount} push={push} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard alerts={visibleAlerts} rules={rules} dispatch={dispatch} push={push} />} />
              <Route path="/alerts" element={<AlertsPage alerts={visibleAlerts} dispatch={dispatch} push={push} />} />
              <Route path="/rules" element={<RulesPage push={push} />} />
              <Route path="/intel" element={<ThreatIntelPage />} />
              <Route path="/simulator" element={<SimulatorPage dispatch={dispatch} push={push} rules={rules} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <ToastContainer toasts={toasts} />
        </div>
      </AlertContext.Provider>
    </RulesContext.Provider>
  );
}

export default App;
