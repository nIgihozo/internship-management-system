"use client";

import { Users, Building2, GraduationCap, AlertTriangle } from "lucide-react";

const DARK_BLUE = "#002855";
const LIGHT_SKY = "#e0f2fe";

const stats = [
  { label: "Total users", value: 187, icon: Users, bg: LIGHT_SKY, color: DARK_BLUE },
  { label: "Companies", value: 30, icon: Building2, bg: "#a7f0c1", color: "#1a7f4e" },
  { label: "Schools", value: 12, icon: GraduationCap, bg: "#ffd899", color: "#a06a00" },
  { label: "Open disputes", value: 2, icon: AlertTriangle, bg: "#ffb3b3", color: "#c62828" },
];

const recentActivity = [
  { action: "New company registered", detail: "Zora Tech", time: "2 hours ago" },
  { action: "Student account created", detail: "Kellia Uwamahoro", time: "3 hours ago" },
  { action: "Dispute reported", detail: "Igihozo Technologies vs. Student", time: "5 hours ago" },
  { action: "School verified", detail: "ITS Kigali", time: "1 day ago" },
];

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>System overview</h1>
      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 24px" }}>Monitor platform-wide activity and manage accounts</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{ backgroundColor: stat.bg, borderRadius: "10px", padding: "16px" }}>
              <Icon size={18} color={stat.color} style={{ marginBottom: "8px" }} />
              <p style={{ fontSize: "12px", color: stat.color, margin: "0 0 4px", fontWeight: 600 }}>{stat.label}</p>
              <p style={{ fontSize: "24px", fontWeight: 700, color: stat.color, margin: 0 }}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 12px" }}>Recent activity</h2>
      <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", overflow: "hidden" }}>
        {recentActivity.map((item, i) => (
          <div key={i} style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", borderBottom: i !== recentActivity.length - 1 ? `1px solid ${LIGHT_SKY}` : "none" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: DARK_BLUE, margin: "0 0 2px" }}>{item.action}</p>
              <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{item.detail}</p>
            </div>
            <span style={{ fontSize: "12px", color: "#999" }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}