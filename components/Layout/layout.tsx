/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

type Props = {
    children: React.ReactNode | any;
};


export const Layout: FC<Props> = ( { children } ) => {
	return (
		<div className="container-main">
			{children}
		</div>
	);
};
