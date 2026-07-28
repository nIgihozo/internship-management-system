"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { internshipCreation, myInternship } from "@/lib/auth";

interface Internship {
    id: number;
    title: string;
    description: string;
    course_area: string;
    location: string;
    duration: string;
    deadline: string;
    created_at: string;
}

// Themes color

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

export default function internshipPage () {
    const router = useRouter();
    const [internship, setInternship] = useState<Internship[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState("");
    const  hasFetched = useRef(false);

    // Fields needed for creating internship
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [courseArea, setCourseArea] = useState("");
    const [location, setLocation] = useState("");
    const [duration, setDuration] = useState("");
    const [deadline, setDeadline] = useState("");

    const loadingInternship = () => {
        myInternship ()
        .then((data: Internship[]) => {
            setInternship(data);
            setLoading(false);
        })
        .catch((err) =>{
            if (err.message === "NO_TOKEN" || err.message === "SESSION_EXPIRED") {
                router.push("/login");
            } else {
                setError("Failed to load internships");
                setLoading(false);
            }
        });
    };
    
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        loadingInternship();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});
        setError("");

        // Field Errors
        const newErrors: Record<string, string> = {};
        if (!title) newErrors.tittle = "Title is Required";
        if (!description) newErrors.description = "Description is Required";
        if (!courseArea) newErrors.courseArea = "Course Area is Required";
        if (!location) newErrors.location = "Location is Required";
        if (!duration) newErrors.duration = "Duration is Required";
        if (!deadline) newErrors.deadline = "Deadline is Required";

        if (Object.keys(newErrors).length > 0) {
            setFieldErrors(newErrors);
            return;
        }

        setSubmitting(true);
        try {
            await internshipCreation({
                title,
                description,
                course_area: courseArea,
                location,
                duration,
                deadline,
            });

            setTitle("");
            setDescription("");
            setCourseArea("");
            setLocation("");
            setDuration("");
            setDeadline("");
            setShowForm(false);
            loadingInternship();
        } catch (err: any) {
            if (err.data && typeof err.data === 'object') {
                const backendErrors: Record<string, string> = {};
                for (const key in err.data) {
                    backendErrors[key] = Array.isArray(err.data[key]) ? err.data[key][0]: err.data[key];
                }
                setFieldErrors(backendErrors);
            } else {
                setError("Enable to post internship. Please Try again!");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const FieldError = ({ field }: { field: string}) =>
        fieldErrors[field] ? (
            <p style={{ color: "#d32f2f", fontSize: "13px", marginTop: "4px", marginBottom: 0 }}>{fieldErrors[field]}</p>
        ): null;

        if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ color: SKY_BLUE, fontWeight: 500 }}>Loading internships...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Internship postings</h1>
          <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Manage the opportunities you've posted</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ padding: "10px 18px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}
        >
          {showForm ? "Cancel" : "+ Post internship"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", backgroundColor: "#ffebee", padding: "12px", borderRadius: "6px", marginBottom: "20px", fontSize: "14px", border: "1px solid #ffcdd2" }}>
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Frontend Developer Intern" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
            <FieldError field="title" />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the role and responsibilities" rows={4} style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontFamily: "inherit" }} />
            <FieldError field="description" />
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "14px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Course area</label>
              <input type="text" value={courseArea} onChange={(e) => setCourseArea(e.target.value)} placeholder="e.g., Software Development" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
              <FieldError field="course_area" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Kigali, Rwanda" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
              <FieldError field="location" />
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Duration</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 3 months" style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
              <FieldError field="duration" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Deadline</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }} />
              <FieldError field="deadline" />
            </div>
          </div>

          <button type="submit" disabled={submitting} style={{ width: "100%", padding: "14px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: submitting ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "16px", opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Posting..." : "Post internship"}
          </button>
        </form>
      )}

      {internship.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888", backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>You haven't posted any internships yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {internship.map((item) => (
            <div key={item.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px" }}>
              <p style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>{item.title}</p>
              <p style={{ fontSize: "13px", color: "#666", margin: "0 0 8px" }}>{item.course_area} · {item.location} · {item.duration}</p>
              <p style={{ fontSize: "13px", color: SKY_BLUE, margin: 0 }}>Deadline: {item.deadline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}