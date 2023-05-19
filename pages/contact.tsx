import type { NextPage } from "next";
import { ContactForm } from "../components";


const Contact: NextPage = () => {
	return (
		<section className="py-20 h-screen" >
			<div className="container ">
				<div className="max-w-2xl mx-auto text-center">
					<div className="max-w-md mb-8 mx-auto">
						<span
							className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl wow animate__animatedanimated animate__fadeIn"
							data-wow-delay=".1s"
						>
                  Contact Us
						</span>
						<h2
							className="mt-2 text-4xl font-bold font-heading wow animate__animatedanimated animate__fadeIn"
							data-wow-delay=".s"
						>
                  We will{" "}
							<span className="text-blue-500">be glad</span> to
                  hear from you!
						</h2>
					</div>
					<ContactForm />
				</div>
			</div>
		</section>
	);
};

export default Contact;