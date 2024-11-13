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
      <section className="py-1 sm:py-1 lg:py-1 border-y-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
          <div className="max-w- mx-auto overflow-hidden bg-gray-100 rounded-xl">
            <div className="py-5 sm:p-6">
              <div className="mt-6 space-y-3">
                {facts.map((fact) => (
                  <FreeSource key={fact.id} fact={fact} setFacts={setFacts} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="mt-5 text-lg font-medium text-gray-800 text-center">
            There are {facts.length} sources. Add your own source!
          </p>
        </div>
      </section>
    );
    
  };