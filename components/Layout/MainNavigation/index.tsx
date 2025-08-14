import { FC, useEffect, useState, useContext, useRef, use } from "react";
import Link from "next/link";
import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { Burger } from "./mobileView";
import { useRouter } from "next/router";
import UserInfoContext from "context/UserInfoContext";
import { Subscribe } from "@/components/Subscribe";
import { LoginModal } from "@/components/Auth/LoginPopup";
import { NavigationProps } from "@/Types/Navigation";
import { BlogDropDown } from "@/components/Posts/BlogDropDown";
import { FiUser } from "react-icons/fi";
import supabase from "@/lib/supabase"; 


export const MainNavigation: FC<NavigationProps> = ({ categories }) => {
  const [headStyle, setHeadStyle] = useState<boolean>(true);
  const { userInfo } = useContext(UserInfoContext);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const userEmail = userInfo?.email;
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleLoginModal = () => setShowLoginModal((prev) => !prev);

  const handleCategorySearch = (category: string) => {
    setSelectedCategory(category);
    router.push(category === "ALL" ? "/blog" : `/category/${category}`);
  };

  console.log(`ENV: ${process.env.NODE_ENV}`)
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <div className="flex">
        <nav className={classes.navMenu}>
          <ul>
            <li className={router.pathname === "/programs" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
              <Link href="/programs">Programs</Link>
            </li>
            
            <li className={router.pathname === "/porch" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
              <Link href="/porch">Porch</Link>
            </li>
            <li className={router.pathname === "/free-resources" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
              <Link href="/free-resources">Free Resources</Link>
            </li>
            <li className={router.pathname === "/blog" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
              <BlogDropDown categories={categories} onSearch={handleCategorySearch} selectedCategory="" setActiveCategory={() => {}} />
            </li>
            <li className={router.pathname === "/contact" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              {userEmail ? (
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setShowUserDropdown((prev) => !prev)}
                    className={`p-2 rounded-full hover:bg-blue-100 ${
                      isSubscribed === true
                        ? "bg-green-100 text-green-600"
                        : isSubscribed === false
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-blue-500"
                    }`}
                  >
                    <FiUser size={24} />
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded shadow-md z-50 p-4 text-sm">
                      <p className="mb-2 text-gray-800 font-medium truncate">{userEmail}</p>
                      <Link
                        href={"/subscription"}
                        className="hover:text-blue-500 hover:bg-blue-50 w-full block text-left "
                      >
                        Subscription
                      </Link>
                       <Link
                        href={"/dashboard"}
                        className="hover:text-blue-500 hover:bg-blue-50 w-full block text-left mt-2"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={"/auth/logout"}
                        className=" hover:text-blue-500 hover:bg-blue-50 w-full block text-left mt-2"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <span
                  onClick={toggleLoginModal}
                  className="font-montserrat font-semibold cursor-pointer text-lg hover:text-blue-500 hover:bg-blue-50 rounded-md"
                >
                  Login
                </span>
              )}
            </li>
          </ul>
        </nav>
        <Subscribe />
      </div>
      <Burger userInfo={userInfo} categories={categories} />
      {showLoginModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg max-w-xl w-full p-6">
            <LoginModal isOpen={showLoginModal} onClose={toggleLoginModal} />
          </div>
        </>
      )}
    </header>
  );
};
