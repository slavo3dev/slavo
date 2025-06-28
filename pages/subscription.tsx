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
  } | null>(null);

  useEffect(() => {
    if (!userInfo) {
      setShowLogin(true); // Trigger login modal
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("is_subscribed, interval")
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
    interval && interval !== "unlimited"
      ? format(new Date(interval), "PPP")
      : "Unlimited / Not Set";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-blue-500">
      <div className="border border-gray-200 rounded-lg shadow p-6 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">My Subscription</h1>

        <div className="space-y-4 text-center">
          <p className="text-lg">
            <span className="font-semibold">Status:</span>{" "}
            {is_subscribed ? (
              <span className="text-green-500 font-semibold">Active</span>
            ) : (
              <span className="text-red-500 font-semibold">Inactive</span>
            )}
          </p>

          <p className="text-lg">
            <span className="font-semibold">Valid Until:</span>{" "}
            {formattedDate}
          </p>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/programs"
            className="inline-block px-6 py-2 text-sm font-medium text-blue-500 bg-white border border-blue-300 rounded hover:bg-blue-50"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
