import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { PorchDailyUpdate } from "../PorchDailyUpdate";
import { PorchType } from "@/Types/PorchTypes";
import supabase from "lib/supabase";

interface PorchListProps {
  porchs: PorchType[];
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
}

export const PorchList: React.FC<PorchListProps> = ({
  porchs,
  setPorchs,
}) => {
  const { userInfo } = useContext(UserInfoContext);

  const [filtered, setFiltered] = useState(false);
  const [dailyUpdates, setDailyUpdates] =
    useState<PorchType[]>(porchs);
  const [learningDays, setLearningDays] = useState(0);

  useEffect(() => {
    setDailyUpdates(porchs);
  }, [porchs]);

  const filteringUpdatesPerUser = useMemo(() => {
    const updates = filtered
      ? dailyUpdates.filter(
          (porch) => porch.email === userInfo?.email,
        )
      : dailyUpdates;

    return updates
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime(),
      );
  }, [dailyUpdates, userInfo?.email, filtered]);

  useEffect(() => {
    const fetchLearningDays = async () => {
      if (!userInfo?.email) return;

      const { count, error } = await supabase
        .from("porch")
        .select("*", { count: "exact", head: true })
        .eq("email", userInfo.email);

      if (error) {
        console.error(
          "Error fetching learning days from Supabase:",
          error,
        );
        return;
      }

      setLearningDays(count || 0);
    };

    fetchLearningDays();
  }, [userInfo?.email]);

  const handleFiltering = () => {
    setFiltered((prevState) => !prevState);
  };

  return (
    <section className="py-6">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-sky-50 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xl font-bold text-slate-950">
                  Daily Highlights
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Growth and learning news from the community.
                </p>

                {userInfo?.email ? (
                  <p className="mt-4 text-sm font-medium text-slate-700">
                    You&apos;ve been dedicated to learning for{" "}
                    <b className="text-blue-700">{learningDays}</b>{" "}
                    days.
                  </p>
                ) : null}
              </div>

              {userInfo?.email ? (
                <button
                  type="button"
                  onClick={handleFiltering}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {filtered
                    ? "Show All Daily Updates"
                    : "My Daily Updates"}
                </button>
              ) : null}
            </div>
          </div>

          <div className="space-y-5 bg-slate-50 p-4 sm:p-6">
            {filteringUpdatesPerUser.length > 0 ? (
              filteringUpdatesPerUser.map((porch) => (
                <PorchDailyUpdate
                  key={porch.new_id || porch.created_at}
                  porch={porch}
                  setPorchs={setPorchs}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <p className="text-sm font-medium text-slate-500">
                  No daily updates yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
