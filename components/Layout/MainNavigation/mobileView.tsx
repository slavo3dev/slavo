/* eslint-disable indent */
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import insta from "public/images/icons/instagram-blue.svg";
import twit from "public/images/icons/twitter-blue.svg";
import face from "public/images/icons/facebook-blue.svg";
import link from "public/images/icons/linkedinIcon.webp";
import classes from "./navigation.module.css";


export const Burger: FC<any> = ( { userInfo } ) => {
    const [ showDrop, setShowDrop ] = useState( false );
//   const [showHome, setShowHome] = useState(false);
//   const [showBlog, setShowBlog] = useState(false);

    const isAuth = userInfo?.email;
    const userEmail = userInfo?.email;


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
            {/* <li className="w-11/12 text-sm text-gray-500 rounded-xl">
              <span onClick={handleMenu} className="relative block hover:text-blue-500 hover:bg-blue-50 w-full p-4 rounded-xl">
                <p>Home</p>
                <div className="absolute right-2 bottom-1">
                  {!showHome ? (<p className="text-md h-8 w-8 text-center ">+</p>)
                  : (<p className="absolute right-1 bottom-0.5 text-md h-8 w-8 text-center ">-</p>)}
                </div>
              </span>
              <ul className={ showHome ? "flex-col visible" : "invisible absolute"}>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Home 1</li>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Home 2</li>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Home 3</li>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Home 4</li>
              </ul>
            </li> */}
            {/* <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">About Us</li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Services</li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Portfolio</li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Pricing</li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Team</li> */}
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/porch">Porch</Link>
            </li>
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/free-resources">Free Resources</Link>
			</li>
            {/* <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/mentor">Mentor</Link>
			</li> */}
            <li className="w-11/12 text-sm text-gray-500 rounded-xl">
               <span /*onClick={handleBlog}*/ className="relative block hover:text-blue-500 hover:bg-blue-50 w-full p-4 rounded-xl"> 
                              <Link href="/blog">Blog</Link>
                              
				{/* <div className="absolute right-2 bottom-1">
                  {!showBlog ? ( <p className="text-md h-8 w-8 text-center ">+</p>)
				: (<p className="absolute right-1 bottom-0.5 text-md h-8 w-8 text-center ">-</p>)}
                </div> */}
              </span>
              {/* <ul className={showBlog ? "flex-col visible" : "invisible absolute"}>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Blog 1</li>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Blog 2</li>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Blog 3</li>
                <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Blog 4</li>
              </ul> */}
            </li>
			{/* <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Faqs</li> */}
            {/* <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/videos">Videos</Link>
			</li> */}
            <li className="w-11/12 p-4 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
				<Link href="/contact">Contact</Link>
			</li>
        </ul>
		<div className="w-full mt-4 pt-6 border-t items-center border-blueGray-50 flex flex-col">
            {/* <div className="w-11/12 px-4 py-3 mb-3 text-xs text-center no-underline font-semibold rounded-xl bg-blue-400 hover:bg-blue-500 text-white rounded-xl">
              <Link className="" href={""}>SignUp</Link>
            </div> */}
                <div className="w-11/12 px-4 py-3 mb-3 text-blue-500 hover:text-blue-700 text-center font-semibold rounded-xl border border-blue-200 hover:border-blue-300 rounded">  
                          { isAuth ?
                              ( <Link href="/auth/logout"><span className={ classes.user_email }>{ userEmail }  [ Logout ]</span></Link> ) :
                              ( <Link className="" href="/login">Login</Link> )
                          }
                </div>
        </div>
		<div className="text-center">
          <div>Contact us slavo@slavo.io</div>
     <div>
          <a href={"https://www.instagram.com/slavo_3/"} target="_blank" rel="noopener noreferrer">
             <Image width={50} height={50} src={insta} alt="Instagram Logo" /></a>
          <a href={"https://twitter.com/slavo3dev"} target="_blank" rel="noopener noreferrer">
              <Image width={50} height={50} src={twit} alt="Twitter Logo" />
          </a>
          <a href={"https://facebook.com/slavo.io"} target="_blank" rel="noopener noreferrer">
            <Image width={50} height={50} src={face} alt="Facebook Logo"/>
          </a>
          <a href={"https://www.linkedin.com/in/slavopopovic/"} target="_blank" rel="noopener noreferrer">
            <Image width={50} height={50} src={link} alt="Linkedin Logo" />
          </a>
          </div>
		</div>
        </div>
      </div>
    </div>
  );
};