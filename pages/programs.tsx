import type { NextPage } from "next";
import { PricingSection, FeaturesSection, StatisticsSection, InfoSection, ContactSection, Breadcrumb, HeadBasePage} from "@components";

const Programs: NextPage = () => {
 
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
      <PricingSection />
      <ContactSection />
    </>
  );
};

export default Programs;
