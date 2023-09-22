/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import type { NextPage } from "next";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserData } from "@/lib/auth";
import supabase from "@/lib/supabase";

export const Signup:FC  = () => {
  const router = useRouter();
  const { user } = useUser();

  const [userInfo, setUserInfo] = useState<any>(null);

  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>(""); // add this to sign in
  const [userPassword, setUserPassword] = useState<string>("");
  const [matchingPassword, setMatchingPassword] =
    useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");

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

  // Set state for login name and password, then handle response
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUserInfo(userData);
    };

    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(true);


  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      {isOpen && (
        <div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-6">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
              <div className="w-full bg-white rounded-bl-lg rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-400 border-white border-2 border-b-gray-300 md:text-2xl ">
                    <span className="text-blue-600">Sign up</span> for
                    new account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-blue-400 "
                      >
                        Your email
                      </label>
                      <input
                        onChange={(e) => {
                          setNewUserEmail(e.target.value);
                        }}
                        type="email"
                        name="email"
                        id="email"
                        className="text-blue-600 text-xs font-semibold border-2 border-white border-b-blue-500 border-l-blue-500 sm:text-sm rounded-bl-lg block w-full p-2.5"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-blue-400 "
                      >
                        Password
                      </label>
                      <input
                        onChange={(e) => {
                          setNewUserPassword(e.target.value);
                        }}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="text-blue-800 sm:text-sm border-2 border-white border-b-blue-500 border-l-blue-500 rounded-bl-lg block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-blue-400 "
                      >
                        Confirm Password
                      </label>
                      <input
                        onChange={(e) => {
                          setMatchingPassword(e.target.value);
                        }}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="text-blue-800 sm:text-sm border-2 border-white border-b-blue-500 border-l-blue-500 rounded-bl-lg block w-full p-2.5"
                      />
                    </div>
                    {signUpError}
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5"></div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (matchingPassword == newUserPassword) {
                          signUpWithEmail();
                        } else {
                          setSignUpError("Passwords Not Matching");
                        }
                      }}
                      type="submit"
                      className="bg-white text-blue-700 hover:bg-blue-500 hover:text-white border-2 border-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none rounded-md px-4 py-2 text-sm font-medium"
                    >
                      Sign up
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-white text-blue-700 hover:bg-blue-500 hover:text-white border-2 border-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none rounded-md px-4 py-2 text-sm font-medium"
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </section>
  );
};