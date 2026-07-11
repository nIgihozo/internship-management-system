"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function loginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const DARK_BLUE = "#002855";
    const SKY_BLUE = "#00b4d8";
    const LIGHT_SKY = "#e0f2fe";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        alert(`Logged in successfully! Redirecting to home page...`);
        router.push("/app/page");
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
            {/* THE LOGIN FORM */}
            <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 60px" }}>
                <div style={{ width: "100%", maxWidth: "450px" }}>
                    
                    <div style={{ marginBottom: "30px" }}>
                        <h2 style={{ fontSize: "32px", fontWeight: "800", color: DARK_BLUE, marginBottom: "8px" }}>Login</h2>
                        <p style={{ color: "#666", fontSize: "15px" }}>Welcome Back, We are happy to have you again.</p>
                    </div>
                    
                    {error && (
                        <div style={{ color: "red", backgroundColor: "#ffebee", padding: "12px", borderRadius: "6px", marginBottom: "20px", fontWeight: "600", fontSize: "14px", border: "1px solid #ffcdd2" }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} style={{ width: "100%" }}>
                        <div style={{ marginBottom: "14px" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@gmail.com" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }} />
                        </div>

                        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }} />
                            </div>
                            </div>
                            <button type="submit" style={{ width: "100%", padding: "14px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "15px" }}>
                            Login
                        </button>
                    </form>
                    </div>
            </div>
            </div>
    )


}