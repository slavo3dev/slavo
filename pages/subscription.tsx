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
  //const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<{
    is_subscribed: boolean;
    interval: string | null;
    cancel_at: string | null;
    cancel_at_period_end: boolean | null;
  } | null>(null);
  
  useEffect(() => {
    if (userInfo === undefined) return; 
    if (!userInfo) {
      setShowLogin(true);
      //setLoading(false);
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

      //setLoading(false);
    };

    fetchSubscription();
  }, [userInfo]);

  //if (loading) {
    //return (
      //<div className="min-h-[40vh] flex items-center justify-center text-blue-500">
        //<Loader title="Loading..." />
      //</div>
    //);
  //}

  if (showLogin) {
    return <LoginModal isOpen={true} onClose={() => router.push("/")} />;
  }

  if (!subscriptionData) {
    return (
      <div className="max-w-2xl py-10 mx-auto text-center text-blue-500">
        <h1 className="mb-2 text-2xl font-bold">Subscription</h1>
        <p className="text-gray-600">We couldn’t find your subscription info.</p>
      </div>
    );
  }

  const { is_subscribed, interval } = subscriptionData;
  const formattedDate =
  subscriptionData.cancel_at_period_end && subscriptionData.cancel_at
    ? format(new Date(subscriptionData.cancel_at), "PPP")
    : interval === null
    ? "Not set"
    : interval === "unlimited"
    ? "Unlimited access"
    : format(new Date(interval), "PPP");


      
  const handleCancelSubscription = async () => {
  //setLoading(true);

  const response = await fetch("/api/cancel-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userInfo?.id }),
  });

  if (response.ok) {
    let estimatedCancelDate: string | null = null;

    if (subscriptionData?.interval && subscriptionData.interval !== "unlimited") {
      const parsedInterval = new Date(subscriptionData.interval);
      estimatedCancelDate = parsedInterval.toISOString();
    }
    
    setSubscriptionData((prev) => ({
      ...prev!,
      cancel_at_period_end: true,
      cancel_at: estimatedCancelDate,
    }));
  } else {
    console.error("❌ Error canceling subscription:", response);
  }

  //setLoading(false);
};


  return (
    <div className="max-w-2xl px-4 py-10 mx-auto text-blue-500">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h1 className="mb-4 text-3xl font-bold text-center">My Subscription</h1>
        <div className="mt-6 space-y-6 text-center">
          <div className="p-4 rounded-lg shadow-sm bg-blue-50">
            <p className="text-lg font-semibold text-blue-700">
              Status:{" "}
              {is_subscribed ? (
                <span className="font-bold text-green-600">Active
                {subscriptionData.cancel_at_period_end && " (Cancels Soon)"}</span>
              ) : (
                <span className="font-bold text-red-500">Inactive</span>
              )}
            </p>

            {is_subscribed && interval !== "unlimited" && (
              <div className="mt-4">
                <button
                  onClick={handleCancelSubscription}
                  disabled={!!subscriptionData?.cancel_at_period_end}
                  className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition
                    ${subscriptionData?.cancel_at_period_end
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                  {subscriptionData?.cancel_at_period_end
                    ? "Cancellation Scheduled" : "Cancel Subscription"}
                </button>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border border-gray-100 rounded-lg shadow">
            <p className="text-lg font-semibold text-blue-700">
              Valid Until:{" "}
              <span className="font-medium text-gray-700">{formattedDate}</span>
            </p>
          </div>

          {subscriptionData.cancel_at_period_end && subscriptionData.cancel_at && (
              <div className="p-3 mt-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="font-medium text-yellow-800">
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
              className="inline-block px-6 py-2 text-sm font-medium text-blue-600 transition border border-blue-300 rounded-lg hover:bg-blue-50"
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


