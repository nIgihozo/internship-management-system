"use client";

import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, MapPin, Mail, Phone, FileText } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const initialPending = [
  {
    id: 1,
    name: "Zora Tech",
    type: "Company",
    submitted: "2026-07-28",
    representative: "David Nkurunziza",
    role: "HR Manager",
    sector: "Software Development",
    location: "Kigali, Rwanda",
    email: "careers@zoratech.com",
    phone: "+250 788 123 456",
    registrationNumber: "RDB/45231/2026",
  },
  {
    id: 2,
    name: "ITS Kigali",
    type: "School",
    submitted: "2026-07-27",
    representative: "Manzi Igihozo",
    role: "School Supervisor",
    sector: "TVET Institution",
    location: "Kigali, Rwanda",
    email: "admin@itskigali.ac.rw",
    phone: "+250 788 234 567",
    registrationNumber: "MINEDUC/1892/2020",
  },
  {
    id: 3,
    name: "Linknet Rwanda",
    type: "Company",
    submitted: "2026-07-25",
    representative: "Sarah Uwera",
    role: "Operations Lead",
    sector: "Networking",
    location: "Kigali, Rwanda",
    email: "info@linknet.rw",
    phone: "+250 788 345 678",
    registrationNumber: "RDB/38217/2025",
  },
];

export default function AdminVerifyPage() {
  const [pending, setPending] = useState(initialPending);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDecision = (id: number) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
    setExpandedId(null);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Verify registrations</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Approve new company and school registrations</p>
      </div>

      {pending.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888", backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>No pending registrations.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {pending.map((p) => {
            const isExpanded = expandedId === p.id;
            return (
              <div key={p.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", overflow: "hidden" }}>
                <div
                  onClick={() => toggleExpand(p.id)}
                  style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                >
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 2px" }}>{p.name}</p>
                    <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{p.type} · Submitted {p.submitted}</p>
                  </div>
                  {isExpanded ? <ChevronUp size={18} color="#888" /> : <ChevronDown size={18} color="#888" />}
                </div>

                {isExpanded && (
                  <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${LIGHT_SKY}`, paddingTop: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: 600, color: SKY_BLUE, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Representative</p>
                        <p style={{ fontSize: "14px", color: DARK_BLUE, margin: 0 }}>{p.representative} · {p.role}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: 600, color: SKY_BLUE, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Sector</p>
                        <p style={{ fontSize: "14px", color: DARK_BLUE, margin: 0 }}>{p.sector}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: 600, color: SKY_BLUE, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Registration number</p>
                        <p style={{ fontSize: "14px", color: DARK_BLUE, margin: 0 }}>{p.registrationNumber}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: 600, color: SKY_BLUE, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Location</p>
                        <p style={{ fontSize: "14px", color: DARK_BLUE, margin: 0 }}>{p.location}</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Mail size={14} color="#888" />
                        <span style={{ fontSize: "13px", color: "#444" }}>{p.email}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Phone size={14} color="#888" />
                        <span style={{ fontSize: "13px", color: "#444" }}>{p.phone}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => handleDecision(p.id)} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "8px 16px", background: "#1a7f4e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                        <Check size={14} /> Verify
                      </button>
                      <button onClick={() => handleDecision(p.id)} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "8px 16px", background: "#c62828", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}