/* eslint-disable indent */
import supabase from "@/lib/supabase";
import { NextPage } from "next";
import { useState } from "react";

const recoverPassword: NextPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(true);
  const resetPassword: () => void = async () => {
    try {
      const { data, error } =
        await supabase.auth.resetPasswordForEmail(userEmail, {
          redirectTo: "http://localhost:3000/login",
        });
      if (error) throw error;
    } catch (err) {
      console.log("Api call not succesful", err);
    }
  };

  //MOVE ALL SIGN FUNCTION TO SEPARATE FILE. ADD REDIRECT ROUTE TO SUPABASE.
  //ADD API TO update

  return (
    <div>
      {emailSent ? (
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
            />
          </div>
          <button
            onClick={() => {
              resetPassword();
              setEmailSent(!emailSent);
            }}
            type="submit"
            className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Recover Password
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
          <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
            <h3 className="text-2xl">
              We sent link to your email. Follow the instructions!!!
            </h3>
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                />
              </svg>
            </div>

            <div className="mt-4">
              <p className="mt-4 text-sm">
                If you’re having trouble reciving the email, please
                check your spams!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default recoverPassword;
