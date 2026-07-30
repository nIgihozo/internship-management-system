"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const faqs = [
  { q: "How do I post a new internship opportunity?", a: "Go to Posting Internship, fill in the role details, and submit — it becomes visible to matching students immediately." },
  { q: "How do I review student applications?", a: "Go to Management to see all applications and accept or reject each one." },
  { q: "How do I submit a weekly progress report?", a: "In Management, open the Progress Reports tab, select the intern, and fill in attendance, tasks, and grade." },
  { q: "How do I issue a completion certificate?", a: "Once an intern's period is complete, go to Management > Certificates and click Issue certificate." },
  { q: "Can I edit an internship after posting it?", a: "Editing isn't available yet — contact admin below if a posting needs correcting." },
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