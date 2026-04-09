import { makeAlert } from "./alertData";

function withRuleNumber(rule, index) {
  if (/#\d+\b/.test(rule)) {
    return rule;
  }

  return `${rule} #${4100 + index}`;
}

export const ATTACK_SIMULATIONS = [
  {
    id: "ransomware",
    label: "Ransomware Activity",
    desc: "Mass encryption behavior on a workstation.",
    alerts: [
      {
        severity: "CRITICAL",
        category: "Ransomware",
        rule: "Mass File Encryption Detected",
        message: "Rapid file modifications indicate possible ransomware",
        src: "10.0.0.55",
        dst: "10.0.0.55",
        user: "backup_usr",
        raw: "high-volume rename/write activity across user profile",
      },
      {
        severity: "HIGH",
        category: "Data Exfil",
        rule: "Large Outbound Transfer",
        message: "Unusual outbound transfer observed before encryption burst",
        src: "10.0.0.55",
        dst: "91.108.56.12",
        user: "backup_usr",
        raw: "proxy: outbound transfer exceeded baseline",
      },
    ],
  },
  {
    id: "brute-force",
    label: "SSH Brute Force",
    desc: "Repeated SSH login attempts against a Linux host.",
    alerts: [
      {
        severity: "HIGH",
        category: "Brute Force",
        rule: "SSH Login Failures Spike",
        message: "Multiple failed SSH logins detected for user root",
        src: "185.220.101.44",
        dst: "192.168.1.10",
        user: "root",
        raw: "sshd: Failed password for root from 185.220.101.44",
      },
      {
        severity: "CRITICAL",
        category: "Brute Force",
        rule: "SSH Brute Force Threshold Reached",
        message: "Failed SSH logins crossed threshold on production host",
        src: "185.220.101.44",
        dst: "192.168.1.10",
        user: "root",
        raw: "sshd: authentication failures reached policy threshold",
      },
    ],
  },
  {
    id: "phishing",
    label: "Phishing Email",
    desc: "Suspicious email click leading to endpoint activity.",
    alerts: [
      {
        severity: "HIGH",
        category: "Phishing",
        rule: "Suspicious Link Clicked",
        message: "User clicked a flagged phishing link from email",
        src: "198.51.100.87",
        dst: "10.0.0.42",
        user: "jdoe",
        raw: "mail-gateway: user clicked hxxp://verify-login-secure[.]com",
      },
      {
        severity: "HIGH",
        category: "Malware",
        rule: "Office Child Process Spawned",
        message: "Word launched a shell shortly after email interaction",
        src: "10.0.0.42",
        dst: "10.0.0.42",
        user: "jdoe",
        raw: "WINWORD.EXE -> powershell.exe",
      },
    ],
  },
  {
    id: "port-scan",
    label: "Port Scan",
    desc: "Reconnaissance traffic probing multiple exposed services.",
    alerts: [
      {
        severity: "MEDIUM",
        category: "Recon",
        rule: "Sequential Port Probe",
        message: "Sequential connection attempts detected across open ports",
        src: "203.0.113.77",
        dst: "10.0.0.80",
        raw: "nmap-style SYN probes observed on ports 22, 80, 443, 8080",
      },
      {
        severity: "MEDIUM",
        category: "Recon",
        rule: "Host Discovery Sweep",
        message: "Single source probing multiple internal services",
        src: "203.0.113.77",
        dst: "10.0.0.80",
        raw: "ICMP and TCP discovery traffic exceeded reconnaissance baseline",
      },
    ],
  },
];

export function buildSimulationEvents(simulation, rules = []) {
  return simulation.alerts.map((alert, index) =>
    makeAlert({
      ...alert,
      rule: withRuleNumber(alert.rule, index),
    }, rules)
  );
}
