import React from "react";

const REPORTS = [
  { title: "Daily Threat Summary", date: "Today, 06:00", type: "Automated", size: "124 KB" },
  { title: "Brute Force Incident Report", date: "Yesterday", type: "Manual", size: "87 KB" },
  { title: "Weekly Executive Summary", date: "Mar 24, 2026", type: "Automated", size: "341 KB" },
  { title: "Compliance Audit - PCI DSS", date: "Mar 20, 2026", type: "Compliance", size: "2.1 MB" },
  { title: "Vulnerability Scan Report", date: "Mar 15, 2026", type: "Automated", size: "567 KB" },
];

const SLA_METRICS = [
  { label: "Mean Time to Detect", val: "4m 23s", good: true },
  { label: "Mean Time to Respond", val: "18m 07s", good: true },
  { label: "Alert Fatigue Rate", val: "32%", good: false },
  { label: "False Positive Rate", val: "8.4%", good: true },
];

const REPORT_PIPELINE = [
  { label: "Scheduled", value: "12", tone: "neutral" },
  { label: "Generated Today", value: "08", tone: "good" },
  { label: "Awaiting Review", value: "03", tone: "warn" },
  { label: "Failed Jobs", value: "01", tone: "bad" },
];

const DISTRIBUTION = [
  { channel: "SOC Leadership", status: "Delivered", detail: "06:00 IST daily digest" },
  { channel: "Compliance Team", status: "Queued", detail: "PCI weekly packet" },
  { channel: "IR On-Call", status: "Delivered", detail: "Critical incident brief" },
  { channel: "Platform Ops", status: "Draft", detail: "Vulnerability scan recap" },
];

function ReportsPage() {
  return (
    <div>
      <div className="page-title">Reports</div>

      <div className="grid-2">
        {/* <div className="card">
          <div className="card-title">Reporting Pipeline</div>
          <div className="report-metric-grid">
            {REPORT_PIPELINE.map((item) => (
              <div key={item.label} className={`report-metric-card ${item.tone}`}>
                <div className="report-metric-label">{item.label}</div>
                <div className="report-metric-value">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="report-note">This replaces the heatmap with report-generation health and queue visibility.</div>
        </div> */}

        <div className="card">
          <div className="card-title">Distribution Status</div>
          <div className="report-distribution-list">
            {DISTRIBUTION.map((item) => (
              <div key={item.channel} className="report-distribution-row">
                <div>
                  <div className="report-distribution-title">{item.channel}</div>
                  {/* <div className="report-distribution-detail">{item.detail}</div> */}
                </div>
                <span className={`report-status-pill ${item.status.toLowerCase().replace(/\s+/g, "-")}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title">SLA Metrics</div>
          <div className="report-sla-list">
            {SLA_METRICS.map((metric) => (
              <div key={metric.label} className="report-sla-row">
                <span style={{ color: "var(--text2)" }}>{metric.label}</span>
                <span
                  style={{
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    color: metric.good ? "var(--green)" : "var(--orange)",
                  }}
                >
                  {metric.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="card">
        <div className="card-title">Report History</div>
        <table className="alert-table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Date</th>
              <th>Type</th>
              <th>Size</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {REPORTS.map((report, index) => (
              <tr key={index}>
                <td style={{ color: "var(--text1)", fontWeight: 600 }}>{report.title}</td>
                <td style={{ color: "var(--text3)" }}>{report.date}</td>
                <td>
                  <span className="report-type-pill">{report.type}</span>
                </td>
                <td style={{ color: "var(--text3)" }}>{report.size}</td>
                <td>
                  <button className="btn" style={{ fontSize: 10, padding: "2px 8px" }}>
                    Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsPage;
