"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupervisorProfile } from "@/lib/auth";

interface SupervisorProfile {
  id: number;
  email: string;
  full_name: string;
  school_name: string;
  department: string;
}

export default function SupervisorDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<SupervisorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const DARK_BLUE = "#002855";
  const SKY_BLUE = "#00b4d8";
  const LIGHT_SKY = "#e0f2fe";

  useEffect(() => {
    getSupervisorProfile()
      .then((data: SupervisorProfile) => {
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
    studentNumber: 150,
    companies: 30,

  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>
        Welcome back, {profile?.full_name}
      </h1>
      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 24px" }}>
        {profile?.department} · {profile?.school_name}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: LIGHT_SKY, borderRadius: "10px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: DARK_BLUE, margin: "0 0 4px", fontWeight: 600 }}>Student Number</p>
          <p style={{ fontSize: "26px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stats.studentNumber}</p>
        </div>
        <div style={{ backgroundColor: LIGHT_SKY, borderRadius: "10px", padding: "16px" }}>
          <p style={{ fontSize: "13px", color: DARK_BLUE, margin: "0 0 4px", fontWeight: 600 }}>Partner Companies</p>
          <p style={{ fontSize: "26px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{stats.companies}</p>
        </div>
      </div>
      
      <div style={{ backgroundColor: "#fff", border: "1px solid #e0f2fe", borderRadius: "10px", padding: "20px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#002855", marginBottom: "16px" }}>
          Most Performed Students
          </h2>
          
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#e0f2fe" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#002855", fontWeight: 600 }}>#</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#002855", fontWeight: 600 }}>Name</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#002855", fontWeight: 600 }}>Email</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#002855", fontWeight: 600 }}>Company</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#002855", fontWeight: 600 }}>Performance Status</th>
                </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Uwimana Alice", email: "uwimanaalice@gmail.com", company: "Andela Rwanda", status: "Excellent" },
                    { name: "Habimana Jean", email: "habimanajean@gmail.com", company: "MTN Rwanda", status: "Excellent" },
                    { name: "Mukamana Grace", email: "mukamanagrace@gmail.com", company: "BK TechHouse", status: "Excellent" },
                    { name: "Ikuzwe Chelsea", email: "ikuzwechelsea@gmail.com", company: "EdTech Solution", status: "Excellent"},
                    { name: "Ishimwe Kevin", email: "kevinishimwe@gmail.com", company: "Top Solution", status: "Excellent"},
                    { name: "Gasinge K Jane", email: "kjane@gmail.com", company: "N@tcom", status: "Very Good"},
                    { name: "Niyonzima Eric", email: "niyonzimaeric@gmail.com", company: "Irembo Ltd", status: "Very Good" },
                    { name: "Uwineza Sandra", email: "uwinezasandra@gmail.com", company: "RwandaOnline", status: "Very Good" },
                    { name: "Uwamahoro Kellia", email: "uwamahorokellia@gmail.com", company: "Future Generation", status: "Very Good" },
                    { name: "Ineza Sandra", email: "inezasandra@gmail.com", company: "RDB", status: "Very Good" },
                  ].map((student, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f0f0", backgroundColor: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                    <td style={{ padding: "10px 12px", color: "#666" }}>{i + 1}</td>
                    <td style={{ padding: "10px 12px", color: "#002855", fontWeight: 600 }}>{student.name}</td>
                    <td style={{ padding: "10px 12px", color: "#666" }}>{student.email}</td>
                    <td style={{ padding: "10px 12px", color: "#444" }}>{student.company}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, backgroundColor: student.status === "Excellent" ? "#dcfce7" : student.status === "Very Good" ? "#e0f2fe" : "#fef9c3", color: student.status === "Excellent" ? "#166534" : student.status === "Very Good" ? "#0369a1" : "#854d0e"}}>
                        {student.status}
                        </span>
                        </td>
                        </tr>
                       ))}
                       </tbody>
                       </table>
                       </div>

                       </div>
  );
}