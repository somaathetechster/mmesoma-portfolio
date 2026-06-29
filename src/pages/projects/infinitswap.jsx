import { Link } from "react-router-dom";
import CodeBlock from "../../components/CodeBlock";

/* ─── IMAGE SLOTS ──────────────────────────────────────────────────────────────
   HERO_COVER     → Global Overview dashboard (NODE LIVE, $12,434.45)
   WHATSAPP_1     → Morning digest / balance / deposit+withdraw buttons
   WHATSAPP_2     → PIN authorization → Transfer Submitted flow
   WHATSAPP_3     → Select Service menu (Send Money, Add Money, Airtime, Invoice)
   ADMIN_MESSAGES → Omni-Channel Command / Bot Messages intercept panel
   CODE_BRAIN     → agentBrain.service.js open in VS Code
─────────────────────────────────────────────────────────────────────────────── */

const IMAGES = {
  HERO_COVER:     "/images/infinitswap-dashboard-overview.png",
  WHATSAPP_1:     "/images/infinitswap-whatsapp-morning-digest.png",
  WHATSAPP_2:     "/images/infinitswap-whatsapp-pin-transfer.png",
  WHATSAPP_3:     "/images/infinitswap-whatsapp-service-menu.png",
  ADMIN_MESSAGES: "/images/infinitswap-admin-bot-messages.png",
  CODE_BRAIN:     "/images/infinitswap-agentbrain-code.png",
};

/* ─── DESIGN TOKENS ───────────────────────────────────────────────────────── */
const accent = "#4AE8A0";
const accentDim = "rgba(74,232,160,0.08)";
const accentBd  = "rgba(74,232,160,0.18)";

/* ─── SMALL HELPERS ──────────────────────────────────────────────────────── */
function Tag({ children, color = accent }) {
  return (
    <span style={{
      fontFamily: "var(--mono)", fontSize: 10, fontWeight: 500,
      color, background: color + "18", border: `1px solid ${color}28`,
      padding: "3px 9px", borderRadius: 4, letterSpacing: "0.3px",
      display: "inline-block",
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "2px",
      textTransform: "uppercase", color: "var(--text3)",
      borderBottom: "1px solid var(--border)", paddingBottom: 14,
      marginBottom: 24,
    }}>{children}</div>
  );
}

function Screenshot({ src, alt, caption, label }) {
  return (
    <div style={{ margin: "32px 0" }}>
      {label && (
        <div style={{
          fontFamily: "var(--mono)", fontSize: 9.5, color: accent,
          letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10,
        }}>{label}</div>
      )}
      <div style={{
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        border: `1px solid ${accentBd}`,
        background: "var(--bg3)",
      }}>
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", display: "block" }}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback placeholder */}
        <div style={{
          display: "none", height: 280,
          alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 8,
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "1px" }}>
            SCREENSHOT PLACEHOLDER
          </div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text3)" }}>{alt}</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", marginTop: 4 }}>
            → Add to /public/images/
          </div>
        </div>
      </div>
      {caption && (
         <div style={{
          fontFamily: "var(--sans)", fontSize: 12, color: "var(--text3)",
          marginTop: 10, lineHeight: 1.6,
             }}>{caption}</div>
      )}
    </div>
  );
}

/* ─── PIPELINE TABLE ─────────────────────────────────────────────────────── */
const PIPELINE_ROWS = [
  { stage: "Message Ingestion", tool: "Infobip / WhatsApp", usage: "Receives inbound webhook from WhatsApp Business API, verifies HMAC-SHA256 signature, routes to orchestrator", projects: "Infinitswap" },
  { stage: "NLP — Tier 1", tool: "Slash command parser + FLOW_ID_PATTERN regex", usage: "Zero-cost deterministic routing for button replies and known command patterns. Fires before any AI call.", projects: "Infinitswap" },
  { stage: "NLP — Tier 2", tool: "Local keyword brain (intent map)", usage: "Handles ~60% of messages locally with confidence scoring. Returns INTENT_FALLBACK when message is novel or ambiguous.", projects: "Infinitswap" },
  { stage: "NLP — Tier 3", tool: "GPT-4o-mini + Zod structured output", usage: "Agentic brain called on INTENT_FALLBACK or confidence < 0.65. Reads full user context, decides action (ROUTE / DIRECT / CLARIFY / PREFILL), extracts all entities.", projects: "Infinitswap" },
  { stage: "State Machine", tool: "Custom orchestrator (Node.js / Fastify)", usage: "Executes agent decision. Maintains session state in Redis. Routes to financial flow handlers.", projects: "Infinitswap" },
  { stage: "FX Rates", tool: "OpenExchangeRates (primary) + CoinGecko (fallback)", usage: "Live rate fetching with multi-provider fallback chain. Spread applied per direction (BUY/SELL) to embed platform margin.", projects: "Infinitswap" },
  { stage: "Fiat PSP", tool: "Flutterwave + Paystack (configurable per country)", usage: "Dynamic PSP routing. Nigeria: Paystack (deposit) / Flutterwave (withdrawal). Ghana: Flutterwave MoMo. Switchable via admin without code deploy.", projects: "Infinitswap" },
  { stage: "Crypto", tool: "TronWeb + Alchemy", usage: "Per-wallet TronWeb instances. USDT TRC-20 deposit sweep with Redis distributed locks. ETH/ERC-20 via Alchemy webhook polling.", projects: "Infinitswap" },
  { stage: "Job Queue", tool: "BullMQ + Redis", usage: "Async PSP payout processing, crypto sweep jobs, webhook retry logic. Prevents blocking the WhatsApp response loop.", projects: "Infinitswap" },
  { stage: "KYC", tool: "Prembly API", usage: "BVN + NIN (Nigeria), Ghana Card, Tanzania NIDA. Auto-approval fires when premblyStatus = verified AND nameMatch = true AND score < 30.", projects: "Infinitswap" },
  { stage: "Airtime", tool: "Reloadly", usage: "Static bundle catalogue per country. Nigeria, Ghana, Tanzania, South Africa operators mapped. Delivery confirmation polled.", projects: "Infinitswap" },
  { stage: "Database", tool: "PostgreSQL + Supabase", usage: "Primary relational store for users, transactions, KYC records, wallets. Row Level Security for compliance.", projects: "Infinitswap" },
  { stage: "Admin Dashboard", tool: "Next.js 15 + React", usage: "Real-time transaction monitoring, KYC review queue, user management, broadcast system, PSP switching, rate management.", projects: "Infinitswap" },
  { stage: "Security", tool: "VAPT + ioredis rate limiter", usage: "Pre-launch vulnerability assessment. HMAC webhook verification, JWT blacklisting on logout, Redis-based rate limiting, SSRF proxy fix, DMARC + CAA DNS records.", projects: "Infinitswap" },
  { stage: "Email", tool: "Resend", usage: "Transactional email for KYC notifications, support escalations, and system alerts.", projects: "Infinitswap" },
  { stage: "Deployment", tool: "Render + Vercel + AWS EC2", usage: "API on Render (free tier, no shell access — patches via local Python scripts). Admin dashboard on Vercel. EC2 proxy for Flutterwave geographic routing.", projects: "Infinitswap" },
];

const CHALLENGES = [
  {
    n: "01",
    title: "TRON withdrawal race conditions",
    problem: "Two concurrent USDT withdrawal requests for the same wallet could both pass the balance check and execute, overdrawing the wallet. Process-local locks were useless in a multi-process deployment.",
    solution: "Replaced all process-local mutex flags with Redis distributed locks using a consistent key pattern per wallet. Added a freshIntent re-fetch at execution time so the worker always reads current state from the database rather than using in-memory data that could be stale.",
    files: ["pspPayout.worker.js", "cryptoWithdrawal.cron.js"],
  },
  {
    n: "02",
    title: "Keystone Bank false-positive entity extraction",
    problem: "\"Send 50 to 8106513144\" was extracting \"to\" as a bank name, which matched \"Keystone\" via an empty-string contains-match. Users sending natural language transfer instructions were getting routed to wrong banks.",
    solution: "Added length guards and reserved-word filtering to parseSendCommand.js and normaliseBankName() in sendMoney.flow.js. The NLP pipeline now rejects any bank name candidate under 3 characters or matching a stopword list before attempting normalisation.",
    files: ["parseSendCommand.js", "nlp.service.js", "sendMoney.flow.js"],
  },
  {
    n: "03",
    title: "WhatsApp template delivery failures (Meta error 7008)",
    problem: "All broadcast template messages were failing silently with Meta error code 7008. The broadcast system appeared to work — jobs enqueued, workers fired — but zero messages delivered.",
    solution: "Root cause: button components missing from the Infobip payload. Fixed button mapping to Infobip's {type: \"QUICK_REPLY\", parameter: \"PAYLOAD_STRING\"} format. Audience builder fixed to filter isOnboarded: true instead of status: \"active\". Admin login number excluded via role: \"user\" filter.",
    files: ["broadcast.service.js", "infobip.service.js"],
  },
  {
    n: "04",
    title: "Mainnet USDT contract address mismatch",
    problem: "Crypto deposits were being silently dropped. The blockchain scanner was listening on a testnet USDT contract address in the mainnet environment. No error thrown — deposits simply never triggered.",
    solution: "Corrected the TRC-20 contract address to the mainnet USDT contract. Added environment-specific contract address validation at startup that throws if the address doesn't match the expected mainnet checksum.",
    files: ["tronSweep.service.js", "config.js"],
  },
  {
    n: "05",
    title: "Webhook routing bug dropping all PSP events",
    problem: "All Flutterwave and Paystack webhook events were being received but not processed. Transactions stayed permanently in PENDING status. No errors in logs.",
    solution: "Root cause: router.use(\"/psp\", pspWebhookController) — .handlePspWebhook was undefined on the controller object. The route was mounted but the handler was never attached. Fixed the controller export and validated all webhook routing.",
    files: ["pspWebhookController.js", "routes/psp.js"],
  },
  {
    n: "06",
    title: "Security hardening before external pen test",
    problem: "Pre-launch VAPT revealed 15+ vulnerabilities including missing webhook signature verification, JWT stored in localStorage, no rate limiting on admin endpoints, SSRF via media proxy, plaintext password in window.alert(), and no JWT invalidation on logout.",
    solution: "Implemented HMAC-SHA256 signature verification on all Infobip webhooks, moved admin JWT to httpOnly cookies, built Redis-based rate limiter for admin login (5 attempts/15min/IP), fixed SSRF media proxy hostname bypass, added JWT Redis blacklisting on logout, deployed DMARC p=reject and CAA DNS records.",
    files: ["webhook.middleware.js", "auth.service.js", "rateLimiter.middleware.js"],
  },
];

const OWASP_RESULTS = [
  { category: "Webhook Forgery", result: "PASSED", detail: "Flutterwave, Paystack, TRON — HMAC-SHA256 verification on all inbound webhooks" },
  { category: "KYC Token Reuse", result: "PASSED", detail: "One-time verification tokens invalidated immediately after use" },
  { category: "Admin API Auth", result: "PASSED", detail: "JWT required on all admin endpoints, blacklisted on logout" },
  { category: "Secrets Exposure", result: "PASSED", detail: "No .env exposed, no secrets in codebase, environment-only config" },
  { category: "CORS Policy", result: "PASSED", detail: "Origin allowlist enforced, credentials not sent cross-origin" },
  { category: "Wallet Validation", result: "PASSED", detail: "Amount validated server-side before any PSP or chain call" },
  { category: "JWT None-Algorithm", result: "PASSED", detail: "Algorithm explicitly pinned, tampering rejected" },
  { category: "SQLi / XSS / Path Traversal", result: "PASSED", detail: "Parameterised queries throughout, input sanitisation, no user-controlled file paths" },
  { category: "Admin Rate Limiting", result: "FIXED", detail: "ioredis-based limiter — 5 attempts per 15min per IP" },
  { category: "SSRF Media Proxy", result: "FIXED", detail: "Hostname bypass patched — allowlist enforced" },
  { category: "JWT localStorage", result: "FIXED", detail: "Moved to httpOnly cookies in admin dashboard" },
  { category: "Plaintext Password Alert", result: "FIXED", detail: "window.alert() with credential data removed" },
  { category: "JWT Logout Invalidation", result: "FIXED", detail: "Redis blacklisting on logout — tokens expire server-side" },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function InfinitswapProject() {
  return (
    <div style={{ paddingTop: 0 }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: "140px 0 0",
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Green glow */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: 700, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${accentDim} 0%, transparent 70%)`,
          filter: "blur(80px)", pointerEvents: "none",
        }} />

        <div className="wrap" style={{ position: "relative", paddingBottom: 0 }}>
          <Link to="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)",
            letterSpacing: "0.5px", marginBottom: 40,
          }}>← All projects</Link>

          {/* Meta */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Tag>Conversational AI · FinTech</Tag>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--mono)", fontSize: 10, color: accent, background: accentDim, border: `1px solid ${accentBd}`, padding: "3px 10px", borderRadius: 100 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent }} />
              Live · Production
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>2024–2025</span>
            <a href="https://www.infinitswap.ai" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", borderBottom: "1px solid var(--border2)" }}>
              infinitswap.ai ↗
            </a>
            <a href="https://superadmin2526.infinitswap.ai" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", borderBottom: "1px solid var(--border2)" }}>
              Admin Dashboard ↗
            </a>
          </div>

          <h1 style={{
            fontFamily: "var(--disp)", fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.04,
            color: "var(--text)", marginBottom: 20,
          }}>Infinitswap</h1>

          <p style={{ fontSize: 19, color: "var(--text2)", lineHeight: 1.7, maxWidth: 660, marginBottom: 32 }}>
            A WhatsApp-native AI exchange operating across 4 African markets. Crypto-to-fiat, fiat-to-crypto, airtime, and cross-border transfers — entirely through conversation. No app. No dashboard. Just WhatsApp.
          </p>

          <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--text3)", marginBottom: 48 }}>
            <span style={{ color: "var(--border3)" }}>ROLE //</span>
            <span style={{ marginLeft: 8 }}>AI Engineer · Full-Stack Developer · Systems Architect · Security Auditor</span>
          </div>
        </div>

        {/* HERO IMAGE — Global Overview dashboard */}
        {/* → INSERT: infinitswap-dashboard-overview.png (Image 2 from upload) */}
        <div className="wrap" style={{ paddingTop: 0 }}>
          <div style={{ borderRadius: "20px 20px 0 0", overflow: "hidden", border: `1px solid ${accentBd}`, borderBottom: "none" }}>
            <img
              src={IMAGES.HERO_COVER}
              alt="Infinitswap Admin Dashboard — Global Overview showing $12,434.45 total volume, 39 users, real-time volume chart"
              style={{ width: "100%", display: "block" }}
              onError={e => {
                e.target.parentElement.style.height = "340px";
                e.target.parentElement.style.display = "flex";
                e.target.parentElement.style.alignItems = "center";
                e.target.parentElement.style.justifyContent = "center";
                e.target.style.display = "none";
                const div = document.createElement("div");
                div.style.cssText = "text-align:center;font-family:monospace;font-size:11px;color:#444";
                div.innerHTML = `HERO IMAGE<br/><span style="font-size:10px;color:#333">→ Add: infinitswap-dashboard-overview.png</span>`;
                e.target.parentElement.appendChild(div);
              }}
            />
          </div>
        </div>
      </div>

      {/* ── IMPACT METRICS ──────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
            {[
              { metric: "$12,434", label: "Total volume processed" },
              { metric: "39", label: "Active users across 4 markets" },
              { metric: "99.98%", label: "Platform uptime" },
              { metric: "T+0", label: "Settlement time" },
              { metric: "15+", label: "VAPT vulnerabilities patched" },
              { metric: "4", label: "African markets (NG/GH/TZ/ZA)" },
            ].map((m, i, arr) => (
              <div key={i} style={{
                paddingRight: 40, marginRight: 40,
                borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                paddingBottom: 8, marginBottom: 8,
              }}>
                <div style={{ fontFamily: "var(--disp)", fontSize: 26, fontWeight: 800, letterSpacing: "-1px", color: "var(--text)" }}>{m.metric}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", marginTop: 4, letterSpacing: "0.5px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <div className="wrap" style={{ padding: "80px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 80, alignItems: "start" }}>

          {/* LEFT COLUMN */}
          <div>

            {/* ── EXECUTIVE SUMMARY ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>Executive Summary</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 18 }}>
                Infinitswap is a production fintech platform built for 69xchange, enabling cryptocurrency-to-fiat exchange, cross-border money transfers, airtime purchases, and crypto deposits — entirely through WhatsApp. Users in Nigeria, Ghana, Tanzania, and South Africa complete full financial transactions through natural conversation with no app download, no web dashboard, and no complex onboarding.
              </p>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 18 }}>
                The platform combines a 3-tier AI orchestration layer, a multi-country payment matrix, a 4-tier KYC verification pipeline, real-time blockchain monitoring, and a Next.js admin control centre. Every component was designed, engineered, and security-audited by me from zero to production.
              </p>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85 }}>
                Unlike conventional fintech apps, Infinitswap's entire user experience lives inside WhatsApp — the interface 500 million+ Africans already use daily. The AI layer is not a feature; it is the product.
              </p>
            </section>

            {/* ── THE PROBLEM ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>The Problem</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 18 }}>
                Crypto off-ramping in Africa was broken at a systemic level. Centralised exchanges demanded KYC processes most users couldn't complete. App-based dashboards assumed digital literacy and device capability that excluded the majority of the target market. Settlement windows of 24–72 hours made the products unusable for the people who needed liquidity most — freelancers, traders, and diaspora recipients.
              </p>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85 }}>
                The constraint wasn't technical. It was interface. Everyone already had WhatsApp. The challenge was building a complete financial exchange — quoting, identity verification, blockchain monitoring, payment routing, payout execution — that operated through natural conversation without feeling like a command-line interface.
              </p>
            </section>

            {/* ── AI ARCHITECTURE ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>AI Architecture — 3-Tier NLP Pipeline</SectionLabel>

              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 32 }}>
                The AI orchestration layer is the core architectural innovation in Infinitswap. Every incoming WhatsApp message — regardless of phrasing, language, or format — passes through three sequential intelligence tiers before any financial logic executes.
              </p>

              {/* Architecture diagram */}
              <div style={{
                background: "var(--bg3)", border: "1px solid var(--border)",
                borderRadius: "var(--r-xl)", padding: "28px 32px",
                fontFamily: "var(--mono)", fontSize: 12, lineHeight: 2,
                color: "var(--text2)", marginBottom: 32, overflowX: "auto",
              }}>
                <div style={{ color: "var(--text3)", fontSize: 10, letterSpacing: "1.5px", marginBottom: 16 }}>// SYSTEM ARCHITECTURE — MESSAGE PROCESSING PIPELINE</div>
                <div><span style={{ color: accent }}>WhatsApp Message</span></div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: "var(--text3)" }}>Infobip webhook</span> (HMAC-SHA256 verified)</div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: accent }}>Tier 1: Slash command / FLOW_ID_PATTERN</span> <span style={{ color: "var(--text3)" }}>(zero-cost, deterministic)</span></div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: accent }}>Tier 2: Local keyword brain</span> <span style={{ color: "var(--text3)" }}>(handles ~60% of messages, confidence scored)</span></div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: accent }}>Tier 3: GPT-4o-mini Agent Brain</span> <span style={{ color: "var(--text3)" }}>(INTENT_FALLBACK or confidence &lt; 0.65)</span></div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ ROUTE → intent + entities extracted</div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ PREFILL → amount + bank + account pre-populated</div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ DIRECT → AI-generated reply (no flow)</div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ CLARIFY → contextual question generated</div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: accent }}>State Machine Orchestrator</span> <span style={{ color: "var(--text3)" }}>(Node.js / Fastify + Redis)</span></div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: accent }}>Financial Flow Handlers</span></div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ Fiat payout → PSP Orchestrator (Flutterwave / Paystack)</div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ Crypto → TronWeb / Alchemy + BullMQ sweep job</div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ Airtime → Reloadly static bundle catalogue</div>
                <div style={{ paddingLeft: 40, color: "var(--text3)" }}>↳ KYC → Prembly API + auto-approval engine</div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: accent }}>Receipt generator</span> <span style={{ color: "var(--text3)" }}>(AI-narrated plain-language description)</span></div>
                <div style={{ paddingLeft: 20 }}>→ <span style={{ color: accent }}>WhatsApp reply</span> <span style={{ color: "var(--text3)" }}>(formatted, sent back to user)</span></div>
              </div>

              <div style={{
                background: accentDim, border: `1px solid ${accentBd}`,
                borderLeft: `3px solid ${accent}`,
                borderRadius: "0 var(--r-lg) var(--r-lg) 0",
                padding: "18px 22px", marginBottom: 32,
              }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: accent, letterSpacing: "1.2px", marginBottom: 8 }}>KEY ENGINEERING DECISION</div>
                <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>
                  The agent brain is <strong style={{ color: "var(--text)" }}>not called for every message</strong> — that would cost ~$72/month at 5K messages/day. Tier 1 and Tier 2 handle ~60% of messages locally at zero AI cost. The agent fires only on genuine ambiguity, reducing GPT-4o-mini calls to ~40% of messages at approximately <strong style={{ color: "var(--text)" }}>$6/month at 5K msg/day</strong>.
                </p>
              </div>
            </section>

            {/* ── AGENT BRAIN CODE ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>Agent Brain — GPT-4o-mini with Structured Output</SectionLabel>
              <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 8 }}>
                The Tier 3 agentic layer. Called when NLP fails or confidence is below threshold. Uses OpenAI's structured output API with a Zod schema to guarantee a typed, parseable decision on every call.
              </p>

              {/* CODE IMAGE — agentBrain.service.js in VS Code */}
              {/* → INSERT: infinitswap-agentbrain-code.png (Image 5 from earlier upload — VS Code showing agentBrain.service.js) */}
              <Screenshot
                src={IMAGES.CODE_BRAIN}
                alt="agentBrain.service.js in VS Code — showing AgentDecisionSchema with 15 intent types and buildSystemPrompt function"
                label="agentBrain.service.js — Production Source Code"
                caption="The AgentDecisionSchema defines 4 action types (ROUTE, DIRECT, CLARIFY, PREFILL) and 15 financial intents. Every field is typed via Zod. GPT-4o-mini returns a guaranteed-parseable JSON object on every call — no regex parsing, no error-prone string extraction."
              />

              <CodeBlock
                filename="agentBrain.service.js"
                desc="Tier 3 agent decision engine — called when NLP confidence < 0.65"
                code={`const AgentDecisionSchema = z.object({
  action: z.enum(["ROUTE","DIRECT","CLARIFY","PREFILL"]),
  intent: z.enum([
    "INTENT_SEND_MONEY","INTENT_DEPOSIT","INTENT_DEPOSIT_CRYPTO",
    "INTENT_WITHDRAW","INTENT_WITHDRAW_CRYPTO","INTENT_BALANCE",
    "INTENT_CHECK_RATES","INTENT_AIRTIME","INTENT_TRANSACTION_HISTORY",
    "INTENT_KYC","INTENT_SETTINGS","INTENT_SUPPORT",
    "INTENT_CREATE_INVOICE","INTENT_MENU","INTENT_GREET",
  ]).nullable(),
  directReply:   z.string().nullable(),
  clarifyPrompt: z.string().nullable(),
  // Entity extraction — agent pre-fills these from the message
  amount:        z.number().nullable(),
  currency:      z.enum(["NGN","GHS","ZAR","TZS","USDT"]).nullable(),
  accountNumber: z.string().nullable(),
  bankName:      z.string().nullable(),
  recipient:     z.string().nullable(),
  reasoning:     z.string(), // logged for observability
});

async function decide(user, session, text, conversationBuffer = []) {
  const walletBalance = await walletService.getAvailableBalance(user.id);

  const response = await client.chat.completions.parse({
    model:           "gpt-4o-mini",
    messages: [
      { role: "system", content: buildSystemPrompt(user, session, walletBalance) },
      ...conversationBuffer.slice(-6), // Last 6 turns for context
      { role: "user",   content: text },
    ],
    response_format: zodResponseFormat(AgentDecisionSchema, "decision"),
    temperature:     0.1,   // Near-deterministic for financial routing
    max_tokens:      300,
  });

  const decision = response.choices[0].message.parsed;
  logger.info(\`[AgentBrain] "\${text}" → \${decision.action} / \${decision.intent} | \${decision.reasoning}\`);

  switch (decision.action) {
    case "DIRECT":  return { type: "direct", reply: decision.directReply };
    case "CLARIFY": return { type: "clarify", clarifyPrompt: decision.clarifyPrompt };
    case "PREFILL":
    case "ROUTE":   return {
      type: "route",
      intent: decision.intent,
      prefill: { amount: decision.amount, currency: decision.currency,
                 accountNumber: decision.accountNumber, bankName: decision.bankName }
    };
  }
}`}
              />
            </section>

            {/* ── WHATSAPP UX ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>WhatsApp User Experience</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 24 }}>
                The entire user experience is engineered for WhatsApp's interaction model — interactive buttons, list pickers, and conversational text — without ever breaking the chat paradigm. Users complete full financial transactions with no awareness of the infrastructure underneath.
              </p>

              {/* WHATSAPP IMAGE 1 — Morning digest */}
              {/* → INSERT: infinitswap-whatsapp-morning-digest.png (Image 4 from first upload — morning greeting, balance, deposit/withdraw buttons) */}
              <Screenshot
                src={IMAGES.WHATSAPP_1}
                alt="Infinitswap WhatsApp — AI-personalised morning digest showing user balance and quick-action buttons"
                label="Personalised Morning Digest — AI-Generated"
                caption="Every morning, active users receive an AI-personalised greeting with their live USDT balance and contextual action buttons. The message tone, content, and call-to-action adapt based on the user's transaction history and KYC tier."
              />

              {/* WHATSAPP IMAGE 2 — Service menu */}
              {/* → INSERT: infinitswap-whatsapp-service-menu.png (Image 1 from latest upload — Select Service list picker) */}
              <Screenshot
                src={IMAGES.WHATSAPP_3}
                alt="Infinitswap WhatsApp — Select Service menu showing Send Money, Add Money, Airtime & Data, Create Invoice, View Balance, Exchange Rates"
                label="Dynamic Service Menu — WhatsApp List Picker"
                caption="The main menu surfaces as a WhatsApp native list picker — not a text message. Options are grouped by category (Payments & Funding, Wallet & Assets) and dynamically shown or hidden based on the user's KYC tier and account status."
              />

              {/* WHATSAPP IMAGE 3 — PIN auth + transfer */}
              {/* → INSERT: infinitswap-whatsapp-pin-transfer.png (Image 3 from first upload — Authorization Required → Transfer Submitted) */}
              <Screenshot
                src={IMAGES.WHATSAPP_2}
                alt="Infinitswap WhatsApp — Authorization Required PIN entry flow leading to Transfer Submitted confirmation"
                label="Transaction Authorization — PIN + Confirmation Flow"
                caption="High-value transactions trigger a secure PIN entry flow before execution. The user confirms via a button tap, enters their PIN through a secure Infobip flow, and receives instant confirmation. The backend executes the PSP payout and returns a formatted receipt — all within the same conversation thread."
              />
            </section>

            {/* ── KYC PIPELINE ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>4-Country KYC Verification Pipeline</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 24 }}>
                Identity verification is handled through a tiered KYC system that runs different verification flows per country through the Prembly API, with auto-approval logic that eliminates manual review for passing verifications.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[
                  { country: "🇳🇬 Nigeria", methods: "BVN + NIN (Level-2 fallback)", auto: "Auto-approved when premblyStatus = verified AND nameMatch = true AND score < 30" },
                  { country: "🇬🇭 Ghana", methods: "Ghana Card / Driver's License", auto: "Manual review threshold for score ≥ 30" },
                  { country: "🇹🇿 Tanzania", methods: "NIDA National ID", auto: "Prembly /verification/tz/id endpoint" },
                  { country: "🇿🇦 South Africa", methods: "ZA ID verification", auto: "Tier system: Tier 0 → 1 → 2 → 3 with increasing limits" },
                ].map((c, i) => (
                  <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "16px 18px" }}>
                    <div style={{ fontFamily: "var(--disp)", fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{c.country}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: accent, marginBottom: 6 }}>{c.methods}</div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>{c.auto}</div>
                  </div>
                ))}
              </div>

              <CodeBlock
                filename="kyc.service.js"
                desc="Auto-approval logic — fires when Prembly verification passes all thresholds"
                code={`async function evaluateKYCResult(premblyResponse, idType, userId) {
  const { status, nameMatch, score, data } = premblyResponse;

  const isAutoApprovable = ['BVN', 'NIN', 'VNIN'].includes(idType);
  const passesThreshold  =
    status    === 'verified' &&
    nameMatch === true &&
    score     < 30;           // Lower score = higher confidence match

  if (isAutoApprovable && passesThreshold) {
    await db.user.update({
      where:  { id: userId },
      data:   { kycTier: 1, kycStatus: 'AUTO_APPROVED',
                premblyStatus: 'verified', kycVerifiedAt: new Date() },
    });
    logger.info(\`[KYC] Auto-approved: userId=\${userId} idType=\${idType} score=\${score}\`);
    return { decision: 'AUTO_APPROVED', tier: 1 };
  }

  // Queue for manual review if above threshold
  await db.kycReview.create({ data: { userId, idType, score, status, rawResponse: premblyResponse } });
  return { decision: 'MANUAL_REVIEW', tier: 0 };
}`}
              />
            </section>

            {/* ── PSP ROUTING ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>Multi-Country PSP Routing Engine</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 24 }}>
                Payment routing is dynamic per country and independently configurable for deposits and withdrawals without a code deploy. The business team can switch PSP providers via the admin dashboard — a radio button selection persists to <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: accent }}>globalSettings.ngDepositPsp</code> / <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: accent }}>ngWithdrawPsp</code> and is read at runtime.
              </p>

              <div style={{
                background: "var(--bg3)", border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: 24,
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                      {["Country", "Deposit PSP", "Withdrawal PSP", "Transfer Type"].map(h => (
                        <th key={h} style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", letterSpacing: "1px", textTransform: "uppercase", padding: "12px 16px", textAlign: "left" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { country: "🇳🇬 Nigeria", deposit: "Paystack (default)", withdraw: "Flutterwave (default)", type: "nuban (bank transfer)" },
                      { country: "🇬🇭 Ghana", deposit: "Flutterwave", withdraw: "Paystack → Flutterwave MoMo", type: "mobile_money_ghana" },
                      { country: "🇹🇿 Tanzania", deposit: "Flutterwave", withdraw: "Flutterwave MoMo", type: "mobile_money_tanzania" },
                      { country: "🇿🇦 South Africa", deposit: "Flutterwave", withdraw: "Flutterwave", type: "bank_transfer" },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--sans)", fontSize: 13, color: "var(--text)" }}>{r.country}</td>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--mono)", fontSize: 11, color: accent }}>{r.deposit}</td>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--mono)", fontSize: 11, color: accent }}>{r.withdraw}</td>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>{r.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── ADMIN DASHBOARD ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>Admin Control Centre — Next.js 15</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 24 }}>
                The admin dashboard provides full operational visibility and control — real-time transaction monitoring, KYC review queue, user management, live conversation intercepts, broadcast campaign management, PSP configuration, rate management, and security audit logs.
              </p>

              {/* ADMIN IMAGE — Bot Messages / Omni-Channel Command */}
              {/* → INSERT: infinitswap-admin-bot-messages.png (Image 1 from first upload — Omni-Channel Command panel with live user conversations) */}
              <Screenshot
                src={IMAGES.ADMIN_MESSAGES}
                alt="Infinitswap Admin — Omni-Channel Command showing live user conversation intercepts with Financial Dossier panel"
                label="Omni-Channel Command — Live Conversation Intelligence"
                caption="The \ Omni-Channel Command \  panel gives the operations team real-time visibility into all active user conversations. Each intercept shows the live message thread with the AI, alongside a Financial Dossier panel showing that user's balance, transaction history, and KYC status — all in one view."
              />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { label: "Overview", desc: "Real-time volume, revenue, user count, and action queue" },
                  { label: "Live Monitor", desc: "Transaction stream with status, PSP routing, and latency" },
                  { label: "Users & KYC", desc: "User records, KYC tier management, risk flags" },
                  { label: "Bot Messages", desc: "Live conversation intercepts with financial dossier view" },
                  { label: "Wallets & Ledger", desc: "Hot wallet balances, sweep logs, USDT custody tracking" },
                  { label: "Gateways", desc: "PSP configuration, webhook status, routing rules" },
                  { label: "Risk & Fraud", desc: "Flagged accounts, dispute management, suspicious patterns" },
                  { label: "FX Rates", desc: "Live rate management, spread configuration per market" },
                  { label: "Pricing Engine", desc: "Platform fee structure, per-country margin configuration" },
                ].map((item, i) => (
                  <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "14px 16px" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: accent, marginBottom: 5 }}>{item.label}</div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text3)", lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PIPELINE TABLE ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>Full Technology Pipeline</SectionLabel>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                      {["Pipeline Stage", "Technology", "Implementation Detail"].map(h => (
                        <th key={h} style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "1px", textTransform: "uppercase", padding: "12px 16px", textAlign: "left" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PIPELINE_ROWS.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--mono)", fontSize: 10, color: accent, whiteSpace: "nowrap" }}>{r.stage}</td>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap" }}>{r.tool}</td>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--sans)", fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6 }}>{r.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── TECHNICAL CHALLENGES ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>Production Engineering Challenges Resolved</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 32 }}>
                The following challenges were identified and resolved during active production operation — not during development or testing. Each one had a direct, measurable impact on platform reliability.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {CHALLENGES.map((c, i) => (
                  <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "24px 28px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        background: accentDim, border: `1px solid ${accentBd}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--mono)", fontSize: 11, color: accent,
                      }}>{c.n}</div>
                      <div style={{ fontFamily: "var(--disp)", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{c.title}</div>
                    </div>
                    <div style={{ paddingLeft: 48 }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", letterSpacing: "1px", marginBottom: 6 }}>PROBLEM</div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>{c.problem}</p>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: accent, letterSpacing: "1px", marginBottom: 6 }}>SOLUTION</div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>{c.solution}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {c.files.map(f => <Tag key={f} color="var(--text3)">{f}</Tag>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECURITY AUDIT ── */}
            <section style={{ marginBottom: 64 }}>
              <SectionLabel>Pre-Launch VAPT Security Audit Results</SectionLabel>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.85, marginBottom: 24 }}>
                I conducted a full Vulnerability Assessment and Penetration Test before the platform went live to external users. 15+ vulnerabilities were identified across authentication, webhook handling, rate limiting, and data exposure. All were resolved before launch.
              </p>
              <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                      {["Test Category", "Result", "Detail"].map(h => (
                        <th key={h} style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "1px", textTransform: "uppercase", padding: "12px 16px", textAlign: "left" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {OWASP_RESULTS.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "11px 16px", fontFamily: "var(--sans)", fontSize: 13, color: "var(--text)" }}>{r.category}</td>
                        <td style={{ padding: "11px 16px" }}>
                          <span style={{
                            fontFamily: "var(--mono)", fontSize: 9.5, fontWeight: 700,
                            color: r.result === "PASSED" ? "#3DD68C" : "#E89040",
                            background: r.result === "PASSED" ? "rgba(61,214,140,0.08)" : "rgba(232,144,64,0.08)",
                            border: `1px solid ${r.result === "PASSED" ? "rgba(61,214,140,0.2)" : "rgba(232,144,64,0.2)"}`,
                            padding: "2px 8px", borderRadius: 4,
                          }}>{r.result}</span>
                        </td>
                        <td style={{ padding: "11px 16px", fontFamily: "var(--sans)", fontSize: 12.5, color: "var(--text2)", lineHeight: 1.5 }}>{r.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── KEY INSIGHT ── */}
            <div style={{
              background: accentDim, border: `1px solid ${accentBd}`,
              borderLeft: `3px solid ${accent}`,
              borderRadius: "0 var(--r-xl) var(--r-xl) 0",
              padding: "28px 32px", marginBottom: 64,
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
                Key Engineering Insight
              </div>
              <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                "The most important AI design decision in a financial system is knowing when not to act. The confidence threshold — the moment the system chooses clarification over assumption — is what separates a trustworthy AI financial layer from a liability. A system that admits uncertainty and asks for clarification builds more user trust than one that guesses confidently and occasionally moves someone's money to the wrong place."
              </p>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ position: "sticky", top: 90 }}>

            {/* AI System Components */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "24px", marginBottom: 14 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 18 }}>
                AI System Components
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { id: "AI_01", title: "Tier 1: Deterministic router", desc: "Slash commands and button ID pattern matching — zero AI cost, instant response." },
                  { id: "AI_02", title: "Tier 2: Keyword NLP brain", desc: "Local intent classification with confidence scoring. Handles ~60% of all messages." },
                  { id: "AI_03", title: "Tier 3: GPT-4o-mini agent", desc: "Structured output via Zod schema. 15 intent types. Entity extraction. 4 action modes." },
                  { id: "AI_04", title: "Confidence gating", desc: "Messages below 0.65 confidence route to agent brain rather than guessing wrong." },
                  { id: "AI_05", title: "KYC auto-approval engine", desc: "Prembly API scores evaluated against threshold — auto-approves without human review." },
                  { id: "AI_06", title: "AI receipt narration", desc: "Every completed transaction produces a plain-language AI-written description." },
                  { id: "AI_07", title: "Personalised broadcast", desc: "Morning digest content generated per user based on balance, activity, and KYC tier." },
                ].map(c => (
                  <div key={c.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: accent, background: accentDim, border: `1px solid ${accentBd}`, padding: "2px 6px", borderRadius: 3 }}>{c.id}</span>
                      <span style={{ fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>{c.title}</span>
                    </div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--text3)", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "24px", marginBottom: 14 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--text3)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Node.js","Fastify","Next.js 15","React","TypeScript","PostgreSQL","Supabase","Redis","BullMQ","GPT-4o-mini","OpenAI SDK","Zod","TronWeb","Alchemy","Flutterwave","Paystack","Prembly","Reloadly","Infobip","Resend","Render","Vercel","AWS EC2"].map(t => (
                  <span key={t} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", background: "var(--bg3)", border: "1px solid var(--border)", padding: "3px 9px", borderRadius: 4 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Live Platform", url: "https://www.infinitswap.ai", note: "Marketing site" },
                { label: "Admin Dashboard", url: "https://superadmin2526.infinitswap.ai", note: "Ops control centre" },
              ].map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)", padding: "14px 18px",
                  fontFamily: "var(--mono)", fontSize: 11, color: "var(--text2)",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accentBd; e.currentTarget.style.color = accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
                >
                  <div>
                    <div>{l.label} ↗</div>
                    <div style={{ fontSize: 9.5, color: "var(--text3)", marginTop: 2 }}>{l.note}</div>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* ── NAV ── */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 80, paddingTop: 48, borderTop: "1px solid var(--border)" }}>
          <Link to="/" style={{ display: "flex", flexDirection: "column", gap: 4, textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "1px" }}>← ALL PROJECTS</span>
            <span style={{ fontFamily: "var(--disp)", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Back to work</span>
          </Link>
          <Link to="/project/writey" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "1px" }}>NEXT →</span>
            <span style={{ fontFamily: "var(--disp)", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Writey</span>
          </Link>
        </div>

      </div>
    </div>
  );
}