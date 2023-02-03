import Link from "next/link";
import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";


export const MainNavigation: FC = () =>
{
	const { user } = useUser();
	const isAuth = user?.email;
    
	const auth_terms = "Please log in/Verify your e-mail\nTo access the Free Sources Page.";
	return (
		<header className={classes.header}>
			<Link href="/">
				<Logo />
			</Link>
			<nav>
				<ul>
					{/* <li>
						<Link href="/about">About</Link>
					</li> */}
					<li>
						<Link href="/blog">Blog</Link>
					</li>
					{ isAuth ? <li><Link href="/freesource">ReSource</Link></li> : <li onClick={() => alert(auth_terms)}><Link href="/">ReSource</Link></li> }
					<li>
						<Link href="/contact">Contact</Link>
					</li>

					{ isAuth && <li><Link href="/api/auth/logout">Logout</Link></li> }
					
					<li>
						{ isAuth ? <Link href="/freesource">{user.email}</Link> : <Link href="/api/auth/login">Login</Link>}
					</li>
				</ul>
			</nav>
		</header>
	);
};