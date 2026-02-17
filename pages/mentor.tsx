import type { NextPage } from "next";
import { HeadBasePage, MentorAI } from "../components";

const Mentor: NextPage = () => {
  return (
    <>
      <HeadBasePage
        title="Mentor | Slavo"
        description="Access mentorship and coding resources with Slavo."
      />
      <MentorAI />
    </>
  );
};

export default Mentor;
