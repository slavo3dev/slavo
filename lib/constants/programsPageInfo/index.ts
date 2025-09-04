//Breadcurmb Section
interface BreadcrumbProps { 
  label: string; 
  href?: string 
};


export const breadcrumbItems:BreadcrumbProps[] = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  {
    label:
      "Career Change / Become a Freelancer / Business Growth / Digital Nomad...",
  },
]

//Features Section
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: string;
  delay: string;
}

export const features:FeatureItem[] = [
  {
    id: 1,
    title: "Project Initialization",
    description:
      "Project initiation ensures that you lay a strong foundation for a new project in your company our team.",
    image: "images/components/eating.svg",
    delay: ".3s",
  },
  {
    id: 2,
    title: "Project Planning",
    description:
      "A project plan is essential to keep everything related to the project organized, methodical, and on track.",
    image: "images/components/mantorship.svg",
    delay: ".5s",
  },
  {
    id: 3,
    title: "Project Organization",
    description:
      "Moving forward you will be able to keep yourself and your team on track, and address challenges early.",
    image: "images/components/task.svg",
    delay: ".7s",
  },
];

//Info section
interface Info {
  number: string;
  title: string;
  description: string;
  delay: string;
}

export const infos: Info[] = [
  {
    number: "1",
    title: "Grow with the Team",
    description:
      "After 7-days of learning, you will be included in the team project & start practicing your skills.\nWorking in a team encourages personal growth and reduces stress.",
    delay: ".2s",
  },
  {
    number: "2",
    title: "Learning By Doing",
    description:
      "Deliberate practice means practicing with a clear awareness of the specific components of a skill we are aiming to improve and exactly how to improve them.",
    delay: ".3s",
  },
  {
    number: "3",
    title: "Tools & Resources",
    description:
      "We will provide you best tools and resources to help you learn new skill, such as free courses, chatbot, mentors, podcasts, books, and connect with professionals.",
    delay: ".4s",
  },
  {
    number: "4",
    title: "Evaluate your new skills",
    description:
      "One of the most effective ways to develop your new skillset is to constantly practice & evaluate what you have learned. We will constantly track your progress.",
    delay: ".5s",
  },
];

//Pricing Section
interface PricingPlan {
  id: number;
  title: string;
  price: string;
  features: string[];
  image: string;
  bgColor: string;
  textColor: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: "Habit Horizons",
    price: "$9.99",
    features: [
      "Cue creation",
      "Mentor: Regular Check-Ins",
      "Daily Notifications: Reminder Mechanism",
      "Monitor Progress",
    ],
    image: "images/components/team.svg",
    bgColor: "bg-white",
    textColor: "text-blue-500",
  },
  {
    id: 2,
    title: "Digital Horizons",
    price: "$99.99",
    features: [
      "CodeCraft: Your Digital Nomad Journey",
      "Career Coaching",
      "Tracking Progress",
      "Elevate Every Opportunity",
    ],
    image: "images/components/web.svg",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Dedicate to Dominate",
    price: "$240.00",
    features: [
      "Recruit & Rise",
      "CodeCraft: Your FrontEnd Journey",
      "Career Coaching",
      "365: Your Guided Year",
    ],
    image: "images/components/space.svg",
    bgColor: "bg-white",
    textColor: "text-blue-500",
  },
];


