/* eslint-disable indent */
import supabase from "@/lib/supabase";
import { NextPage } from "next";
import { useState } from "react";

const recoverPassword: NextPage = () => {
  const [userEmail, setUserEmail] = useState("");

  const resetPassword: () => void = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        userEmail,
      );
      if (error) throw error;
    } catch (err) {
      console.log("Api call not succesful", err);
    }
  };

  return (
    <div>
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
          onClick={(e) => {
            e.preventDefault();
            resetPassword();
          }}
          type="submit"
          className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Recover Password
        </button>
      </form>
    </div>
  );
};

export default recoverPassword;
