import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";

import { LoginModal } from "@/components/Auth/LoginPopup";
import { NotificationsBell } from "@/components/NotificationsBell";
import insta from "public/images/icons/instagram-blue.svg";
import twit from "public/images/icons/twitter-blue.svg";
import face from "public/images/icons/facebook-blue.svg";
import link from "public/images/icons/linkedinIcon.webp";
import supabase from "@/lib/supabase";

interface UserInfo {
  id: string;
  email?: string;
}

interface BurgerProps {
  userInfo: UserInfo | null;
  categories?: string[];
}

export const Burger: FC<BurgerProps> = ({ userInfo }) => {
  const [showDrop, setShowDrop] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const userEmail = userInfo?.email;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);

  const toggleUserDropdown = () =>
    setShowUserDropdown((prev) => !prev);

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
    <>
      <div className="flex-row overflow-visible md:hidden">
        <button
          type="button"
          onClick={() => setShowDrop(!showDrop)}
          className="right-4 z-50 mr-4 items-center rounded border border-blue-200 px-3 py-2 text-blue-500 hover:border-blue-300 hover:text-blue-700"
          aria-label="Open mobile menu"
        >
          <svg
            className="h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <div className={showDrop ? "visible" : "hidden"}>
          <div className="fixed left-0 top-20 z-40 mt-2 flex h-5/6 w-full flex-col overflow-scroll rounded border-[.5px] border-light bg-white px-5 py-5 transition-all">
            <ul
              onClick={() => setShowDrop(false)}
              className="flex w-full flex-col"
            >
              <li className="rounded-xl p-4 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-500">
                <Link href="/programs">Programs</Link>
              </li>

              <li className="rounded-xl p-4 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-500">
                <Link href="/porch">Porch</Link>
              </li>

              <li className="rounded-xl p-4 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-500">
                <Link href="/free-resources">Free Resources</Link>
              </li>

              <li className="rounded-xl p-4 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-500">
                <Link href="/blog">Blog</Link>
              </li>

              <li className="rounded-xl p-4 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-500">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>

            <div className="mt-6 flex w-full flex-col items-center border-t border-blueGray-50 pt-6">
              {userEmail ? (
                <div className="flex w-full flex-col gap-3">
                  <NotificationsBell fullWidth />

                  <div ref={dropdownRef} className="relative w-full">
                    <button
                      type="button"
                      onClick={toggleUserDropdown}
                      className={`flex w-full items-center justify-center rounded border border-blue-200 py-2 text-blue-500 hover:border-blue-300 ${
                        isSubscribed === true
                          ? "bg-green-100 text-green-600"
                          : isSubscribed === false
                            ? "bg-yellow-100 text-yellow-600"
                            : "text-blue-500"
                      }`}
                      aria-label="Open user menu"
                    >
                      <FiUser size={22} />
                    </button>

                    {showUserDropdown && (
                      <div className="absolute right-0 z-50 mt-2 w-full rounded border border-gray-200 bg-white p-4 text-sm shadow-md">
                        <p className="mb-2 truncate font-medium text-gray-800">
                          {userEmail}
                        </p>

                        <Link
                          href="/subscription"
                          className="block w-full hover:bg-blue-50 hover:text-blue-500"
                          onClick={() => setShowDrop(false)}
                        >
                          Subscription
                        </Link>

                        <Link
                          href="/mentor"
                          className="mt-2 block w-full hover:bg-blue-50 hover:text-blue-500"
                          onClick={() => setShowDrop(false)}
                        >
                          Mentor
                        </Link>

                        <Link
                          href="/dashboard"
                          className="mt-2 block w-full hover:bg-blue-50 hover:text-blue-500"
                          onClick={() => setShowDrop(false)}
                        >
                          Dashboard
                        </Link>

                        <Link
                          href="/auth/logout"
                          className="mt-2 block w-full hover:bg-blue-50 hover:text-blue-500"
                          onClick={() => setShowDrop(false)}
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
                  className="mb-3 w-full cursor-pointer rounded-xl border border-blue-200 px-4 py-3 text-center font-semibold text-blue-500 hover:border-blue-300 hover:text-blue-700"
                >
                  Login
                </button>
              )}
            </div>

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

            <div className="mt-6 text-center">
              <div>Contact us slavo@slavo.io</div>

              <div className="mt-2 flex justify-center gap-2">
                <a
                  href="https://www.instagram.com/slavo_3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={40}
                    height={40}
                    src={insta}
                    alt="Instagram Logo"
                  />
                </a>

                <a
                  href="https://twitter.com/slavo3dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={40}
                    height={40}
                    src={twit}
                    alt="Twitter Logo"
                  />
                </a>

                <a
                  href="https://facebook.com/slavo.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={40}
                    height={40}
                    src={face}
                    alt="Facebook Logo"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/slavopopovic/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={40}
                    height={40}
                    src={link}
                    alt="LinkedIn Logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
