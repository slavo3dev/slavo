import { ContactForm } from "@/components/ContactForm"

export const ContactSection = () => {
  return (
    <section className="flex flex-col bg-blueGray-50 justify-center items-center h-full  pb-20 mt-3">
					<div className="container px-3">
						<div className="max-w-2xl mx-auto text-center">
							<div className="max-w-md mb-8 mx-auto">
								<span
									className="text-xs py-1 px-3 text-blue-500 font-semibold bg-blue-100 rounded-xl wow animate__animated animate__fadeInDown"
									data-wow-delay=".9s"
								>
                  Contact Us
								</span>
								<h2
									className="mt-2 text-4xl font-bold font-heading wow animate__animated animate__fadeIn"
									data-wow-delay=".3s"
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
  )
}
