"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCompanyProfile } from "@/lib/auth"; 

interface CompanyProfile {
  id: number;
  email: string;
  company_representative_name: string;
  representative_role: string;
  company_name: string;
  company_sector: string;
  rdb_registration_number: string;
  company_address: string;
}

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

export default function CompanyProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCompanyProfile()
      .then((data: CompanyProfile) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "NO_TOKEN" || err.message === "SESSION_EXPIRED") {
          router.push("/login");
        } else {
          setError("Failed to load profile details. Please try again.");
          setLoading(false);
        }
      });
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: SKY_BLUE, fontWeight: 500 }}>Profile is Loading...</p>
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

  const fields = [
    { label: "Email address", value: profile?.email },
    { label: "Company representative name", value: profile?.company_representative_name },
    { label: "Representative role", value: profile?.representative_role },
    { label: "Company name", value: profile?.company_name },
    { label: "Company sector", value: profile?.company_sector },
    { label: "Company address", value: profile?.company_address },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }} >
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px"}}>Supervisor Profile</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0}}>Your personal details</p>
      </div>

      {/* READ-ONLY PROFILE DISPLAY */}
      <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`}}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px"}}>
            {fields.map((field) =>
            <div key={field.label} style={{ padding: "16px 20px" }}>
                <p style={{ fontSize:"11px", fontWeight: 600, color: SKY_BLUE, textTransform: "uppercase", letterSpacing: "0.05rem", margin: "0 0 6px"}}>
                    {field.label}
                </p>
                <p style={{ fontSize: "16px", fontWeight: 600, color: DARK_BLUE, margin: 0}}>
                    {field.value || "—"}
                </p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
