
import { FC } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CounterUpProps {
  count: number;
  time: number;
}

export const CounterUp: FC<CounterUpProps> = ({ count, time }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <span ref={ref}>
      {inView ? <CountUp end={count} duration={time} /> : 0}
    </span>
  );
};
