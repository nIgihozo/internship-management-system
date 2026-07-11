"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<"student" | "company" | "supervisor">("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    
    // Core details states
    const [fullName, setFullName] = useState("");
    const [tvetStudentId, setTvetStudentId] = useState("");
    const [courseArea, setCourseArea] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [rdbNumber, setRdbNumber] = useState("");
    const [companySector, setCompanySector] = useState("");
    const [companyLocation, setCompanyLocation] = useState("");
    const [companyContact, setCompanyContact] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [department, setDepartment] = useState("");

    // Colors for styling and branding
    const DARK_BLUE = "#002855";
    const SKY_BLUE = "#00b4d8";
    const LIGHT_SKY = "#e0f2fe";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password || !confirmPassword) {
            setError("Email and password fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (role === "student" && (!fullName || !tvetStudentId || !courseArea)) {
            setError("All student fields are required");
            return;
        }

        if (role === "company" && (!fullName || !companyName || !rdbNumber || !companySector || !companyLocation || !companyContact)) {
            setError("All company fields are required");
            return;
        }

        if (role === "supervisor" && (!fullName || !schoolName || !department )) {
            setError("All supervisor fields are required");
            return;
        }

        alert(`Account created successfully for ${role}! Redirecting to login page...`);
        router.push("/login");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#ffffff" }}>
            
            {/*  BRAND PANEL */}
            <div style={{ flex: "1", backgroundColor: DARK_BLUE, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "60px", color: "#ffffff", textAlign: "center", position: "relative", overflow: "hidden" }}>
                
                <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: `linear-gradient(135deg, ${SKY_BLUE}, transparent)`, opacity: 0.2 }}></div>
                <div style={{ position: "absolute", bottom: "-5%", right: "-5%", width: "250px", height: "250px", borderRadius: "50%", background: SKY_BLUE, opacity: 0.15, filter: "blur(40px)" }}></div>
                
                <div style={{ maxWidth: "460px", zIndex: 1 }}>
                    
                    <div style={{ display: "inline-flex", padding: "16px", borderRadius: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", marginBottom: "30px", border: "1px solid rgba(255,255,255,0.2)" }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={SKY_BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v5"/>
                        </svg>
                    </div>

                    <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "20px", lineHeight: "1.2" }}>
                        ACADEMIC <span style={{ color: SKY_BLUE }}>FOUNDATION</span> <span style={{ color: SKY_BLUE }}>INDUSTRY</span> EXECUTION
                    </h1>
                    
                    <p style={{ fontSize: "16px", color: LIGHT_SKY, lineHeight: "1.6", marginBottom: "40px" }}>
                        A streamlined internship management platform seamlessly connecting skilled TVET trainees, their institutional supervisors, and verified industry partners.
                    </p>

                    
                    
                </div>
            </div>

            {/* THE REGISTRATION FORM */}
            <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 60px" }}>
                <div style={{ width: "100%", maxWidth: "450px" }}>
                    
                    <div style={{ marginBottom: "30px" }}>
                        <h2 style={{ fontSize: "32px", fontWeight: "800", color: DARK_BLUE, marginBottom: "8px" }}>Create Account</h2>
                        <p style={{ color: "#666", fontSize: "15px" }}>Join the network bridging TVET Education excellence and industry.</p>
                    </div>
                    
                    {error && (
                        <div style={{ color: "red", backgroundColor: "#ffebee", padding: "12px", borderRadius: "6px", marginBottom: "20px", fontWeight: "600", fontSize: "14px", border: "1px solid #ffcdd2" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        {/* Role Section */}
                        <div style={{ marginBottom: "18px" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Select Role</label>
                            <select value={role} onChange={(e: any) => { setRole(e.target.value); setError(""); }} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", backgroundColor: "#fff", color: DARK_BLUE, outline: "none" }}>
                                <option value="student">Student</option>
                                <option value="company">Company</option>
                                <option value="supervisor">School Supervisor</option>
                            </select>
                        </div>

                        {/* Base Credentials Fields */}
                        <div style={{ marginBottom: "14px" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@gmail.com" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }} />
                        </div>

                        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Confirm Password</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", margin: "25px 0" }}>
                            <div style={{ flex: 1, height: "1px", background: LIGHT_SKY }}></div>
                            <span style={{ padding: "0 10px", fontSize: "12px", color: SKY_BLUE, fontWeight: "bold", textTransform: "uppercase" }}>Profile Details</span>
                            <div style={{ flex: 1, height: "1px", background: LIGHT_SKY }}></div>
                        </div>

                        {/* Profile Inputs Section */}
                        {role === "student" && (
                            <>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Full Name</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>TVET Student ID</label>
                                    <input type="text" value={tvetStudentId} onChange={(e) => setTvetStudentId(e.target.value)} placeholder="your student id" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Course Area / Trade</label>
                                    <input type="text" value={courseArea} placeholder="e.g., Software Development" onChange={(e) => setCourseArea(e.target.value)} style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                            </>
                        )}

                        {role === "company" && (
                            <>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Representative Name</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Name</label>
                                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company registered name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Sector</label>
                                    <input type="text" value={companySector} onChange={(e) => setCompanySector(e.target.value)} placeholder="e.g., EdTech" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>RDB Registration Number</label>
                                    <input type="text" value={rdbNumber} onChange={(e) => setRdbNumber(e.target.value)} placeholder="e.g., RDB/12345/2026" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Location</label>
                                    <input type="text" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} placeholder="e.g., Kigali, Rwanda" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Contact</label>
                                    <input type="text" value={companyContact} onChange={(e) => setCompanyContact(e.target.value)} placeholder="e.g., companyname@gmail.com" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                            </>
                        )}

                        {role === "supervisor" && (
                            <>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Full Name</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>School Name</label>
                                    <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="e.g., Kigali School" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Department</label>
                                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g., Teacher's Department" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                </div>
                            </>
                        )}

                        <button type="submit" style={{ width: "100%", padding: "14px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "15px" }}>
                            Sign Up
                        </button>
                    </form>

                    <p style={{ marginTop: "25px", fontSize: "14px", textAlign: "center", color: "#555" }}>
                        Already have an account? <span onClick={() => router.push("/login")} style={{ color: SKY_BLUE, cursor: "pointer", textDecoration: "underline", fontWeight: "600" }}>Login here</span>
                    </p>
                </div>
            </div>

        </div>
    );
}