export const profile = {
  name: "Parth Rohit",
  role: "Software Engineer",
  statement:
    "I build systems around explicit state ownership, deterministic verification, and enforceable API boundaries.",
  supporting:
    "My work includes a stateful Cloudflare edge workspace, a hash-linked execution ledger, role-scoped operational platforms, and merged Azure security contributions.",
  location: "London, United Kingdom",
  availability: "Open to UK graduate and new-grad roles",
  email: "parthrohit60@gmail.com",
  phone: "+44 07917 057726",
  linkedin: "https://www.linkedin.com/in/parthrohit",
  github: "https://github.com/parthrohit22",
  education: {
    degree: "BSc (Hons) Computing Systems",
    school: "Ulster University, London",
    graduation: "Expected September 2026",
    achievements: ["Dean's List — Academic Excellence (Year 1 & Year 2)"],
  },
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

export type EngineeringDecision = {
  choice: string;
  rationale: string;
  rejectedAlternative: string;
  consequence: string;
};

export type EngineeringCaseStudy = {
  id: string;
  name: string;
  positioning: string;
  domains: string[];
  evidence: string[];
  problem: string;
  significance: string;
  architecture: {
    caption: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  challenges: string[];
  tradeoffs: string[];
  decisions: EngineeringDecision[];
  technologies: string[];
  repository: string;
  demo?: string;
  contribution?: string;
};

export const caseStudies: EngineeringCaseStudy[] = [
  {
    id: "lyta",
    name: "LYTA",
    positioning: "Stateful edge-native workspace for technical work.",
    domains: ["State ownership", "Edge computing", "Retrieval", "Streaming"],
    evidence: [
      "AuthDirectory owns accounts, password hashes, sessions, and token validation.",
      "Workspace owns profiles, chat indexes, file metadata, chunks, embeddings, and retrieval.",
      "Conversation owns ordered chat memory, summaries, follow-ups, and streaming persistence.",
    ],
    problem:
      "A useful technical workspace needs persistent conversations, reusable files, retrieval, and citations. Treating those concerns as one stateless prompt handler makes ownership and concurrent writes difficult to reason about.",
    significance:
      "LYTA makes each state boundary explicit. The router resolves identity and coordinates work, while separate Durable Objects own account, workspace, and conversation state.",
    architecture: {
      caption:
        "Simplified from LYTA's documented Worker Router and Durable Object ownership model.",
      nodes: [
        { id: "browser", label: "Browser UI", detail: "chat · files · board", x: 95, y: 165 },
        {
          id: "router",
          label: "Worker Router",
          detail: "identity · orchestration",
          x: 305,
          y: 165,
        },
        { id: "auth", label: "AuthDirectory DO", detail: "accounts · sessions", x: 555, y: 65 },
        { id: "workspace", label: "Workspace DO", detail: "files · retrieval", x: 555, y: 165 },
        {
          id: "conversation",
          label: "Conversation DO",
          detail: "memory · streaming",
          x: 555,
          y: 265,
        },
        { id: "embeddings", label: "Workers AI", detail: "embeddings", x: 815, y: 110 },
        { id: "chat", label: "Workers AI", detail: "chat model", x: 815, y: 240 },
      ],
      edges: [
        { from: "browser", to: "router", label: "requests" },
        { from: "router", to: "auth", label: "identity" },
        { from: "router", to: "workspace", label: "library" },
        { from: "router", to: "conversation", label: "chat" },
        { from: "workspace", to: "embeddings", label: "vectors" },
        { from: "conversation", to: "chat", label: "stream" },
      ],
    },
    challenges: [
      "Resolve guest and account identities without allowing workspace state to cross ownership boundaries.",
      "Open a valid SSE response before model work begins, then persist the ordered conversation as tokens stream.",
      "Combine browser-side document extraction with server-owned chunking, embeddings, retrieval, and citations.",
    ],
    tradeoffs: [
      "Guest state is temporary and scoped to a guest cookie.",
      "Retrieval stays inside Durable Object state rather than using a dedicated vector database.",
      "Browser extraction keeps the service compact but does not replace server-side OCR.",
    ],
    decisions: [
      {
        choice: "Assign state to purpose-specific Durable Objects.",
        rationale:
          "Account, workspace, and conversation data have different ownership and ordering requirements.",
        rejectedAlternative:
          "A stateless worker backed by one shared store would make those boundaries implicit and coordinate writes centrally.",
        consequence:
          "Ownership is easier to reason about, while scaling follows Durable Object placement rather than unconstrained stateless replication.",
      },
      {
        choice: "Extract supported document text in the browser.",
        rationale:
          "The Worker can focus on reusable storage, chunking, embeddings, and retrieval instead of parsing every file format.",
        rejectedAlternative:
          "A server-side extraction pipeline would add runtime and operational dependencies to the edge service.",
        consequence:
          "The architecture stays compact, but scanned documents require a future OCR path.",
      },
    ],
    technologies: [
      "TypeScript",
      "Cloudflare Workers",
      "Durable Objects",
      "Workers AI",
      "Server-Sent Events",
      "PDF.js",
      "Mammoth",
    ],
    repository: "https://github.com/parthrohit22/lyta",
    demo: "https://lyta.parthrohit-dev.workers.dev",
  },
  {
    id: "kalyx",
    name: "KALYX",
    positioning:
      "Execution evidence integrity system with independently anchored verification boundaries.",
    domains: [
      "Deterministic verification",
      "Evidence integrity",
      "Shared services",
      "External anchoring",
    ],
    evidence: [
      "Events pass through shared validation, enrichment, normalization, and trust-gated append services.",
      "Canonical record hashes and previous-hash links create a deterministic execution ledger.",
      "Detection runs only after full-ledger hash-chain verification succeeds.",
    ],
    problem:
      "Local execution history can remain plausible after records are modified, reordered, truncated, or replaced. An investigator therefore needs evidence continuity, not merely readable logs.",
    significance:
      "KALYX recomputes the ledger and reports the first untrusted boundary. Local checkpoints and an independent Raspberry Pi anchor provide additional comparison points without claiming that the original event source was truthful.",
    architecture: {
      caption:
        "Simplified from KALYX's documented Interfaces, Host Evidence Core, and Raspberry Pi Anchor Authority.",
      nodes: [
        { id: "interfaces", label: "Interfaces", detail: "CLI · API · dashboard", x: 90, y: 170 },
        { id: "pipeline", label: "Pipeline", detail: "validate · normalize", x: 285, y: 170 },
        { id: "ledger", label: "Hash-linked Ledger", detail: "canonical records", x: 485, y: 170 },
        { id: "verify", label: "Verification", detail: "trusted boundary", x: 680, y: 85 },
        { id: "detect", label: "Detection", detail: "verified evidence", x: 680, y: 255 },
        { id: "checkpoint", label: "Checkpoints", detail: "verified state", x: 870, y: 85 },
        { id: "anchor", label: "Pi Anchor", detail: "independent chain", x: 870, y: 255 },
      ],
      edges: [
        { from: "interfaces", to: "pipeline", label: "events" },
        { from: "pipeline", to: "ledger", label: "append" },
        { from: "ledger", to: "verify", label: "recompute" },
        { from: "ledger", to: "detect", label: "gate" },
        { from: "verify", to: "checkpoint", label: "boundary" },
        { from: "checkpoint", to: "anchor", label: "submit" },
      ],
    },
    challenges: [
      "Serialize records canonically so independently recomputed hashes remain repeatable.",
      "Report partial trust precisely when verification fails after an earlier valid boundary.",
      "Keep CLI, FastAPI, and Angular interfaces thin so integrity logic remains in shared services.",
    ],
    tradeoffs: [
      "Verification is O(n) because every record is recomputed in order.",
      "The local JSONL ledger is inspectable but is not an indexed event database.",
      "The current Raspberry Pi anchor stores checkpoint boundaries and does not prove full host state or event truth.",
    ],
    decisions: [
      {
        choice: "Use deterministic hash-linked verification.",
        rationale:
          "Ledger integrity decisions must be explainable, reproducible, and able to identify the first untrusted record.",
        rejectedAlternative:
          "Probabilistic or ML-based detection cannot provide a repeatable cryptographic continuity decision.",
        consequence:
          "Verification remains transparent and testable, but requires an ordered pass across the ledger.",
      },
      {
        choice: "Keep interfaces thin over a shared evidence core.",
        rationale:
          "CLI, HTTP, and dashboard operations must apply the same trust gates and verification behavior.",
        rejectedAlternative:
          "Duplicating integrity logic in each interface would allow behavior and trust decisions to drift.",
        consequence:
          "The backend contract is authoritative, while interfaces remain replaceable access layers.",
      },
    ],
    technologies: ["Python", "FastAPI", "Pydantic", "Angular", "JSONL", "Pytest", "Raspberry Pi"],
    repository: "https://github.com/parthrohit22/kalyx",
  },
  {
    id: "payment-routing",
    name: "Payment Routing",
    positioning: "Role-aware payment operations platform with auditable provider-attempt history.",
    domains: ["Backend authorization", "Operational workflows", "Data isolation", "Frontend state"],
    evidence: [
      "Flask endpoints enforce admin, finance, and merchant permissions from JWT identity.",
      "Merchant queries are scoped on the backend rather than protected only through hidden UI controls.",
      "Each payment stores ordered provider attempts with provider, result, and latency.",
    ],
    problem:
      "A final payment status does not explain which providers were attempted, which user could act, or whether merchant data remained isolated during operational review.",
    significance:
      "The system preserves provider attempts as evidence and keeps authorization in the API. Angular presents role-aware workflows without becoming the authority for protected data or mutations.",
    architecture: {
      caption: "Simplified from the documented Angular, Flask route, and MongoDB request flow.",
      nodes: [
        { id: "angular", label: "Angular", detail: "role-aware workflow", x: 90, y: 170 },
        {
          id: "interceptor",
          label: "HTTP Interceptor",
          detail: "JWT bearer token",
          x: 290,
          y: 170,
        },
        { id: "flask", label: "Flask API", detail: "server authority", x: 490, y: 170 },
        { id: "auth", label: "Auth Routes", detail: "identity · roles", x: 700, y: 70 },
        { id: "payments", label: "Payment Routes", detail: "scope · lifecycle", x: 700, y: 170 },
        { id: "analytics", label: "Analytics Routes", detail: "operational views", x: 700, y: 270 },
        { id: "mongo", label: "MongoDB", detail: "users · payments", x: 910, y: 170 },
      ],
      edges: [
        { from: "angular", to: "interceptor", label: "actions" },
        { from: "interceptor", to: "flask", label: "token" },
        { from: "flask", to: "auth", label: "login" },
        { from: "flask", to: "payments", label: "operations" },
        { from: "flask", to: "analytics", label: "metrics" },
        { from: "auth", to: "mongo" },
        { from: "payments", to: "mongo" },
        { from: "analytics", to: "mongo" },
      ],
    },
    challenges: [
      "Isolate merchant-owned records while retaining global admin and finance workflows.",
      "Keep search, filters, sorting, pagination, and selected-row state synchronized after mutations.",
      "Present role-specific controls without treating frontend guards as the security boundary.",
    ],
    tradeoffs: [
      "Provider attempts model manual routing and fallback history; automated provider selection is not implemented.",
      "Session storage suits the demonstrated workflow but would need stricter token lifecycle controls for a wider deployment.",
      "Unit and behavioral coverage exercises key flows, while browser-level end-to-end coverage remains future work.",
    ],
    decisions: [
      {
        choice: "Store provider attempts as ordered operational evidence.",
        rationale:
          "Provider, outcome, and latency history explains how a payment moved beyond its final status.",
        rejectedAlternative:
          "Storing only an abstract routing result would hide retries and imply automation the system does not perform.",
        consequence:
          "The workflow remains auditable, while provider selection itself stays manual and explicit.",
      },
      {
        choice: "Make the Flask API the authorization authority.",
        rationale:
          "Role and merchant scope must apply even when a client bypasses Angular controls.",
        rejectedAlternative:
          "Frontend-only guards and conditional buttons cannot protect API data or mutations.",
        consequence:
          "The UI can improve navigation, but every protected operation is checked again by the backend.",
      },
    ],
    technologies: ["Angular", "TypeScript", "Flask", "MongoDB", "JWT", "RxJS", "Vitest"],
    repository: "https://github.com/parthrohit22/Payment-Routing-System",
  },
  {
    id: "openshield",
    name: "OpenShield",
    positioning:
      "Merged contributions to an open-source Azure cloud security posture management platform.",
    domains: ["Azure security", "Scanner rules", "Compliance mapping", "Validation"],
    contribution:
      "Contribution scope: Key Vault rules AZ-KV-002 and AZ-KV-003, Azure CLI remediation playbooks, framework mappings, scanner validation documentation, and Learn documentation.",
    evidence: [
      "AZ-KV-002 evaluates Key Vault public network access and includes a matching remediation playbook.",
      "AZ-KV-003 evaluates Key Vault diagnostic logging and maps the finding across compliance files.",
      "Validation documentation defines Azure scenarios, scanner checks, and recorded test results.",
    ],
    problem:
      "An Azure security rule is only useful when its SDK checks, finding identity, remediation path, and compliance references agree. Drift between those surfaces weakens both scanning and review.",
    significance:
      "The merged work connects rule logic to remediation and framework mapping, then documents how scanner behavior can be validated against Azure scenarios.",
    architecture: {
      caption:
        "Simplified from OpenShield's documented Azure scanner, compliance, persistence, and remediation architecture.",
      nodes: [
        { id: "azure", label: "Azure Resources", detail: "SDK · Graph", x: 95, y: 170 },
        { id: "scanner", label: "Scanner Rules", detail: "security checks", x: 305, y: 170 },
        {
          id: "compliance",
          label: "Compliance Maps",
          detail: "CIS · NIST · ISO · SOC 2",
          x: 540,
          y: 70,
        },
        { id: "findings", label: "Findings Store", detail: "scans · resources", x: 540, y: 170 },
        { id: "playbooks", label: "CLI Playbooks", detail: "explicit remediation", x: 540, y: 270 },
        { id: "api", label: "API + Dashboard", detail: "review · posture", x: 795, y: 170 },
      ],
      edges: [
        { from: "azure", to: "scanner", label: "inspect" },
        { from: "scanner", to: "compliance", label: "map" },
        { from: "scanner", to: "findings", label: "persist" },
        { from: "scanner", to: "playbooks", label: "remediate" },
        { from: "compliance", to: "api" },
        { from: "findings", to: "api" },
      ],
    },
    challenges: [
      "Translate an Azure control into SDK field access that behaves consistently in scanner and test environments.",
      "Keep rule identifiers synchronized across scanner code, remediation scripts, and framework JSON.",
      "Describe validation scenarios precisely enough for contributors to reproduce scanner behavior.",
    ],
    tradeoffs: [
      "Separate framework files avoid coupling policy metadata to rule execution, but require synchronization around rule identifiers.",
      "Rule-specific CLI playbooks make remediation explicit, while adding one maintained script per supported rule.",
    ],
    decisions: [
      {
        choice: "Keep compliance mappings separate from scan rules.",
        rationale:
          "One technical finding can satisfy controls in several frameworks without changing execution logic.",
        rejectedAlternative:
          "Embedding framework metadata inside each rule would couple policy updates to scanner code.",
        consequence:
          "Mappings remain reusable and reviewable, but rule identifiers must stay aligned across files.",
      },
    ],
    technologies: ["Python", "Azure SDK", "Azure CLI", "Flask", "PostgreSQL", "Pytest"],
    repository: "https://github.com/openshield-org/openshield",
  },
  {
    id: "fieldsight",
    name: "FieldSight",
    positioning: "Azure-hosted observation API separating structured records from image evidence.",
    domains: ["Cloud architecture", "Storage design", "API contracts", "Observability"],
    evidence: [
      "Express validates authenticated observation uploads and exposes record lifecycle endpoints.",
      "Cosmos DB stores queryable metadata using /projectID as the partition key.",
      "Blob Storage owns image binaries while Application Insights captures request and dependency telemetry.",
    ],
    problem:
      "Field observations combine searchable metadata with comparatively large image payloads. Keeping both in one document store would make records heavier and blur query and media concerns.",
    significance:
      "FieldSight keeps the Express process stateless and gives metadata, binary content, and telemetry distinct Azure services with explicit responsibilities.",
    architecture: {
      caption:
        "Simplified from FieldSight's documented WordPress, App Service, Cosmos DB, Blob Storage, and telemetry flow.",
      nodes: [
        { id: "wordpress", label: "WordPress", detail: "theme · plugin", x: 105, y: 170 },
        { id: "app", label: "App Service", detail: "Express · middleware", x: 350, y: 170 },
        { id: "cosmos", label: "Cosmos DB", detail: "metadata · /projectID", x: 640, y: 75 },
        { id: "blob", label: "Blob Storage", detail: "image binaries", x: 640, y: 170 },
        {
          id: "insights",
          label: "Application Insights",
          detail: "requests · dependencies",
          x: 640,
          y: 265,
        },
      ],
      edges: [
        { from: "wordpress", to: "app", label: "HTTPS + API key" },
        { from: "app", to: "cosmos", label: "metadata" },
        { from: "app", to: "blob", label: "media" },
        { from: "app", to: "insights", label: "telemetry" },
      ],
    },
    challenges: [
      "Coordinate record and blob lifecycle operations across two storage services.",
      "Move a record safely when an update changes the Cosmos DB partition key.",
      "Return stable, sanitized errors while retaining useful operational telemetry.",
    ],
    tradeoffs: [
      "API-key authentication fits a controlled WordPress integration but is not a complete user authorization model.",
      "Base64 uploads simplify JSON integration while increasing payload size relative to multipart or direct-to-Blob uploads.",
      "Cosmos Serverless reduces baseline cost for variable traffic but differs from provisioned throughput under steady load.",
    ],
    decisions: [
      {
        choice: "Separate binary media from structured metadata.",
        rationale:
          "Blob Storage fits image payloads while Cosmos DB remains focused on queryable observation records.",
        rejectedAlternative:
          "Embedding image data in Cosmos documents would increase document size and storage/query overhead.",
        consequence:
          "Each store matches its data shape, but update and deletion flows must coordinate both services.",
      },
    ],
    technologies: [
      "Node.js",
      "Express",
      "Azure App Service",
      "Cosmos DB",
      "Blob Storage",
      "Application Insights",
      "GitHub Actions",
    ],
    repository: "https://github.com/parthrohit22/fieldsight-api",
  },
  {
    id: "find-job-api",
    name: "Find Job API",
    positioning:
      "Job discovery platform with one client contract across multiple external providers.",
    domains: ["Provider abstraction", "Data normalization", "Authentication", "Failure handling"],
    evidence: [
      "A country-aware engine factory routes requests to JSearch or Adzuna adapters.",
      "Provider payloads are normalized before Angular receives the response.",
      "SQLite stores salted password and API-key hashes; protected searches also pass through per-IP rate limiting.",
    ],
    problem:
      "Job providers expose different query parameters and response shapes. Passing those differences into the UI would couple every search and filter interaction to third-party contracts.",
    significance:
      "The Flask API selects a provider, validates access, and returns a stable job shape. Angular can then own the search workflow without provider-specific branches.",
    architecture: {
      caption:
        "Simplified from Find Job API's documented Angular, Flask, authentication, engine, and normalization flow.",
      nodes: [
        { id: "angular", label: "Angular SPA", detail: "search · saved · activity", x: 80, y: 170 },
        { id: "flask", label: "Flask API", detail: "auth · rate limit", x: 275, y: 170 },
        { id: "sqlite", label: "SQLite", detail: "users · key hashes", x: 475, y: 65 },
        { id: "factory", label: "Engine Factory", detail: "country routing", x: 475, y: 170 },
        {
          id: "fallback",
          label: "Sample Fallback",
          detail: "development resilience",
          x: 475,
          y: 275,
        },
        { id: "jsearch", label: "JSearch", detail: "provider adapter", x: 690, y: 110 },
        { id: "adzuna", label: "Adzuna", detail: "provider adapter", x: 690, y: 230 },
        { id: "normalizer", label: "Normalizer", detail: "stable job contract", x: 900, y: 170 },
      ],
      edges: [
        { from: "angular", to: "flask", label: "X-API-Key" },
        { from: "flask", to: "sqlite", label: "validate" },
        { from: "flask", to: "factory", label: "search" },
        { from: "flask", to: "fallback", label: "on failure" },
        { from: "factory", to: "jsearch", label: "provider" },
        { from: "factory", to: "adzuna", label: "provider" },
        { from: "jsearch", to: "normalizer" },
        { from: "adzuna", to: "normalizer" },
      ],
    },
    challenges: [
      "Map country, work-mode, employment-type, and location filters across provider-specific APIs.",
      "Issue and validate API keys without storing raw credentials in SQLite.",
      "Keep local development usable when an external provider fails or credentials are unavailable at request time.",
    ],
    tradeoffs: [
      "Saved jobs, notes, and search history remain browser-local rather than server-synchronized.",
      "Rate limiting is in-memory and process-local.",
      "A cache helper exists but is not wired into provider fetches, and RapidAPI configuration is still required at startup.",
    ],
    decisions: [
      {
        choice: "Normalize providers behind one API contract.",
        rationale:
          "The frontend should consume one job shape regardless of which country-specific provider answered the request.",
        rejectedAlternative:
          "Passing raw provider payloads to Angular would spread external schema differences across UI code.",
        consequence:
          "Frontend behavior remains stable, while each provider adapter must translate its own query and response model.",
      },
      {
        choice: "Store raw API keys only at issuance time.",
        rationale:
          "Authentication can validate salted hashes without retaining reusable credentials in SQLite.",
        rejectedAlternative:
          "Persisting plaintext keys would make the user store a credential disclosure point.",
        consequence: "Login rotates the key and the user must retain the newly issued credential.",
      },
    ],
    technologies: ["Python", "Flask", "Angular", "SQLite", "JSearch", "Adzuna", "Swagger", "RxJS"],
    repository: "https://github.com/parthrohit22/find-job-api",
  },
];

export const principles = [
  {
    title: "Explicit ownership boundaries",
    description:
      "Place state and authority where they can be reasoned about: a Durable Object, a backend service, or a dedicated storage layer.",
    evidence: "LYTA state ownership · Payment Routing server authority",
  },
  {
    title: "Correctness over cleverness",
    description:
      "Prefer deterministic behavior and inspectable records when a system must explain why it trusts a result.",
    evidence: "KALYX canonical hashing · verification boundaries",
  },
  {
    title: "Observable, testable failures",
    description:
      "Give failure paths stable contracts, useful correlation, and tests instead of treating them as exceptional UI states.",
    evidence: "LYTA request IDs · FieldSight error model",
  },
  {
    title: "Security in server contracts",
    description:
      "Use frontend controls for guidance, while enforcing identity, role, scope, and validation at the API boundary.",
    evidence: "Payment RBAC · hashed Find Job API keys",
  },
];

export const capabilities = [
  {
    title: "Backend Systems",
    description:
      "API contracts, input validation, authentication, RBAC, rate limiting, stable errors, and OpenAPI documentation.",
    evidence: ["FastAPI", "Flask", "Express", "Pydantic", "Swagger"],
  },
  {
    title: "State & Distributed Systems",
    description:
      "Explicit state ownership, workspace isolation, ordered writes, streaming responses, retrieval, and provider abstraction.",
    evidence: ["Durable Objects", "Server-Sent Events", "Workers AI", "RxJS"],
  },
  {
    title: "Data & Storage",
    description:
      "Schema normalization, partition-aware access, document modelling, and separation of metadata from binary content.",
    evidence: ["PostgreSQL", "MongoDB", "Cosmos DB", "Blob Storage", "SQLite"],
  },
  {
    title: "Cloud & Delivery",
    description:
      "Edge and managed-cloud deployment models, request telemetry, dependency visibility, and automated delivery workflows.",
    evidence: ["Azure", "Cloudflare", "Application Insights", "GitHub Actions"],
  },
  {
    title: "Security & Integrity",
    description:
      "Backend authorization, API-key handling, deterministic verification, remediation playbooks, and compliance mapping.",
    evidence: ["JWT", "Azure SDK", "Canonical hashing", "CIS · NIST · ISO · SOC 2"],
  },
  {
    title: "Testing & Reliability",
    description:
      "Deterministic tests, behavioral coverage, graceful provider failures, sanitized errors, and explicit trust states.",
    evidence: ["Pytest", "Vitest", "unittest", "Request correlation"],
  },
];

export const experience = {
  role: "Operations & IT Support Assistant",
  company: "Kukreja & Associates",
  location: "Vadodara, India",
  period: "July 2021 – December 2023",
  contributions: [
    {
      title: "Automation",
      description:
        "Reduced repetitive manual work by more than 10 hours per month through internal workflow automation.",
    },
    {
      title: "Systems Support",
      description:
        "Diagnosed software, hardware, and networking issues across an environment supporting more than 50 users.",
    },
    {
      title: "Operational Reliability",
      description:
        "Investigated recurring failures and introduced process improvements that strengthened day-to-day stability.",
    },
  ],
};
