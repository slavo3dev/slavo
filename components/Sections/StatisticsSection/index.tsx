import { statistics } from "@/lib/constants/programsPageInfo/statistics";
import { StatisticCard } from "./StatisticCard"

export const StatisticsSection = () => {
  return (
    <section className="flex flex-col bg-white justify-center items-center h-full">
      <div className="container">
        <div className="flex flex-wrap justify-between pt-16 pb-8 px-3">
          {statistics.map((stat, index) => (
            <StatisticCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};