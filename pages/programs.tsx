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

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          {
            label:
              "Career Change / Become a Freelancer / Business Growth / Digital Nomad...",
          },
        ]}
      />

      <InfoSection />
      <StatisticsSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
    </>
  );
};

export default Programs;
