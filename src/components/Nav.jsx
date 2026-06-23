import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav style={{
      position: "fixed", inset: "0 0 auto 0", zIndex: 500,
      background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid #1E1E1E" : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div className="wrap" style={{
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28,
            background: "var(--amber)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--disp)", fontWeight: 800, fontSize: 13,
            color: "#080808", letterSpacing: "-0.5px",
          }}>MI</div>
          <span style={{
            fontFamily: "var(--disp)", fontWeight: 600, fontSize: 14,
            color: "var(--text)", letterSpacing: "-0.3px",
          }}>Mmesoma Ikechukwu</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {[
            { to: "/#work",    label: "Work" },
            { to: "/#about",   label: "About" },
            { to: "/#contact", label: "Contact" },
          ].map(({ to, label }) => (
            <a key={label} href={to} style={{
              fontFamily: "var(--sans)", fontSize: 13, fontWeight: 400,
              color: "var(--text3)",
              letterSpacing: "0.2px",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "var(--text)"}
              onMouseLeave={e => e.target.style.color = "var(--text3)"}
            >{label}</a>
          ))}
          <a href="mailto:thesomaachukwu@gmail.com" style={{
            fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500,
            color: "var(--amber)",
            border: "1px solid var(--amber-line)",
            background: "var(--amber-glow)",
            padding: "7px 16px", borderRadius: "var(--r)",
            letterSpacing: "0.5px",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--amber-dim)";
              e.currentTarget.style.borderColor = "var(--amber)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--amber-glow)";
              e.currentTarget.style.borderColor = "var(--amber-line)";
            }}
          >thesomaachukwu@gmail.com</a>
        </div>
      </div>
    </nav>
  );
}
