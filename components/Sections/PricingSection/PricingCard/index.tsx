import { FC } from "react";
import clsx from "clsx";

interface PricingCardProps {
  id: number;
  title: string;
  price: string;
  features: string[];
  image: string;
  bgColor: string;
  textColor: string;
}

export const PricingCard: FC<PricingCardProps> = ({ id, title, price, features, image, bgColor, textColor }) => {
  return (
    
    <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
    <div className={clsx("hover-up-5 border border-gray-200 pt-16 pb-8 px-4 text-center rounded", bgColor, textColor)}>
      <img src={image} alt={title} className="h-20 mb-6 mx-auto" />
      <h3 className="mb-2 text-4xl font-bold font-heading">{title}</h3>
      <span className="text-4xl font-bold font-heading">{price}</span>
      <p className="mt-2 mb-8">per month</p>
      <div className="flex flex-col items-center mb-8">
          <ul className="">
          {features.map((feature, index) => (
            <li key={index} className="flex mb-3">
              <svg
                className="w-6 h-6 mr-2 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
               >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
               ></path>
               </svg>
            <span>
               {feature}
            </span>
            </li>
          ))}
          </ul>
          <div>
          <a className={`block sm:inline-block py-4 px-6 mb-4 sm:mb-0 sm:mr-3 text-xs rounded text-center font-semibold leading-none, ${ id%2 === 0 ? "text-blue-500 bg-white border border-gray-200 hover:bg-gray-200" : "text-white bg-blue-400 hover:bg-blue-200"} `}
              href="#"
            >
              Learn More...
            </a>
            <a className={`block sm:inline-block py-4 px-6 text-xs text-center font-semibold leading-none rounded ${ id%2 === 0 ? "text-white bg-blue-400 hover:bg-blue-200" : "text-blue-500 bg-white border border-gray-200 hover:bg-gray-200"}`}
              href="#"
            >
              Purchase
          </a>
         </div>
      </div>
    </div>
    </div>
  );
};


