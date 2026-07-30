"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const faqs = [
  { q: "How do I see students from my school?", a: "Go to Students to view every enrolled student from your school currently in the internship program." },
  { q: "How do I view a company's details?", a: "Go to Partner Companies and click on any company to expand its contact and placement details." },
  { q: "How do I review a student's weekly progress?", a: "Progress Reports lists every report submitted by companies for students under your supervision." },
  { q: "What do the performance ratings mean?", a: "Excellent, Very Good, Good, and Needs Improvement reflect the company's assessment of each student's ongoing performance." },
  { q: "A student's information looks incorrect. What do I do?", a: "Contact admin below with the student's name and the correction needed." },
];

export default function HelpPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSubject("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Help & support</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Get help or reach out to the admin team</p>
      </div>

      {/* CONTACT OPTIONS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px", textAlign: "center" }}>
          <Mail size={20} color={SKY_BLUE} style={{ marginBottom: "8px" }} />
          <p style={{ fontSize: "13px", fontWeight: 600, color: DARK_BLUE, margin: "0 0 2px" }}>Email</p>
          <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>support@imsystem.rw</p>
        </div>
        <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px", textAlign: "center" }}>
          <Phone size={20} color={SKY_BLUE} style={{ marginBottom: "8px" }} />
          <p style={{ fontSize: "13px", fontWeight: 600, color: DARK_BLUE, margin: "0 0 2px" }}>Phone</p>
          <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>+250 788 000 000</p>
        </div>
        <div style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px", textAlign: "center" }}>
          <MessageCircle size={20} color={SKY_BLUE} style={{ marginBottom: "8px" }} />
          <p style={{ fontSize: "13px", fontWeight: 600, color: DARK_BLUE, margin: "0 0 2px" }}>Response time</p>
          <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Within 24 hours</p>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 12px" }}>Contact admin</h2>

        {submitted && (
          <div style={{ backgroundColor: "#e6f7ee", color: "#1a7f4e", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
            Your message has been sent. Admin will get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px", padding: "20px" }}>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Issue with my application"
              required
              style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}` }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: DARK_BLUE }}>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue you're facing"
              rows={5}
              required
              style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: `2px solid ${LIGHT_SKY}`, fontFamily: "inherit" }}
            />
          </div>
          <button type="submit" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: DARK_BLUE, color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}>
            <Send size={16} /> Send message
          </button>
        </form>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 12px" }}>Frequently asked questions</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "14px 20px" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: DARK_BLUE, margin: "0 0 6px" }}>{faq.q}</p>
            <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.5 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}