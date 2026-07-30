"use client";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const reports = [
  { id: 1, student: "Gael Manzi", company: "Igihozo Technologies", week: "Week 3", attendance: "5/5 days", grade: "A", tasks: "Completed site inspection checklist, reviewed safety protocols." },
  { id: 2, student: "Kellia Uwamahoro", company: "Zora Tech", week: "Week 3", attendance: "4/5 days", grade: "B+", tasks: "Built login page UI, fixed responsive layout bugs." },
  { id: 3, student: "Irakoze Celi", company: "Linknet Rwanda", week: "Week 2", attendance: "5/5 days", grade: "A-", tasks: "Configured office network switches, documented setup." },
];

export default function SupervisorReportsPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Progress reports</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Weekly reports submitted by companies for your students</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {reports.map((report) => (
          <div key={report.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 2px" }}>{report.student}</p>
                <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{report.company} · {report.week}</p>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", backgroundColor: LIGHT_SKY, color: DARK_BLUE }}>
                Grade: {report.grade}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#666", margin: "0 0 6px" }}>Attendance: {report.attendance}</p>
            <p style={{ fontSize: "13px", color: "#444", margin: 0, lineHeight: 1.5 }}>{report.tasks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}