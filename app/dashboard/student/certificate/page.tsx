"use client";

import { Award, Download } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const certificateAvailable = true;

const certificate = {
  studentName: "Gael Manzi",
  position: "Site Audit Intern",
  company: "Igihozo Technologies",
  completedDate: "2026-08-15",
};

export default function CertificatePage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Certificate</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Your internship completion certificate</p>
      </div>

      {certificateAvailable ? (
        <div style={{ backgroundColor: "#fff", border: `2px solid ${SKY_BLUE}`, borderRadius: "12px", padding: "40px", textAlign: "center" }}>
          <Award size={48} color={SKY_BLUE} style={{ marginBottom: "16px" }} />
          <p style={{ fontSize: "13px", color: "#666", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Certificate of completion</p>
          <p style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 8px" }}>{certificate.studentName}</p>
          <p style={{ fontSize: "14px", color: "#444", margin: "0 0 4px" }}>{certificate.position}</p>
          <p style={{ fontSize: "14px", color: "#666", margin: "0 0 20px" }}>{certificate.company} · Completed {certificate.completedDate}</p>
          <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}>
            <Download size={16} /> Download certificate
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "40px", color: "#888", backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>Your certificate will appear here once your internship is completed.</p>
        </div>
      )}
    </div>
  );
}