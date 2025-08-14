import { useState, useEffect, useContext, useMemo, ChangeEvent } from 'react';
import UserInfoContext from '@/context/UserInfoContext';
import supabase from '@/lib/supabase';
import { Calendar } from '@/components/PorchElements/Calendar';
import { NextPage } from 'next';

const Dashboard: NextPage = () => {
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<number>(1);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [weeklyLearningDays, setWeeklyLearningDays] = useState<number>(0);
  const [learningDates, setLearningDates] = useState<{ date: string; count: number }[]>([]);
  const [loadingGoal, setLoadingGoal] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);
  const { userInfo } = useContext(UserInfoContext);

  const fetchUserAndLearningData = async () => {
    if (!userInfo?.email) return;
    try {
      const response = await fetch(`/api/getUserActivity?email=${encodeURIComponent(userInfo.email)}`);
      const { userActivityData, learningData } = await response.json();

      if (userActivityData?.weekly_goal) {
        setWeeklyGoal(userActivityData.weekly_goal);
        setSelectedGoal(userActivityData.weekly_goal);
      }
      setLongestStreak(userActivityData?.longest_streak ?? 0);

      if (learningData?.length) {
        calculateStreaks(learningData);
        calculateWeeklyLearningDays(learningData);
        setLearningDates(
          learningData.map((entry: { created_at: string }) => ({
            date: new Date(entry.created_at).toISOString().split('T')[0],
            count: 1,
          }))
        );
      } else {
        setCurrentStreak(0);
        setWeeklyLearningDays(0);
        setLearningDates([]);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoadingGoal(false);
    }
  };

  const calculateStreaks = (data: { created_at: string }[]) => {
    let current = 0;
    let longest = 0;
    let last: Date | null = null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const uniqueDates = Array.from(new Set(
      data.map(entry => {
        const d = new Date(entry.created_at);
        d.setHours(0, 0, 0, 0);
        return d.toISOString().split('T')[0];
      })
    )).sort();

    const sorted = uniqueDates.map(date => new Date(date));

    sorted.forEach(date => {
      if (!last) {
        current = 1;
        last = date;
        return;
      }
      const diff = Math.floor((date.getTime() - last.getTime()) / (1000 * 3600 * 24));
      current = diff === 1 ? current + 1 : 1;
      longest = Math.max(longest, current);
      last = date;
    });

    const diffToToday = last ? Math.floor((today.getTime() - (last as Date).getTime()) / (1000 * 3600 * 24)) : 0;
    if (diffToToday > 1) current = 0;

    setCurrentStreak(current);
    setLongestStreak(longest);
  };

  const calculateWeeklyLearningDays = (data: { created_at: string }[]) => {
    const today = new Date();
    const day = today.getDay();
    const offset = day === 0 ? 6 : day - 1;
    const start = new Date(today);
    start.setDate(today.getDate() - offset);
    start.setHours(0, 0, 0, 0);
    today.setHours(23, 59, 59, 999);

    const days = new Set<string>();
    data.forEach(({ created_at }) => {
      const d = new Date(created_at);
      if (d >= start && d <= today) days.add(d.toDateString());
    });

    setWeeklyLearningDays(days.size);
  };

  const getRemainingDaysInWeek = (): number => {
    const today = new Date();
    let dayOfWeek = today.getDay();
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    return 8 - dayOfWeek;
  };

  const handleGoalSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGoal(Number(e.target.value));
  };

  const saveNewGoal = async () => {
    if (!userInfo?.email) return;

    try {
      const response = await fetch(`/api/getUserActivity?email=${encodeURIComponent(userInfo.email)}`);
      const { userActivityData } = await response.json();

      if (userActivityData) {
        await fetch('/api/updateUserActivity', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userInfo.email, weekly_goal: selectedGoal }),
        });
      } else {
        await supabase.from('user_activity').insert([{ user_email: userInfo.email, weekly_goal: selectedGoal }]);
      }

      setWeeklyGoal(selectedGoal);
      setNotification('✅ Weekly goal updated!');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error("Error updating weekly goal:", err);
    }
  };

  useEffect(() => {
    fetchUserAndLearningData();
  }, [userInfo?.email]);

  const memoizedLearningDates = useMemo(() => learningDates, [learningDates]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
     

      <h2 className="text-2xl font-semibold mb-6">Your Weekly Learning Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
        <div className="flex flex-col space-y-6">
          <div className="border p-4 rounded-md bg-white shadow">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Weekly Learning Goals</h3>
            </div>
            <p className="text-4xl font-bold text-center my-4">
              {weeklyLearningDays} / {weeklyGoal}
            </p>
            <p className="text-center font-semibold text-sm">
              {weeklyLearningDays >= weeklyGoal ? 'Nice! 🚀' : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? 'On Track' : 'Off Track'}
            </p>
            <p className="text-center text-xs mt-2">
              {weeklyLearningDays === weeklyGoal ? (
                <>You hit your goal this week, <span className="font-bold">keep the momentum going!</span></>
              ) : (
                <>To hit your goal, learn <span className="font-bold">{weeklyGoal} times!</span></>
              )}
            </p>
          </div>

          <div className="border p-4 rounded-md bg-white shadow">
            <h3 className="text-lg font-semibold mb-4">Current Streak</h3>
            <p className="text-2xl font-bold">
              {currentStreak} <span className="text-sm font-normal text-gray-600">days</span>
            </p>
            <div className="mt-4 flex justify-between">
              <span className="text-sm">✅ Longest Streak</span>
              <span className="font-semibold text-sm">{longestStreak}</span>
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-md bg-white shadow h-full">
          <h3 className="text-lg font-semibold mb-4">Learning Calendar</h3>
          <Calendar learningDates={memoizedLearningDates} />
        </div>
      </div>

      <div className="mt-10 border p-4 rounded-md bg-white shadow w-full">
        <h3 className="text-lg font-semibold mb-4">Update Your Weekly Goal</h3>
        <label htmlFor="weekly-goal" className="font-semibold text-sm mb-2 block">New Goal</label>
        <div className="flex items-center mb-4">
          <select
            name="weekly-goal"
            id="weekly-goal"
            className="border rounded p-2"
            value={selectedGoal}
            onChange={handleGoalSelect}
          >
            {Array.from({ length: getRemainingDaysInWeek() }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <span className="pl-2 text-sm">days/week</span>
        </div>
        <button
          type="button"
          onClick={saveNewGoal}
          className="border bg-blue-200 text-sm rounded-full px-3 py-1 hover:bg-opacity-80"
        >
          Save Weekly Goal
        </button>
      </div>
       {notification && (
        <div className="mb-4 px-4 py-2 text-sm text-white bg-green-500 rounded shadow-md">
          {notification}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
