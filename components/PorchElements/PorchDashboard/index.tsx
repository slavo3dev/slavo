import { useState, useEffect, useContext, useMemo } from "react";
import WeeklyGoalForm from "../PorchWeeklyGoalForm";
import UserInfoContext from "@/context/UserInfoContext";
import Calendar from "../PorchUserDataForm/Calendar";

const PorchDashboard = () => {
  const [showUpdateGoals, setShowUpdateGoals] = useState<boolean>(false);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [weeklyLearningDays, setWeeklyLearningDays] = useState<number>(0);
  const [learningDates, setLearningDates] = useState<{ date: string; count: number }[]>([]);
  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    fetchUserAndLearningData();
  }, [userInfo?.email]);

  const fetchUserAndLearningData = async () => {
    if (!userInfo?.email) return;

    try {
      const res = await fetch(`/api/getUserActivity?email=${encodeURIComponent(userInfo.email)}`);
      const { userActivityData, learningData } = await res.json();

      if (userActivityData?.weekly_goal) setWeeklyGoal(userActivityData.weekly_goal);
      setLongestStreak(userActivityData?.longest_streak ?? 0);

      if (learningData?.length) {
        calculateStreaks(learningData);
        calculateWeeklyLearningDays(learningData);
        setLearningDates(
          learningData.map((entry: { created_at: string }) => ({
            date: new Date(entry.created_at).toISOString().split("T")[0],
            count: 1,
          }))
        );
      } else {
        setCurrentStreak(0);
        setWeeklyLearningDays(0);
        setLearningDates([]);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const calculateStreaks = (data: { created_at: string }[]) => {
    if (!data.length) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let lastDate: Date | null = null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const uniqueDates = Array.from(
      new Set(
        data.map(entry => {
          const date = new Date(entry.created_at);
          date.setHours(0, 0, 0, 0);
          return date.toISOString().split("T")[0];
        })
      )
    ).sort();

    const sortedUniqueDates: Date[] = uniqueDates.map(date => new Date(date));

    sortedUniqueDates.forEach((currentDate: Date) => {
      if (!lastDate) {
        currentStreak = 1;
        lastDate = currentDate;
        return;
      }

      const differenceInDays = Math.floor(
        (currentDate.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24)
      );

      currentStreak = differenceInDays === 1 ? currentStreak + 1 : 1;
      lastDate = currentDate;
      longestStreak = Math.max(longestStreak, currentStreak);
    });

    if (lastDate) {
      const differenceToToday = Math.floor((today.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24));
      if (differenceToToday > 1) currentStreak = 0;
    }

    setCurrentStreak(currentStreak);
    setLongestStreak(longestStreak);
  };

  const calculateWeeklyLearningDays = (data: { created_at: string }[]) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);
    today.setHours(23, 59, 59, 999);

    const currentWeekLearningDays = new Set<string>();

    data.forEach((entry: { created_at: string }) => {
      const learningDate = new Date(entry.created_at);
      if (learningDate >= startOfWeek && learningDate <= today) {
        currentWeekLearningDays.add(learningDate.toDateString());
      }
    });

    setWeeklyLearningDays(currentWeekLearningDays.size);
  };

  const memoizedLearningDates = useMemo(() => learningDates, [learningDates]);

  if (showUpdateGoals) {
    return (
      <div className="flex justify-center">
        <WeeklyGoalForm setShowUserForm={() => setShowUpdateGoals(false)} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 px-4 py-6">
      {/* Weekly Goal Card */}
      <div className="border-2 p-4 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Weekly Learning Goals</h2>
          <button onClick={() => setShowUpdateGoals(true)} className="text-sm hover:underline">
            Edit Goal ➡️
          </button>
        </div>
        <p className="text-center text-4xl font-bold">
          {weeklyLearningDays} / {weeklyGoal}
        </p>
        <p className="text-center font-bold">days</p>
        <div className="flex justify-center mt-2">
          {weeklyLearningDays >= weeklyGoal ? (
            <span className="bg-green-400 text-sm px-3 py-1 rounded-full">Nice! 🚀</span>
          ) : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? (
            <span className="bg-yellow-400 text-sm px-3 py-1 rounded-full">On Track</span>
          ) : (
            <span className="bg-red-400 text-sm px-3 py-1 rounded-full">Off Track</span>
          )}
        </div>
        <p className="text-center text-xs mt-2">
          {weeklyLearningDays === weeklyGoal ? (
            <>
              You hit your goal this week, <span className="font-bold">keep the momentum going!</span>
            </>
          ) : (
            <>
              To hit your goal this week, learn{" "}
              <span className="font-bold">{weeklyGoal} times!</span>
            </>
          )}
        </p>
      </div>

      {/* Streak Card */}
      <div className="border-2 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Current Streak</h2>
        <p className="text-3xl font-bold">
          {currentStreak} <span className="text-sm uppercase font-normal text-slate-600">days</span>
        </p>
        <hr className="my-3" />
        <div className="flex justify-between text-sm">
          <span>✅ Longest Streak</span>
          <span className="font-bold">{longestStreak}</span>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="border-2 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Learning Chart</h2>
        <Calendar learningDates={memoizedLearningDates} />
      </div>
    </div>
  );
};

export default PorchDashboard;
