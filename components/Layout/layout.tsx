/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FC } from "react";

type Props = {
    children: React.ReactNode | any;
};


export const Layout: FC<Props> = (props) => {
	return (
		<div className="container-main">
			{props.children}
		</div>
	);
};

