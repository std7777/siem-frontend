# SIEM — Frontend Security Operations Center

A React frontend SIEM dashboard inspired by modern SOC tooling.

## Features
- **Dashboard**: severity breakdown, top categories, top source/destination IPs, live event feed
- **Alerts**: searchable/filterable event table, ACK/dismiss, raw log modal
- **Detection Rules**: toggle rules on/off (dashboard and alerts reflect enabled rules)
- **Threat Intel**: IOC database, MITRE ATT&CK tracker, threat feed status
- **Attack Simulator**: one-click scenarios that inject synthetic events
- **Reports**: heatmap, SLA metrics, report history

## Project Structure
```
src/
  context/
    AppContext.js
  data/
    alertData.js
    constants.js
    rules.js
    simulations.js
    utils.js
  hooks/
    useToasts.js
  components/
    Charts.jsx
    ToastContainer.jsx
    Topbar.jsx
  pages/
    Dashboard.jsx
    AlertsPage.jsx
    RulesPage.jsx
    ThreatIntelPage.jsx
    SimulatorPage.jsx
    ReportsPage.jsx
  styles/
    global.css
  App.jsx
  main.jsx
```

## Getting Started
```bash
npm install
npm run dev
```

