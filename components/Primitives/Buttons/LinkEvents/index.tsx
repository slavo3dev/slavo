import Link from "next/link";
import { FC } from "react";

import classes from "./link-events.module.css";

interface Props
{
    link: string;
    description?: any;
}

export const LinkEvents: FC<Props> = ({link, description}) => {
	
	return (
		<button className={classes.linkEvents}>
			<Link href={link}>
				{description}
			</Link>
		</button>
	);
};