import { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { PricingSection } from "@components"; // Import the PricingSection
import { pricingPlans } from '@/lib/constants/programsPageInfo'; // Import the static PricingPlans

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

interface ApiProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: {
    unit_amount: number;
    currency: string;
  };
}

const Programs: NextPage<{ pricingPlans: PricingPlan[] }> = ({ pricingPlans }) => {
  return (
    <>
      <PricingSection pricingPlans={pricingPlans} />
    </>
  );
};

// Use getStaticProps to fetch data and pass it to the component
export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products'); // Ensure this is the correct endpoint
    const data: ApiProduct[] = await response.json();

    // Map over the static pricingPlans and merge with data from API
    const updatedPricingPlans = pricingPlans.map((plan) => {
      const apiProduct = data.find((product) => product.id === plan.product_id.toString());

      // Merge API product data with static plan
      return {
          ...plan,
          name: apiProduct?.name, // Fallback to static title if API is missing
          price: {
            amount: apiProduct?.default_price.unit_amount,
            currency: apiProduct?.default_price.currency,
          },
          image: apiProduct?.images[0], // Use the first image if available
          features: [apiProduct?.description || plan.features.join(', ')], // You can further split description if needed
        };
    });

    // Filter out any invalid plans with missing required fields
    const validPricingPlans = updatedPricingPlans.filter((plan) => plan.name && plan.price && plan.image);

    return {
      props: { pricingPlans: validPricingPlans },
      revalidate: 60, // Optional: Revalidate after 60 seconds
    };
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    // Return the static plans if the API fails
    return { props: { pricingPlans } };
  }
};

export default Programs;
