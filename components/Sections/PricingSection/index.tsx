import { FC } from 'react';
import { PricingCard } from './PricingCard';

interface PricingPlan {
  id: string;
  name: string;
  priceId: string;
  price: {
    amount: number;
    currency: string;
    recurring: string | null;
  };
  image: string;
  features: string[];
}

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
}


export const PricingSection: FC<PricingSectionProps> = ({ pricingPlans }) => {
  return (
    <section className="flex flex-col bg-white justify-center items-center h-full pt-20 pb-16 xl:bg-contain bg-top bg-no-repeat">
      <div className="container text-center px-3">
        <div className="mb-16">
          <h2 className="max-w-lg mx-auto mb-4 text-4xl font-bold font-heading wow animate__animated animate__fadeIn" data-wow-delay=".2s">
            <span>Start saving time today and</span>
            <span className="text-blue-500"> choose </span>
            <span>your best plan</span>
          </h2>
          <p className="max-w-sm mx-auto text-lg text-blueGray-400 wow animate__animated animate__fadeInDown" data-wow-delay=".5s">
            Start Your Growth Today! Learn, Build and Grow as fast as possible!
          </p>
        </div>
        <div className="flex flex-wrap justify-center -mx-3 items-stretch">
          {pricingPlans?.map((plan, index) => (
            <PricingCard key={index} {...plan}/>
          ))}
        </div>
      </div>
    </section>
  );
};
