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

export default function StudentDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const DARK_BLUE = "#002855";
  const SKY_BLUE = "#00b4d8";
  const LIGHT_SKY = "#e0f2fe";

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
    applicationsSent: 0,
    accepted: 0,
    pending: 0,
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
        <div style={{ backgroundColor: LIGHT_SKY, borderRadius: "10px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: DARK_BLUE, margin: "0 0 4px", fontWeight: 600 }}>Accepted</p>
          <p style={{ fontSize: "26px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stats.accepted}</p>
        </div>
        <div style={{ backgroundColor: LIGHT_SKY, borderRadius: "10px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: DARK_BLUE, margin: "0 0 4px", fontWeight: 600 }}>Pending</p>
          <p style={{ fontSize: "26px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stats.pending}</p>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "20px", textAlign: "center", color: "#888" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>Recommended internships will appear here once available.</p>
      </div>
    </div>
  );
}