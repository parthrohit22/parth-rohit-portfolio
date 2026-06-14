export const profile = {
  name: "Parth Rohit",
  role: "Software Engineer",
  statement:
    "Building cloud-native, distributed, and security-focused software systems.",
  supporting:
    "Final-year Computing Systems student with hands-on experience across backend engineering, cloud platforms, distributed systems, open-source security tooling, networking, software engineering, and platform development.",
  location: "London, United Kingdom",
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

export type Project = {
  name: string;
  tags: string[];
  summary: string;
  highlights: string[];
  tech: string[];
  repo: string;
  demo?: string;
  frameworks?: string[];
};

export const projects: Project[] = [
  {
    name: "LYTA",
    tags: ["Stateful AI Workspace", "Distributed Systems", "Platform Engineering", "Edge Computing"],
    summary:
      "Stateful edge-native AI workspace built using Cloudflare Workers and Durable Objects.",
    highlights: [
      "Stateful workspace ownership",
      "Durable Object architecture",
      "Chat persistence",
      "File processing",
      "Retrieval workflows",
      "Server-Sent Events streaming",
      "Conversation memory",
      "Multi-user isolation",
      "Concurrent user support",
    ],
    tech: ["TypeScript", "Cloudflare Workers", "Durable Objects", "Workers AI"],
    repo: "https://github.com/parthrohit22/lyta",
    demo: "https://lyta.parthrohit-dev.workers.dev",
  },
  {
    name: "OpenShield",
    tags: ["Open Source Engineering", "Cloud Security", "Azure CSPM", "OWASP Project"],
    summary: "Open-source Azure Cloud Security Posture Management platform.",
    highlights: [
      "Security scan rules",
      "Remediation playbooks",
      "Compliance mappings",
      "Azure validation testing",
      "Platform validation",
      "Security workflows",
    ],
    frameworks: ["CIS Azure", "NIST CSF", "ISO 27001", "SOC 2"],
    tech: ["Python", "Azure", "Flask", "PostgreSQL"],
    repo: "https://github.com/openshield-org/openshield",
  },
  {
    name: "KALYX",
    tags: ["Execution Integrity Platform", "Reliability Engineering", "Verification Systems", "Backend Engineering"],
    summary:
      "Execution integrity verification platform using deterministic verification and tamper-evident records.",
    highlights: [
      "Hash-chained ledger",
      "Deterministic verification",
      "Canonical hashing",
      "Concurrent-safe ingestion",
      "Detection workflows",
      "Checkpointing",
      "Automated testing",
    ],
    tech: ["Python", "FastAPI", "Pydantic", "Pytest"],
    repo: "https://github.com/parthrohit22/kalyx",
  },
  {
    name: "FieldSight",
    tags: ["Cloud-Native Platform", "Azure Engineering", "API Development"],
    summary: "Cloud-native multimedia observation platform deployed on Azure.",
    highlights: [
      "Azure App Service",
      "Cosmos DB",
      "Blob Storage",
      "REST APIs",
      "Telemetry",
      "Application Insights",
      "CI/CD deployment",
    ],
    tech: ["Node.js", "Azure", "Cosmos DB", "Blob Storage", "GitHub Actions"],
    repo: "https://github.com/parthrohit22/FieldSight-Cloud-Platform",
  },
  {
    name: "Payment Routing System",
    tags: ["Backend APIs", "Payments", "Access Control", "Business Systems"],
    summary:
      "Role-aware payment operations platform supporting merchant-scoped workflows and operational analytics.",
    highlights: [
      "JWT Authentication",
      "RBAC",
      "Merchant isolation",
      "Payment workflows",
      "Provider history",
      "Operational analytics",
    ],
    tech: ["Angular", "Flask", "MongoDB", "JWT"],
    repo: "https://github.com/parthrohit22/Payment-Routing-System",
  },
];

export const breadth = [
  {
    area: "Software Engineering",
    items: ["Object-Oriented Programming", "Java Development", "Design Patterns", "Testing"],
  },
  {
    area: "Agile & Delivery",
    items: ["Agile", "Scrum", "Kanban", "Software Product Development"],
  },
  {
    area: "Full Stack Development",
    items: ["Client-side Development", "Server-side Development", "JavaScript", "CSS", "Laravel", "REST APIs"],
  },
  {
    area: "Cloud Platforms",
    items: ["Azure", "Cloud-Native Development", "Distributed Systems", "Platform Architecture"],
    focus: true,
  },
  {
    area: "Networking",
    items: ["Network Design", "Routing & Switching", "Cisco Packet Tracer", "Regional Connectivity"],
  },
  {
    area: "Systems Security",
    items: ["Encryption", "Decryption", "Authentication", "Security Principles"],
    focus: true,
  },
  {
    area: "Data Analytics",
    items: ["Jupyter Notebook", "R Notebook", "NumPy", "Matplotlib", "Data Analysis"],
  },
  {
    area: "AI & Computer Vision",
    items: ["Computer Vision", "Machine Learning Fundamentals", "Applied AI"],
  },
  {
    area: "Embedded & Physical Computing",
    items: ["Python Scripting", "Physical Computing", "Hardware Integration"],
  },
  {
    area: "Innovation & Technology",
    items: ["Innovation & Society", "PESTLE Analysis", "Technology Strategy", "Digital Transformation"],
  },
];

export const experience = [
  {
    role: "Operations & IT Support Assistant",
    company: "Kukreja & Associates",
    location: "Vadodara, India",
    period: "July 2021 – December 2023",
    bullets: [
      "Automated internal operational workflows reducing manual workload by 10+ hours per month.",
      "Provided IT support across systems, networking, and hardware environments for 50+ users.",
      "Diagnosed technical issues and implemented process improvements to improve operational reliability.",
    ],
  },
];

export const stack = {
  Languages: ["Python", "TypeScript", "Java", "SQL"],
  Frameworks: ["FastAPI", "Flask", "Angular"],
  Cloud: ["Azure", "Cloudflare Workers", "Durable Objects", "Workers AI"],
  Databases: ["MongoDB", "MySQL", "SQLite", "Cosmos DB"],
  Tools: ["Git", "GitHub Actions", "Postman", "Vitest", "JUnit"],
};
