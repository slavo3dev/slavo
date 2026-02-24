/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, SetStateAction, Dispatch, useMemo } from "react";
import { FreeSource } from "./FreeSource";

interface Fact {
  id: number;
  likes: string[];
  text: string; // normalize to string
  source: string; // normalize to string
  category?: string; // ✅ IMPORTANT: NOT null (to match FreeSource)
  email?: string | null;
  new_id?: string | number | null;
}

interface FreeSourcesListProps {
  facts: Fact[];
  setFacts: Dispatch<SetStateAction<Fact[]>>;
}

export const FreeSourcesList: FC<FreeSourcesListProps> = ({
  facts,
  setFacts,
}) => {
  // ✅ Normalize incoming data so it matches THIS Fact type (no nulls for text/source/category)
  const safeFacts = useMemo<Fact[]>(() => {
    if (!Array.isArray(facts)) return [];
    return facts.map((f: any) => ({
      id: Number(f?.id ?? 0),
      likes: Array.isArray(f?.likes) ? f.likes : [],
      text: (f?.text ?? "").toString(),
      source: (f?.source ?? "").toString(),
      category: f?.category == null ? undefined : String(f.category), // ✅ convert null -> undefined
      email: f?.email ?? null,
      new_id: f?.new_id ?? null,
    }));
  }, [facts]);

  if (safeFacts.length === 0)
    return (
      <p className="message">
        No Content for this category yet! Create the first one ✌️
      </p>
    );

  return (
    <section className="py-1 sm:py-1 lg:py-1 border-y-4">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <div className="mx-auto overflow-hidden bg-gray-100 rounded-xl">
          <div className="py-5 sm:p-6">
            <div className="mt-6 space-y-3">
              {safeFacts.map((fact) => (
                <FreeSource
                  key={fact.id}
                  // ✅ force compatibility with FreeSource's local Fact type
                  fact={fact as any}
                  setFacts={setFacts as any}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className="mt-5 text-lg font-medium text-gray-800 text-center">
          There are {safeFacts.length} sources. Add your own source!
        </p>
      </div>
    </section>
  );
};
