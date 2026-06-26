import { 
  BrainCircuit, 
  Database, 
  Activity, 
  ShieldCheck, 
  LineChart,
  Users,
  Search,
  PenTool
} from 'lucide-react';

export const navigationData = [
  { id: 'intro', label: 'Introduction' },
  { id: 'background', label: 'Background' },
  { id: 'what-we-do', label: 'What We Do' },
  { id: 'org-structure', label: 'Org Structure' },
  { id: 'project-history', label: 'Project History' },
  { id: 'engage-with-us', label: 'Engage With Us' },
];

export const introData = {
  title: "Enterprise AI Solution Architect",
  acronym: "EASA",
  logos: [
    { id: "tnb-genco", name: "TNB Genco", src: "tnb-genco-logo.png" },
    { id: "ted", name: "Technology & Engineering Department", src: "ted-logo.png" },
    { id: "easa", name: "EASA", src: "easa-logo.png" },
  ],
  subtitle: "Building AI power capabilities for intelligent power generation.",
  description: "Enterprise AI Solution Architect designs secure AI applications, analytics platforms, data services, and delivery practices that turn power plant operational challenges into measurable business value.",
  aiDefinition: {
    title: "What are AI and LLMs?",
    description: "Artificial Intelligence (AI) enables computer systems to learn from data, recognize patterns, make predictions, recommend actions, and assist people in making better decisions. Large Language Models (LLMs) are a type of AI designed to understand, summarize, generate, and reason over human language. In power generation, AI and LLMs can analyze plant data, equipment behavior, maintenance history, operating conditions, manuals, procedures, and engineering knowledge to detect issues earlier, improve performance, reduce manual effort, and support safer, faster decisions.",
    points: [
      "AI learns from historical and real-time data instead of relying only on fixed manual rules.",
      "LLMs help teams search, summarize, explain, and draft knowledge from documents, reports, procedures, and engineering records.",
      "AI and LLMs become valuable when connected to trusted data, secure platforms, clear governance, and real operational use cases."
    ]
  },
  metrics: [
    { id: 1, label: "AI Use Cases Pipeline", value: "24+" },
    { id: 2, label: "Power Plant Domains Supported", value: "8" },
    { id: 3, label: "Stakeholder Engagements", value: "15+" },
  ]
};

export const backgroundData = {
  context: [
    "Power generation assets produce high-volume IT, OT, IoT, engineering, and maintenance data that must be trusted before it can drive AI decisions.",
    "EASA connects plant operations, engineering teams, cybersecurity, digital infrastructure, and advanced analytics into one delivery model for enterprise AI.",
    "The section translates AI concepts into real plant applications for predictive maintenance, asset optimization, performance improvement, and operational excellence.",
    "Every solution is designed with governance, security, documentation, training, and sustainable operating procedures so adoption can scale across coal, gas, hydro, and renewable assets."
  ],
  whyEasaExists: [
    "Convert operational pain points into AI use cases with clear value and feasibility",
    "Establish reference architectures, platform standards, and delivery practices for secure enterprise AI",
    "Provide AI-ready data pipelines that improve data availability, quality, reliability, and traceability",
    "Deploy applications through CI/CD, monitoring, and support practices that reduce downtime and accelerate release cycles",
    "Strengthen stakeholder adoption through documentation, training, governance, and measurable performance reporting"
  ]
};

export const whatWeDoData = {
  capabilities: [
    { icon: BrainCircuit, title: "Enterprise AI Architecture", description: "Define reference architectures, AI frameworks, and solution designs that integrate securely with power plant IT/OT environments.", status: "Core Capability" },
    { icon: Activity, title: "AI Applications", description: "Design, develop, validate, and deploy AI applications for maintenance, optimization, decision support, and plant performance.", status: "Core Capability" },
    { icon: Database, title: "AI Data Platform", description: "Build scalable platforms, governed data services, and AI-ready environments for enterprise analytics and real-time decision-making.", status: "Core Capability" },
    { icon: LineChart, title: "Data Engineering Pipelines", description: "Ingest, clean, transform, and monitor IT, OT, IoT, SCADA, and external datasets for reliable machine learning and analytics use.", status: "Core Capability" },
    { icon: PenTool, title: "DevOps & MLOps Delivery", description: "Automate testing, CI/CD, deployment, observability, and recovery so AI systems can run reliably in production.", status: "Core Capability" },
    { icon: ShieldCheck, title: "Governance & Cybersecurity", description: "Apply data governance, ISO-aligned controls, security practices, and ethical AI standards across the delivery lifecycle.", status: "Core Capability" },
    { icon: Search, title: "Use Case Prioritization", description: "Assess operational needs, technical feasibility, business impact, and ROI to focus teams on high-value AI initiatives.", status: "Core Capability" },
    { icon: Users, title: "Adoption & Support", description: "Prepare documentation, training, support models, and stakeholder engagement so solutions are sustained after deployment.", status: "Core Capability" }
  ],
  deliveryFlow: [
    { step: 1, label: "Discover", desc: "Prioritize value" },
    { step: 2, label: "Architect", desc: "Design securely" },
    { step: 3, label: "Engineer", desc: "Prepare data" },
    { step: 4, label: "Build", desc: "Create AI app" },
    { step: 5, label: "Deploy", desc: "Automate release" },
    { step: 6, label: "Operate", desc: "Monitor & scale" }
  ]
};

export const orgStructureData = [
  { role: "Chief Engineer (Digital & Data)", name: "Mohd Rizal bin Mohd Ramly", responsibility: "Provides engineering leadership for digital, data, and AI initiatives, aligning delivery with business priorities, governance, and enterprise standards.", focus: "Digital & Data Leadership, Governance, Enterprise Delivery", photo: "chief-engineer.png" },
  { role: "Senior Manager (Enterprise AI Solution Architect)", name: "Ir. Ts. Muhammad Sufi Bin Ahmad Nasir, ACPE", responsibility: "Leads AI implementation, ensuring solutions are designed, integrated, deployed, governed, and adopted effectively across platforms and operations.", focus: "Enterprise Architecture, AI Governance, IT/OT Integration", photo: "senior-manager.png" },
  { role: "Manager, AI Data Platform", name: "[Name to be added]", responsibility: "Oversees AI/ML platforms, data pipelines, governance, scalability, and secure integration of IT, OT, IoT, and external data sources.", focus: "AI Platforms, Data Governance, Scalable Infrastructure" },
  { role: "Manager, AI Application", name: "[Name to be added]", responsibility: "Leads AI application development from concept to deployment, translating architecture into plant-ready solutions with engineering teams.", focus: "AI Applications, Value Delivery, Adoption" },
  { role: "Executive (AI Data Engineer)", name: "Nurul Izzati binti Mohammad Zamri", responsibility: "Builds and optimizes ETL/ELT, streaming, and batch pipelines that deliver clean, standardized, AI-ready datasets for analytics and applications.", focus: "Data Pipelines, Data Quality, IT/OT/IoT Integration", photo: "executive-data-engineer.png" },
  { role: "Executive (AI DevOps Engineer)", name: "Muhammad Syazwan bin Hamidi", responsibility: "Implements CI/CD, automation, monitoring, recovery, and secure deployment environments for AI systems across enterprise and plant operations.", focus: "CI/CD, Observability, Deployment Reliability", photo: "executive-devops.png" }
];

export const projectHistoryData = {
  metrics: {
    totalProjects: "17",
    activePilots: "11",
    deployedSolutions: "3",
    stakeholdersEngaged: "7"
  },
  projects: [
    {
      title: "PeopleModelling.AI",
      image: "peoplemodelling-ai-ui.png",
      problem: "HR and project teams need a faster way to understand workforce availability, position profiles, succession options, and person-to-position fit across projects.",
      approach: "React and FastAPI people modelling application with analytics dashboards, data upload modules, succession recommendation, person-to-position matching, scoring rules, audit logs, persistent storage, and Databricks Llama-based inferencing support.",
      stakeholders: "HR",
      value: "Pilot testing supports active position monitoring, candidate availability, talent match scoring, and AI-assisted succession recommendations.",
      status: "Pilot"
    },
    {
      title: "Recruitment Filtration.AI",
      problem: "HR needs to review a large volume of resumes efficiently and identify the most suitable candidates before interview shortlisting.",
      approach: "AI-assisted recruitment filtration application that parses resumes, compares candidate profiles against role requirements, ranks suitability, and supports structured pre-interview screening.",
      stakeholders: "HR",
      value: "Deployed to help HR reduce manual resume screening effort, improve candidate ranking consistency, and focus interview time on the strongest applicants.",
      status: "Deployed"
    },
    {
      title: "PeopleOperation",
      problem: "HR people operation workflows need better digital tracking, visibility, and reporting.",
      approach: "BI-focused people operation digitization for structured records, operational dashboards, and management reporting.",
      stakeholders: "HR",
      value: "Planned to improve workforce operation visibility and reduce manual consolidation effort.",
      status: "Planned"
    },
    {
      title: "CCM.AI",
      image: "ccm-ai-ui.png",
      problem: "CCM data management requires faster access, consolidation, and AI-assisted interpretation of operational records.",
      approach: "Contract intelligence hub for document evidence, clause learning, OCR processing, risk comparison, and AI-assisted contract review.",
      stakeholders: "CCM",
      value: "Prototype accelerates contract document discovery, clause review, audit tracking, and AI-assisted policy or risk comparison.",
      status: "Prototype"
    },
    {
      title: "FINANCE.AI",
      problem: "Financial modelling and scenario simulation are time-consuming when assumptions, scenarios, and outputs are handled manually.",
      approach: "AI LLM concept for financial modelling, scenario simulation, and assumption-based analysis.",
      stakeholders: "Finance",
      value: "Planned to support faster scenario comparison and financial decision preparation.",
      status: "Planned"
    },
    {
      title: "RCA.AI",
      problem: "Root cause analysis knowledge is spread across reports, cases, and operational records.",
      approach: "GENCO RCA Intelligence Hub using AI LLM retrieval and reasoning to connect RCA cases, findings, and recommendations.",
      stakeholders: "AOM",
      value: "Prototype supports faster RCA knowledge discovery and repeat-issue learning.",
      status: "Prototype"
    },
    {
      title: "PX T&C.AI",
      image: "px-tc-ai-ui.png",
      problem: "HR needs to review and compare Terms and Conditions across multiple TNB Genco employment books, including Genco hire, TNB hire, Remaco hire, and other related T&C references.",
      approach: "AI LLM assistant for Terms and Conditions review, semantic search, comparison, summarization, and revision support across the six TNB Genco T&C books.",
      stakeholders: "HR",
      value: "Prototype helps HR revise T&C content faster, compare clauses across books, and reduce manual review effort with an AI assistant.",
      status: "Prototype"
    },
    {
      title: "Tech.AI",
      problem: "Technical manuals for AHM are difficult to search quickly during engineering and operational support.",
      approach: "AI LLM technical manual assistant for AHM document search, summarization, and procedure explanation.",
      stakeholders: "AHM",
      value: "Prototype supports faster technical manual access and engineering knowledge reuse.",
      status: "Prototype"
    },
    {
      title: "Bad Actor.AI",
      image: "bad-actor-ai-ui.png",
      problem: "Equipment bad actors need consistent identification from reliability, operational, and maintenance signals.",
      approach: "Equipment intelligence application for bad actor analysis, equipment finder workflows, vendor references, and multi-model AI support for reliability decisions.",
      stakeholders: "Engineering",
      value: "Deployed to support power plant reliability by turning equipment specifications and station failure data into action-ready sourcing and reliability decisions.",
      status: "Deployed"
    },
    {
      title: "JEDi.AI",
      problem: "Jellyfish detection using chlorophyll indicators requires earlier insight and clearer monitoring support.",
      approach: "AI-assisted detection concept using chlorophyll-related signals and operational monitoring data.",
      stakeholders: "AOM",
      value: "Prototype supports earlier environmental risk awareness for operations.",
      status: "Prototype"
    },
    {
      title: "WPS.AI",
      problem: "WPS and PQR drafting is document-heavy and requires repeated technical preparation effort.",
      approach: "AI LLM assistant for WPS/PQR drafting, reference extraction, and engineering document preparation.",
      stakeholders: "Remaco RC",
      value: "Prototype supports faster draft preparation and document consistency.",
      status: "Prototype"
    },
    {
      title: "FFU.AI",
      problem: "Fit For Use evaluations require structured evidence gathering, technical review, and repeatable assessment flow.",
      approach: "AI LLM support for FFU evidence review, evaluation drafting, and engineering assessment assistance.",
      stakeholders: "Engineering",
      value: "Deployed to support more efficient FFU evaluation preparation, evidence review, and engineering assessment assistance.",
      status: "Deployed"
    },
    {
      title: "LMS",
      problem: "Staff assessment and learning progress need a consolidated digital management system.",
      approach: "BI-enabled learning management system for staff assessment, progress tracking, and reporting.",
      stakeholders: "HR",
      value: "Prototype supports structured staff assessment and training visibility.",
      status: "Prototype"
    },
    {
      title: "TCP",
      problem: "Talent card information needs a centralized portal for easier access, update, and review.",
      approach: "BI talent card portal for structured talent records, search, and reporting.",
      stakeholders: "HR",
      value: "Prototype supports faster talent card review and data consolidation.",
      status: "Prototype"
    },
    {
      title: "SP",
      problem: "Successor planning requires structured visibility of candidates and readiness across roles.",
      approach: "BI successor planner for succession visibility, candidate tracking, and planning support.",
      stakeholders: "HR",
      value: "Prototype supports succession planning workflow and readiness review.",
      status: "Prototype"
    },
    {
      title: "Succession.AI",
      problem: "Succession planning for R0, R1, and R2 roles needs AI-assisted candidate matching from E16 up to COO level.",
      approach: "AI LLM succession recommendation for role matching, candidate ranking, and readiness reasoning.",
      stakeholders: "HR",
      value: "Prototype supports AI-assisted succession decisions and talent pipeline review.",
      status: "Prototype"
    },
    {
      title: "FM.AI",
      problem: "Facilities or financial management use cases require clearer scope definition before implementation.",
      approach: "Planned AI initiative pending detailed use case discovery, data assessment, and solution framing.",
      stakeholders: "Engineering",
      value: "Planned for future prioritization and feasibility assessment.",
      status: "Planned"
    }
  ]
};

export const engageData = {
  steps: [
    { step: 1, title: "Submit Use Case", desc: "Share your operational challenge." },
    { step: 2, title: "Joint Discovery Workshop", desc: "Deep dive into the problem and data." },
    { step: 3, title: "Feasibility Assessment", desc: "Evaluate technical and business viability." },
    { step: 4, title: "MVP Development", desc: "Build a proof of concept rapidly." },
    { step: 5, title: "Pilot Implementation", desc: "Test the solution in a live environment." },
    { step: 6, title: "Scale and Support", desc: "Roll out across the fleet and maintain." }
  ],
  preparationChecklist: [
    "Problem statement",
    "Available data sources",
    "Business owner",
    "Plant subject matter expert",
    "Expected outcome",
    "Success criteria"
  ],
  contact: {
    unit: "Enterprise AI Solution Architect",
    person: "Ir. Ts. Muhammad Sufi Bin Ahmad Nasir, ACPE",
    email: "msufi.nasir@tnb.com.my",
    location: "Genco HQ"
  }
};
