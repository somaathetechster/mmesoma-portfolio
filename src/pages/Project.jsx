import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../data/projects";
import CodeBlock from "../components/CodeBlock";

const STATUS = {
  green: { dot: "#4AE8A0", label: "Live" },
  amber: { dot: "#E8944A", label: "In Development" },
};

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const idx = projects.findIndex(p => p.id === id);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  if (!project) { navigate("/"); return null; }

  const sc = STATUS[project.statusColor];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <div style={{
        padding: "140px 0 80px",
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Accent glow */}
        <div style={{
          position: "absolute", top: "-20%", right: "-5%",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accentColor}08 0%, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div className="wrap" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <Link to="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)",
            letterSpacing: "0.5px", marginBottom: 40,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text2)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}
          >← All projects</Link>

          {/* Meta row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "1px",
              color: "var(--amber)", background: "var(--amber-glow)",
              border: "1px solid var(--amber-line)",
              padding: "3px 10px", borderRadius: 4,
            }}>{project.category}</span>
            <span style={{
              display: "flex", alignItems: "center", gap: 5,
              fontFamily: "var(--mono)", fontSize: 10, fontWeight: 500,
              color: sc.dot, background: `${sc.dot}12`,
              border: `1px solid ${sc.dot}30`,
              padding: "3px 10px", borderRadius: 100,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }} />
              {sc.label}
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>{project.year}</span>
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)",
              borderBottom: "1px solid var(--border2)",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--text3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.borderColor = "var(--border2)"; }}
            >{project.url} ↗</a>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--disp)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.04,
            color: "var(--text)", marginBottom: 20,
          }}>{project.name}</h1>

          <p style={{
            fontSize: 18, color: "var(--text2)", lineHeight: 1.7,
            maxWidth: 640, marginBottom: 32,
          }}>{project.tagline}</p>

          {/* Role */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--text3)",
            letterSpacing: "0.3px",
          }}>
            <span style={{ color: "var(--border3)" }}>ROLE //</span>
            <span>{project.role}</span>
          </div>
        </div>
      </div>

      {/* ── COVER IMAGE ──────────────────────────────────── */}
      <div style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap">
          {project.cover ? (
            <img src={project.cover} alt={project.name} style={{
              width: "100%", maxHeight: 520, objectFit: "cover",
              borderRadius: "0 0 var(--r-xl) var(--r-xl)",
            }} />
          ) : (
            <div style={{
              height: 320,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 12,
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: `${project.accentColor}10`,
                border: `1px solid ${project.accentColor}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--disp)", fontSize: 32, fontWeight: 800,
                color: project.accentColor,
              }}>{project.name[0]}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "2px", textTransform: "uppercase" }}>
                Replace with screenshot
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── IMPACT METRICS ───────────────────────────────── */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
            {project.impact.map((m, i) => (
              <div key={i} style={{
                paddingRight: 48, marginRight: 48,
                borderRight: i < project.impact.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  fontFamily: "var(--disp)", fontSize: 28, fontWeight: 800,
                  letterSpacing: "-1px", color: "var(--text)",
                }}>{m.metric}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginTop: 4, letterSpacing: "0.5px" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CASE STUDY BODY ──────────────────────────────── */}
      <div className="wrap" style={{ padding: "80px 48px 100px", maxWidth: "calc(var(--max))" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 80, alignItems: "start" }}>

          {/* Main content */}
          <div>
            {/* Problem */}
            <CaseSection label="The Problem">
              {project.problem.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.82, marginBottom: i < project.problem.split("\n\n").length - 1 ? 18 : 0 }}>
                  {para}
                </p>
              ))}
            </CaseSection>

            {/* AI Implementation */}
            <CaseSection label="The AI Implementation">
              {project.aiImplementation.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.82, marginBottom: i < project.aiImplementation.split("\n\n").length - 1 ? 18 : 0 }}>
                  {para}
                </p>
              ))}
            </CaseSection>

            {/* Code */}
            {project.snippets?.length > 0 && (
              <CaseSection label="Implementation Detail">
                <p style={{ fontSize: 13.5, color: "var(--text3)", marginBottom: 4 }}>
                  Code excerpts showing how the AI layer was designed and implemented.
                </p>
                {project.snippets.map((s, i) => (
                  <CodeBlock key={i} filename={s.filename} desc={s.desc} code={s.code} />
                ))}
              </CaseSection>
            )}

            {/* Key insight */}
            <div style={{
              background: "var(--amber-glow)",
              border: "1px solid var(--amber-line)",
              borderLeft: `3px solid var(--amber)`,
              borderRadius: "0 var(--r-lg) var(--r-lg) 0",
              padding: "24px 28px",
              marginTop: 48,
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--amber)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
                Key Insight
              </div>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.78, fontStyle: "italic", margin: 0 }}>
                "{project.lesson}"
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 90 }}>
            {/* AI Components */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--r-xl)", padding: "28px",
              marginBottom: 16,
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>
                AI System Components
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {project.aiComponents.map(c => (
                  <div key={c.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: 9, color: "var(--amber)",
                        background: "var(--amber-glow)", border: "1px solid var(--amber-line)",
                        padding: "2px 6px", borderRadius: 3,
                      }}>{c.id}</span>
                      <span style={{ fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 500, color: "var(--text)" }}>
                        {c.title}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text3)", lineHeight: 1.65, margin: 0 }}>
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live site link */}
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)", padding: "16px 20px",
              fontFamily: "var(--mono)", fontSize: 11, color: "var(--text2)",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber-line)"; e.currentTarget.style.color = "var(--amber)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
            >
              <span>View live site</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* ── NAVIGATION ───────────────────────────────── */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: 80, paddingTop: 48,
          borderTop: "1px solid var(--border)",
        }}>
          {prev ? (
            <Link to={`/project/${prev.id}`} style={{
              display: "flex", flexDirection: "column", gap: 4,
              textDecoration: "none",
            }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "1px" }}>← PREVIOUS</span>
              <span style={{ fontFamily: "var(--disp)", fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{prev.name}</span>
            </Link>
          ) : <div />}
          {next && (
            <Link to={`/project/${next.id}`} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4,
              textDecoration: "none",
            }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "1px" }}>NEXT →</span>
              <span style={{ fontFamily: "var(--disp)", fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{next.name}</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

function CaseSection({ label, children }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 24, paddingBottom: 16,
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)",
          letterSpacing: "1.8px", textTransform: "uppercase",
        }}>{label}</div>
      </div>
      {children}
    </div>
  );
}
