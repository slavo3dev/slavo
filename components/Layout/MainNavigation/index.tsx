import Link from "next/link";
import classes from "./navigation.module.css";
import { Logo } from "../Logo";
import { FC } from "react";


export const MainNavigation: FC = () =>
{
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
					<li>
						<Link href="/freesource">ReSource</Link>
					</li>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
					{/* <li>
						<Link href="/contact">Contact</Link>
					</li> */}
				</ul>
			</nav>
		</header>
	);
};