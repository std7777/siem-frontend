# NeXus SIEM — Frontend Security Operations Center

A moderate-to-advanced React frontend SIEM dashboard inspired by Splunk and Wazuh.

## Features
- **Dashboard** — live event feed, severity donut chart, category breakdown, sparklines
- **Alerts** — searchable/filterable event table, ACK/dismiss, raw log modal
- **Network** — interactive topology map, top source/destination IP charts
- **Detection Rules** — toggle rules on/off, hit counts, severity labels
- **Threat Intel** — IOC database, MITRE ATT&CK tracker, threat feed status
- **Attack Simulator** — 7 one-click attack scenarios (SSH Brute Force, SQLi, Ransomware, etc.)
- **Reports** — heatmap, SLA metrics, report history

## React Concepts Demonstrated
| Concept                  | Where                                      |
|--------------------------|--------------------------------------------|
| JSX                      | All components                             |
| Functional Components    | All pages and UI components                |
| Class Component          | `NetworkMap.jsx` (with full lifecycle)     |
| Constructor              | `NetworkMap` constructor                   |
| componentDidMount        | `NetworkMap` — starts refresh interval     |
| componentWillUnmount     | `NetworkMap` — clears interval             |
| useState                 | Filter bar, modal, tabs, rules toggle      |
| useReducer               | Alert store in `App.jsx`                   |
| useEffect                | Auto event generator in `App.jsx`          |
| useCallback              | Toast push function in `useToasts.js`      |
| useContext               | `ThemeContext`, `AlertContext`             |
| Custom Hook              | `useToasts` in `hooks/useToasts.js`        |
| Props                    | Every component receives typed props       |
| Context API              | Theme + Alert contexts in `AppContext.js`  |
| Client-side Routing      | `renderPage()` switch in `App.jsx`         |
| CSS Styling              | `global.css` with CSS variables            |

## Project Structure
```
src/
├── context/
│   └── AppContext.js          # ThemeContext, AlertContext
├── data/
│   ├── constants.js           # SEVERITIES, CATEGORIES, PAGES, etc.
│   ├── utils.js               # uid, now, rand, randInt
│   ├── alertData.js           # makeAlert(), alertReducer
│   └── simulations.js         # 7 attack simulation definitions
├── hooks/
│   └── useToasts.js           # Custom hook for toast notifications
├── components/
│   ├── Charts.jsx             # SeverityBadge, SparkLine, MiniBar, DonutChart
│   ├── NetworkMap.jsx         # Class component with lifecycle methods
│   ├── Sidebar.jsx            # Navigation sidebar
│   ├── Topbar.jsx             # Top header bar
│   └── ToastContainer.jsx     # Toast notification renderer
├── pages/
│   ├── Dashboard.jsx
│   ├── AlertsPage.jsx
│   ├── NetworkPage.jsx
│   ├── RulesPage.jsx
│   ├── ThreatIntelPage.jsx
│   ├── SimulatorPage.jsx
│   └── ReportsPage.jsx
├── styles/
│   └── global.css             # All CSS with variables + dark/light theme
├── App.jsx                    # Root component, providers, routing
└── main.jsx                   # ReactDOM entry point
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Build for Production
```bash
npm run build
npm run preview
```
