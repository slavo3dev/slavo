import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import {
  HeadBasePage,
  LoginForm,
  ResetPassword,
  CreateAccount,
} from "@components";

const Test: NextPage = () => {
  const [isAccountCreated, setIsAccountCreated] =
    useState<boolean>(true);
  const [isResetPassword, setIsResetPassword] =
    useState<boolean>(false);
  const router = useRouter();
  const { userInfo } = useContext(UserInfoContext);
  const isAuth = userInfo?.email;

  if (isAuth) {
    router.push("/");
  } else {
    console.log(false);
  }

  const toggleState = (
    setStateFunction: (arg0: (prevState: boolean) => boolean) => void,
  ) => {
    setStateFunction((prevState: boolean) => !prevState);
  };

  return (
    <>
      <HeadBasePage
        title="Login | Slavo"
        description="Login to your Slavo account to access mentorship and coding resources."
        noIndex
      />
      {!isResetPassword ? (
        isAccountCreated ? (
          <LoginForm
            signIn={() => toggleState(setIsAccountCreated)}
            resetPassword={() => toggleState(setIsResetPassword)}
          />
        ) : (
          <CreateAccount
            signIn={() => toggleState(setIsAccountCreated)}
          />
        )
      ) : (
        <ResetPassword
          resetPassword={() => toggleState(setIsResetPassword)}
          onClose={() => toggleState(setIsResetPassword)} // added this line to fix the error with modal since onClose is not defined in ResetPassword. (we are not using this page for now)
        />
      )}
    </>
  );
};

export default Test;
