"use client";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const weeklyReports = [
  { week: "Week 3", attendance: "5/5 days", tasks: "Completed site inspection checklist, reviewed safety protocols with team.", status: "Excellent" },
  { week: "Week 2", attendance: "4/5 days", tasks: "Assisted with project blueprint review, attended OSHA safety training.", status: "Very Good" },
  { week: "Week 1", attendance: "5/5 days", tasks: "Onboarding, introduced to team and daily site operations.", status: "Good" },
];

const currentPerformance = "Very Good";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  "Excellent": { bg: "#e6f7ee", color: "#1a7f4e" },
  "Very Good": { bg: "#e0f2fe", color: "#00688f" },
  "Good": { bg: "#fff8e1", color: "#a06a00" },
  "Needs Improvement": { bg: "#ffebee", color: "#c62828" },
};

export default function ProgressPage() {
  const currentStyle = STATUS_COLORS[currentPerformance];

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Progress</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Weekly reports and performance status from your supervisor</p>
      </div>

      {/* PERFORMANCE STATUS */}
      <div style={{ backgroundColor: currentStyle.bg, borderRadius: "12px", padding: "20px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "13px", color: currentStyle.color, margin: "0 0 4px", fontWeight: 600 }}>Current performance status</p>
          <p style={{ fontSize: "24px", fontWeight: 700, color: currentStyle.color, margin: 0 }}>{currentPerformance}</p>
        </div>
      </div>

      {/* WEEKLY REPORTS */}
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 12px" }}>Weekly reports</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {weeklyReports.map((report) => {
          const style = STATUS_COLORS[report.status] || STATUS_COLORS["Good"];
          return (
            <div key={report.week} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: 0 }}>{report.week}</p>
                <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", backgroundColor: style.bg, color: style.color }}>
                  {report.status}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "#666", margin: "0 0 6px" }}>Attendance: {report.attendance}</p>
              <p style={{ fontSize: "13px", color: "#444", margin: 0, lineHeight: 1.5 }}>{report.tasks}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}