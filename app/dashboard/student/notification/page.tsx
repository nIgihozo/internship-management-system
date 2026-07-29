"use client";

import { CheckCircle2, XCircle, Bell } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const notifications = [
  { id: 1, type: "accepted", title: "Application accepted", message: "Your application for Frontend Developer Intern at Zora Tech has been accepted.", date: "2026-07-28" },
  { id: 2, type: "rejected", title: "Application update", message: "Your application for Network Support Intern at Linknet Rwanda was not selected this time.", date: "2026-07-25" },
  { id: 3, type: "info", title: "New internship posted", message: "A new opportunity matching Construction has been posted by Igihozo Technologies.", date: "2026-07-22" },
];

const ICONS: Record<string, any> = {
  accepted: CheckCircle2,
  rejected: XCircle,
  info: Bell,
};

const COLORS: Record<string, string> = {
  accepted: "#1a7f4e",
  rejected: "#c62828",
  info: SKY_BLUE,
};

export default function NotificationsPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Notifications</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Updates on your applications and opportunities</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {notifications.map((n) => {
          const Icon = ICONS[n.type];
          return (
            <div key={n.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px", display: "flex", gap: "14px" }}>
              <Icon size={20} color={COLORS[n.type]} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>{n.title}</p>
                <p style={{ fontSize: "13px", color: "#666", margin: "0 0 6px", lineHeight: 1.5 }}>{n.message}</p>
                <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>{n.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}