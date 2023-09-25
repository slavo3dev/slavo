/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserData } from "@/lib/auth";
import supabase from "@/lib/supabase";
import { Signup } from "../components/Signup/index";

const Login: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [matchingPassword, setMatchingPassword] =
    useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const signUpWithEmail: () => void = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
      });
      if (error) {
        console.log("Signup error:", error.message);
        setSignUpError(error.message);
        return;
      }
      router.push("/");
      console.log("Request is ok");
    } catch (err) {
      console.log("Error during signup:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUserInfo(userData);
    };

    fetchData();
  }, []);

  const signInWithEmail: () => void = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });
      if (error) {
        console.log("Signup error:", error.message);
        setSignUpError(error.message);
        return;
      }
      router.push("/");
      console.log("Request is ok");
    } catch (error) {
      console.log("Error during sign in", error);
    }
  };

  return (
    <>
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <Signup  />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;