import { useContext, useEffect, useState } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { Loader } from "@/components/ui/Loader";
import { NextPage } from "next";
import { format } from "date-fns";
import { LoginModal } from "@/components/Auth/LoginPopup";

const SubscriptionPage: NextPage = () => {
  const router = useRouter();
  const { userInfo } = useContext(UserInfoContext);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<{
    is_subscribed: boolean;
    interval: string | null;
    cancel_at: string | null;
    cancel_at_period_end: boolean | null;
  } | null>(null);
  
  useEffect(() => {
    if (userInfo === undefined) return; // Still loading context
    if (!userInfo) {
      setShowLogin(true);
      setLoading(false);
      return;
}

    const fetchSubscription = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("is_subscribed, interval, cancel_at, cancel_at_period_end")
        .eq("id", userInfo.id)
        .single();

      if (error) {
        console.error("❌ Error fetching subscription:", error);
        setSubscriptionData(null);
      } else {
        setSubscriptionData(data);
      }

      setLoading(false);
    };

    fetchSubscription();
  }, [userInfo]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-blue-500">
        <Loader title="Loading..." />
      </div>
    );
  }

  if (showLogin) {
    return <LoginModal isOpen={true} onClose={() => router.push("/")} />;
  }

  if (!subscriptionData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10 text-blue-500">
        <h1 className="text-2xl font-bold mb-2">Subscription</h1>
        <p className="text-gray-600">We couldn’t find your subscription info.</p>
      </div>
    );
  }

  const { is_subscribed, interval } = subscriptionData;
  const formattedDate =
  subscriptionData.cancel_at_period_end && subscriptionData.cancel_at
    ? format(new Date(subscriptionData.cancel_at), "PPP")
    : interval && interval !== "unlimited"
    ? format(new Date(interval), "PPP")
    : "Unlimited / Not Set";

      
  const handleCancelSubscription = async () => {
    setLoading(true); 
    const response = await fetch("/api/cancel-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userInfo?.id }),
    });

    if (response.ok) {
    // Refetch subscription to show cancel_at_period_end message
      const { data, error } = await supabase
        .from("profile")
        .select("is_subscribed, interval, cancel_at, cancel_at_period_end")
        .eq("id", userInfo?.id)
        .single();

      if (!error) {
        setSubscriptionData(data);
      }
    } else {
      console.error("❌ Error canceling subscription:", response);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-blue-500">
      <div className="border border-gray-200 rounded-lg shadow p-6 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">My Subscription</h1>

        <div className="space-y-6 text-center mt-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-blue-700">
              Status:{" "}
              {is_subscribed ? (
                <span className="text-green-600 font-bold">Active
                {subscriptionData.cancel_at_period_end && " (Cancels Soon)"}</span>
              ) : (
                <span className="text-red-500 font-bold">Inactive</span>
              )}
            </p>

            {is_subscribed && (
              <div className="mt-4">
                <button
                  onClick={handleCancelSubscription}
                  className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Subscription
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow">
            <p className="text-lg font-semibold text-blue-700">
              Valid Until:{" "}
              <span className="text-gray-700 font-medium">{formattedDate}</span>
            </p>
          </div>

          {subscriptionData.cancel_at_period_end && subscriptionData.cancel_at && (
              <div className="mt-4 bg-yellow-100 p-3 rounded-lg border border-yellow-300">
                <p className="text-yellow-800 font-medium">
                  ⚠️ Your subscription will end on{" "}
                  <span className="font-semibold">
                    {format(new Date(subscriptionData.cancel_at), "PPP")}
                  </span>
                </p>
              </div>
            )}


          <div className="pt-4">
            <a
              href="/programs"
              className="inline-block px-6 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition"
            >
              Explore Programs
            </a>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default SubscriptionPage;


