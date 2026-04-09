import React from "react";
import PropTypes from "prop-types";
import { SEV_COLOR, SEV_BG } from "../data/constants";

function mkSlices(data, total) {
  let off = 0;

  return data.map((item) => {
    const pct = item.val / total;
    const s = {
      ...item,
      pct,
      start: off,
    };

    off += pct;
    return s;
  });
}

function mkArc(cx, cy, r, pct, st) {
  const p = pct >= 1 ? 0.9999 : pct;
  const a1 = st * 2 * Math.PI - Math.PI / 2;
  const a2 = (st + p) * 2 * Math.PI - Math.PI / 2;
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2);
  const y2 = cy + r * Math.sin(a2);
  const big = p > 0.5 ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${big} 1 ${x2} ${y2} Z`;
}

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

export function DonutChart({ data, size = 100 }) {
  const radius = 38;
  const centerX = size / 2;
  const centerY = size / 2;
  const total = data.reduce((sum, item) => sum + item.val, 0) || 1;
  const slices = mkSlices(data, total);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((slice, index) => (
        <path key={index} d={mkArc(centerX, centerY, radius, slice.pct, slice.start)} fill={slice.color} opacity={0.85} />
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

//prop validation
SeverityBadge.propTypes = {
  severity: PropTypes.string.isRequired,
};

DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      val: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  size: PropTypes.number,
};
