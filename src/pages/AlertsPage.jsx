import React, { useState } from "react";
import PropTypes from "prop-types";
import { SeverityBadge } from "../components/Charts";

function AlertsPage({ alerts, dispatch, push }) {
  const [search, setSearch] = useState("");

  const filteredAlerts = alerts.filter((alert) =>
    `${alert.message} ${alert.src} ${alert.dst} ${alert.rule} ${alert.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-title">Alerts</div>

      <div className="alerts-toolbar">
        <div className="alerts-total-card">
          <span className="alerts-total-label">Total Events</span>
          <span className="alerts-total-value">{filteredAlerts.length}</span>
        </div>

        <input
          className="alerts-search-input"
          placeholder="Search events, IPs, rules..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          className="btn danger"
          onClick={() => {
            dispatch({ type: "CLEAR" });
            push("All events cleared");
          }}
        >
          Clear All
        </button>
      </div>

      <div className="alerts-table-wrap">
        <table className="alert-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Severity</th>
              <th>Category</th>
              <th>Source IP</th>
              <th>Destination</th>
              <th>Rule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length === 0 && (
              <tr>
                <td colSpan={7} className="alerts-empty-state">
                  No matching events
                </td>
              </tr>
            )}

            {filteredAlerts.slice(0, 100).map((alert) => (
              <tr key={alert.id} className={alert.acked ? "acked" : ""}>
                <td className="alerts-time-cell">{alert.time}</td>
                <td>
                  <SeverityBadge severity={alert.severity} />
                </td>
                <td className="alerts-category-cell">{alert.category}</td>
                <td className="alerts-ip-cell alerts-source-cell">{alert.src}</td>
                <td className="alerts-ip-cell">{alert.dst}</td>
                <td className="alerts-rule-cell">{alert.rule}</td>
                <td>
                  <div className="alerts-actions">
                    <button
                      className="btn"
                      style={{ fontSize: 10, padding: "2px 8px" }}
                      onClick={() => {
                        dispatch({ type: "ACK", id: alert.id });
                        push("Event acknowledged");
                      }}
                    >
                      ACK
                    </button>
                    <button
                      className="btn danger"
                      style={{ fontSize: 10, padding: "2px 8px" }}
                      onClick={() => {
                        dispatch({ type: "DELETE", id: alert.id });
                        push("Event dismissed");
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AlertsPage.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      time: PropTypes.string.isRequired,
      severity: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      dst: PropTypes.string.isRequired,
      rule: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      acked: PropTypes.bool,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default AlertsPage;
