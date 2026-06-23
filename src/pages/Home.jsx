import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { projects, stats, disciplines } from "../data/projects";

const STATUS = {
  green: { dot: "#4AE8A0", label: "Live" },
  amber: { dot: "#E8944A", label: "In Development" },
};

function useReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
        }
      }),
      { threshold: 0.06 }
    );
    refs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);
  return (i = 0, extra = {}) => ({
    ref: el => refs.current[i] = el,
    style: {
      opacity: 0,
      transform: "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
      ...extra,
    },
  });
}

export default function Home() {
  const reveal = useReveal();

  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px", position: "relative", overflow: "hidden" }}>

        {/* Background elements */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(232,148,74,0.04) 0%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />

        {/* Ambient orb */}
        <div style={{
          position: "absolute", top: "15%", right: "8%", width: 480, height: 480,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(232,148,74,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        <div className="wrap" style={{ position: "relative", paddingTop: 160 }}>
          {/* Status line */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--amber)", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--text3)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Available for AI engineering &amp; product roles
            </span>
          </div>

          {/* Main heading */}
          <div style={{ marginBottom: 40, maxWidth: 900 }}>
            <h1 style={{
              fontFamily: "var(--disp)",
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-3px",
              color: "var(--text)",
              margin: 0,
            }}>
              <span style={{ display: "block", color: "var(--text)" }}>AI Engineering.</span>
              <span style={{ display: "block", color: "var(--text2)" }}>Implementation.</span>
              <span style={{
                display: "block",
                background: "linear-gradient(135deg, var(--amber) 0%, #F5C07A 50%, var(--amber) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Full-Stack Product.</span>
            </h1>
          </div>

          {/* Descriptor */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 48, maxWidth: 860, marginBottom: 64 }}>
            <div style={{ width: 1, minHeight: 72, background: "linear-gradient(to bottom, var(--amber), transparent)", flexShrink: 0, marginTop: 4 }} />
            <p style={{ fontSize: 17, color: "var(--text2)", lineHeight: 1.75, maxWidth: 600, margin: 0 }}>
              I design, engineer, and ship AI systems — from NLP orchestration layers and generative pipelines
              to full-stack products serving real users across Africa and beyond.
              Every system I build is designed for production: reliable, observable, and genuinely useful.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 100 }}>
            <a href="#work" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 500,
              background: "var(--amber)", color: "#080808",
              padding: "13px 28px", borderRadius: "var(--r)",
              letterSpacing: "-0.1px",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--amber2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--amber)"; e.currentTarget.style.transform = "none"; }}
            >
              View featured work
              <span style={{ fontSize: 16 }}>↓</span>
            </a>
            <a href="#about" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 400,
              border: "1px solid var(--border2)", color: "var(--text2)",
              padding: "13px 28px", borderRadius: "var(--r)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border3)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "none"; }}
            >About me</a>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            paddingTop: 40, borderTop: "1px solid var(--border)",
            gap: 0,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                paddingRight: 56, marginRight: 56,
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                paddingBottom: 8,
              }}>
                <div style={{
                  fontFamily: "var(--disp)", fontSize: 28, fontWeight: 800,
                  color: "var(--text)", letterSpacing: "-1px", lineHeight: 1,
                }}>{s.value}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginTop: 6, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FEATURED WORK ════════════════ */}
      <section id="work" style={{ padding: "120px 0 0" }}>
        <div className="wrap" style={{ marginBottom: 64 }}>
          <div {...reveal(0)}>
            <div className="label" style={{ marginBottom: 16 }}>Featured Projects</div>
            <h2 style={{
              fontFamily: "var(--disp)", fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800, letterSpacing: "-1.5px", color: "var(--text)",
              lineHeight: 1.1, marginBottom: 14,
            }}>AI systems built for production.</h2>
            <p style={{ fontSize: 15, color: "var(--text2)", maxWidth: 480, lineHeight: 1.75 }}>
              Each project documents what was built, how the AI layer was designed, and what it produces. Not demos — deployed systems.
            </p>
          </div>
        </div>

        {/* Project list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((p, i) => {
            const sc = STATUS[p.statusColor];
            return (
              <div key={p.id} {...reveal(i + 1)} style={{ ...reveal(i + 1).style, borderTop: "1px solid var(--border)" }}>
                <Link to={`/project/${p.id}`} style={{ display: "block", textDecoration: "none" }}>
                  <div className="wrap" style={{ padding: "52px 48px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 40 }}>
                      {/* Index */}
                      <div style={{
                        fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)",
                        letterSpacing: "1px", paddingTop: 6, width: 28, flexShrink: 0,
                      }}>{p.index}</div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                              <h3 style={{
                                fontFamily: "var(--disp)", fontSize: "clamp(22px, 3vw, 32px)",
                                fontWeight: 800, letterSpacing: "-1px", color: "var(--text)",
                                lineHeight: 1,
                              }}>{p.name}</h3>
                              <div style={{
                                display: "flex", alignItems: "center", gap: 5,
                                fontFamily: "var(--mono)", fontSize: 10, fontWeight: 500,
                                color: sc.dot,
                                background: `${sc.dot}12`,
                                border: `1px solid ${sc.dot}30`,
                                padding: "3px 9px", borderRadius: 100,
                              }}>
                                <div style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }} />
                                {sc.label}
                              </div>
                            </div>
                            <p style={{ fontSize: 14.5, color: "var(--text2)", lineHeight: 1.65, maxWidth: 560, marginBottom: 16 }}>
                              {p.oneliner}
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              <span style={{
                                fontFamily: "var(--mono)", fontSize: 10, color: "var(--amber)",
                                background: "var(--amber-glow)", border: "1px solid var(--amber-line)",
                                padding: "3px 9px", borderRadius: 4, letterSpacing: "0.3px",
                              }}>{p.category}</span>
                              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", padding: "3px 0" }}>{p.year}</span>
                            </div>
                          </div>
                          <div style={{
                            fontFamily: "var(--sans)", fontSize: 13, color: "var(--text3)",
                            flexShrink: 0, paddingTop: 4,
                            transition: "color 0.2s, transform 0.2s",
                          }}>View case study →</div>
                        </div>

                        {/* AI components preview */}
                        <div style={{
                          display: "flex", flexWrap: "wrap", gap: 6, marginTop: 24,
                          paddingTop: 24, borderTop: "1px solid var(--border)",
                        }}>
                          {p.aiComponents.slice(0, 4).map(c => (
                            <div key={c.id} style={{
                              fontFamily: "var(--mono)", fontSize: 10,
                              color: "var(--text3)", background: "var(--surface)",
                              border: "1px solid var(--border)",
                              padding: "5px 10px", borderRadius: "var(--r)",
                            }}>
                              <span style={{ color: "var(--text4)", marginRight: 6 }}>{c.id}</span>
                              {c.title}
                            </div>
                          ))}
                          {p.aiComponents.length > 4 && (
                            <div style={{
                              fontFamily: "var(--mono)", fontSize: 10,
                              color: "var(--text3)", padding: "5px 10px",
                            }}>+{p.aiComponents.length - 4} more</div>
                          )}
                        </div>
                      </div>

                      {/* Cover / placeholder */}
                      <div style={{
                        width: 220, height: 140, flexShrink: 0,
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r-lg)",
                        overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {p.cover ? (
                          <img src={p.cover} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            <div style={{
                              width: 44, height: 44, borderRadius: "50%",
                              background: `${p.accentColor}12`,
                              border: `1px solid ${p.accentColor}30`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              margin: "0 auto 8px",
                              fontFamily: "var(--disp)", fontSize: 18, fontWeight: 800,
                              color: p.accentColor,
                            }}>{p.name[0]}</div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--text3)", letterSpacing: 1 }}>SCREENSHOT</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </section>

      {/* ══════════════════════ ABOUT ════════════════════════ */}
      <section id="about" style={{
        padding: "120px 0",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div {...reveal(20)}>
              <div className="label" style={{ marginBottom: 16 }}>About</div>
              <h2 style={{
                fontFamily: "var(--disp)", fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800, letterSpacing: "-1.2px", color: "var(--text)",
                lineHeight: 1.1, marginBottom: 32,
              }}>
                I build the whole system.<br />
                <span style={{ color: "var(--text2)" }}>Not just the AI feature.</span>
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.8, marginBottom: 20 }}>
                I'm Mmesoma — an AI engineer and full-stack product developer based in Nigeria.
                I design intelligent systems, build the infrastructure around them, and ship complete products
                to production. My work spans conversational AI, generative pipelines, NLP orchestration,
                fintech infrastructure, and business intelligence systems.
              </p>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.8, marginBottom: 20 }}>
                Every system I build starts from the same question:
                <em style={{ color: "var(--text)", fontStyle: "normal", fontWeight: 500 }}> where does AI create genuine value here, and how do we build it so it holds up at scale? </em>
                I'm comfortable owning a system end-to-end — from the first whiteboard session to the last line of production code.
              </p>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.8 }}>
                Available for AI engineering contracts, implementation roles, and full-stack product engagements.
              </p>
            </div>

            <div {...reveal(21)}>
              {/* Disciplines */}
              {disciplines.map((d, i) => (
                <div key={d.id} style={{
                  marginBottom: 32, paddingBottom: 32,
                  borderBottom: i < disciplines.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--amber)" }}>{d.icon}</span>
                    <span style={{ fontFamily: "var(--disp)", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{d.title}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {d.items.map(item => (
                      <span key={item} style={{
                        fontFamily: "var(--mono)", fontSize: 10.5,
                        color: "var(--text3)",
                        background: "var(--bg3)",
                        border: "1px solid var(--border)",
                        padding: "4px 10px", borderRadius: "var(--r)",
                        letterSpacing: "0.2px",
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Availability */}
              <div style={{
                background: "var(--amber-glow)", border: "1px solid var(--amber-line)",
                borderRadius: "var(--r-lg)", padding: "20px 22px", marginTop: 8,
              }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--amber)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 8 }}>
                  Availability
                </div>
                <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.6 }}>
                  Open to remote contracts · Full-time or part-time · 9AM–5PM EST compatible · Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CONTACT ══════════════════════ */}
      <section id="contact" style={{ padding: "120px 0" }}>
        <div className="wrap">
          <div {...reveal(30)} style={{
            ...reveal(30).style,
            textAlign: "center", maxWidth: 680, margin: "0 auto",
          }}>
            <div className="label" style={{ marginBottom: 24 }}>Contact</div>
            <h2 style={{
              fontFamily: "var(--disp)", fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.06,
              color: "var(--text)", marginBottom: 20,
            }}>
              Let's build<br />
              <span style={{
                background: "linear-gradient(135deg, var(--amber) 0%, #F5C07A 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>something serious.</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.75, marginBottom: 48 }}>
              Open to AI engineering contracts, implementation roles, and full-stack product engagements.
              If you're building something that needs an AI system done properly — let's talk.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <a href="mailto:thesomaachukwu@gmail.com" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "var(--mono)", fontSize: 12, fontWeight: 500,
                background: "var(--amber)", color: "#080808",
                padding: "14px 28px", borderRadius: "var(--r)",
                letterSpacing: "0.3px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--amber2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--amber)"; e.currentTarget.style.transform = "none"; }}
              >
                thesomaachukwu@gmail.com
              </a>
              <a href="tel:+2349020604280" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "var(--mono)", fontSize: 12,
                border: "1px solid var(--border2)", color: "var(--text2)",
                padding: "14px 28px", borderRadius: "var(--r)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber-line)"; e.currentTarget.style.color = "var(--amber)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.transform = "none"; }}
              >
                +234 902 060 4280
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </>
  );
}
