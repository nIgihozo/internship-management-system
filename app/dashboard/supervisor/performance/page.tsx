"use client";

const DARK_BLUE = "#002855";
const SKY_BLUE = "#00b4d8";
const LIGHT_SKY = "#e0f2fe";

const performances = [
  { id: 1, student: "Gael Manzi", company: "Igihozo Technologies", description: "This student is performing wonderfully, always on time either coming and delivering tasks.", status: "Excellent" },
  { id: 2, student: "Kellia Uwamahoro", company: "Zora Tech", description: "This student is performing well, attending everyday and deliver tasks on time but she keeps coming late", status: "Very Good" },
  { id: 3, student: "Irakoze Celine", company: "Linknet Rwanda", description: "This student attend sometimes and not delivering tasks on the time", status: "Good" },
  { id: 4, student: "Cyusa Iranzi Jr.", company: "Igihozo Technologies", description: "This student attend once in a while and he does not delivered any tasks on time, we need support from you in order to be able to help him to perform like other students", status: "Needs Improvement" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  "Excellent": { bg: "#e6f7ee", color: "#1a7f4e" },
  "Very Good": { bg: "#e0f2fe", color: "#00688f" },
  "Good": { bg: "#fff8e1", color: "#a06a00" },
  "Needs Improvement": { bg: "#ffebee", color: "#c62828" },
};

export default function PerformancePage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 4px" }}>Performance status</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Monitor each student's performance without in-person visits</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {performances.map((p) => {
          const style = STATUS_STYLES[p.status];
          return (
            <div key={p.id} style={{ backgroundColor: "#fff", border: `1px solid ${LIGHT_SKY}`, borderRadius: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK_BLUE, margin: "0 0 2px" }}>{p.student}</p>
                <p style={{ fontSize: "13px", color: SKY_BLUE , margin: 0 }}>{p.company}</p>
                <p style={{ fontSize: "13px", color: "black", margin: 0 }}>{p.description}</p>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, padding: "6px 14px", borderRadius: "20px", backgroundColor: style.bg, color: style.color }}>
                {p.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}