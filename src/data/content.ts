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
  subtitle: "Building AI solutions for smarter, safer, and more reliable power plant operations.",
  description: "EASA is a unit focused on transforming power plant operational challenges into scalable AI-enabled solutions.",
  metrics: [
    { id: 1, label: "AI Use Cases Pipeline", value: "24+" },
    { id: 2, label: "Power Plant Domains Supported", value: "8" },
    { id: 3, label: "Stakeholder Engagements", value: "15+" },
  ]
};

export const backgroundData = {
  context: [
    "EASA bridges power plant operations, data, AI engineering, solution architecture, and business value delivery.",
    "Power plants generate large volumes of operational and engineering data.",
    "AI can help improve decision-making, reliability, efficiency, troubleshooting, and knowledge reuse.",
    "EASA helps structure AI delivery from idea discovery to solution adoption."
  ],
  whyEasaExists: [
    "Convert operational pain points into AI use cases",
    "Align AI solutions with plant workflows",
    "Enable better data-driven decisions",
    "Support scalable and responsible AI adoption",
    "Strengthen collaboration between plant teams, digital teams, and business stakeholders"
  ]
};

export const whatWeDoData = {
  capabilities: [
    { icon: BrainCircuit, title: "AI Solution Architecture", description: "Designing end-to-end AI architectures tailored to power plant ecosystems.", status: "Core Capability" },
    { icon: Search, title: "AI Use Case Discovery", description: "Identifying and validating high-value AI opportunities from operational challenges.", status: "Core Capability" },
    { icon: LineChart, title: "Power Plant Analytics", description: "Advanced analytics to uncover insights from equipment and operational data.", status: "Core Capability" },
    { icon: Database, title: "Data-to-Decision Design", description: "Structuring data pipelines to support actionable insights and workflows.", status: "Core Capability" },
    { icon: PenTool, title: "Prototype & MVP Development", description: "Rapid development of AI proofs-of-concept and minimum viable products.", status: "Core Capability" },
    { icon: ShieldCheck, title: "AI Governance", description: "Ensuring responsible, ethical, and secure AI adoption across the enterprise.", status: "Core Capability" },
    { icon: Activity, title: "Workflow Integration", description: "Seamlessly embedding AI solutions into daily operational routines.", status: "Core Capability" },
    { icon: Users, title: "Stakeholder Enablement", description: "Driving change management and adoption among plant teams and leadership.", status: "Core Capability" }
  ],
  deliveryFlow: [
    { step: 1, label: "Discover", desc: "Identify & assess" },
    { step: 2, label: "Design", desc: "Architect & plan" },
    { step: 3, label: "Prototype", desc: "Build MVP" },
    { step: 4, label: "Validate", desc: "Test & refine" },
    { step: 5, label: "Deploy", desc: "Implement solution" },
    { step: 6, label: "Scale", desc: "Expand across fleet" }
  ]
};

export const orgStructureData = [
  { role: "Head of EASA", name: "[Name to be added]", responsibility: "Strategic direction and leadership of the EASA unit.", focus: "Strategy, Leadership, AI Governance" },
  { role: "AI Solution Architect", name: "[Name to be added]", responsibility: "Design and orchestrate end-to-end AI architectures.", focus: "System Architecture, Cloud, Scalability" },
  { role: "Data Scientist / AI Engineer", name: "[Name to be added]", responsibility: "Develop machine learning models and AI algorithms.", focus: "Machine Learning, Deep Learning, MLOps" },
  { role: "Data Engineer", name: "[Name to be added]", responsibility: "Build and maintain data pipelines and infrastructure.", focus: "Data Integration, Big Data, ETL" },
  { role: "Power Plant SME", name: "[Name to be added]", responsibility: "Provide domain expertise and validate AI outputs.", focus: "Operations, Engineering, Reliability" },
  { role: "Product Owner / BA", name: "[Name to be added]", responsibility: "Manage product backlog and align with business value.", focus: "Requirements, Agile, Stakeholder Management" },
  { role: "DevOps / MLOps Engineer", name: "[Name to be added]", responsibility: "Ensure smooth deployment, monitoring, and scaling of models.", focus: "CI/CD, Infrastructure as Code, Monitoring" }
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
