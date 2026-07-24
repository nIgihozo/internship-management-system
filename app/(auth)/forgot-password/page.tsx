"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {forgotPassword} from "@/lib/auth";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    {/* Color Themes */}
    const DARK_BLUE = "#002855";
    const SKY_BLUE = "#00b4d8";
    const LIGHT_SKY = "#e0f2fe";

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email.")
        }
        
        setLoading(true);

        try {
            const res = await forgotPassword(email);
            setMessage(res.message || "Reset link for changing password has been sent to your email. Check it out!");

            setTimeout(() => {
                router.push("/reset-password");
            }, 3000);

        } catch (err: any) {
            setError(err.message || "Failed to send reset link.")
        } finally {
            setLoading(false);
        }
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
            {/* THE FORGOT PASSWORD FORM */}
            <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 60px" }}>
                <div style={{ width: "100%", maxWidth: "450px" }}>
                    
                    <div style={{ marginBottom: "30px" }}>
                        <h2 style={{ fontSize: "32px", fontWeight: "800", color: DARK_BLUE, marginBottom: "8px" }}>Forgot Password</h2>
                        <p style={{ color: "#666", fontSize: "15px" }}>Enter your registered email address to receive reset link.</p>
                    </div>
                    
                    {/* Error Message if the reset password link not delivered */}
                    {error && error.trim().length > 0 && (
                        <div style={{ color: "red", backgroundColor: "#ffebee", padding: "12px", borderRadius: "6px", marginBottom: "20px", border: "1px solid #ffcdd2" }}>
                            {error}
                            </div>
                        )}
                    
                    {/* Success Message if reset password link delivered */}
                    {message && message.trim().length > 0 && (
                        <div style={{ color: "green", backgroundColor: "white", padding: "12px", borderRadius: "6px", marginBottom: "20px", border: "1px solid green" }}>
                            {message}
                            </div>
                    )}
                     
                     {/* Handle reset submission form */}
                    <form onSubmit={handleResetPassword} style={{ width: "100%" }}>
                        <div style={{ marginBottom: "14px" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@gmail.com" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }} />
                        </div>
                           
                            {/* Reset Password Button */}
                            <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "15px", opacity: loading ? 0.6 : 1}}>
                            {loading ? "Sending link...": "Send Reset Link"}
                        </button>
                    </form>

                    {/* Redirecting to login page if user remembered password*/}
                    <p style={{ marginTop: "25px", fontSize: "14px", textAlign: "center", color: "#555" }}>
                        Remembered Your Password? <span onClick={() => router.push("/login")} style={{ color: SKY_BLUE, cursor: "pointer", textDecoration: "underline", fontWeight: "600" }}>Login here</span>
                    </p>
                    </div>
            </div>
            </div>
    )


}