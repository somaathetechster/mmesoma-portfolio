export const projects = [
  {
    id: "infinitswap",
    name: "Infinitswap",
    url: "https://www.infinitswap.ai",
    year: "2024–2025",
    status: "Live",
    statusColor: "green",
    role: "AI Engineer · Full-Stack Developer · Systems Architect",
    category: "Conversational AI · FinTech",
    cover: null,
    accentColor: "#4AE8A0",
    index: "01",
    tagline: "Crypto-to-cash across African rails. No app. Just conversation.",
    oneliner: "A WhatsApp-native AI exchange operating 24/7 across 4 African markets with 99.98% uptime.",
    problem: "Crypto off-ramping in Africa was broken at a systemic level. Centralised exchanges demanded KYC most users couldn't complete. App-based dashboards assumed digital literacy that excluded the majority of the market. Settlement took days. The people who needed liquidity most — freelancers, traders, diaspora recipients across Nigeria, Ghana, Tanzania, South Africa — had no good option.\n\nThe real constraint wasn't technical. It was interface. Everyone already had WhatsApp. The challenge: build a complete exchange that operated entirely through natural conversation — quoting, KYC, chain monitoring, PSP routing, payout — without the experience feeling like a command interface.",
    aiImplementation: "I designed and engineered the AI orchestration layer that sits at the core of the system. Every incoming message — regardless of how it's phrased — passes through a multi-stage AI pipeline before any financial logic executes.\n\nThe NLP layer performs intent classification, entity extraction, and confidence scoring simultaneously. A message like \"I want to cash out 500 USDT to naira, my GTB is 0123456789\" gets decomposed into structured financial data in under 200ms. Below a confidence threshold of 0.72, the system generates a contextual clarification prompt rather than guessing. Above it, the orchestrator routes to the appropriate transaction handler.\n\nThe agentic layer maintains full conversational state across multi-turn exchanges — so a user can say \"actually make that 300\" three messages later and the system knows exactly what to update. I also designed an ambiguity resolution engine that handles compound intents, local shorthand (50k, 1m), and bank name variants (GTB, GT Bank, Guaranty Trust) through normalisation maps trained on Nigerian financial vernacular.",
    aiComponents: [
      { id: "AI_01", title: "Multi-stage NLP pipeline", desc: "Intent classification, entity extraction, and confidence scoring run in parallel on every incoming message before any business logic executes." },
      { id: "AI_02", title: "Confidence-gated routing", desc: "Messages below a 0.72 confidence threshold trigger AI-generated contextual clarification — the system admits uncertainty rather than guessing with someone's money." },
      { id: "AI_03", title: "Agentic conversational state", desc: "Multi-turn context management that holds transaction state, KYC status, and user preferences across an entire session without loss of position." },
      { id: "AI_04", title: "Ambiguity resolution engine", desc: "Handles compound intents, local currency shorthand (50k, 1m), dialect variants, and bank name normalisation trained on Nigerian/Ghanaian/Tanzanian/South African financial vernacular." },
      { id: "AI_05", title: "Adaptive KYC dialogue", desc: "Intent-aware onboarding conversation that adapts its question sequence based on what the user has already volunteered, replacing static multi-step forms." },
      { id: "AI_06", title: "AI receipt narration", desc: "Every completed transaction generates an AI-written plain-language description — not a transaction code, a sentence a person would actually read." },
    ],
    impact: [
      { metric: "99.98%", label: "platform uptime" },
      { metric: "12ms", label: "response latency" },
      { metric: "4", label: "African markets" },
      { metric: "T+0", label: "settlement time" },
    ],
    snippets: [
      {
        filename: "orchestrator.js",
        desc: "AI intent classification with confidence gating",
        code: `// Every WhatsApp message passes through AI classification
// before any financial logic executes. Routes on intent, not commands.
async function classifyAndRoute(session, rawMessage) {
  const { intent, entities, confidence } = await nlpClassify({
    message: rawMessage,
    userProfile: session.user,
    conversationHistory: session.history.slice(-6),
    locale: session.user.country,
  });

  // Core trust mechanism: admit uncertainty, never guess
  if (confidence < 0.72) {
    const prompt = await generateClarificationPrompt({
      message: rawMessage,
      ambiguousEntities: entities.filter(e => e.confidence < 0.8),
      sessionContext: session.context,
    });
    return sendMessage(session.phone, prompt);
  }

  return {
    SELL_CRYPTO:   () => initiateSellFlow(session, entities),
    BUY_CRYPTO:    () => initiateBuyFlow(session, entities),
    SEND_FIAT:     () => initiateFiatTransfer(session, entities),
    BUY_AIRTIME:   () => initiateAirtimeFlow(session, entities),
    CHECK_BALANCE: () => fetchBalance(session),
    START_KYC:     () => beginKYCFlow(session),
    COMPOUND:      () => sequenceMultiIntent(session, entities),
  }[intent]?.() ?? handleUnknown(session, rawMessage);
}`
      },
      {
        filename: "entity-extractor.js",
        desc: "Structured financial data extraction from natural language",
        code: `// "Send 50k to Amaka, her GTB number is 0123456789"
// → fully structured, validated transaction object

const NORMALISATIONS = {
  amounts:  { '50k': 50000, '1m': 1_000_000, '500 dollars': 500 },
  banks:    { 'gtb': 'Guaranty Trust Bank', 'zenith': 'Zenith Bank',
               'access': 'Access Bank', 'uba': 'United Bank for Africa' },
  currency: { 'naira': 'NGN', 'cedis': 'GHS', 'rand': 'ZAR', 'shillings': 'TZS' },
};

async function extractEntities(message, userContext) {
  const raw = await aiClient.extract({
    system: buildExtractionPrompt(userContext.locale, userContext.transactionHistory),
    input: message,
    schema: {
      amount:         { type: 'number', required: true },
      sourceCurrency: { type: 'string', enum: ['USDT','BTC','ETH'] },
      targetCurrency: { type: 'string', enum: ['NGN','GHS','TZS','ZAR'] },
      recipientName:  { type: 'string' },
      bankName:       { type: 'string' },
      accountNumber:  { type: 'string', pattern: /^\\d{10}$/ },
    },
    normalisations: NORMALISATIONS,
  });
  return validate(raw, userContext);
}`
      },
    ],
    lesson: "The most important AI design decision in a financial system is knowing when not to act. The confidence threshold — the moment the system chooses clarification over assumption — is what separates a trustworthy AI financial layer from a liability.",
  },

  {
    id: "writey",
    name: "Writey",
    url: "https://writey.co",
    year: "2024–2025",
    status: "Live",
    statusColor: "green",
    role: "AI Systems Engineer · Full-Stack Developer",
    category: "Generative AI · NLP Systems",
    cover: null,
    accentColor: "#A78BFA",
    index: "02",
    tagline: "20+ AI writing tools. No login. No friction. Engineered to perform.",
    oneliner: "A full-suite AI writing platform — paraphraser, humaniser, grammar engine, AI detector, and document chat across PDF, Word, PowerPoint, and Excel.",
    problem: "Free AI writing tools fail in one of two ways: they're shallow single-feature utilities that break on real writing complexity, or they're paywalled platforms that gate genuine capability behind subscriptions. Neither was acceptable.\n\nWritey needed to deliver a complete AI writing suite — 20+ distinct tools, each genuinely capable — with zero friction. No login. No account. Immediate access. The engineering challenge: 20+ separate AI workflows, each with different model requirements, quality standards, and output formats, running at scale for anonymous high-volume traffic.",
    aiImplementation: "Writey is an AI product, not a product with AI added to it. I designed the AI system architecture powering the full suite: a multi-model task router, the humanisation pipeline, an AI detection engine, a document RAG system supporting four file formats, tone calibration, and a quality gate layer that validates every generation before it reaches the user.\n\nThe architectural decision that defined everything: different writing tasks need fundamentally different model behaviour. A paraphraser needs high temperature and structural variation. A grammar checker needs near-determinism and precision. An AI humaniser needs to defeat statistical patterns (low perplexity, low burstiness) while preserving semantics. I built a unified task router that dispatches each request to a purpose-configured model stack — then routes output through task-specific quality gates before delivery. No generic prompting. Every tool is a distinct AI workflow.",
    aiComponents: [
      { id: "AI_01", title: "Multi-model task router", desc: "Dispatches each of 20+ writing tasks to purpose-configured model parameters — temperature, system prompt, max tokens, and post-processing all vary by task type." },
      { id: "AI_02", title: "AI humanisation pipeline", desc: "Reduces perplexity and burstiness patterns that AI detectors target by varying sentence length, introducing natural rhythm, and restructuring without changing meaning." },
      { id: "AI_03", title: "Document RAG engine", desc: "Parses, chunks (with overlap), and indexes PDF, DOCX, PPTX, and XLSX files. Enables conversational Q&A over document content with source attribution and anti-hallucination guardrails." },
      { id: "AI_04", title: "Statistical AI detection", desc: "Analyses text for low perplexity, low burstiness, structural uniformity, and phrase repetition — the statistical fingerprint of AI generation — and returns a calibrated confidence score." },
      { id: "AI_05", title: "Tone calibration engine", desc: "Detects the current register of input text and rewrites to a target tone (formal, casual, persuasive, academic, professional) while preserving the argument and factual content." },
      { id: "AI_06", title: "Quality gate layer", desc: "All generation outputs pass through task-specific quality validation before reaching the user. Low-quality outputs trigger silent regeneration — users never see a failed attempt." },
    ],
    impact: [
      { metric: "20+", label: "distinct AI tools" },
      { metric: "0", label: "login required" },
      { metric: "4", label: "document formats" },
      { metric: "< 2s", label: "avg response time" },
    ],
    snippets: [
      {
        filename: "task-router.js",
        desc: "Dispatching 20+ writing tasks to optimal model configurations",
        code: `// Different writing tasks need fundamentally different model behaviour.
// One temperature setting for 20 tools = mediocre output on 19 of them.

const TASK_CONFIGS = {
  PARAPHRASE: {
    temperature: 0.85,
    system: 'Rewrite this text. Preserve all meaning precisely. Vary sentence structure significantly. Never add or remove information.',
    validate: (input, output) => semanticSimilarity(input, output) > 0.88,
  },
  GRAMMAR_CHECK: {
    temperature: 0.05,
    system: 'Correct all grammatical errors. Return corrected text and a JSON array of {original, corrected, rule} for each change.',
    validate: (input, output) => output.corrections !== undefined,
  },
  HUMANISE: {
    temperature: 0.95,
    system: 'Rewrite to sound naturally human. Vary sentence length dramatically. Use contractions. Introduce natural rhythm. No repetitive structures.',
    validate: (input, output) => burstinessScore(output) > 0.6,
  },
  SUMMARISE: {
    temperature: 0.25,
    system: 'Summarise. Preserve the core argument and critical evidence only. Target 25-30% of original length. No filler.',
    validate: (input, output) => output.length < input.length * 0.35,
  },
};

async function routeTask(taskType, input, options = {}) {
  const config = TASK_CONFIGS[taskType];
  const output = await ai.complete({ ...config, user: input });

  // Quality gate — silent regeneration if below threshold
  if (config.validate && !config.validate(input, output)) {
    return routeTask(taskType, input, { ...options, strictMode: true });
  }
  return output;
}`
      },
      {
        filename: "document-rag.js",
        desc: "Retrieval-augmented document chat across PDF, Word, PowerPoint, Excel",
        code: `// User uploads any document → asks questions → gets answers with sources.
// Anti-hallucination: model only answers from retrieved content.

async function buildDocumentIndex(file, sessionId) {
  const content = await parseByFormat(file, {
    pdf:  (f) => extractPDFText(f, { preserveLayout: true }),
    docx: (f) => extractWordContent(f, { includeHeadings: true }),
    pptx: (f) => extractSlides(f, { includeSpeakerNotes: true }),
    xlsx: (f) => extractSheets(f, { headerRowDetection: true }),
  });

  // Chunk with overlap to preserve cross-boundary context
  const chunks = chunkText(content, {
    maxTokens:         800,
    overlapTokens:     120,
    preserveStructure: true, // Keep headings attached to their section
  });

  await sessionStore.set(sessionId, chunks);
  return { chunkCount: chunks.length, wordCount: content.split(' ').length };
}

async function queryDocument(question, sessionId) {
  const chunks = await sessionStore.get(sessionId);
  const relevant = await rankByRelevance(question, chunks, { topK: 5 });

  return ai.complete({
    temperature: 0.05,
    system: 'Answer using ONLY the provided document content. If the answer is absent, say exactly that. Never infer beyond the text.',
    user: \`Content:\n\${relevant.map(c => c.text).join('\n---\n')}\n\nQuestion: \${question}\`,
  });
}`
      },
    ],
    lesson: "Building a platform where AI is the product forces a level of system design rigor that feature-level AI never requires. Every tool has to be genuinely excellent, not just functional. The discipline that made the difference: treat each writing task as a distinct AI problem requiring its own architecture — not a variation of a generic completion request.",
  },

  {
    id: "bumpa",
    name: "Bumpa",
    url: "https://www.getbumpa.com",
    year: "2025",
    status: "In Development",
    statusColor: "amber",
    role: "AI Engineer · Systems Designer",
    category: "AI · Business Intelligence",
    cover: null,
    accentColor: "#E8944A",
    index: "03",
    tagline: "The intelligence layer Africa's 100,000+ SMEs didn't know they were missing.",
    oneliner: "An AI system designed on top of Bumpa's business management infrastructure — converting passive transaction data into actionable daily intelligence.",
    problem: "Bumpa serves over 100,000 small and medium businesses across Africa, capturing every sale, stock movement, customer interaction, and expense. The data exists. But it sits there.\n\nBusiness owners look at numbers without knowing what they mean or what to do next. They make high-stakes decisions — what to restock, who to extend credit to, when to run a promotion — on intuition, not intelligence. The gap isn't data. It's the interpretive layer between data and decision. Enterprise businesses have entire analytics teams to fill that gap. Bumpa's SMEs have nothing.",
    aiImplementation: "I designed an AI intelligence layer that intercepts data Bumpa already captures and transforms it into decisions — without requiring any change to how business owners work.\n\nThe system runs asynchronously against the existing data infrastructure. Sales histories become velocity models. Velocity models become restock predictions. Customer purchase records become churn risk scores. Product catalogues become AI-generated storefront listings. And every merchant's previous day becomes a plain-language WhatsApp digest delivered at 8am — one insight, one recommended action, no dashboard required.\n\nThe delivery mechanism was as important as the intelligence itself. Not a new app. Not a new tab in the dashboard. WhatsApp — the interface every merchant already opens 30 times a day.",
    aiComponents: [
      { id: "AI_01", title: "Predictive inventory intelligence", desc: "Recency-weighted sales velocity modelling predicts stockout timing and recommends reorder quantities — accounting for seasonality and product-specific demand patterns." },
      { id: "AI_02", title: "Customer churn prediction", desc: "RFM-based scoring (Recency, Frequency, Monetary) surfaces customers drifting toward churn before they leave, triggering personalised automated win-back sequences." },
      { id: "AI_03", title: "AI product listing generator", desc: "Takes product name, category, and price — returns SEO-optimised title, description, and tags for the Bumpa storefront. Eliminates manual copywriting entirely." },
      { id: "AI_04", title: "Daily business digest", desc: "Plain-language WhatsApp summary of the previous day: top product, revenue vs. rolling average, stock alerts, and one concrete action — generated and delivered at 8am daily." },
      { id: "AI_05", title: "Automated marketing copy engine", desc: "Generates WhatsApp broadcast messages, Instagram captions, and promotional texts tailored to each business's tone, active inventory, and current offer — on demand or scheduled." },
      { id: "AI_06", title: "Smart expense categorisation", desc: "Classifies logged expenses into business categories (COGS, marketing, operations) and flags anomalies or unusual patterns for owner review." },
    ],
    impact: [
      { metric: "100K+", label: "SMEs on Bumpa platform" },
      { metric: "0", label: "new interfaces required" },
      { metric: "8AM", label: "daily digest delivery" },
      { metric: "WhatsApp", label: "primary delivery channel" },
    ],
    snippets: [
      {
        filename: "inventory-intelligence.js",
        desc: "Predictive stockout detection with natural-language WhatsApp alerts",
        code: `// Bumpa already captures every sale. This converts that history
// into a forward-looking prediction — delivered before the stockout happens.

async function analyseStockoutRisk(productId, storeId) {
  const [history, currentStock, product] = await Promise.all([
    getSalesHistory(productId, storeId, { days: 90 }),
    getStockLevel(productId, storeId),
    getProductDetails(productId),
  ]);

  // Recency-weighted velocity: last 2 weeks count 1.8x more than older data
  const velocity = computeWeightedVelocity(history, { recentMultiplier: 1.8 });
  const seasonal = await getSeasonalIndex(productId, new Date().getMonth());
  const daysLeft  = Math.floor(currentStock / (velocity.daily * seasonal));

  const risk = daysLeft < 3 ? 'CRITICAL' : daysLeft < 7 ? 'HIGH' : daysLeft < 14 ? 'MEDIUM' : 'LOW';

  if (risk === 'CRITICAL' || risk === 'HIGH') {
    const message = await ai.generate({
      system: 'Write a brief, direct WhatsApp alert to a Nigerian small business owner. Friendly tone. Include the product name, days left, and a specific reorder quantity. Max 3 sentences.',
      user: JSON.stringify({ product: product.name, currentStock, daysLeft, reorderQty: Math.ceil(velocity.daily * 30) }),
      temperature: 0.4,
    });
    await sendWhatsApp(store.ownerPhone, message);
  }

  return { daysLeft, risk, recommendedReorder: Math.ceil(velocity.daily * 30) };
}`
      },
      {
        filename: "daily-digest.js",
        desc: "AI-generated morning briefing delivered via WhatsApp",
        code: `// 8AM. Every merchant. Plain language. One action.
// No dashboard. No login. Just a WhatsApp message.
async function generateAndDeliverDigest(merchantId) {
  const yesterday = getDateRange('yesterday');

  const [sales, alerts, customers, topProduct] = await Promise.all([
    getSalesSummary(merchantId, yesterday),
    getStockAlerts(merchantId),
    getCustomerActivity(merchantId, yesterday),
    getTopProduct(merchantId, yesterday),
  ]);

  const rollingAvg  = await getRollingRevenuAverage(merchantId, { days: 14 });
  const vsAverage   = ((sales.revenue - rollingAvg) / rollingAvg * 100).toFixed(1);
  const netProfit   = sales.revenue - sales.cogs - sales.expenses;

  const digest = await ai.generate({
    system: \`You're a sharp business advisor for an African SME owner. 
      Write a WhatsApp message. 4-5 sentences max. 
      Be specific — name products, use real numbers.
      End with exactly ONE concrete action they should take today.
      No jargon. Write like a knowledgeable friend, not a consultant.\`,
    user: JSON.stringify({ sales, alerts, topProduct, netProfit, vsAverage, customers }),
    temperature: 0.45,
    maxTokens: 160,
  });

  await sendWhatsApp(merchant.phone, digest);
  await logDigest(merchantId, digest, { scheduledAt: new Date() });
}`
      },
    ],
    lesson: "The most impactful constraint I set: every intelligence output had to work through WhatsApp, not a new interface. That constraint forced every AI output to be genuinely plain-language, genuinely actionable, and genuinely brief. It made the system better, not worse.",
  },

  {
    id: "primestakecorp",
    name: "PrimestakeCorp",
    url: "https://primestakecorp.com",
    year: "2024",
    status: "Live",
    statusColor: "green",
    role: "AI Engineer · Full-Stack Developer",
    category: "FinTech · AI Product Design",
    cover: null,
    accentColor: "#60A5FA",
    index: "04",
    tagline: "Sovereign capital deployment. Institutional staking infrastructure. AI-driven intelligence.",
    oneliner: "Algorithmic staking platform for family offices and HNW principals — T+0 settlement, 24/7 liquidity, AI-powered portfolio intelligence.",
    problem: "Institutional investors understand capital allocation, risk-adjusted returns, and yield targets. They do not understand validator architecture, slashing conditions, lock-up mechanics, or protocol-level risk. PrimestakeCorp needed to serve sophisticated capital — real money from family offices and high-net-worth principals — while abstracting every technical layer that would erode confidence.\n\nThe positioning was deliberate: Sovereign Capital Deployment. The product had to feel like a private wealth terminal, not a retail crypto dashboard.",
    aiImplementation: "I designed and implemented the AI intelligence layer that translates between two languages: investor objectives and protocol mechanics. The system interprets capital goals — target yield, liquidity horizon, risk tolerance, capital size — and maps them to concrete staking configurations, while converting all technical metrics into the vocabulary of institutional finance.\n\nThe AI layer also powers the secure client terminal: real-time portfolio narrative generation, anomaly detection with plain-language alerts, and automated position reporting that replaces manual wealth desk report production. Every output is calibrated to the register of private wealth management — precise, quantified, conservative in its claims, and explicitly honest about uncertainty.",
    aiComponents: [
      { id: "AI_01", title: "Goal-to-configuration mapping", desc: "Translates investor objectives (yield %, liquidity horizon, risk tolerance, capital size) into concrete staking protocol selections and position sizing recommendations." },
      { id: "AI_02", title: "Institutional language translation", desc: "Converts validator scores, APY variance, slashing history, and protocol uptime into private wealth terminology — every output speaks the investor's language, not the protocol's." },
      { id: "AI_03", title: "Portfolio narrative engine", desc: "AI-generated real-time summaries of active positions, yield performance, and projected returns for the secure client terminal — replacing manual report production." },
      { id: "AI_04", title: "Anomaly detection and alerting", desc: "Monitors position performance and platform behaviour against expected parameters. Surfaces deviations in human-readable alerts to authorised principals." },
      { id: "AI_05", title: "Risk-adjusted recommendation engine", desc: "Weights available staking options against the investor's stated profile, quantifies trade-offs, and presents recommendations with explicit confidence levels." },
    ],
    impact: [
      { metric: "T+0", label: "settlement time" },
      { metric: "13–3200%", label: "yield range" },
      { metric: "24/7", label: "liquidity access" },
      { metric: "100%", label: "institutional-grade" },
    ],
    snippets: [
      {
        filename: "staking-advisor.js",
        desc: "Mapping investor objectives to protocol configurations",
        code: `// Investor states objectives in plain terms.
// AI maps to concrete staking configurations — zero jargon required.
async function recommendConfiguration(investorProfile) {
  const { targetYield, riskTolerance, liquidityHorizon, capitalUSD } = investorProfile;

  const pools = await fetchVerifiedPools({ minLiquidity: capitalUSD * 0.1, active: true });

  const { recommendations } = await ai.complete({
    temperature: 0.15, // Institutional context demands precision
    system: \`You are a private wealth staking advisor. Institutional clients only.
      Language: institutional finance. Never use protocol-native terminology 
      without a plain-language explanation in parentheses.
      Quantify every claim. State confidence levels explicitly.
      If you are uncertain, say so precisely — do not hedge vaguely.
      
      Client: yield target \${targetYield}% | risk: \${riskTolerance} 
              | liquidity: \${liquidityHorizon} | capital: $\${capitalUSD.toLocaleString()}\`,
    user: \`Available pools: \${JSON.stringify(pools)}\`,
    responseFormat: 'structured_recommendations',
  });

  return enrichWithLiveMetrics(recommendations);
}`
      },
      {
        filename: "portfolio-narrator.js",
        desc: "Automated institutional portfolio reporting",
        code: `// Replaces manual report production for the wealth desk.
// Runs at 6AM daily and on-demand from the secure client terminal.
async function narratePortfolio(clientId, period) {
  const [positions, performance, flags, benchmarks] = await Promise.all([
    getActivePositions(clientId),
    getYieldPerformance(clientId, period),
    getAnomalyFlags(clientId),
    getIndustryBenchmarks(period),
  ]);

  const narrative = await ai.generate({
    temperature: 0.1,
    system: \`Write a private wealth portfolio summary. 
      Register: measured, precise, institutional. 
      Structure: [Executive Summary] [Position Breakdown] [Risk Flags] [Outlook]
      Rules: No promotional language. No hedging. 
             State anomalies plainly and recommend specific action.
             All figures in USD. Percentages to 2dp. 
             Compare against benchmarks where available.\`,
    user: JSON.stringify({ positions, performance, flags, benchmarks, period }),
  });

  await deliverToTerminal(clientId, narrative);
  await archiveReport(clientId, narrative, period);
  return narrative;
}`
      },
    ],
    lesson: "Institutional AI design demands a standard that consumer AI never has to meet. The language, precision, and confidence calibration of every output has to match the expectations of people who manage capital for a living. Getting the tone register exactly right — not just the logic — was as important as any technical decision.",
  },

  {
    id: "proboundaries",
    name: "Pro Boundaries",
    url: "https://www.pro-boundaries.site",
    year: "2025",
    status: "Live",
    statusColor: "green",
    role: "AI Engineer · Full-Stack Developer",
    category: "Generative AI · Workplace Intelligence",
    cover: null,
    accentColor: "#F472B6",
    index: "05",
    tagline: "Decode. Diagnose. Respond. An AI OS for workplace communication.",
    oneliner: "Four-module AI system that decodes workplace messages, audits power dynamics, generates tiered response strategies, and tracks recurring communication patterns over time.",
    problem: "Most workplace communication failures are not knowledge problems — they're access problems. Professionals know what they want to say. They cannot find the right words under pressure, in the moment, in the 90 seconds before they need to respond.\n\nBoundary violations, passive aggression, scope creep, and power-imbalanced requests arrive in real time. The response window is seconds. The result: people either capitulate or escalate badly. The space between those two outcomes — firm, clear, professional communication — exists for most people in hindsight. Pro Boundaries makes it available in real time.",
    aiImplementation: "I designed a four-module AI communication system, each module targeting a distinct phase of the problem. Translation Engine decodes what a message actually means. The Communication Auditor identifies the power dynamics and manipulation patterns at play. The Escalation Ladder generates three calibrated response strategies. The History Log tracks patterns from the same sender over time.\n\nEach module is a separate AI workflow with its own reasoning architecture — different temperature settings, different output schemas, different validation logic. They share a unified session layer so intelligence generated in one module flows into the next: the Auditor's power dynamic analysis informs the Escalation Ladder's response calibration; the History Log's pattern data sharpens both the Translator and the Auditor over time.",
    aiComponents: [
      { id: "AI_01", title: "Translation Engine", desc: "Decodes the real intent behind a workplace message: what the sender actually wants, who benefits from the current framing, implicit obligations created, and cost of compliance to the recipient." },
      { id: "AI_02", title: "Communication Auditor", desc: "Identifies specific manipulation patterns (DARVO, responsibility diffusion, scope creep, false urgency, gaslighting), documents the power dynamic, and classifies severity." },
      { id: "AI_03", title: "Escalation Ladder", desc: "Generates three tiered response strategies — Diplomatic, Direct, Firm — each calibrated to the user's seniority, industry, relationship type, and the identified manipulation pattern." },
      { id: "AI_04", title: "Pattern recognition engine", desc: "Identifies recurring communication tactics from the same sender across history — builds a longitudinal map of behaviour that sharpens all other modules over time." },
      { id: "AI_05", title: "Register calibration system", desc: "Ensures every generated response matches the user's professional context — seniority level, industry norms, organisational culture, and relationship type." },
      { id: "AI_06", title: "Documentation intelligence", desc: "Formats exchanges and AI analysis into professionally structured records suitable for HR escalation — timestamped, pattern-annotated, and incident-grade." },
    ],
    impact: [
      { metric: "4", label: "AI modules" },
      { metric: "< 3s", label: "full analysis time" },
      { metric: "3", label: "response tiers generated" },
      { metric: "Live", label: "pattern tracking" },
    ],
    snippets: [
      {
        filename: "translation-engine.js",
        desc: "Decoding the real intent behind workplace messages",
        code: `// User pastes a message. AI reveals what it actually means.
// Not what it says — what it does.
async function translateMessage(rawMessage, context) {
  return ai.analyse({
    temperature: 0.15, // Precision over creativity for diagnostic work
    system: \`You are an expert in workplace communication dynamics, 
      organisational psychology, and power structures.
      
      Analyse this message. Return a structured breakdown:
      
      SURFACE_MEANING   What it literally says
      REAL_INTENT       What the sender actually wants from this exchange  
      POWER_DYNAMIC     How this positions sender vs recipient; who holds leverage
      IMPLICIT_PRESSURE What unstated obligation or assumption it creates
      COMPLIANCE_COST   What agreeing to this framing costs the recipient
      RECOMMENDED_POSTURE How to orient before responding
      
      Rules: Be precise. Do not soften findings.
             Name patterns if you see them (scope creep, false urgency, DARVO).
             State what you observe, not what you assume about intent.\`,
    user: \`Message: "\${rawMessage}"
           Relationship: \${context.relationship} (\${context.senderSeniority} → \${context.recipientSeniority})
           Industry: \${context.industry}\`,
  });
}`
      },
      {
        filename: "escalation-ladder.js",
        desc: "Generating three calibrated response strategies",
        code: `// Three tiers. User picks their register.
// AI writes the actual message — calibrated to their exact context.
async function buildEscalationLadder(situation, auditResult, userProfile) {
  const tiers = [
    {
      level: 'DIPLOMATIC',
      brief: 'Relationship-preserving. Boundary is set clearly but warmly. Door stays open. No ambiguity about the limit.',
    },
    {
      level: 'DIRECT',
      brief: 'No hedging. States the boundary plainly. Professional but unambiguous. No softening language.',
    },
    {
      level: 'FIRM',
      brief: 'Documentation-grade. No room for reinterpretation. Suitable for HR record if ignored. Never hostile — but unmistakably final.',
    },
  ];

  const responses = await Promise.all(tiers.map(tier =>
    ai.generate({
      temperature: 0.35,
      system: \`\${tier.brief}
        Pattern identified: \${auditResult.patternType}
        Power dynamic: \${JSON.stringify(auditResult.powerDynamic)}
        User: \${userProfile.seniority} | \${userProfile.industry} | \${userProfile.relationship}
        Generate the response they would send — not advice about what to say.\`,
      user: situation,
    })
  ));

  return tiers.map((tier, i) => ({ level: tier.level, message: responses[i] }));
}`
      },
    ],
    lesson: "Pro Boundaries crystallised a principle I now apply to every AI system: the highest-value AI gives people access to something they already had — but couldn't retrieve under pressure. The Translation Engine doesn't produce insight the user couldn't eventually reach on their own. It produces it in 3 seconds instead of 3 days. In high-stakes moments, that difference changes outcomes.",
  },
];

export const stats = [
  { value: "5", label: "AI systems in production" },
  { value: "4", label: "African markets served" },
  { value: "99.98%", label: "Infinitswap uptime" },
  { value: "20+", label: "AI tools shipped in Writey" },
];

export const disciplines = [
  {
    id: "ai-eng",
    icon: "◈",
    title: "AI Engineering",
    items: ["NLP pipeline design", "LLM orchestration", "Prompt architecture", "Retrieval-augmented generation", "AI quality systems", "Agentic workflows"],
  },
  {
    id: "full-stack",
    icon: "⬡",
    title: "Full-Stack Development",
    items: ["React / Next.js", "Node.js / Fastify", "TypeScript", "PostgreSQL / Redis", "REST APIs", "System architecture"],
  },
  {
    id: "product",
    icon: "▣",
    title: "Product Engineering",
    items: ["AI product strategy", "Conversational UX", "Systems design", "Implementation planning", "Process automation", "SOP documentation"],
  },
];
