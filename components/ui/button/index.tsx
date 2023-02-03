import clsx from "clsx";
import Anchor from "../anchor";

interface ButtonProps {
    /**
     * Required.
     */
    children: React.ReactNode;
    /**
     * Optional. Default is `button`.
     */
    type?: "button" | "submit" | "reset";
    /**
     * Optional. Default is `contained`.
     */
    variant?: "contained" | "outlined" | "texted";
    /**
     * Optional. Default is `primary`.
     */
    color?: "primary" | "light";
    /**
     * Optional. Default is `md`.
     */
    size?: "xs" | "sm" | "md" | "lg";
    /**
     * Optional. Default is `rounded`.
     */
    shape?: "rounded" | "square" | "ellipse";
    /**
     * Pass fullwidth to make button fullwidth.
     */
    fullwidth?: boolean;
    /**
     * Pass active to enable active state.
     */
    active?: boolean;
    /**
     * Pass disabled to enable disabled state.
     */
    disabled?: boolean;
    /**
     * Pass iconButton to get Icon Button style.
     */
    iconButton?: boolean;
    /**
     * Optional. onClick function
     */
    onClick?: () => void;
    /**
     * Optional. Extra Class Name
     */
    className?: string;
    /**
     * Pass `path` to make link button
     */
    path?: string;
    /**
     * Optional. Pass label if button does not contain any text
     */
    label?: string;
    /**
     * Optional. Pass false if you don't need hover and focus
     */
    hover?: "default" | "light" | false;
}

const Button = ({
	children,
	type,
	variant,
	color,
	size,
	shape,
	fullwidth,
	active,
	disabled,
	iconButton,
	label,
	className,
	path,
	onClick,
	hover,
}: ButtonProps) => {
	const baseClass =
        "font-bold justify-center items-center border border-solid rounded-md transition-colors min-w-max";
	const baseNotFullWidthClass = !fullwidth && "inline-flex";
	const lightHoverClass =
        !disabled &&
        !active &&
        hover === "light" &&
        "hover:bg-white hover:border-white hover:text-primary";

	// Primary Button
	const containedPrimaryClass =
        "bg-primary border-primary text-white";
	const containedPrimaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:bg-secondary hover:border-secondary hover:text-white";
	const containedPrimaryActiveClass =
        !disabled &&
        active &&
        "bg-secondary border-secondary active:bg-secondary active:border-secondary";
	const containedPrimaryBtn = color === "primary" && [
		containedPrimaryClass,
		containedPrimaryHoverClass,
		containedPrimaryActiveClass,
		lightHoverClass,
	];

	const outlinedPrimaryClass =
        "bg-transparent border-primary text-primary";
	const outlinedPrimaryHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:bg-primary hover:text-white";
	const outlinedPrimaryActiveClass =
        !disabled &&
        active &&
        hover === "default" &&
        "bg-primary border-primary text-white active:bg-primary active:bg-primary";
	const outlinedPrimaryBtn = color === "primary" && [
		outlinedPrimaryClass,
		outlinedPrimaryHoverClass,
		outlinedPrimaryActiveClass,
		lightHoverClass,
	];

	// Light Button
	const containedLightClass = "bg-light border-light text-heading";
	const containedLightHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:bg-primary hover:border-primary hover:text-white";
	const containedLightActiveClass =
        !disabled &&
        active &&
        "bg-primary border-primary active:bg-primary active:border-primary";
	const containedLightBtn = color === "light" && [
		containedLightClass,
		containedLightHoverClass,
		containedLightActiveClass,
		lightHoverClass,
	];

	const outlinedLightClass = "border-light text-light";
	const outlinedLightHoverClass =
        !disabled &&
        !active &&
        hover === "default" &&
        "hover:bg-primary hover:border-primary hover:text-white";
	const outlinedLightActiveClass =
        !disabled &&
        active &&
        "bg-primary border-primary active:bg-primary active:border-primary";
	const outlinedLightBtn = color === "light" && [
		outlinedLightClass,
		outlinedLightHoverClass,
		outlinedLightActiveClass,
		lightHoverClass,
	];

	// Buton Sizes
	const mdBtn =
        size === "md" &&
        "text-md px-7 py-1 min-h-[48px] md:min-h-[52px] md:px-10";
	const xsBtn =
        size === "xs" && "text-[13px] px-5 leading-[30px] min-h-8";

	// Button Shapes
	const roundedBtn = shape === "rounded" && "rounded-md";
	const ellipseBtn = shape === "ellipse" && "rounded-full";
	const fullBtn = fullwidth && "flex w-full";

	const classnames = clsx(
		variant !== "texted" && baseClass,
		variant !== "texted" && baseNotFullWidthClass,
		variant === "contained" && [containedPrimaryBtn, containedLightBtn],
		variant === "outlined" && [outlinedPrimaryBtn, outlinedLightBtn],
		!iconButton && variant !== "texted" && [mdBtn, xsBtn],
		roundedBtn,
		ellipseBtn,
		fullBtn,
		className
	);

	if (path) {
		return (
			<Anchor
				path={path}
				className={classnames}
				onClick={onClick}
				aria-label={label}
			>
				{children}
			</Anchor>
		);
	}

	return (
		<button
			type={type}
			className={classnames}
			onClick={onClick}
			aria-label={label}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	type: "button",
	variant: "contained",
	color: "primary",
	size: "md",
	shape: "square",
	fullwidth: false,
	active: false,
	disabled: false,
	iconButton: false,
	hover: "default",
};

Button.displayName = "Button";

export default Button;
