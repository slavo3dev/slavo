/* eslint-disable indent */
import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import insta from "public/images/icons/instagram-blue.svg";
import twit from "public/images/icons/twitter-blue.svg";
import face from "public/images/icons/facebook-blue.svg";
import link from "public/images/icons/linkedinIcon.webp";
import { useUser } from "@auth0/nextjs-auth0/client";
import classes from "./navigation.module.css";


export const Burger: FC<any> = ( { userInfo } ) => {
    const [ showDrop, setShowDrop ] = useState( false );
//   const [showHome, setShowHome] = useState(false);
//   const [showBlog, setShowBlog] = useState(false);

    const { user } = useUser();
    const isAuth = user?.email || userInfo?.email;
    const userEmail = user?.email || userInfo?.email;


  const handleBurger = () => {
    setShowDrop(!showDrop);
  };

//   const handleMenu = () => {
//     setShowHome(!showHome);
//   };

//   const handleBlog = () => {
//     setShowBlog(!showBlog);
//   };

  return (
    <div className="md:hidden flex-row overflow-show">
      <button onClick={handleBurger} className=" z-50 right-4 items-center py-2 px-3 mt-4 mr-4 text-blue-500 hover:text-blue-700 rounded border border-blue-200 hover:border-blue-300">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      <div className={showDrop ? "visible " : "hidden"}>
        <div className="fixed flex-col h-5/6 overflow-scroll top-20 bg-white left-0 z-40 mt-2 w-full rounded border-[.5px] border-light px-5 py-5 transition-all">
          <ul onClick={handleBurger} className="overflow-y-scroll mr-auto w-full flex list-none flex-col ">
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/porch">Porch</Link>
			</li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/mentor">Mentor</Link>
			</li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                <Link href="/blog">Blog</Link>
            </li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/videos">Videos</Link>
            </li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/programs">Programs</Link>
			</li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/contact">Contact</Link>
			</li>
        </ul>
		<div className="w-full mt-4 pt-6 border-t items-center border-blueGray-50 flex flex-col">
            {/* <div className="w-11/12 px-4 py-3 mb-3 text-xs text-center no-underline font-semibold rounded-xl bg-blue-400 hover:bg-blue-500 text-white rounded-xl">
              <Link className="" href={""}>SignUp</Link>
            </div> */}
            <div className="w-11/12 px-4 py-3 mb-3 text-blue-500 hover:text-blue-700 text-center font-semibold rounded-xl border border-blue-200 hover:border-blue-300 rounded">  
{isAuth ? (user?.email_verified || userInfo?.email ? (<Link href="/api/auth/logout"><span className={classes.user_email}>{userEmail}  [ Logout ]</span></Link>): (<Link href="/api/auth/login">Verify Email & Login</Link>))
 : (<Link className="" href="/api/auth/login">Login</Link>)} </div>
          </div>
		<div className="text-center">
          <div>Contact us slavo@slavo.io</div>
     <div>
          <a href={"https://www.instagram.com/slavo_3/"} target="_blank" rel="noopener noreferrer">
             <Image width={50} height={50} src={insta} /></a>
          <a href={"https://twitter.com/slavo3dev"} target="_blank" rel="noopener noreferrer">
              <Image width={50} height={50} src={twit} />
          </a>
          <a href={"https://facebook.com/slavo.io"} target="_blank" rel="noopener noreferrer">
            <Image width={50} height={50} src={face} />
          </a>
          <a href={"https://www.linkedin.com/in/slavopopovic/"} target="_blank" rel="noopener noreferrer">
            <Image width={50} height={50} src={link} />
          </a>
          </div>
		</div>
        </div>
      </div>
    </div>
  );
};