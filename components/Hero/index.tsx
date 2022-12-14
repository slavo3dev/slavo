import { FC } from "react";
import classes from "./hero.module.css";
import Image from "next/image";
import Link from "next/link";

export const Hero: FC = () => {
	return (
		<section className={ classes.hero }>
			<div className={classes.imagehero}>
				<Image
					className="animate__animated animate__fadeIn profile-image-hero"
					src="/images/profile/profile-image.png"
					alt="Profile Image, Software Developer"
					width={300}
					height={300}
				/>
			</div>
			<h1>Slavo</h1>
			<p className={classes.quote}>The future depends on what<br /> you do today.</p>
			<Link href="/blog"><a><button className="hover:bg-blue-100 bg-blue-500 text-white hover:text-red-500 font-bold py-2 px-4 rounded">Articles</button></a></Link>
		</section>
	);
};