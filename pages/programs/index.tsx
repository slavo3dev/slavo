import { NextPage, GetStaticProps } from 'next';
import { PricingSection } from '@components';
import { getAllProducts } from '@/lib/getAllProducts';

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

const Programs: NextPage<{ pricingPlans: PricingPlan[] }> = ({ pricingPlans }) => {
  return <PricingSection pricingPlans={pricingPlans} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProducts();
  
  const pricingPlans = data
    .filter(product => product.price?.amount !== undefined)
    .map(product => ({
      id: product.id,
      name: product.name,
      priceId: product.priceId,
      price: {
        amount: product.price.amount,
        currency: product.price.currency,
        recurring:  product.price.recurring ?? null,
      },
      image: product.image ?? '',
      features: product.features ?? [],
    }))
    .sort((a, b) => a.price.amount - b.price.amount); // Optional: sort by price

  return {
    props: { pricingPlans },
    revalidate: 6000,
  };
};

export default Programs;
