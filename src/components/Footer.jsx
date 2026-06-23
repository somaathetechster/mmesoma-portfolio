import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      padding: "64px 0 40px",
    }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 28, height: 28, background: "var(--amber)",
                borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--disp)", fontWeight: 800, fontSize: 13, color: "#080808",
              }}>MI</div>
              <span style={{ fontFamily: "var(--disp)", fontWeight: 600, fontSize: 13, color: "var(--text)" }}>
                Mmesoma Ikechukwu
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.65, maxWidth: 240 }}>
              AI Engineer · Full-Stack Product Developer · Nigeria
            </p>
          </div>

          {/* Projects */}
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>
              Projects
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {projects.map(p => (
                <Link key={p.id} to={`/project/${p.id}`} style={{
                  fontSize: 13, color: "var(--text2)", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "var(--text)"}
                  onMouseLeave={e => e.target.style.color = "var(--text2)"}
                >{p.name}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>
              Contact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:thesomaachukwu@gmail.com" style={{ fontSize: 13, color: "var(--text2)", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--amber)"}
                onMouseLeave={e => e.target.style.color = "var(--text2)"}
              >thesomaachukwu@gmail.com</a>
              <a href="tel:+2349020604280" style={{ fontSize: 13, color: "var(--text2)", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--text)"}
                onMouseLeave={e => e.target.style.color = "var(--text2)"}
              >+234 902 060 4280</a>
            </div>
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 28, borderTop: "1px solid var(--border)",
        }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>
            © 2025 Mmesoma Ikechukwu
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>
            AI Engineering · Full-Stack Development · Nigeria
          </span>
        </div>
      </div>
    </footer>
  );
}
