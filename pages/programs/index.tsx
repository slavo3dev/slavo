import { NextPage, GetStaticProps } from 'next';
import { PricingSection, FeaturesSection, StatisticsSection, InfoSection, ContactSection, Breadcrumb, HeadBasePage} from "@components";
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

// Main component for the Programs page

const Programs: NextPage<{ pricingPlans: PricingPlan[] }> = ({ pricingPlans }) => {
  return (
    <>
      <HeadBasePage
        title="Software Web/Mobile Development - Consulting - Slavo_3"
        description="Become Software Developer / Consulting for Business and Startups"
        canonicalPath="/programs"
      />
      <Breadcrumb />
      <InfoSection />
      <StatisticsSection />
      <FeaturesSection />
      <PricingSection pricingPlans={pricingPlans} />
      <ContactSection /> 
    </>
  );
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
