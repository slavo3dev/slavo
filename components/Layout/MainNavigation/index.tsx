import { FC, useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";

import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { Burger } from "./mobileView";
import UserInfoContext from "context/UserInfoContext";
import { Subscribe } from "@/components/Subscribe";
import { LoginModal } from "@/components/Auth/LoginPopup";
import { NavigationProps } from "@/Types/Navigation";
import { BlogDropDown } from "@/components/Posts/BlogDropDown";
import { NotificationsBell } from "@/components/NotificationsBell";
import supabase from "@/lib/supabase";

export const MainNavigation: FC<NavigationProps> = ({
  categories,
}) => {
  const [headStyle, setHeadStyle] = useState<boolean>(true);
  const { userInfo } = useContext(UserInfoContext);
  const [showLoginModal, setShowLoginModal] =
    useState<boolean>(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const userEmail = userInfo?.email;
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);

  const handleCategorySearch = (category: string) => {
    router.push(
      category === "ALL" ? "/blog" : `/category/${category}`,
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeadStyle(window.scrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (userEmail) {
      setShowLoginModal(false);
    }
  }, [userEmail]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!userInfo) return;

      const { data, error } = await supabase
        .from("profile")
        .select("is_subscribed")
        .eq("id", userInfo.id)
        .single();

      if (error) {
        console.error("Error fetching subscription status:", error);
      } else {
        setIsSubscribed(data?.is_subscribed || false);
      }
    };

    fetchSubscriptionStatus();
  }, [userInfo]);

  return (
    <header className={headStyle ? classes.header : classes.header1}>
      <Logo />

      <div className="flex items-center gap-3">
        <nav className={classes.navMenu}>
          <ul>
            <li
              className={
                router.pathname === "/programs"
                  ? "bg-blue-50"
                  : "hover:text-blue-500 hover:bg-blue-50"
              }
            >
              <Link href="/programs">Programs</Link>
            </li>

            <li
              className={
                router.pathname === "/porch"
                  ? "bg-blue-50"
                  : "hover:text-blue-500 hover:bg-blue-50"
              }
            >
              <Link href="/porch">Porch</Link>
            </li>

            <li
              className={
                router.pathname === "/free-resources"
                  ? "bg-blue-50"
                  : "hover:text-blue-500 hover:bg-blue-50"
              }
            >
              <Link href="/free-resources">Free Resources</Link>
            </li>

            <li
              className={
                router.pathname === "/blog"
                  ? "bg-blue-50"
                  : "hover:text-blue-500 hover:bg-blue-50"
              }
            >
              <BlogDropDown
                categories={categories}
                onSearch={handleCategorySearch}
                selectedCategory=""
                setActiveCategory={() => {}}
              />
            </li>

            <li
              className={
                router.pathname === "/contact"
                  ? "bg-blue-50"
                  : "hover:text-blue-500 hover:bg-blue-50"
              }
            >
              <Link href="/contact">Contact</Link>
            </li>

            <li className="flex items-center">
              {userEmail ? (
                <div className="flex items-center gap-2">
                  <NotificationsBell />

                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowUserDropdown((prev) => !prev)
                      }
                      className={`rounded-full p-2 hover:bg-blue-100 ${
                        isSubscribed === true
                          ? "bg-green-100 text-green-600"
                          : isSubscribed === false
                            ? "bg-yellow-100 text-yellow-600"
                            : "text-blue-500"
                      }`}
                      aria-label="Open user menu"
                    >
                      <FiUser size={24} />
                    </button>

                    {showUserDropdown && (
                      <div className="absolute right-0 z-50 mt-2 w-52 rounded border border-gray-200 bg-white p-4 text-sm shadow-md">
                        <p className="mb-2 truncate font-medium text-gray-800">
                          {userEmail}
                        </p>

                        <Link
                          href="/subscription"
                          className="block w-full text-left hover:bg-blue-50 hover:text-blue-500"
                        >
                          Subscription
                        </Link>

                        <Link
                          href="/mentor"
                          className="mt-2 block w-full text-left hover:bg-blue-50 hover:text-blue-500"
                        >
                          Mentor
                        </Link>

                        <Link
                          href="/dashboard"
                          className="mt-2 block w-full text-left hover:bg-blue-50 hover:text-blue-500"
                        >
                          Dashboard
                        </Link>

                        <Link
                          href="/auth/logout"
                          className="mt-2 block w-full text-left hover:bg-blue-50 hover:text-blue-500"
                        >
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={toggleLoginModal}
                  className="cursor-pointer rounded-md text-lg font-semibold hover:bg-blue-50 hover:text-blue-500"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>

        <Subscribe />
      </div>

      <Burger userInfo={userInfo} categories={categories} />

      {showLoginModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md" />

          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 transform rounded-lg p-6">
            <LoginModal
              isOpen={showLoginModal}
              onClose={toggleLoginModal}
            />
          </div>
        </>
      )}
    </header>
  );
};
