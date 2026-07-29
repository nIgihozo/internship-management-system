"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { internshipBrowse ,applyInternship, getMyApplications } from "@/lib/auth";

interface Internship {
    id: number;
    title: string;
    description: string;
    course_area: string;
    location: string;
    duration: string;
    deadline: string;
    created_at: string;
    company_name: string;
}

// Themes color

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";


export default function BrowseInternshipsPage() {
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const [cardMessages, setCardMessages] = useState<Record<number, string>>({});
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    Promise.all([internshipBrowse(), getMyApplications()])
    .then(([internshipsData, applicationsData]) => {
      setInternships(internshipsData);
      setAppliedIds(applicationsData.map((app: any) => app.internship));
      setLoading(false);
    })
      .catch((err) => {
        if (err.message === "NO_TOKEN" || err.message === "SESSION_EXPIRED") {
          router.push("/login");
        } else {
          setError("Failed to load internships. Please try again.");
          setLoading(false);
        }
      });
  }, [router]);

  const handleApply = async (internshipId: number) => {
    setApplyingId(internshipId);
    setCardMessages((prev) => ({ ...prev, [internshipId]: "" }));

    try {
      await applyInternship(internshipId);
      setAppliedIds((prev) => [...prev, internshipId]);
    } catch (err: any) {
      if (err.message === "NO_TOKEN" || err.message === "SESSION_EXPIRED") {
        router.push("/login");
        return;
      }
      const message = err.data?.detail || "Failed to apply. Please try again.";
      setCardMessages((prev) => ({ ...prev, [internshipId]: message }));
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: SKY_BLUE, fontWeight: 500 }}>Loading internships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem", backgroundColor: "#ffebee", color: "#c62828", borderRadius: "8px", border: "1px solid #ffcdd2" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>
          Browse Internships
        </h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          Opportunities matches with your profile's course area
        </p>
      </div>

      {internships.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888", backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>
            No internships currently matches with your profile's course area. Check back soon!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {internships.map((item) => {
            const alreadyApplied = appliedIds.includes(item.id);
            const isApplying = applyingId === item.id;

            return (
              <div key={item.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>{item.title}</p>
                    <p style={{ fontSize: "13px", color: "#666", margin: "0 0 4px" }}>{item.company_name} · {item.location}</p>
                    <p style={{ fontSize: "13px", color: "#666", margin: "0 0 8px" }}>{item.duration} · Deadline: {item.deadline}</p>
                    <p style={{ fontSize: "13px", color: "#444", margin: 0, lineHeight: 1.5 }}>{item.description}</p>
                    {cardMessages[item.id] && (
                      <p style={{ fontSize: "12px", color: "#c62828", margin: "8px 0 0" }}>{cardMessages[item.id]}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleApply(item.id)}
                    disabled={alreadyApplied || isApplying}
                    style={{
                      padding: "8px 16px",
                      background: alreadyApplied ? "#ccc" : DARK_BLUE,
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: alreadyApplied || isApplying ? "not-allowed" : "pointer",
                      fontWeight: 600,
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      marginLeft: "16px",
                    }}
                  >
                    {alreadyApplied ? "Applied" : isApplying ? "Applying..." : "Apply"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}