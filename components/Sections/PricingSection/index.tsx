import { PricingCard } from "./PricingCard";
import { pricingPlans } from "./PricingPlans";

export const PricingSection = () => {
          return (
            
              <div className="flex flex-wrap -mx-3">
                
                
                  {pricingPlans.map((plan, index) => (
                    <PricingCard key={index} {...plan} />
                  ))}
                
              </div>
            
          );
        };