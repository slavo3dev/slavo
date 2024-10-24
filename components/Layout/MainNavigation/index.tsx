import { FC, useEffect, useState, useContext } from "react";
import Link from "next/link";
import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { Burger } from "./mobileView";
import { useRouter } from "next/router";
import UserInfoContext from "context/UserInfoContext";


export const MainNavigation: FC = () => {
    
	const [ headStyle, setHeadStyle ] = useState<boolean>( true );
	const { userInfo } = useContext(UserInfoContext);
    
	const router = useRouter();
    
	const userEmail = userInfo?.email;
    
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

	return (
		<header className={headStyle ? classes.header : classes.header1}>
			<Logo />
			<div>
				<nav className={classes.navMenu}>
					<ul>
						{/* <li>
						<Link href="/about">About</Link>
					</li> */}
						<li className={router.pathname === "/porch" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<Link href="/porch">Porch</Link>
						</li>
						<li className={router.pathname === "/free-resources" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"} onClick={() => localStorage.getItem("selectedResCat")}>
							<Link href="/free-resources">Free Resources</Link>
						</li> 
						{/* <li className={router.pathname === "/mentor" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"}>
							<Link href="/mentor">Mentor</Link>
						</li> */}
						<li className={router.pathname === "/blog" ? "bg-blue-50" : "hover:text-blue-500 hover:bg-blue-50"} onClick={() => localStorage.getItem("selectedOption")}>
							<Link href="/blog">Blog</Link>
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
								
							) : ( <Link href="/login">Login</Link> ) }
						</li>
						{userEmail && <li className="hover:text-blue-500 hover:bg-blue-50">
							{userEmail}
						</li>}
					</ul>
				</nav>
			</div>
			<Burger userInfo={ userInfo } />
		</header>
	);
};