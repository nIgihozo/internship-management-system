"use client";

import Link from "next/link"


   const DARK_BLUE = "#002855";
   const SKY_BLUE = "#00b4d8";
   const LIGHT_SKY = "#e0f2fe";


export default function Home() {
    
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "sans-serif", color: "#333"}}>

            {/* NAVBAR */}

            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px ", backgroundColor: DARK_BLUE, color: "#fff"}}>
                <div>
                    <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "0.5px"}}>
                        Internship Management System
                    </span>
                </div>

                <div style={{ display: "flex", gap: "15px", alignItems: "center"}}>
                    <Link href='/login' style={{ color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "8px 16px"}}>
                    Login In
                    </Link>
                    <Link href='/register' style={{ backgroundColor: SKY_BLUE, textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "8px 16px"}}>
                    Get Started
                    </Link>


                </div>
            </nav>
            {/* HERO SECTION */}
            <header style={{ backgroundColor: DARK_BLUE, color: "#fff", padding: "80px 8% 100px", textAlign: "center"}}>
                <div style={{ maxWidth: "850px", margin: "0 auto"}}>
                    <span style={{ color: SKY_BLUE, fontWeight: "bold", fontSize: "14px", textTransform: "upperCase", letterSpacing: "1.5px"}}>
                        Academic Foundation. Industry Execution
                    </span>
                    <h1 style={{ fontSize: "35px", fontWeight: "800", marginTop: "16px", marginBottom: "20px", lineHeight: "1.2"}}>
                        Internship Management Platform
                    </h1>
                    <p style={{ fontSize: "15px", color: LIGHT_SKY, lineHeight: "1.5", marginBottom: "35px" }}>
                        Connecting TVET students with verified company to secure their internships while allowing thier school supervisor to be with them remotely. Ensuring smooth communication while providing quality education to our students.
                    </p>
                    <p style={{ fontSize: "14px", color: LIGHT_SKY, fontWeight: "bold", lineHeight: "1.5", marginBottom: "50px", marginTop: "20px"}}>
                        Ready to start your journey with us?
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px"}}>
                        <Link href="/register" style={{ backgroundColor: SKY_BLUE, color: "#fff", padding: "14px 20px", borderRadius: "6px", fontWeight: "bold", fontSize: "14px", textDecoration: "none"}}>
                        Start Here
                        </Link>
                        <Link href="/login" style={{ backgroundColor: "transparent", color: "#fff", padding: "14px 20px", borderRadius: "6px", fontWeight: "bold", fontSize: "14px", textDecoration: "none"}}>
                        Portal Login
                        </Link>
                    </div>
                </div>
            </header>

            {/* Role Based and Features Section */}
            <section style={{ padding: "80px 8%", backgroundColor: "#f8fafc"}}>
                <div style={{ textAlign: "center", marginBottom: "30px"}}>
                    <h2 style={{ fontSize: "18px", color: DARK_BLUE, fontWeight: "700"}}>
                        Built for TVET Students Who Are In The Internship Period 
                    </h2>
                    <p style={{ color: "#999", fontSize: "16px", marginTop: "8px"}}>
                        Select your qualified role to get started
                    </p>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", maxWidth: "1000px", margin: "0 auto"}}>

                    {/* Student Card */}
                    <div style={{ backgroundColor: DARK_BLUE, padding: "30px", borderRadius: "10px", border: "1px soild #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"}}>
                        <h3 style={{fontSize: "20px", color: SKY_BLUE, marginBottom: "10px"}}>
                            TVET STUDENT
                        </h3>
                        <p style={{ color: "#fff", lineHeight: "1.5", marginBottom: "20px"}}>
                            Explore verified opportunity replacement and keep updated about your progress.
                        </p>
                        <Link href="/register" style={{color: SKY_BLUE, fontWeight: "bold", textDecoration: "none"}}>
                        Join us as Student 
                        </Link>

                    </div>
                     <div style={{ backgroundColor: DARK_BLUE, padding: "30px", borderRadius: "10px", border: "1px soild #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"}}>
                        <h3 style={{fontSize: "20px", color: SKY_BLUE, marginBottom: "10px"}}>
                            SCHOOL SUPERVISOR
                        </h3>
                        <p style={{ color: "#fff", lineHeight: "1.5", marginBottom: "20px"}}>
                            Visit and monitor your student in their internship replacement remotely.
                        </p>
                        <Link href="/register" style={{color: SKY_BLUE, fontWeight: "bold", textDecoration: "none"}}>
                        Join us as School Supervisor 
                        </Link>

                    </div>
                     <div style={{ backgroundColor: DARK_BLUE, padding: "30px", borderRadius: "10px", border: "1px soild #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"}}>
                        <h3 style={{fontSize: "20px", color: SKY_BLUE, marginBottom: "10px"}}>
                            COMPANY
                        </h3>
                        <p style={{ color: "#fff", lineHeight: "1.5", marginBottom: "20px"}}>
                            Post internship slots that are available, get qualified TVET students and monitor workplace assessment
                        </p>
                        <Link href="/register" style={{color: SKY_BLUE, fontWeight: "bold", textDecoration: "none"}}>
                        Join us as Company
                        </Link>
                    </div>
                </div>  
            </section> 
            {/* Documentation Section */}
<section style={{ padding: "80px 8%", backgroundColor: "#ffffff" }}>
    <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "18px", color: DARK_BLUE, fontWeight: "700" }}>
            Resources & Documentation
        </h2>
        <p style={{ color: "#999", fontSize: "16px", marginTop: "8px" }}>
            Everything you need to get started on the platform
        </p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>

        {/* FAQ Card */}
        <div style={{ backgroundColor: "#f8fafc", padding: "28px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "17px", color: DARK_BLUE, marginBottom: "10px", fontWeight: "700" }}>
                Frequently Asked Questions
            </h3>
            <p style={{ color: "#555", lineHeight: "1.5", marginBottom: "20px", fontSize: "14px" }}>
                Answers to common questions for students, supervisors, and companies. Available inside your dashboard once logged in.
            </p>
            <Link href="/login" style={{ color: SKY_BLUE, fontWeight: "bold", textDecoration: "none", fontSize: "14px" }}>
                Log in to view FAQs →
            </Link>
        </div>

        {/* Video Tutorial Card */}
        <div style={{ backgroundColor: "#f8fafc", padding: "28px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "17px", color: DARK_BLUE, marginBottom: "10px", fontWeight: "700" }}>
                Video Tutorial
            </h3>
            <p style={{ color: "#555", lineHeight: "1.5", marginBottom: "20px", fontSize: "14px" }}>
                A short walkthrough showing first-time users how to navigate the platform.
            </p>
            <a href="/tutorial.mp4" target="_blank" rel="noopener noreferrer" style={{ color: SKY_BLUE, fontWeight: "bold", textDecoration: "none", fontSize: "14px" }}>
                Watch tutorial →
            </a>
        </div>

        {/* User Manuals Card */}
        <div style={{ backgroundColor: "#f8fafc", padding: "28px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "17px", color: DARK_BLUE, marginBottom: "10px", fontWeight: "700" }}>
                User Manuals
            </h3>
            <p style={{ color: "#555", lineHeight: "1.5", marginBottom: "16px", fontSize: "14px" }}>
                Step-by-step PDF guides for each role:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href="/manuals/Student_User_Manual.pdf" target="_blank" rel="noopener noreferrer" style={{ color: SKY_BLUE, fontWeight: "600", textDecoration: "none", fontSize: "14px" }}>
                    Student manual →
                </a>
                <a href="/manuals/Supervisor_User_Manual.pdf" target="_blank" rel="noopener noreferrer" style={{ color: SKY_BLUE, fontWeight: "600", textDecoration: "none", fontSize: "14px" }}>
                    Supervisor manual →
                </a>
                <a href="/manuals/Company_User_Manual.pdf" target="_blank" rel="noopener noreferrer" style={{ color: SKY_BLUE, fontWeight: "600", textDecoration: "none", fontSize: "14px" }}>
                    Company manual →
                </a>
            </div>
        </div>

    </div>
</section> 
            <footer style={{backgroundColor: DARK_BLUE, color: "#aaa", padding: "10px 2%", textAlign: "center", fontSize: "14px", borderTop: `1px solid rgba(0,0,0,0.1)`}}>
            <p>© {new Date().getFullYear()} Internship Management System. All right reserved</p>    
            </footer>   
     </div>
    );
}