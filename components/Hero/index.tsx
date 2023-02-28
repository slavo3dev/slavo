import { FC } from "react";
import { useEffect, useState} from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import classes from "./hero.module.css";
import Image from "next/image";
import Link from "next/link";

export const Hero: FC = () => {
	const { user } = useUser();
	const [ userEmail, setUserEmail ] = useState<string | undefined | null>("");
	const [ userVerified, setUserVerified ] = useState<boolean | null>();
    
	const urlPath = userVerified ? "#aimentor" : "/api/auth/login"; 
	const titleBtn = userVerified ? "AI Mentor" : "Verify Your Email\nClick to Login";
    
	useEffect( () => {
		if ( user )
		{
			setUserEmail( user.email );
			setUserVerified(user?.email_verified);
		}
	},[userEmail, userVerified, user]);
    
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
			<Link href={userEmail ? urlPath : "/api/auth/login"}><button className="hover:bg-blue-100 bg-blue-500 text-white hover:text-red-500 font-bold py-2 px-4 mt-3 rounded">{userEmail ? titleBtn : "Login to try AI Mentor"}</button></Link>
		</section>
	);
};