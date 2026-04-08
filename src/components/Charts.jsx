import React from "react";
import { SEV_COLOR, SEV_BG } from "../data/constants";

export function SeverityBadge({ severity }) {
  return (
    <span
      className="sev"
      style={{
        background: SEV_BG[severity] || "#1a1a2e",
        color: SEV_COLOR[severity] || "#888",
      }}
    >
      {severity}
    </span>
  );
}

export function MiniBar({ data, colors }) {
  const max = Math.max(...data.map((item) => item.val), 1);

  return (
    <div className="mini-bar-list">
      {data.map((item, index) => (
        <div key={index} className="mini-bar-row">
          <div className="mini-bar-header">
            <span className="mini-bar-label">{item.label}</span>
            <span className="mini-bar-value">{item.val}</span>
          </div>
          <div className="mini-bar-track">
            <div
              className="mini-bar-fill"
              style={{
                width: `${Math.max(8, Math.round((item.val / max) * 100))}%`,
                background: colors[index % colors.length],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ data, size = 100 }) {
  const radius = 38;
  const centerX = size / 2;
  const centerY = size / 2;
  const total = data.reduce((sum, item) => sum + item.val, 0) || 1;
  let offset = 0;

  const slices = data.map((item) => {
    const pct = item.val / total;
    const start = offset;
    offset += pct;
    return { ...item, pct, start };
  });

  const arc = (pct, start) => {
    const safePct = pct >= 1 ? 0.9999 : pct;
    const startAngle = start * 2 * Math.PI - Math.PI / 2;
    const endAngle = (start + safePct) * 2 * Math.PI - Math.PI / 2;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const large = safePct > 0.5 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((slice, index) => (
        <path key={index} d={arc(slice.pct, slice.start)} fill={slice.color} opacity={0.85} />
      ))}
      <circle cx={centerX} cy={centerY} r={24} fill="var(--bg1)" />
      <text
        x={centerX}
        y={centerY + 4}
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
