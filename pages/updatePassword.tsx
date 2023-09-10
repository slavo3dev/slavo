/* eslint-disable indent */
import supabase from "@/lib/supabase";
import { NextPage } from "next";
import { useState } from "react";

const updatePassword: NextPage = () => {
  const [newPassword, setNewPassword] = useState<string>();
  const [matchingPassword, setMatchingPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const updateUserPassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-blue-400 "
          >
            Password
          </label>
          <input
            onChange={(e) => {
              setNewPassword(e.target.value);
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
        {passwordError}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5"></div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (matchingPassword == newPassword) {
              updateUserPassword();
            } else {
              setPasswordError("Passwords Not Matching");
            }
          }}
          type="submit"
          className="bg-white text-blue-700 hover:bg-blue-500 hover:text-white border-2 border-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none rounded-md px-4 py-2 text-sm font-medium"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default updatePassword;
