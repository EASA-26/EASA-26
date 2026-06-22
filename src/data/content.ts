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
  title: "Building AI Power Capabilities",
  acronym: "EASA",
  subtitle: "Scalable AI, digital twin, and data platform solutions for intelligent power generation.",
  description: "Enterprise AI Solution Architect delivers secure AI applications, robust data pipelines, and reliable deployment practices that turn power plant operational challenges into measurable business value.",
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
    "The section translates AI and digital twin concepts into real plant applications for predictive maintenance, asset optimization, performance improvement, and operational excellence.",
    "Every solution is designed with governance, security, documentation, training, and sustainable operating procedures so adoption can scale across coal, gas, hydro, and renewable assets."
  ],
  whyEasaExists: [
    "Convert operational pain points into AI and digital twin use cases with clear value and feasibility",
    "Establish reference architectures, platform standards, and delivery practices for secure enterprise AI",
    "Provide AI-ready data pipelines that improve data availability, quality, reliability, and traceability",
    "Deploy applications through CI/CD, monitoring, and support practices that reduce downtime and accelerate release cycles",
    "Strengthen stakeholder adoption through documentation, training, governance, and measurable performance reporting"
  ]
};

export const whatWeDoData = {
  capabilities: [
    { icon: BrainCircuit, title: "Enterprise AI Architecture", description: "Define reference architectures, AI frameworks, and solution designs that integrate securely with power plant IT/OT environments.", status: "Core Capability" },
    { icon: Activity, title: "AI Applications & Digital Twins", description: "Design, develop, validate, and deploy AI applications and digital twin models for maintenance, optimization, and plant performance.", status: "Core Capability" },
    { icon: Database, title: "AI Data Platform", description: "Build scalable platforms, governed data services, and AI-ready environments for enterprise analytics and real-time decision-making.", status: "Core Capability" },
    { icon: LineChart, title: "Data Engineering Pipelines", description: "Ingest, clean, transform, and monitor IT, OT, IoT, SCADA, and external datasets for reliable machine learning and digital twin use.", status: "Core Capability" },
    { icon: PenTool, title: "DevOps & MLOps Delivery", description: "Automate testing, CI/CD, deployment, observability, and recovery so AI systems can run reliably in production.", status: "Core Capability" },
    { icon: ShieldCheck, title: "Governance & Cybersecurity", description: "Apply data governance, ISO-aligned controls, security practices, and ethical AI standards across the delivery lifecycle.", status: "Core Capability" },
    { icon: Search, title: "Use Case Prioritization", description: "Assess operational needs, technical feasibility, business impact, and ROI to focus teams on high-value AI initiatives.", status: "Core Capability" },
    { icon: Users, title: "Adoption & Support", description: "Prepare documentation, training, support models, and stakeholder engagement so solutions are sustained after deployment.", status: "Core Capability" }
  ],
  deliveryFlow: [
    { step: 1, label: "Discover", desc: "Prioritize value" },
    { step: 2, label: "Architect", desc: "Design securely" },
    { step: 3, label: "Engineer", desc: "Prepare data" },
    { step: 4, label: "Build", desc: "Create app/twin" },
    { step: 5, label: "Deploy", desc: "Automate release" },
    { step: 6, label: "Operate", desc: "Monitor & scale" }
  ]
};

export const orgStructureData = [
  { role: "Senior Manager (Enterprise AI Solution Architect)", name: "Ir. Ts. Muhammad Sufi Bin Ahmad Nasir, ACPE", responsibility: "Leads AI and digital twin implementation, ensuring solutions are designed, integrated, deployed, governed, and adopted effectively across platforms and operations.", focus: "Enterprise Architecture, AI Governance, IT/OT Integration", photo: "senior-manager.png" },
  { role: "Manager, AI Data Platform", name: "[Name to be added]", responsibility: "Oversees AI/ML platforms, data pipelines, governance, scalability, and secure integration of IT, OT, IoT, and external data sources.", focus: "AI Platforms, Data Governance, Scalable Infrastructure" },
  { role: "Manager, AI Application", name: "[Name to be added]", responsibility: "Leads AI application and digital twin development from concept to deployment, translating architecture into plant-ready solutions with engineering teams.", focus: "AI Applications, Digital Twin, Value Delivery" },
  { role: "Executive (AI Data Engineer)", name: "Nurul Izzati binti Mohammad Zamri", responsibility: "Builds and optimizes ETL/ELT, streaming, and batch pipelines that deliver clean, standardized, AI-ready datasets for analytics and digital twins.", focus: "Data Pipelines, Data Quality, IT/OT/IoT Integration", photo: "executive-data-engineer.png" },
  { role: "Executive (AI DevOps Engineer)", name: "Muhammad Syazwan bin Hamidi", responsibility: "Implements CI/CD, automation, monitoring, recovery, and secure deployment environments for AI systems across enterprise and plant operations.", focus: "CI/CD, Observability, Deployment Reliability", photo: "executive-devops.png" }
];

export const projectHistoryData = {
  metrics: {
    totalProjects: "12",
    activePilots: "3",
    deployedSolutions: "4",
    stakeholdersEngaged: "8"
  },
  projects: [
    { 
      title: "Predictive Maintenance", 
      problem: "Unexpected equipment failures leading to unplanned downtime.", 
      approach: "Anomaly detection models using historical sensor data.", 
      stakeholders: "Maintenance, Operations", 
      value: "Reduced unplanned downtime by estimated 15%.", 
      status: "Deployed" 
    },
    { 
      title: "Plant Performance Optimization", 
      problem: "Suboptimal heat rate and efficiency losses.", 
      approach: "Digital twin simulation and prescriptive analytics.", 
      stakeholders: "Engineering, Performance Team", 
      value: "Identified 2% efficiency improvement opportunities.", 
      status: "Pilot" 
    },
    { 
      title: "AI Knowledge Assistant", 
      problem: "Difficulty in rapidly accessing historical manuals and shift logs.", 
      approach: "RAG-based Large Language Model trained on internal documents.", 
      stakeholders: "Operations, Training", 
      value: "Reduced document search time by 80%.", 
      status: "Prototype" 
    },
    { 
      title: "Asset Health Monitoring", 
      problem: "Manual and infrequent tracking of critical asset health.", 
      approach: "Real-time dashboard with predictive health scores.", 
      stakeholders: "Reliability Engineering", 
      value: "Early warning alerts provided 2 days in advance.", 
      status: "Scale-up" 
    },
    { 
      title: "Safety & Compliance Intelligence", 
      problem: "Manual review of safety incidents and near-misses.", 
      approach: "NLP classification of incident reports to identify trends.", 
      stakeholders: "HSE, Plant Management", 
      value: "Automated categorization and trend highlighting.", 
      status: "Discovery" 
    },
    { 
      title: "Generation Efficiency Dashboard", 
      problem: "Lack of centralized visibility into fleet-wide generation metrics.", 
      approach: "Unified data model and real-time visualization layer.", 
      stakeholders: "Senior Management", 
      value: "Single source of truth for generation efficiency.", 
      status: "Deployed" 
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
    person: "[Name to be added]",
    email: "email.to.be.added@example.com",
    channel: "[To be added]",
    location: "[To be added]",
    github: "[To be added]"
  }
};
