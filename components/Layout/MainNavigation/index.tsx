import { FC, useEffect, useState, useContext } from "react";
import Link from "next/link";
import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { Burger } from "./mobileView";
import { useRouter } from "next/router";
import UserInfoContext from "context/UserInfoContext";
import { Subscribe } from "@/components/Subscribe";
import LoginModal from "@/components/Auth/LoginPopup";
import { NavigationProps } from "@/Types/Navigation";
import { BlogDropDown } from "@/components/Posts/BlogDropDown";


export const MainNavigation: FC<NavigationProps> = ({categories}) => {
    
	const [ headStyle, setHeadStyle ] = useState<boolean>( true );
	const { userInfo } = useContext(UserInfoContext);
	const [selectedCategory, setSelectedCategory] = useState("ALL");
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

	const router = useRouter();
	const userEmail = userInfo?.email;


	const toggleLoginModal = () => setShowLoginModal((prev) => !prev);
    
	useEffect(() => {
		document.addEventListener("scroll", () => {
			const scrolled: number = window.scrollY;
			if (scrolled > 50) {
				setHeadStyle(false);
			} else {
				setHeadStyle(true);
			}
		});
	} );
	  
	
	useEffect(() => {
		if (userEmail) {
		  setShowLoginModal(false);
		}
	  }, [userEmail]);

	const onSearchCat = (category: string) => {
		setSelectedCategory(category);
		if (category === "ALL") {
		  router.push("/blog"); 
		} else {
			const fullPath = `/category/${category}`;
			router.push(fullPath);
		}
	  };

	return (
		<header className={headStyle ? classes.header : classes.header1}>
			<Logo />
			<div>
				<nav className={classes.navMenu}>
					<ul>
						{/* <li>
						<Link href="/about">About</Link>
					</li> */}
						<li className={router.pathname === "/programs" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<Link href="/programs">Programs</Link>
						</li>
						<li className={router.pathname === "/porch" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<Link href="/porch">Porch</Link>
						</li>
						<li className={router.pathname === "/free-resources" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"} onClick={() => localStorage.getItem("selectedResCat")}>
							<Link href="/free-resources">Free Resources</Link>
						</li> 
						{/* <li className={router.pathname === "/mentor" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<Link href="/mentor">Mentor</Link>
						</li> */}
						<li className={router.pathname === "/blog" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<BlogDropDown categories={categories} onSearch={onSearchCat} selectedCategory="" setActiveCategory={() =>{}}/>
						</li>
						{/* <li className={router.pathname === "/videos" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<Link href="/videos">Videos</Link>
						</li> */}
						
						<li className={router.pathname === "/contact" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<Link href="/contact">Contact</Link>
						</li>
						<li className={router.pathname === "/login" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							{(userEmail ) ? (
								
								<Link href="/auth/logout">Logout</Link>
								
							) : ( <span onClick={toggleLoginModal}className="font-montserrat font-semibold cursor-pointer text-lg hover:text-blue-500 hover:bg-blue-50 rounded-md">Login</span> 
							)}
						</li>
						{userEmail && <li className="hover:text-blue-500 hover:bg-blue-50">
							{userEmail}
						</li>}
						<li>
							<Subscribe />
						</li>
					</ul>
				</nav>
			</div>
			<Burger userInfo={ userInfo } categories={categories} />
			{showLoginModal && (
				<>
        		<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg  max-w-xl w-full p-6">
          			<LoginModal isOpen={showLoginModal} onClose={toggleLoginModal} />
        		</div>
				</>
     		)}
		</header>
	);
};