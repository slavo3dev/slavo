// components/PricingCard.tsx
import { FC, useContext } from "react";
import clsx from "clsx";
import { loadStripe } from "@stripe/stripe-js";
import UserInfoContext from "@/context/UserInfoContext";

interface PricingCardProps {
  id: number;
  name: string;
  priceId: string;
  price: {
    amount: number;
    currency: string;
  };
  features: string[];
  image: string;
  bgColor: string;
  textColor: string;
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const PricingCard: FC<PricingCardProps> = ({
  id,
  name,
  priceId,
  price,
  features,
  image,
  bgColor,
  textColor,
}) => {

  const { userInfo } = useContext(UserInfoContext)

  const handleCheckout = async (selectedPriceId: string) => {
    if (!userInfo?.id || !userInfo?.email) {
      alert("Please log in to continue.");
      return;
    }
  
    try {
      console.log("Sending to API:", {
        priceId: selectedPriceId,
        userId: userInfo.id,
        email: userInfo.email,
      });
  
      const response = await fetch("/api/checkout-sessions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: selectedPriceId,
          userId: userInfo.id,
          email: userInfo.email,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error("Checkout error:", error);
        alert("Failed to initiate checkout.");
        return;
      }
  
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
  
      if (!stripe) {
        console.error("Stripe.js failed to load.");
        return;
      }
  
      await stripe.redirectToCheckout({ sessionId });
  
    } catch (err) {
      console.error("Unexpected error during checkout:", err);
      alert("Something went wrong during checkout.");
    }
  };
  

  const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
      <div className={clsx("hover-up-5 border border-gray-200 pt-16 pb-8 px-4 text-center rounded flex flex-col h-full", bgColor, textColor)}>
        <img src={image} alt={name} className="h-20 mb-6 mx-auto" />
        <h3 className="mb-2 text-4xl font-bold font-heading">{name}</h3>
        <span className="text-4xl font-bold font-heading">{formatCurrency(price.amount, price.currency)}
        </span>
        <p className="mt-2 mb-8">per month</p>
        <div className="flex flex-col items-center mb-8">
          <ul className="w-full">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start mb-3">
                <svg
                  className="w-6 h-6 min-w-[24px] min-h-[24px] flex-shrink-0 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="ml-2 text-left">{feature}</span>
              </li>
            ))}
          </ul>
          <div>
            <div className="flex flex-col sm:flex-row w-full gap-2">
              <a
                className={`flex-1 flex items-center justify-center py-2 px-6 text-xs rounded font-semibold text-center, ${id % 2 === 0 ? "text-blue-500 bg-white border border-gray-200 hover:bg-gray-200" : "text-white bg-blue-400 hover:bg-blue-200"}`}
                href="#"
              >
                Learn More...
              </a>
              <button
                onClick={() => handleCheckout(priceId)}
                className={`flex-1 flex items-center justify-center py-2 px-6 text-xs rounded font-semibold text-center ${id % 2 === 0 ? "text-white bg-blue-400 hover:bg-blue-200" : "text-blue-500 bg-white border border-gray-200 hover:bg-gray-200"}`}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
