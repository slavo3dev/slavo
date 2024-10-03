import React, { FC } from "react";
import Image from "next/image";

export const Preloader: FC = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Image
				src="/images/logo/slavoio-logo.png"
				width={250} 
				height={250}
				alt="Prototye.NEXT Logo"
				className="animate-bounce"
				priority
			/>
		</div>
	);
};
