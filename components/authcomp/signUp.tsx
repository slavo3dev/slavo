/* eslint-disable indent */
import supabase from "@/lib/supabase";
import router from "next/router";
import { useState } from "react";

const SignUpForm = () => {
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");

  const [matchingPassword, setMatchingPassword] =
    useState<string>("");

  const signUpWithEmail = async () => {
    try {
      const signUpPromise = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
      });
      const { error } = signUpPromise;
      if (error) {
        console.log("Error during signUp: ", error);
        setSignUpError(error.message);
      }
    } catch (error) {
      console.log("Error during signUp: ", error);
    }
  };

  return (
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
    </form>
  );
};

export default SignUpForm;
