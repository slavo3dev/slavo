import Link from "next/link";
import React from "react";
import { FC } from "react";

import classes from "./button-events.module.css";

export const ButtonEvents: FC = (props: any) => {
	if (props.link) {
		return (
			<Link href={props.link}>
				<a className={classes.btn}>{props.children}</a>
			</Link>
		);
	}

	return (
		<button className={classes.btn} onClick={props.onClick}>
			{props.children}
		</button>
	);
};