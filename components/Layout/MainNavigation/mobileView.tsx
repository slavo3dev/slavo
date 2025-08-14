import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Subscribe } from "@/components/Subscribe";
import { LoginModal } from "@/components/Auth/LoginPopup";
import { FiUser } from "react-icons/fi";
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
  const userEmail = userInfo?.email;
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);

  const toggleUserDropdown = () => setShowUserDropdown((prev) => !prev);

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
      <div className="md:hidden flex-row overflow-show">
        <button
          onClick={() => setShowDrop(!showDrop)}
          className="z-50 right-4 items-center py-2 px-3 mr-4 text-blue-500 hover:text-blue-700 rounded border border-blue-200 hover:border-blue-300"
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>

        <div className={showDrop ? "visible" : "hidden"}>
          <div className="fixed flex-col h-5/6 overflow-scroll top-20 bg-white left-0 z-40 mt-2 w-full rounded border-[.5px] border-light px-5 py-5 transition-all">
            <ul onClick={() => setShowDrop(false)} className="flex flex-col w-full">
              <li className="p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                <Link href="/programs">Programs</Link>
              </li>
              
              <li className="p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                <Link href="/porch">Porch</Link>
              </li>
              <li className="p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                <Link href="/free-resources">Free Resources</Link>
              </li>
              <li className="p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>

            <div className="w-full mt-6 pt-6 border-t border-blueGray-50 flex flex-col items-center">
              {userEmail ? (
                <div ref={dropdownRef} className="relative w-full">
                  <button
                    onClick={toggleUserDropdown}
                    className={`flex items-center justify-center w-full py-2 text-blue-500 border border-blue-200 rounded hover:border-blue-300 ${
                      isSubscribed === true
                        ? "bg-green-100 text-green-600"
                        : isSubscribed === false
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-blue-500"
                    }`}
                  >
                    <FiUser size={22} />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded shadow-md z-50 p-4 text-sm">
                      <p className="mb-2 text-gray-800 font-medium truncate">{userEmail}</p>
                      <Link
                        href={"/subscription"}
                        className="hover:text-blue-500 hover:bg-blue-50 w-full block"
                      >
                        Subscription
                      </Link>
                      <Link
                        href={"/dashboard"}
                        className="hover:text-blue-500 hover:bg-blue-50 w-full block"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={"/auth/logout"}
                        className="hover:text-blue-500 hover:bg-blue-50 w-full mt-2"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={toggleLoginModal}
                  className="w-full px-4 py-3 mb-3 text-blue-500 hover:text-blue-700 text-center font-semibold rounded-xl border border-blue-200 hover:border-blue-300 cursor-pointer"
                >
                  Login
                </div>
              )}
            </div>

            {showLoginModal && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg max-w-xl w-full p-6">
                  <LoginModal
                    isOpen={showLoginModal}
                    onClose={toggleLoginModal}
                  />
                </div>
              </>
            )}

            <div className="text-center mt-6">
              <div>Contact us slavo@slavo.io</div>
              <div className="flex justify-center mt-2 gap-2">
                <a href="https://www.instagram.com/slavo_3/" target="_blank" rel="noopener noreferrer">
                  <Image width={40} height={40} src={insta} alt="Instagram Logo" />
                </a>
                <a href="https://twitter.com/slavo3dev" target="_blank" rel="noopener noreferrer">
                  <Image width={40} height={40} src={twit} alt="Twitter Logo" />
                </a>
                <a href="https://facebook.com/slavo.io" target="_blank" rel="noopener noreferrer">
                  <Image width={40} height={40} src={face} alt="Facebook Logo" />
                </a>
                <a href="https://www.linkedin.com/in/slavopopovic/" target="_blank" rel="noopener noreferrer">
                  <Image width={40} height={40} src={link} alt="LinkedIn Logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
