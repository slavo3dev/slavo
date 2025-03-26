import { FC } from "react";
import { CounterUp } from "../CounterUp";

interface StatiscticsCardProps {
  icon: JSX.Element;
  count: number;
  label: string;
  delay: string;
  suffix?: string;
}

export const StatisticCard:FC<StatiscticsCardProps> = ({ icon, count, suffix, label, delay }) => {
  return (
    <div
      className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
      data-wow-delay={delay}
    >
      <div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
        {icon}
      </div>
      <div className="sm:py-2 ml-2 sm:ml-6">
        <span className="sm:text-2xl font-bold font-heading">+ </span>
        <span className="sm:text-2xl font-bold font-heading count">
          <CounterUp count={count} time={3} />
        </span>
        {suffix && <span className="sm:text-2xl font-bold font-heading"> {suffix} </span>}
        <p className="text-xs sm:text-base text-blueGray-400">{label}</p>
      </div>
    </div>
  );
}