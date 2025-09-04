import { FC } from "react";

interface InfoItemProps {
  number: string;
  title: string;
  description: string;
  delay: string;
}

export const InfoItem:FC<InfoItemProps> = ({ number, title, description, delay }) => {
  return (
    <div
      className="w-full md:w-1/2 items-start py-4 wow animate__animated animate__fadeIn"
      data-wow-delay={delay}
    >
      <div className="w-8 mb-5 text-blue-500">
        <span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">
          {number}
        </span>
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold font-heading">{title}</h3>
        <p className="text-blueGray-400 leading-loose text-sm">{description}</p>
      </div>
    </div>
  );
};