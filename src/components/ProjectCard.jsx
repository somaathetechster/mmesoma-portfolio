import { Link } from "react-router-dom";

const statusColors = {
  green: { bg: "var(--green-lo)", text: "var(--green)", dot: "#16A34A" },
  amber: { bg: "var(--amber-lo)", text: "var(--amber)", dot: "#D97706" },
};

export default function ProjectCard({ project, index }) {
  const sc = statusColors[project.statusColor] ?? statusColors.amber;

  return (
    <Link
      to={`/project/${project.id}`}
      style={{ display: "block", textDecoration: "none" }}
    >
      <article style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "var(--border2)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image area */}
        <div style={{
          height: 200, background: "var(--bg3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderBottom: "1px solid var(--border)",
          position: "relative", overflow: "hidden",
        }}>
          {project.cover ? (
            <img src={project.cover} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "var(--accent-lo)",
                border: "1px solid rgba(45,91,227,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 8px",
                fontFamily: "var(--disp)", fontSize: 20, fontWeight: 700,
                color: "var(--accent)",
              }}>
                {project.name[0]}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: 1 }}>
                ADD SCREENSHOT
              </div>
            </div>
          )}
          {/* Index label */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            fontFamily: "var(--mono)", fontSize: 10,
            color: "var(--text3)", letterSpacing: 0.5,
          }}>
            0{index + 1}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "22px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <h3 style={{
              fontFamily: "var(--disp)", fontSize: 18, fontWeight: 700,
              color: "var(--text)", letterSpacing: "-0.3px",
            }}>
              {project.name}
            </h3>
            <span style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 500, color: sc.text,
              background: sc.bg, padding: "3px 9px", borderRadius: 100,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot, flexShrink: 0 }} />
              {project.status}
            </span>
          </div>

          <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 14, lineHeight: 1.6 }}>
            {project.tagline}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)",
              background: "var(--accent-lo)", padding: "3px 8px",
              borderRadius: 4, letterSpacing: 0.3,
            }}>
              {project.category}
            </span>
            <span style={{ fontSize: 12, color: "var(--text3)" }}>
              View case study →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
