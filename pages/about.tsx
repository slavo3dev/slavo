import type { NextPage } from "next";
import { HeadBasePage } from "@components";

const About: NextPage = () => {
  return (
    <>
      <HeadBasePage
        title="About Us | Slavo"
        description="Learn more about Slavo, our mission, and how we help developers build coding habits with mentorship."
      />
      <h1>About us</h1>
    </>
  );
};

export default About;
