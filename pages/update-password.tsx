import { NextPage } from "next";
import { UpdateYourPassword } from "@/components/Auth/UpdateYourPassword";
import { HeadBasePage } from "@components";

const updatePassword: NextPage = () => {
  return (
    <>
      <HeadBasePage
        title="Update Password | Slavo"
        description="Update your password for your Slavo account."
      />
      <UpdateYourPassword />
    </>
  );
};

export default updatePassword;
