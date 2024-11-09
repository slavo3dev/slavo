import { useState, useEffect, useContext } from "react";
import WeeklyGoalForm from "../PorchWeeklyGoalForm";
import UserInfoContext from "@/context/UserInfoContext";
import supabase from "@/lib/supabase";
import Calendar from "./Calendar";

const PorchUserDataForm = ({ setShowUserForm }: any) => {
  const [showUpdateGoals, setShowUpdateGoals] =
    useState<boolean>(false);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [weeklyLearningDays, setWeeklyLearningDays] =
    useState<number>(0);
  const [learningDates, setLearningDates] = useState<
    { date: string; count: number }[]
  >([]);

  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    const storedGoal = localStorage.getItem("weeklyGoal");
    if (storedGoal) {
      setWeeklyGoal(Number(storedGoal));
    }
  }, []);

  useEffect(() => {
    const fetchConsecutiveLearningDays = async () => {
      if (userInfo?.email) {
        const { data, error } = await supabase
          .from("porch")
          .select("created_at")
          .eq("email", userInfo.email)
          .order("created_at", { ascending: true });

        if (error) {
          console.log(
            "Error fetching consecutive learning days",
            error,
          );
        } else {
          let currentStreak = 0;
          let longestStreak = 0;
          let lastDate: Date | null = null;

          data.forEach((entry: { created_at: string }) => {
            const currentDate = new Date(entry.created_at);
            if (lastDate) {
              let differenceInDays =
                (currentDate.getTime() - lastDate.getTime()) /
                (1000 * 3600 * 24);
              if (differenceInDays === 1) {
                currentStreak += 1;
              } else if (differenceInDays > 1) {
                currentStreak = 1;
              }
            } else {
              currentStreak = 1;
            }
            lastDate = currentDate;
            longestStreak = Math.max(longestStreak, currentStreak);
          });
          setCurrentStreak(currentStreak);
          setLongestStreak(longestStreak);
        }
      }
    };
    fetchConsecutiveLearningDays();
  }, [userInfo?.email]);

  useEffect(() => {
    const fetchWeeklyLearningDays = async () => {
      if (userInfo?.email) {
        const { data, error } = await supabase
          .from("porch")
          .select("created_at")
          .eq("email", userInfo.email)
          .order("created_at", { ascending: true });

        if (error) {
          console.log(
            "Error fetching consecutive learning days",
            error,
          );
        } else {
          const currentWeekLearningDays = new Set<string>();
          const today = new Date();
          const currentDayOfWeek = today.getDay();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - currentDayOfWeek);

          data.forEach((entry: { created_at: string }) => {
            const learningDate = new Date(entry.created_at);
            if (
              learningDate >= startOfWeek &&
              learningDate <= today
            ) {
              currentWeekLearningDays.add(
                learningDate.toDateString(),
              );
            }
          });
          setWeeklyLearningDays(currentWeekLearningDays.size);
        }
      }
    };
    fetchWeeklyLearningDays();
  }, [userInfo?.email]);

  useEffect(() => {
    const fetchLearningDates = async () => {
      if (userInfo?.email) {
        const { data, error } = await supabase
          .from("porch")
          .select("created_at")
          .eq("email", userInfo.email);

        if (error) {
          console.error(
            "Error fetching learning days from Supabase:",
            error,
          );
        } else {
          const formattedDate = data.map(
            (entry: { created_at: string }) => ({
              date: new Date(entry.created_at)
                .toISOString()
                .split("T")[0],
              count: 1,
            }),
          );
          setLearningDates(formattedDate);
        }
      }
    };
    fetchLearningDates();
  }, [userInfo?.email]);

  if (showUpdateGoals) {
    return (
      <div>
        <WeeklyGoalForm />
      </div>
    );
  }

  const containerStyle = {
    overflow: "hidden",
    transform: "translateZ(0)", // Trigger hardware acceleration
    willChange: "transform", // Optimize for potential changes
  };

  return (
    <div
      className="relative h-fit w-fit bg-blue-100 p-2 flex flex-col rounded-md"
      style={containerStyle}
    >
      <button
        className="absolute top-1 left-1 text-red-500 hover:text-red-700 text-3xl font-bold"
        style={{
          top: "-0.7rem",
          left: "-0.1rem",
          fontWeight: 900,
        }}
        onClick={() => setShowUserForm(false)}
      >
        &times;
      </button>
      <div className="border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl">
        <div className="flex flex-row justify-between align-baseline space-x-20">
          <h5 className="flex">Weekly Learning Goals</h5>
          <a onClick={() => setShowUpdateGoals(true)}>
            <p className="text-sm font-normal flex hover:underline">
              Edit Goal ➡️
            </p>
          </a>
        </div>
        <p className="font-bold text-4xl mt-4 flex justify-center">
          {weeklyLearningDays} / {weeklyGoal}
        </p>
        <p className="font-bold flex justify-center">days</p>
        <div className="flex justify-center">
          {weeklyLearningDays >= weeklyGoal ? (
            <p className="text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-green-400">
              Nice! 🚀
            </p>
          ) : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? (
            <p className="text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-yellow-400">
              On Track
            </p>
          ) : (
            <p className="text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-red-400">
              Off Track
            </p>
          )}
        </div>
        {weeklyLearningDays === weeklyGoal ? (
          <p className="flex justify-center text-xs mt-2">
            You hit your goal this week,
            <span className="font-bold pl-1">
              {" "}
              keep the momentum going!
            </span>
          </p>
        ) : (
          <p className="flex justify-center text-xs mt-2">
            To hit your goal this week, learn
            <span className="font-bold pl-1">
              {weeklyGoal} times!
            </span>
          </p>
        )}
      </div>
      <div className="border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl">
        <h5>🔥 Current Streak</h5>
        <p className="font-bold text-2xl mt-4">
          {currentStreak}
          <span className="font-normal text-sm uppercase pl-2 text-slate-800">
            days
          </span>
        </p>
        <div className="border mt-3 mb-1"></div>
        <div className="flex flex-row justify-between mb-2">
          <h4>✅ Longest Streak</h4>
          <p className="font-bold">{longestStreak}</p>
        </div>
      </div>
      <div className="border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl">
        <h5 className="mb-4">Learning Charts</h5>
        <Calendar learningDates={learningDates} />
      </div>
    </div>
  );
};

export default PorchUserDataForm;
