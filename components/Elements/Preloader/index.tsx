import React, { FC } from "react";
import Image from "next/image";

export const Preloader: FC = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Image
				id="preloader-active"
				className="animate-bounce"
				src="/images/logo/slavoio-logo.png"
				width={500}
				height={500}
				alt="Prototye.NEXT Logo"
				priority 
			/>
		</div>
	);
};


