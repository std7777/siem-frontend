export const DEFAULT_RULES = [
  { id: 1, name: "SSH Brute Force Detection", cat: "Brute Force", sev: "HIGH", on: true, hits: 341 },
  { id: 2, name: "SQL Injection Pattern", cat: "Intrusion", sev: "CRITICAL", on: true, hits: 89 },
  { id: 3, name: "Mass File Encryption", cat: "Ransomware", sev: "CRITICAL", on: true, hits: 4 },
  { id: 4, name: "Port Scan SYN Flood", cat: "Recon", sev: "MEDIUM", on: true, hits: 213 },
  { id: 5, name: "NTLM Hash Reuse", cat: "Lateral Move.", sev: "CRITICAL", on: false, hits: 12 },
  { id: 6, name: "Volumetric DDoS", cat: "DDoS", sev: "HIGH", on: true, hits: 67 },
  { id: 7, name: "Suspicious Macro Execution", cat: "Malware", sev: "HIGH", on: true, hits: 31 },
  { id: 8, name: "Outbound Large Data Transfer", cat: "Data Exfil", sev: "HIGH", on: false, hits: 8 },
  { id: 9, name: "Privilege Escalation via Token", cat: "Privilege Esc.", sev: "CRITICAL", on: true, hits: 19 },
  { id: 10, name: "DNS Tunneling", cat: "Data Exfil", sev: "MEDIUM", on: true, hits: 55 },
  { id: 11, name: "Credential Store Access", cat: "Malware", sev: "HIGH", on: true, hits: 26 },
  { id: 12, name: "Beaconing Behaviour", cat: "Malware", sev: "MEDIUM", on: false, hits: 144 },
];

