import { InfoItem } from "./InfoItem/Index";
import { infos } from "./Infos";

export const InfoSection = () => {
          return (
            <section className="pt-12">
            <div className="container py-12 mx-auto">
              <div className="flex flex-wrap">
                <div
                  className="w-full md:w-1/2 pr-12 px-3 order-0 md:order-0 mb-12 md:mb-0 wow animate__animated animate__fadeIn"
                  data-wow-delay=".5s"
                >
                  <img
                    className="sm:max-w-sm lg:max-w-full mx-auto"
                    src="/images/components/service_min.png"
                    alt="Learn new Skills"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 order-1 md:order-1">
                  <div className="max-w-md-2">
                    <div className="mb-4">
                      <span
                        className="text-xs py-1 px-3 text-blue-500 font-semibold bg-blue-50 rounded-xl wow animate__animated animate__fadeInDown"
                        data-wow-delay=".9s"
                      >
                        Why choose us
                      </span>
                      <h2
                        className="text-4xl mt-3 font-bold font-heading wow animate__animated animate__fadeIn"
                        data-wow-delay=".3s"
                      >
                        We Provide the best <br />
                        <span className="text-blue-500">
                          environment
                        </span>{" "}
                        for personal growth.
                      </h2>
                    </div>
  
                    <p
                      className="mb-6 leading-loose text-blueGray-400 wow animate__animated animate__fadeIn"
                      data-wow-delay=".1s"
                    >
                      You spend 86,400 hours of your life at work.
                      <br />
                      You deserve a job that you love!
                    </p>
                      <div className="flex flex-wrap">
                      {infos.map((info, index) => (
                        <InfoItem key={index} {...info} />
                      ))}
                    </div>

                </div>
							</div>
						</div>
					</div>
				</section>
            
          );
        };