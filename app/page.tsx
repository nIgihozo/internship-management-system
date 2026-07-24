"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const DARK_BLUE = "#002855";
    const SKY_BLUE = "#00b4d8";
     const LIGHT_SKY = "#e0f2fe";

    return (
        <div style={{ 
            display: "flex", 
            minHeight: "100vh", 
            backgroundColor: DARK_BLUE, 
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center", 
            padding: "40px", 
            color: "#ffffff", 
            textAlign: "center", 
            position: "relative", 
            overflow: "hidden",
            fontFamily: "sans-serif"
        }}>
            {/* Background Decorative Elements */}
            <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: `linear-gradient(135deg, ${SKY_BLUE}, transparent)`, opacity: 0.15 }}></div>
            <div style={{ position: "absolute", bottom: "-5%", right: "-5%", width: "250px", height: "250px", borderRadius: "50%", background: SKY_BLUE, opacity: 0.1, filter: "blur(40px)" }}></div>
            
            <div style={{ maxWidth: "500px", zIndex: 1 }}>
                {/* Under Construction Icon */}
                <div style={{ display: "inline-flex", padding: "16px", borderRadius: "20px", backgroundColor: "rgba(255, 255, 255, 0.08)", marginBottom: "30px", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={SKY_BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="6" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>

                <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "16px", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
                    This page is still in <span style={{ color: SKY_BLUE }}>Progress</span>
                </h1>
                
                <p style={{ fontSize: "16px", color: "#e0f2fe", lineHeight: "1.6", marginBottom: "35px", opacity: 0.85 }}>
                    Coming Soon... We are hard at work building this section of the platform to streamline your experience.
                </p>

                {/* Back to Login Action */}
                <button 
                    onClick={() => router.push("/login")} 
                    style={{ 
                        padding: "12px 28px", 
                        background: "rgba(255, 255, 255, 0.1)", 
                        color: "#fff", 
                        border: "1px solid rgba(255,255,255,0.2)", 
                        borderRadius: "30px", 
                        cursor: "pointer", 
                        fontWeight: "600", 
                        fontSize: "14px",
                        transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
                >
                    ← Back to Login
                </button>
            </div>
        </div>
    );
}