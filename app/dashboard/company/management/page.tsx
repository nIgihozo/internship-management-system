"use client";

import { useState } from "react";
import { Check, X, FileText, Award } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const applications = [
  { id: 1, name: "Gael Manzi", position: "Site Audit Intern", school: "Kigali International School", date: "2026-07-28", status: "Pending" },
  { id: 2, name: "Kellia Uwamahoro", position: "Frontend Developer Intern", school: "ITS Kigali", date: "2026-07-27", status: "Pending" },
  { id: 3, name: "Irakoze Celi", position: "Network Support Intern", school: "Kigali International School", date: "2026-07-26", status: "Accepted" },
];

const activeInterns = [
  { id: 1, name: "Irakoze Celi", position: "Network Support Intern", startDate: "2026-06-01" },
  { id: 2, name: "Cyusa Iranzi Jr.", position: "Site Audit Intern", startDate: "2026-06-15" },
];

const certificates = [
  { id: 1, name: "Niyonzima Eric", position: "Software Development Intern", completedDate: "2026-06-30", issued: true },
  { id: 2, name: "Uwase Diane", position: "Marketing Intern", completedDate: "2026-07-15", issued: false },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "#fff8e1", color: "#a06a00" },
  Accepted: { bg: "#e6f7ee", color: "#1a7f4e" },
  Rejected: { bg: "#ffebee", color: "#c62828" },
};

type Tab = "applications" | "reports" | "certificates";

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<Tab>("applications");
  const [appList, setAppList] = useState(applications);

  const [reportForm, setReportForm] = useState({ intern: "", attendance: "", tasks: "", grade: "", status: "" });
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const [certList, setCertList] = useState(certificates);

  const handleDecision = (id: number, decision: "Accepted" | "Rejected") => {
    setAppList((prev) => prev.map((a) => (a.id === id ? { ...a, status: decision } : a)));
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => setReportSubmitted(false), 3000);
    setReportForm({ intern: "", attendance: "", tasks: "", grade: "", status: "" });
  };

  const handleIssueCertificate = (id: number) => {
    setCertList((prev) => prev.map((c) => (c.id === id ? { ...c, issued: true } : c)));
  };

  const TABS: { key: Tab; label: string; icon: any }[] = [
    { key: "applications", label: "Applications", icon: FileText },
    { key: "reports", label: "Progress reports", icon: FileText },
    { key: "certificates", label: "Certificates", icon: Award },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Management</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Review applications, submit reports, and issue certificates</p>
      </div>

      {/* TAB SWITCHER */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: `1px solid ${LIGHT_SKY}` }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? DARK_BLUE : "#888",
                borderBottom: isActive ? `2px solid ${SKY_BLUE}` : "2px solid transparent",
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* APPLICATIONS TAB */}
      {activeTab === "applications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {appList.map((app) => {
            const statusStyle = STATUS_STYLES[app.status];
            return (
              <div key={app.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 2px" }}>{app.name}</p>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{app.position} · {app.school} · {app.date}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                    {app.status}
                  </span>
                  {app.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleDecision(app.id, "Accepted")}
                        style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 12px", background: "#1a7f4e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
                      >
                        <Check size={14} /> Accept
                      </button>
                      <button
                        onClick={() => handleDecision(app.id, "Rejected")}
                        style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 12px", background: "#c62828", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
                      >
                        <X size={14} /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PROGRESS REPORTS TAB */}
      {activeTab === "reports" && (
        <div>
          {reportSubmitted && (
            <div style={{ backgroundColor: "#e6f7ee", color: "#1a7f4e", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
              Progress report submitted successfully.
            </div>
          )}

          <form onSubmit={handleReportSubmit} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Intern</label>
              <select
                value={reportForm.intern}
                onChange={(e) => setReportForm({ ...reportForm, intern: e.target.value })}
                required
                style={{ width: "100%", padding: "12px", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "14px" }}
              >
                <option value="">Select an intern</option>
                {activeInterns.map((intern) => (
                  <option key={intern.id} value={intern.name}>{intern.name} — {intern.position}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "14px", marginBottom: "14px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Attendance</label>
                <input type="text" value={reportForm.attendance} onChange={(e) => setReportForm({ ...reportForm, attendance: e.target.value })} placeholder="e.g., 5/5 days" required style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Grade</label>
                <input type="text" value={reportForm.grade} onChange={(e) => setReportForm({ ...reportForm, grade: e.target.value })} placeholder="e.g., A" required style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Tasks completed</label>
              <textarea value={reportForm.tasks} onChange={(e) => setReportForm({ ...reportForm, tasks: e.target.value })} placeholder="Summarize this week's tasks" rows={3} required style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontFamily: "inherit" }} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Status</label>
              <select
                value={reportForm.status}
                onChange={(e) => setReportForm({ ...reportForm, status: e.target.value })}
                required
                style={{ width: "100%", padding: "12px", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "14px" }}
              >
                <option value="">Select status</option>
                <option value="On track">On track</option>
                <option value="Needs improvement">Needs improvement</option>
                <option value="Excellent">Excellent</option>
              </select>
            </div>

            <button type="submit" style={{ width: "100%", padding: "14px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}>
              Submit report
            </button>
          </form>
        </div>
      )}

      {/* CERTIFICATES TAB */}
      {activeTab === "certificates" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {certList.map((cert) => (
            <div key={cert.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 2px" }}>{cert.name}</p>
                <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{cert.position} · Completed {cert.completedDate}</p>
              </div>
              {cert.issued ? (
                <span style={{ fontSize: "12px", fontWeight: 600, padding: "6px 14px", borderRadius: "20px", backgroundColor: "#e6f7ee", color: "#1a7f4e" }}>
                  Issued
                </span>
              ) : (
                <button
                  onClick={() => handleIssueCertificate(cert.id)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
                >
                  <Award size={14} /> Issue certificate
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}