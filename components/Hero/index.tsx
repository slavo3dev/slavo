import { FC } from "react";
import Link from "next/link";
import Button from "@ui/button";
import { motion } from "framer-motion";
import clsx from "clsx";
import { scrollUpVariants } from "../../lib/types/variants";

export const Hero: FC = () => {
	return (
		<div className="bg-ebb relative flex items-center justify-center" >
			<div className="container grid grid-cols-1 lg:grid-cols-2 gap-7.5 relative z-10 w-full">
				<motion.div
					className="self-center text-center pt-[140px] pb-10 px-3.8 md:p-0 md:text-left md:max-w-[460px]"
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.1 }}
					variants={scrollUpVariants}
				>
					<h1 className="text-3xl sm:text-4xl lg:text-5xl text-secondary lg:leading-[1.17]">
						Complete Your Dreams in Freelanceing & Programming
					</h1>
					<p className="text-md sm:text-[16px] md:text-lg font-medium leading-relaxed text-secondary-light"
					>
					Learn any coding program in distance and for a reasonable fee. You don't have to struggle alone, you've got our assistance and help.
					</p>
					<Link href="/contact"><Button className="mt-5 bg-slate-400">
						<i className={clsx("far fa-download", "mr-3")} />
						Contact 
					</Button>
					</Link>
				</motion.div>
				<motion.div
					className="lg:pt-[137px] px-3.8 pb-[50px] lg:pb-[55px]"
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.1 }}
					variants={scrollUpVariants}
				>
					<img src="/images/hero/hero.png"
						alt={ "Freelnace Software Developer" }
						width={450} height={450}
					/>
				</motion.div>
			</div>
		</div>
	);
};