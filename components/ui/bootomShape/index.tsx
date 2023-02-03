import clsx from "clsx";
// import BottomShapeSVG from "../../../public/assets/svgs/bottom-shape.svg";
import React from "react";

const BottomShape = () => {
	return (
		<div
			className={clsx(
				"absolute tw-z-1 bottom-px tw-left-0 tw-w-[calc(100%_+_1.3px)] h-20 lg:h-[440px] rotate-180 overflow-hidden",
			)}
		>
			{/* <BottomShapeSVG
				className={clsx(
					"full h-full block relative left-1/2 rotate-y-180-translate-x-half",
					"grayscale-0"
				)}
			/> */}
		</div>
	);
};

BottomShape.defaultProps = {
	color: "fill-heading/5",
};

export default BottomShape;
