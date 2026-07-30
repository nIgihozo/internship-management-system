"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, User, Building2 } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const disputes = [
  {
    id: 1,
    parties: "Igihozo Technologies vs. Gael Manzi",
    company: "Igihozo Technologies",
    student: "Gael Manzi",
    issue: "Disagreement over final performance grade.",
    details: "The student claims the final grade (C) does not reflect the work submitted, citing inconsistent feedback throughout the internship period. The company maintains the grade was based on attendance records and supervisor evaluations.",
    status: "Open",
    date: "2026-07-29",
  },
  {
    id: 2,
    parties: "Zora Tech vs. Kellia Uwamahoro",
    company: "Zora Tech",
    student: "Kellia Uwamahoro",
    issue: "Internship terminated early without notice.",
    details: "The internship was ended two weeks before the agreed completion date. The company cited restructuring; the student requested a partial certificate reflecting completed work. Resolved after mediation — partial certificate issued.",
    status: "Resolved",
    date: "2026-07-20",
  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Open: { bg: "#ffebee", color: "#c62828" },
  Resolved: { bg: "#e6f7ee", color: "#1a7f4e" },
};

export default function AdminDisputesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Disputes</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Resolve conflicts between companies and students</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {disputes.map((d) => {
          const style = STATUS_STYLES[d.status];
          const isExpanded = expandedId === d.id;
          return (
            <div key={d.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", overflow: "hidden" }}>
              <div
                onClick={() => toggleExpand(d.id)}
                style={{ padding: "16px 20px", cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{d.parties}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", backgroundColor: style.bg, color: style.color }}>{d.status}</span>
                    {isExpanded ? <ChevronUp size={18} color="#888" /> : <ChevronDown size={18} color="#888" />}
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{d.issue}</p>
              </div>

              {isExpanded && (
                <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${LIGHT_SKY}`, paddingTop: "16px" }}>
                  <div style={{ display: "flex", gap: "20px", marginBottom: "14px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Building2 size={14} color="#888" />
                      <span style={{ fontSize: "13px", color: "#444" }}>{d.company}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <User size={14} color="#888" />
                      <span style={{ fontSize: "13px", color: "#444" }}>{d.student}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Calendar size={14} color="#888" />
                      <span style={{ fontSize: "13px", color: "#444" }}>Reported {d.date}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: "11px", fontWeight: 600, color: SKY_BLUE, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 6px" }}>Full details</p>
                  <p style={{ fontSize: "14px", color: "#444", margin: "0 0 16px", lineHeight: 1.6 }}>{d.details}</p>

                  {d.status === "Open" && (
                    <button style={{ padding: "8px 16px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                      Mark as resolved
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}