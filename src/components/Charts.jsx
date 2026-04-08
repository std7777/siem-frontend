import React from "react";
import { SEV_COLOR, SEV_BG } from "../data/constants";

// ─── SeverityBadge ────────────────────────────────────────────────────────────
// Displays a coloured pill for a given severity level.
export function SeverityBadge({ severity }) {
  return (
    <span
      className="sev"
      style={{
        background: SEV_BG[severity]  || "#1a1a2e",
        color:      SEV_COLOR[severity] || "#888",
      }}
    >
      {severity}
    </span>
  );
}

// ─── SparkLine ────────────────────────────────────────────────────────────────
// A small inline bar graph used inside stat cards.
export function SparkLine({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div className="spark">
      {values.map((v, i) => (
        <div
          key={i}
          className="spark-bar"
          style={{ height: `${Math.round((v / max) * 100)}%`, minHeight: 2 }}
        />
      ))}
    </div>
  );
}

// ─── MiniBar ──────────────────────────────────────────────────────────────────
// A small multi-column bar chart used on the dashboard.
export function MiniBar({ data, colors }) {
  const max = Math.max(...data.map(d => d.val), 1);
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div key={i} className="bar-wrap">
          <div
            className="bar"
            style={{
              height:     `${Math.round((d.val / max) * 100)}%`,
              background: colors[i % colors.length],
              minHeight:  3,
            }}
          />
          <div className="bar-label">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── DonutChart ───────────────────────────────────────────────────────────────
// SVG-based donut chart showing proportional severity breakdown.
export function DonutChart({ data, size = 100 }) {
  const r = 38, cx = size / 2, cy = size / 2;
  const total = data.reduce((s, d) => s + d.val, 0) || 1;
  let offset = 0;

  const slices = data.map(d => {
    const pct = d.val / total;
    const start = offset;
    offset += pct;
    return { ...d, pct, start };
  });

  const arc = (pct, start) => {
    if (pct >= 1) pct = 0.9999;
    const startAngle = start * 2 * Math.PI - Math.PI / 2;
    const endAngle   = (start + pct) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle),   y2 = cy + r * Math.sin(endAngle);
    const large = pct > 0.5 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => (
        <path key={i} d={arc(s.pct, s.start)} fill={s.color} opacity={0.85} />
      ))}
      <circle cx={cx} cy={cy} r={24} fill="var(--bg1)" />
      <text
        x={cx} y={cy + 4}
        textAnchor="middle"
        fill="var(--text1)"
        fontSize="11"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
      >
        {total}
      </text>
    </svg>
  );
}
