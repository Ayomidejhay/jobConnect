export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  locationType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  applicationDeadline?: string;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "/placeholder.svg",
    location: "San Francisco, CA",
    locationType: "Remote",
    salary: "$120,000 - $150,000",
    jobType: "Full-time",
    description: "We are seeking a skilled Senior Frontend Developer to join our team. You will be responsible for building user interfaces, implementing design systems, and ensuring optimal performance across all our web applications.",
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of HTML, CSS, and JavaScript",
      "Experience with responsive design",
      "Experience with responsive designs",
      "Bachelor's degree in Computer Science or related field"
    ],
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable code and libraries for future use",
      "Ensure the technical feasibility of UI/UX designs",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with other team members and stakeholders"
    ],
    postedDate: "2025-05-01",
    applicationDeadline: "2025-06-15"
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "Analytics Pro",
    logo: "/placeholder.svg",
    location: "Analytics Pro",
    locationType: "Hybrid",
    salary: "$110,000 - $140,000",
    jobType: "Full-time",
    description: "Analytics Pro is looking for a Data Scientist to help us derive insights from our vast datasets. You'll work closely with product teams to implement machine learning solutions that drive business value.",
    requirements: [
      "Master's degree in Statistics, Computer Science, or related field",
      "Experience with Python and data analysis libraries",
      "Knowledge of machine learning algorithms",
      "Excellent communication skills",
      "Experience with SQL and database systems"
    ],
    responsibilities: [
      "Analyze complex datasets to extract insights",
      "Develop and implement machine learning models",
      "Create data visualizations and reports",
      "Collaborate with product teams to define success metrics",
      "Present findings to non-technical stakeholders"
    ],
    postedDate: "2025-05-03",
    applicationDeadline: "2025-06-10"
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignHub",
    logo: "/placeholder.svg",
    location: "Seattle, WA",
    locationType: "On-site",
    salary: "$90,000 - $120,000",
    jobType: "Full-time",
    description: "Join our creative team at DesignHub to create beautiful, intuitive interfaces for our clients. You'll be responsible for the entire design process from research to final implementation.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in Figma, Sketch, or similar design tools",
      "Portfolio showcasing your best work",
      "Understanding of user-centered design principles",
      "Experience conducting user research and usability testing"
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research to inform design decisions",
      "Collaborate with developers to implement designs",
      "Maintain and evolve our design system",
      "Advocate for the user in product discussions"
    ],
    postedDate: "2025-05-05",
    applicationDeadline: "2025-06-20"
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudSystems",
    logo: "/placeholder.svg",
    location: "Chicago, IL",
    locationType: "Remote",
    salary: "$115,000 - $145,000",
    jobType: "Full-time",
    description: "CloudSystems is seeking a DevOps Engineer to help us build and maintain our infrastructure. You'll work with our development team to ensure smooth deployments and optimal system performance.",
    requirements: [
      "Experience with AWS, Azure, or GCP",
      "Knowledge of Kubernetes and Docker",
      "Proficiency in scripting languages (Python, Bash)",
      "Experience with CI/CD pipelines",
      "Understanding of network security principles"
    ],
    responsibilities: [
      "Set up and maintain cloud infrastructure",
      "Implement and improve CI/CD pipelines",
      "Monitor system performance and troubleshoot issues",
      "Automate repetitive tasks and processes",
      "Collaborate with developers to deploy applications"
    ],
    postedDate: "2025-05-08",
    applicationDeadline: "2025-06-30"
  },
  {
    id: "5",
    title: "Marketing Specialist",
    company: "GrowthMarketers",
    logo: "/placeholder.svg",
    location: "Austin, TX",
    locationType: "Hybrid",
    salary: "$70,000 - $90,000",
    jobType: "Full-time",
    description: "GrowthMarketers is looking for a talented Marketing Specialist to join our team. You'll be responsible for planning and executing marketing campaigns across various channels to drive brand awareness and lead generation.",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "2+ years of experience in digital marketing",
      "Experience with social media platforms and analytics",
      "Knowledge of SEO and content marketing",
      "Excellent communication skills"
    ],
    responsibilities: [
      "Plan and execute marketing campaigns",
      "Manage social media accounts and content",
      "Track and analyze campaign performance",
      "Create engaging content for various channels",
      "Collaborate with the sales team to generate leads"
    ],
    postedDate: "2025-05-10",
    applicationDeadline: "2025-06-25"
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Innovate Inc.",
    logo: "/placeholder.svg",
    location: "Boston, MA",
    locationType: "On-site",
    salary: "$100,000 - $130,000",
    jobType: "Full-time",
    description: "Innovate Inc. is seeking an experienced Product Manager to lead our product development efforts. You'll work with cross-functional teams to define product vision, create roadmaps, and deliver high-quality products to market.",
    requirements: [
      "3+ years of product management experience",
      "Experience with agile methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management",
      "Technical background preferred"
    ],
    responsibilities: [
      "Define product vision and strategy",
      "Create and maintain product roadmaps",
      "Work with engineering team to deliver features",
      "Analyze market trends and customer feedback",
      "Present product updates to stakeholders"
    ],
    postedDate: "2025-05-12",
    applicationDeadline: "2025-07-01"
  }
];

export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};
