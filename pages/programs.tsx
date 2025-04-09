import { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { PricingSection } from "@components"; // Import the PricingSection
import { pricingPlans } from '@/lib/constants/programsPageInfo'; // Import the static PricingPlans
import { getAllProducts } from '@/lib/stripe';

interface PricingPlan {
  id: number;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  image: string;
  features: string[];
  bgColor: string;
  textColor: string;
}

const Programs: NextPage<{ pricingPlans: PricingPlan[] }> = ({ pricingPlans }) => {
  return (
    <>
      <PricingSection pricingPlans={pricingPlans} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {

    const data = await getAllProducts();

    // Map over the static pricingPlans and merge with data from API
    const updatedPricingPlans = pricingPlans.map((plan) => {
      const apiProduct = data.find((product) => product.id === plan.product_id);

      // Merge API product data with static plan
      return {
          ...plan,
          name: apiProduct?.name ?? "No Name", // Fallback to static title if API is missing
          price: {
            amount: apiProduct?.price.amount ?? 0,
            currency: apiProduct?.price.currency ?? "usd",
          },
          image: apiProduct?.images[0], 
          features: plan.features, 
        };
    });

    const sortedPricingPlans = updatedPricingPlans
      .filter(plan => plan.price?.amount !== undefined)
      .sort((a, b) => a.price.amount - b.price.amount);

    return {
      props: { pricingPlans: sortedPricingPlans },
      revalidate: 6000, // Optional: Revalidate after 60 seconds
    };
  
};

export default Programs;
