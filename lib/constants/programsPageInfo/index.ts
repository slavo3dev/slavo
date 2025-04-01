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