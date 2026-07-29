"use client";

import { Users, Eye, EyeOff, Briefcase } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const stats = [
  { label: "Posted internships", value: 15, icon: Briefcase },
  { label: "Applicant numbers", value: 100, icon: Users },
  { label: "Viewed applications", value: 60, icon: Eye },
  { label: "Unviewed applications", value: 40, icon: EyeOff },
];

const recentPostings = [
  { title: "Site Audit Intern", location: "Kicukiro, Masaka", applicants: 12, deadline: "2026-07-31" },
  { title: "Frontend Developer Intern", location: "Kigali, Rwanda", applicants: 28, deadline: "2026-08-15" },
  { title: "Network Support Intern", location: "Kigali, Rwanda", applicants: 9, deadline: "2026-08-20" },
];

const recentApplicants = [
  { name: "Gael Manzi", position: "Site Audit Intern", status: "Pending", date: "2026-07-28" },
  { name: "Kellia Uwamahoro", position: "Frontend Developer Intern", status: "Accepted", date: "2026-07-27" },
  { name: "Irakoze Celine", position: "Network Support Intern", status: "Rejected", date: "2026-07-26" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "#fff8e1", color: "#a06a00" },
  Accepted: { bg: "#e6f7ee", color: "#1a7f4e" },
  Rejected: { bg: "#ffebee", color: "#c62828" },
};

export default function CompanyDashboardPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>
        Welcome back, Cyusa Iranzi
      </h1>
      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 24px" }}>
        Chief Operating Officer · Igihozo Technologies
      </p>

      {/* STAT CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{ backgroundColor: LIGHT_SKY, borderRadius: "10px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Icon size={16} color={DARK_BLUE} />
                <p style={{ fontSize: "12px", color: DARK_BLUE, margin: 0, fontWeight: 600 }}>{stat.label}</p>
              </div>
              <p style={{ fontSize: "24px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* RECENT POSTINGS */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 12px" }}>Recent postings</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {recentPostings.map((post) => (
            <div key={post.title} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 2px" }}>{post.title}</p>
                <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{post.location} · Deadline {post.deadline}</p>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: SKY_BLUE }}>{post.applicants} applicants</span>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT APPLICANTS */}
      <div>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 12px" }}>Recent applicants</h2>
        <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", overflow: "hidden" }}>
          {recentApplicants.map((applicant, i) => {
            const statusStyle = STATUS_STYLES[applicant.status];
            return (
              <div
                key={applicant.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 20px",
                  borderBottom: i !== recentApplicants.length - 1 ? `1px solid ${LIGHT_SKY}` : "none",
                }}
              >
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: DARK_BLUE, margin: "0 0 2px" }}>{applicant.name}</p>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{applicant.position} · {applicant.date}</p>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                  {applicant.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}