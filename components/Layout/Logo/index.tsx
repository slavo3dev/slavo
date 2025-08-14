import { FC } from "react";
import classes from "./logo.module.css";
import Link from "next/link";

export const Logo: FC = () => {
	return (
		
			<Link href="/">
				<span className={classes.logo}>Slavo</span>
			</Link>
		
	);
};