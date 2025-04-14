//Pricing Section
interface PricingPlan {
    id: number;
    product_id: string;
    features: string[];
    bgColor: string;
    textColor: string;
  }
        
export const pricingPlans: PricingPlan[] = [
  {
    id: 2,
    product_id: "prod_Orn71pKZtCEQ4z",
    features: [
      "CodeCraft: Your Digital Nomad Journey",
      "Career Coaching",
      "Tracking Progress",
      "Elevate Every Opportunity",
    ],
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 1,
    product_id: "prod_OrnGlnicPmbacJ", // Make sure these match the Stripe product IDs
    features: [
      "Cue creation",
      "Mentor: Regular Check-Ins",
      "Daily Notifications: Reminder Mechanism",
      "Monitor Progress",
    ],
    bgColor: "bg-white",
    textColor: "text-blue-500",
  },
 
  {
    id: 3,
    product_id: "prod_OgDf6eZ2xl1kZW",
    features: [
      "Recruit & Rise",
      "CodeCraft: Your FrontEnd Journey",
      "Career Coaching",
      "365: Your Guided Year",
    ],
    bgColor: "bg-white",
    textColor: "text-blue-500",
  },
];