/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserData } from "@/lib/auth";
import supabase from "@/lib/supabase";
import Link from "next/link";

const Login: NextPage = () => {
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
                  </form>
                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-blue-500 after:mt-0.5 after:flex-1 after:border-t after:border-blue-500">
                    <p className="mx-4 mb-0 text-center font-normal text-black">
                      OR
                    </p>
                  </div>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-400 border-white border-2 border-b-gray-300 md:text-2xl ">
                    <span className="text-blue-600">Sign in</span> to
                    your account
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
                          setUserEmail(e.target.value);
                        }}
                        type="email"
                        name="email"
                        id="email"
                        className="text-blue-600 text-xs font-semibold sm:text-sm border-2 border-white border-b-blue-500 border-l-blue-500 rounded-bl-lg block w-full p-2.5"
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
                          setUserPassword(e.target.value);
                        }}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="text-blue-800 sm:text-sm border-2 border-white border-b-blue-500 border-l-blue-500 rounded-bl-lg block w-full p-2.5"
                      />
                      <Link href="/recover">Forgot Password</Link>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        signInWithEmail();
                      }}
                      type="submit"
                      className="bg-white text-blue-700 hover:bg-blue-500 hover:text-white focus:ring-4 border-2 border-blue-700 focus:ring-blue-300 focus:outline-none rounded-md px-4 py-2 text-sm font-medium"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {userInfo || user?.email ? null : (
              <>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-blue-500 after:mt-0.5 after:flex-1 after:border-t after:border-blue-500">
                  <p className="mx-4 mb-0 text-center font-normal text-black">
                    OR
                  </p>
                </div>

                <a
                  onClick={() => router.push("/auth/login")}
                  className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-blue-400 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ backgroundColor: "#171515" }}
                  href="#!"
                  role="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="GitHub"
                    role="img"
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <rect width="512" height="512" fill="#181717" />
                    <path
                      fill="#fff"
                      d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-44c-71 16-86-34-86-34-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"
                    />
                  </svg>
                  Continue with GitHub
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
