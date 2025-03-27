import { FeatureCard } from "./FeatureCard";
import { features } from "./Features";

export const FeaturesSection = () => {
          return (
            <section
              className="pt-20 pb-24 bg-blueGray-50 flex flex-col justify-center items-center h-full"
              id="how-we-work"
            >
              <div className="container px-3">
                <div className="flex flex-wrap items-center justify-between max-w-2xl lg:max-w-full mb-12">
                  <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading wow animate__animated animate__fadeInDown">
                      <span>We are </span>
                      <span className="text-blue-500">awesome team </span>
                      <br />
                      <span>for your business dream</span>
                    </h2>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <p className="text-blueGray-400 leading-loose wow animate__animated animate__fadeIn">
                      For us, every relationship is built on trust and honesty.
                      <br />
                      Our web development process keeps those people involved, engaged and
                      informed throughout design, build, and the life of your project.
                    </p>
                  </div>
                </div>
        
                <div className="flex flex-wrap -mx-3 -mb-6 text-center items-stretch">
                  {features.map((feature) => (
                    <FeatureCard key={feature.id} {...feature} />
                  ))}
                </div>
              </div>
            </section>
          );
        };
        
                                        
                                                            
                                                            
                                          