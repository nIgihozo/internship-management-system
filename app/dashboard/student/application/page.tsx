"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getMyApplications } from "@/lib/auth";

interface Application {
  id: number;
  internship: number;
  internship_title: string;
  company_name: string;
  student_name: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  applied_at: string;
}

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING: { bg: "#fff8e1", color: "#a06a00" },
  ACCEPTED: { bg: "#e6f7ee", color: "#1a7f4e" },
  REJECTED: { bg: "#ffebee", color: "#c62828" },
};

export default function MyApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getMyApplications()
      .then((data: Application[]) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "NO_TOKEN" || err.message === "SESSION_EXPIRED") {
          router.push("/login");
        } else {
          setError("Failed to load your applications. Please try again.");
          setLoading(false);
        }
      });
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: SKY_BLUE, fontWeight: 500 }}>Loading applications...</p>
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
          My applications
        </h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          Track the status of every internship you've applied to
        </p>
      </div>

      {applications.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888", backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>
            You haven't applied to any internships yet. Go on "Browse Internship" tab to find your match!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {applications.map((app) => {
            const statusStyle = STATUS_STYLES[app.status] || STATUS_STYLES.PENDING;
            return (
              <div key={app.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>{app.internship_title}</p>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{app.company_name} · Applied {new Date(app.applied_at).toLocaleDateString()}</p>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, padding: "6px 14px", borderRadius: "20px", backgroundColor: statusStyle.bg, color: statusStyle.color, textTransform: "capitalize" }}>
                  {app.status.toLowerCase()}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}