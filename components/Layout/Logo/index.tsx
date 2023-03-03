import { FC } from "react";
import classes from "./logo.module.css";
import Link from "next/link";

export const Logo: FC = () => {
	return (
		<Link href="/">
			<div className={classes.logo}>
				<p>Slavo</p>
			</div>
		</Link>
	);
};