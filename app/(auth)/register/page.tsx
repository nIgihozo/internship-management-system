"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerStudent, registerCompany, registerSupervisor } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<"student" | "company" | "supervisor">("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Core details states
    const [fullName, setFullName] = useState("");
    const [tvetStudentId, setTvetStudentId] = useState("");
    const [courseArea, setCourseArea] = useState("");
    const [level, setLevel] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [representativeRole, setRepresentativeRole] = useState("");
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
        setFieldErrors({});
        setError("");

        
        const newErrors: Record<string, string> = {};

        {/* Error messages for General Registration */}
        if (!email) newErrors.email = "Email is Required";
        if (!password) newErrors.password = "Password is Required";
        if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match. Insert same password again!"
        }
        
        {/* Error messages for Student Profile Registration */}
        if (role === "student") {
            if (!fullName) newErrors.fullName = "Full Name is Required";
            if (!tvetStudentId) newErrors.tvetStudentId = "Student ID is Required";
            if (!schoolName) newErrors.schoolName = "School Name is Required";
            if (!courseArea) newErrors.courseArea = "Course Area is Required";
            
        }
        
        {/* Error messages for Supervisor Profile Registration */}
        if (role === "supervisor") {
            if (!fullName) newErrors.fullName = "Full Name is Required";
            if (!schoolName) newErrors.schoolName = "School Name is Required";
            if (!department) newErrors.department = "Department is Required";
        }

        {/* Error messages for Company Profile Registration */}
        if (role === "company") {
            if (!fullName) newErrors.fullName = "Full Name is Required";
            if (!companyName) newErrors.companyName = "Company Name is Required";
            if (!representativeRole) newErrors.representativeRole = "Representative Role is Required";
            if (!rdbNumber) newErrors.rdbNumber = "RDB Number is Required";
            if (!companySector) newErrors.companySector = "Company Sector is Required";
            if (!companyLocation) newErrors.companyLocation = "Company Location is Required";
            if (!companyContact) newErrors.companyContact = "Company Contact is Required";
        }
        if (Object.keys(newErrors).length > 0) {
            setFieldErrors(newErrors);
            return
        }
        setLoading(true);

          try {
        let data;

        if (role === 'student') {
            data = await registerStudent({
                email, password, password2: confirmPassword,
                full_name: fullName, tvetstudent_id: tvetStudentId,
                course_area: courseArea, school_name: schoolName,
                level: level,
            });
        } else if (role === 'company') {
            data = await registerCompany({
                email, password, password2: confirmPassword,
                company_representative_name: fullName,
                company_name: companyName, company_sector: companySector,
                rdb_registration_number: rdbNumber, company_address: companyLocation,
                representative_role: representativeRole,
            });
        } else if (role === 'supervisor') {
            data = await registerSupervisor({
                email, password, password2: confirmPassword,
                full_name: fullName, school_name: schoolName, department,
            });
        }

        localStorage.setItem('access_token', data.token.access);
        localStorage.setItem('refresh_token', data.token.refresh);

        alert('Account created successfully!');
        router.push('/login');
    } catch (err: any) {
        console.error("Registration error:", err);

        if (err.data && typeof err.data === 'object') {
            const backendErrors: Record<string, string> = {};
            for (const key in err.data) {
                const message = Array.isArray(err.data[key]) ? err.data[key][0] : err.data[key];
                backendErrors[key] = message;
            }
            setFieldErrors(backendErrors);
        } else {
            setError('Registration failed. Please check your connection and try again.');
        }
    } finally {
        setLoading(false);
    }
};

const FieldError = ({ field }: { field: string }) => 
    fieldErrors[field] ? (
        <p style={{ color: "#d32f2f", fontSize: "13px", marginTop: "4px", marginBottom: "0" }}>
            {fieldErrors[field]}
        </p>
    ) : null;
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
                             <FieldError field="email" />
                        </div>

                        
<div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
    <div style={{ flex: 1 }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Password</label>
        <div style={{ position: "relative" }}>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "12px", paddingRight: "40px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }}
            />
            <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#888" }}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
        </div>
        <FieldError field="password" />
    </div>
    
    <div style={{ flex: 1 }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Confirm Password</label>
        <div style={{ position: "relative" }}>
            <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: "12px", paddingRight: "40px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", color: "#333" }}
            />
            <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#888" }}
            >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                </div>
                <FieldError field="confirmPassword" />
                </div>
                </div>

                        <div style={{ display: "flex", alignItems: "center", margin: "25px 0" }}>
                            <div style={{ flex: 1, height: "1px", background: LIGHT_SKY }}></div>
                            <span style={{ padding: "0 10px", fontSize: "12px", color: SKY_BLUE, fontWeight: "bold", textTransform: "uppercase" }}>Profile Details</span>
                            <div style={{ flex: 1, height: "1px", background: LIGHT_SKY }}></div>
                        </div>

                        {/* Profile Inputs Section */}
                        
                        {/* Student Profile Registration */}
                        {role === "student" && (
                            <>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Full Name</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="fullName" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>TVET Student ID</label>
                                    <input type="text" value={tvetStudentId} onChange={(e) => setTvetStudentId(e.target.value)} placeholder="your student id" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="tvetStudentId" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>School Name</label>
                                    <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="e.g., Kigali School" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="schoolName" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Course Area / Trade</label>
                                    <input type="text" value={courseArea} placeholder="e.g., Software Development" onChange={(e) => setCourseArea(e.target.value)} style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="courseArea" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Level</label>
                                    <select value={level} onChange={(e: any) => { setLevel(e.target.value); setError(""); }} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontSize: "15px", backgroundColor: "#fff", color: DARK_BLUE, outline: "none" }}>
                                        <option value="level 3">Level 3</option>
                                        <option value="level 4">Level 4</option>
                                        <option value="Level 5">Level 5</option>
                                        </select>
                                </div>
                            </>
                        )}
                        
                        {/* Company Profile Registration */}
                        {role === "company" && (
                            <>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Representative Name</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="fullName" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Name</label>
                                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company registered name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="companyName" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Sector</label>
                                    <input type="text" value={companySector} onChange={(e) => setCompanySector(e.target.value)} placeholder="e.g., EdTech" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="companySector" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>RDB Registration Number</label>
                                    <input type="text" value={rdbNumber} onChange={(e) => setRdbNumber(e.target.value)} placeholder="e.g., RDB/12345/2026" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="rdbNumber" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Location</label>
                                    <input type="text" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} placeholder="e.g., Kigali, Rwanda" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="companyLocation" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Company Contact</label>
                                    <input type="text" value={companyContact} onChange={(e) => setCompanyContact(e.target.value)} placeholder="e.g., companyname@gmail.com" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="companyContact" />
                                </div>
                                 <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Representative Role</label>
                                    <input type="text" value={representativeRole} onChange={(e) => setRepresentativeRole(e.target.value)} placeholder="e.g., Cheif Operating Officer" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="representativeRole" />
                                </div>
                            </>
                        )}

                       {/* Supervisor Profile Registration */}
                        {role === "supervisor" && (
                            <>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Full Name</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="fullName" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>School Name</label>
                                    <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="e.g., Kigali School" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="schoolName" />
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: DARK_BLUE }}>Department</label>
                                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g., Teacher's Department" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
                                     <FieldError field="department" />
                                </div>
                            </>
                        )}

                       {/* Signup button */}
                        <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: loading ? "not-allowed": "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "15px" , opacity: loading ? 0.7 : 1}}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>
                     
                     {/* Redirecting to login page if user already have account */}
                    <p style={{ marginTop: "25px", fontSize: "14px", textAlign: "center", color: "#555" }}>
                        Already have an account? <span onClick={() => router.push("/login")} style={{ color: SKY_BLUE, cursor: "pointer", textDecoration: "underline", fontWeight: "600" }}>Login here</span>
                    </p>
                </div>
            </div>

        </div>
    );
}