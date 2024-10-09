import { FC } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import React from "react";

export const CounterUp: FC<any>= ({ count, time }) => {
	return (
		<>
			{/* {/ <CountUp end={count} duration={3}/> /} */}
			<CountUp end={count} duration={time}>
				{({ countUpRef, start }) => (
					<VisibilitySensor onChange={start} delayedCall>
						<span ref={countUpRef}>count</span>
					</VisibilitySensor>
				)}
			</CountUp>
		</>
	);
};

