import Link from "next/link";
import { FC } from "react";
import { breadcrumbItems } from "@/lib/constants/programsPageInfo";

export const Breadcrumb = () => {
  return (
    <section className="flex flex-col pt-16 pb-12 bg-white px-6 lg:px-10 justify-center items-center border-t-2 border-t-orange-950">
      <div className="container">
        <h1 className="text-2xl lg:text-5xl font-bold mb-5 wow animate__animated animate__fadeIn animated">
          Programs
        </h1>
        <ul className="flex text-gray-500 text-sm lg:text-sm pb-12 wow animate__animated animate__fadeIn animated">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              {item.href ? (
                <Link href={item.href} className="hover:text-blue-500 text-gray-800">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-400">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-5 w-auto text-gray-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

   
          
      
          
        
