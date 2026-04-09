import React, { Component } from "react";
import PropTypes from "prop-types";

class ThreatIntelRow extends Component {
  render() {
    const { ioc } = this.props;
    const confidenceColor = ioc.conf > 90 ? "#ef4444" : ioc.conf > 75 ? "#f97316" : "#eab308";

    return (
      <tr>
        <td>
          <span style={{ background: "var(--accent-soft)", color: "var(--accent2)", padding: "1px 6px", borderRadius: 4, fontSize: 10, border: "1px solid var(--accent-border)" }}>
            {ioc.type}
          </span>
        </td>
        <td style={{ fontFamily: "var(--font-mono)", color: "var(--text1)" }}>{ioc.val}</td>
        <td style={{ color: "var(--text2)" }}>{ioc.threat}</td>
        <td>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: confidenceColor,
            }}
          >
            {ioc.conf}%
          </span>
        </td>
      </tr>
    );
  }
}

//prop validation
ThreatIntelRow.propTypes = {
  ioc: PropTypes.shape({
    type: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired,
    threat: PropTypes.string.isRequired,
    conf: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThreatIntelRow;
