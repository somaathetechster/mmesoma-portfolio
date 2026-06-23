import { useState } from "react";

const TOKEN_PATTERNS = [
  { re: /(\/\/[^\n]*)/g,           cls: "t-cm" },
  { re: /(`(?:[^`\\]|\\.)*`)/g,    cls: "t-tl" },
  { re: /('[^'\\]*(?:\\.[^'\\]*)*')/g, cls: "t-st" },
  { re: /("[^"\\]*(?:\\.[^"\\]*)*")/g, cls: "t-st" },
  { re: /\b(async|await|const|let|var|return|if|else|switch|case|default|function|new|import|export|from|of|in|typeof|throw|try|catch)\b/g, cls: "t-kw" },
  { re: /\b(\d+(?:\.\d+)?)\b/g,    cls: "t-nm" },
  { re: /\b([A-Z][A-Z_0-9]+)\b/g,  cls: "t-ct" },
];

function highlight(code) {
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  TOKEN_PATTERNS.forEach(({ re, cls }) => {
    escaped = escaped.replace(re, (m) => `<span class="${cls}">${m}</span>`);
  });
  return escaped;
}

export default function CodeBlock({ filename, desc, code }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: "#050505",
      border: "1px solid #1A1A1A",
      borderRadius: 12,
      overflow: "hidden",
      margin: "28px 0",
    }}>
      <style>{`
        .t-cm { color: #3A3A3A; }
        .t-tl { color: #4AE88A; }
        .t-st { color: #4AE88A; }
        .t-kw { color: #7BA5FF; }
        .t-nm { color: #E89450; }
        .t-ct { color: #E8944A; }
        .code-scroll::-webkit-scrollbar { height: 3px; }
        .code-scroll::-webkit-scrollbar-track { background: transparent; }
        .code-scroll::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 2px; }
      `}</style>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 18px",
        background: "#0A0A0A",
        borderBottom: "1px solid #1A1A1A",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#FF5F57","#FFBD2E","#28C840"].map(c => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#555" }}>{filename}</div>
            {desc && <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: "#333", marginTop: 1 }}>{desc}</div>}
          </div>
        </div>
        <button onClick={copy} style={{
          fontFamily: "var(--mono)", fontSize: 10,
          color: copied ? "var(--amber)" : "#333",
          padding: "4px 10px", borderRadius: 4,
          border: `1px solid ${copied ? "var(--amber-line)" : "#1E1E1E"}`,
          background: "transparent",
          transition: "all 0.2s", cursor: "pointer",
        }}>
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      {/* Code */}
      <div className="code-scroll" style={{ overflowX: "auto" }}>
        <pre style={{
          padding: "22px 24px", margin: 0,
          fontFamily: "var(--mono)", fontSize: 12.5,
          lineHeight: 1.8, color: "#7A7470",
          whiteSpace: "pre",
          minWidth: "max-content",
        }}
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </div>
    </div>
  );
}
