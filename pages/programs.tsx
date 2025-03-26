import React from "react";
import type { NextPage } from "next";
// import Layout from "../components/layout/Layout";
import { PricingSection, FeaturesSection, StatisticsSection, InfoSection, ContactSection } from "@components";
import Head from "next/head";
//import Stripe from "stripe";
import { GetStaticProps } from "next";
import { HeadBasePage } from "@components";
import { Breadcrumb } from "@components";


const Programs: NextPage = ({ plans }: any) => {
  console.log("Plans: ", plans);

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
