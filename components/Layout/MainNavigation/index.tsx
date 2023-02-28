import Link from "next/link";
import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";


export const MainNavigation: FC = () =>
{
	const { user } = useUser();
	const isAuth = user?.email; 
        
	return (
		<header className={ classes.header }>
			<Link href="/">
				<Logo />
			</Link>
			<nav className={classes.navMenu}>
				<ul>
					{/* <li>
						<Link href="/about">About</Link>
					</li> */}
					<li>
						<Link href="/blog">Blog</Link>
					</li>
					<li>
						<Link href="/freesource">ReSource</Link>
					</li> 
					<li>
						<Link href="/contact">Contact</Link>
					</li>

					{ isAuth && user?.email_verified && <li><Link href="/api/auth/logout">Logout</Link></li> }
					
					<li>
						{ isAuth ?
							( user?.email_verified ? <span className={classes.user_email }>{ user.email }</span> : <Link href="/api/auth/login">Verify Email & Login</Link> ) :
							<Link href="/api/auth/login">Login</Link>
						}
					</li>
				</ul>
			</nav>
		</header>
	);
};