import { FC } from "react";

interface FeatureCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  delay: string;
}         

export const FeatureCard:FC<FeatureCardProps> = ({ id, title, description, image, delay }) => {
          return (
            <div
              className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn"
              data-wow-delay={delay}
            >
              <div className="p-12 bg-white shadow rounded flex flex-col h-full">
                <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">
                  {id}
                </div>
                <img className="h-36 mx-auto my-4" src={image} alt={title} />
                <h3 className="mb-2 font-bold font-heading text-xl">{title}</h3>
                <p className="text-sm text-blueGray-400 leading-relaxed">{description}</p>
              </div>
            </div>
          );
        };