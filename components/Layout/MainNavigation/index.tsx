import Link from "next/link";
import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { FC, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Burger } from "./burger";

export const MainNavigation: FC = () => {
	const { user } = useUser();
	const isAuth = user?.email;

	const [headStyle, setHeadStyle] = useState<boolean>(true);
	useEffect(() => {
		document.addEventListener("scroll", () => {
			const scrolled: number = window.scrollY;
			if (scrolled > 50) {
				setHeadStyle(false);
			} else {
				setHeadStyle(true);
			}
		});
	});

	return (
		<header className={headStyle ? classes.header : classes.header1}>
			<Logo />
			<div>
				<nav className={classes.navMenu}>
					<ul>
						{/* <li>
						<Link href="/about">About</Link>
					</li> */}
						<li>
							<Link href="/blog">Blog</Link>
						</li>
						{/* <li>
						<Link href="/freesource">ReSource</Link>
					</li>  */}
						<li>
							<Link href="/contact">Contact</Link>
						</li>

						{isAuth && user?.email_verified && (
							<li>
								<Link href="/api/auth/logout">Logout</Link>
							</li>
						)}

						<li>
							{isAuth ? (
								user?.email_verified ? (
									<span className={classes.user_email}>
										{user.email}
									</span>
								) : (
									<Link href="/api/auth/login">
                    Verify Email & Login
									</Link>
								)
							) : (
								<Link href="/api/auth/login">Login</Link>
							)}
						</li>
					</ul>
				</nav>
			</div>
			<Burger />
		</header>
	);
};
