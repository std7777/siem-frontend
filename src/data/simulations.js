import { makeAlert } from "./alertData";
import { rand, randInt } from "./utils";
import { EXT_IPS } from "./constants";

export const ATTACK_SIMULATIONS = [
  {
    id: "brute",
    label: "SSH Brute Force",
    color: "#ef4444",
    desc: "Repeated SSH login attempts",
    generate: () =>
      Array.from({ length: 8 }, (_, i) =>
        makeAlert({
          severity: i < 6 ? "HIGH" : "CRITICAL",
          category: "Brute Force",
          rule: "SSH Brute Force - Threshold Exceeded",
          message: `Failed SSH auth attempt ${i + 1}/8 for user 'root'`,
          src: "185.220.101." + randInt(1, 50),
          dst: "192.168.1.10",
          user: "root",
          raw: `sshd[${randInt(1000, 9999)}]: Failed password for root port ${randInt(1024, 65535)} ssh2`,
        })
      ),
  },
  {
    id: "sqli",
    label: "SQL Injection",
    color: "#f97316",
    desc: "SQL injection against a web app",
    generate: () =>
      Array.from({ length: 5 }, () =>
        makeAlert({
          severity: rand(["CRITICAL", "HIGH"]),
          category: "Intrusion",
          rule: "OWASP SQLi Pattern Matched",
          message: "SQL injection attempt in HTTP request body",
          src: "91.108.56." + randInt(1, 254),
          dst: "10.0.0.80",
          raw: "POST /login HTTP/1.1 | body: username=' OR '1'='1'--&password=x",
        })
      ),
  },
  {
    id: "ransomware",
    label: "Ransomware Activity",
    color: "#dc2626",
    desc: "Mass file encryption behaviour",
    generate: () => [
      makeAlert({
        severity: "CRITICAL",
        category: "Ransomware",
        rule: "Mass File Encryption Detected",
        message: "Rapid file modification across multiple directories - possible ransomware",
        dst: "192.168.1.55",
        raw: "vssadmin.exe delete shadows /all /quiet",
      }),
      makeAlert({
        severity: "CRITICAL",
        category: "Ransomware",
        rule: "Shadow Copy Deletion",
        message: "VSS snapshot deletion via vssadmin",
        dst: "192.168.1.55",
        raw: "wmic shadowcopy delete",
      }),
      makeAlert({
        severity: "HIGH",
        category: "Ransomware",
        rule: "Ransom Note Created",
        message: "README.txt written to 3,412 directories",
        dst: "192.168.1.55",
      }),
      makeAlert({
        severity: "HIGH",
        category: "Data Exfil",
        rule: "Large Outbound Transfer",
        message: "15 GB uploaded to external IP before encryption",
        dst: "192.168.1.55",
      }),
    ],
  },
  {
    id: "portscan",
    label: "Port Scan",
    color: "#eab308",
    desc: "Nmap-style port scan",
    generate: () =>
      Array.from({ length: 6 }, () =>
        makeAlert({
          severity: "MEDIUM",
          category: "Recon",
          rule: "Port Scan - SYN Flood Pattern",
          message: `SYN packet to port ${randInt(1, 1024)} - scan in progress`,
          src: "198.51.100." + randInt(1, 254),
          raw: "nmap -sS -O -p 1-1024 target",
        })
      ),
  },
  {
    id: "lateral",
    label: "Lateral Movement",
    color: "#8b5cf6",
    desc: "Pass-the-hash lateral movement",
    generate: () => [
      makeAlert({
        severity: "CRITICAL",
        category: "Lateral Move.",
        rule: "Pass-the-Hash Detected",
        message: "NTLM hash reuse across multiple hosts",
        src: "192.168.1.20",
        dst: "192.168.1.30",
        raw: "sekurlsa::pth /user:Administrator /domain:CORP /ntlm:HASH",
      }),
      makeAlert({
        severity: "HIGH",
        category: "Lateral Move.",
        rule: "WMI Remote Execution",
        message: "wmic.exe spawned on remote host via DCOM",
        src: "192.168.1.20",
        dst: "192.168.1.45",
      }),
      makeAlert({
        severity: "HIGH",
        category: "Privilege Esc.",
        rule: "Token Impersonation",
        message: "Process impersonating SYSTEM token",
        dst: "192.168.1.30",
      }),
    ],
  },
  {
    id: "ddos",
    label: "DDoS Attack",
    color: "#06b6d4",
    desc: "Volumetric traffic flood",
    generate: () =>
      Array.from({ length: 10 }, () =>
        makeAlert({
          severity: rand(["HIGH", "CRITICAL"]),
          category: "DDoS",
          rule: "Volumetric DDoS - Traffic Anomaly",
          message: `Inbound flood: ${randInt(50, 999)} Mbps above baseline`,
          src: rand(EXT_IPS) + randInt(1, 254),
          dst: "10.0.0.1",
          raw: `UDP flood | pps: ${randInt(100000, 999999)}`,
        })
      ),
  },
  {
    id: "phishing",
    label: "Phishing Email",
    color: "#ec4899",
    desc: "Spear-phishing campaign",
    generate: () => [
      makeAlert({
        severity: "HIGH",
        category: "Phishing",
        rule: "Suspicious Email Link Clicked",
        message: "User clicked malicious URL in email attachment",
        user: "jdoe",
        raw: "https://evil-corp.ru/payload.exe",
      }),
      makeAlert({
        severity: "CRITICAL",
        category: "Malware",
        rule: "Macro Execution Detected",
        message: "Office document executed VBA macro - malware dropped",
        user: "jdoe",
        raw: "WINWORD.EXE -> cmd.exe -> powershell.exe",
      }),
      makeAlert({
        severity: "HIGH",
        category: "Data Exfil",
        rule: "Credential Harvesting",
        message: "Browser credential store accessed by unknown process",
        user: "jdoe",
      }),
    ],
  },
];

