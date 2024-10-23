/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FreeSource } from "./FreeSource";

interface FreeSourcesListProps {
  facts: any[];
  setFacts: any;
}

export const FreeSourcesList: FC<FreeSourcesListProps> = ({
  facts,
  setFacts,
}) => {
  if (facts.length === 0)
    return (
      <p className="message">
        No Content for this category yet! Create the first one ✌️
      </p>
    );

  return (
    <>
      <section className="grid grid-cols-1 gap-6 px-8 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0 overflow-hidden">
        {facts.map((fact) => (
          <FreeSource key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </section>
      <p style={{ color: "#1d1e18" }}>
        There are {facts.length} source. Add your own source!
      </p>
    </>
  );
};
