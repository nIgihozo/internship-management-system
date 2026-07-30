"use client";

const DARK_BLUE = "#002855";
const LIGHT_SKY = "#e0f2fe";

const logs = [
  { action: "User login", detail: "cyusa@igihozotech.com", time: "2026-07-30 08:45" },
  { action: "Internship posted", detail: "Site Audit Intern — Igihozo Technologies", time: "2026-07-29 16:20" },
  { action: "Application accepted", detail: "Gael Manzi → Site Audit Intern", time: "2026-07-29 14:10" },
  { action: "New company registered", detail: "Zora Tech", time: "2026-07-28 11:05" },
];

export default function AdminActivityPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>System activity</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Monitor platform-wide events in real time</p>
      </div>

      <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", overflow: "hidden" }}>
        {logs.map((log, i) => (
          <div key={i} style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", borderBottom: i !== logs.length - 1 ? `1px solid ${LIGHT_SKY}` : "none" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: DARK_BLUE, margin: "0 0 2px" }}>{log.action}</p>
              <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{log.detail}</p>
            </div>
            <span style={{ fontSize: "12px", color: "#999" }}>{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}