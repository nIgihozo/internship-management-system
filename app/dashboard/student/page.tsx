"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStudentProfile } from "@/lib/auth";

interface StudentProfile {
  id: number;
  email: string;
  full_name: string;
  tvetstudent_id: string;
  course_area: string;
  level: string;
  school_name: string;
}
const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const recentApplications = [
  { title: "Frontend Developer Intern", company: "Xxx Tech", status: "Accepted", date: "2026-07-28" },
  { title: "Site Audit Intern", company: "Igihozo Technologies", status: "Accepted", date: "2026-07-25" },
  { title: "Network Support Intern", company: "Linknet Rwanda", status: "Pending", date: "2026-07-20" },
  { title: "IT Support Intern", company: "ThinkNet Rwanda", status: "Pending", date: "2026-07-19" },
  { title: "UI/UX Intern", company: "SkyNet Rwanda", status: "Pending", date: "2026-07-15" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "#fff8e1", color: "#a06a00" },
  Accepted: { bg: "#e6f7ee", color: "#1a7f4e" },
  Rejected: { bg: "#ffebee", color: "#c62828" },
};



export default function StudentDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStudentProfile()
      .then((data: StudentProfile) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "NO_TOKEN" || err.message === "SESSION_EXPIRED") {
          router.push("/login");
        } else {
          setError("Failed to load your dashboard. Please try again.");
          setLoading(false);
        }
      });
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: SKY_BLUE, fontWeight: 500 }}>Loading dashboard...</p>
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

  // Stats cards
  const stats = {
    applicationsSent: 5,
    accepted: 2,
    pending: 3,
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>
        Welcome back, {profile?.full_name}
      </h1>
      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 24px" }}>
        {profile?.course_area} · {profile?.level}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: LIGHT_SKY, borderRadius: "10px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: DARK_BLUE, margin: "0 0 4px", fontWeight: 600 }}>Applications sent</p>
          <p style={{ fontSize: "26px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stats.applicationsSent}</p>
        </div>
        <div style={{ backgroundColor: "lightgreen", borderRadius: "10px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: DARK_BLUE, margin: "0 0 4px", fontWeight: 600 }}>Accepted</p>
          <p style={{ fontSize: "26px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stats.accepted}</p>
        </div>
        <div style={{ backgroundColor: "orange", borderRadius: "10px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: DARK_BLUE, margin: "0 0 4px", fontWeight: 600 }}>Pending</p>
          <p style={{ fontSize: "26px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stats.pending}</p>
        </div>
      </div>

      {/* RECENT APPLICATIONS */}
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 12px" }}>Recent applications</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {recentApplications.map((app) => {
          const style = STATUS_STYLES[app.status];
          return (
            <div key={app.title} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 2px" }}>{app.title}</p>
                <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{app.company} · {app.date}</p>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", backgroundColor: style.bg, color: style.color }}>
                {app.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}