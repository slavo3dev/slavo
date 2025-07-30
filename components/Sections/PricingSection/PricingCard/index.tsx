import { FC, useContext, useEffect, useState } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { formatCurrency } from "@/lib/formatCurrecny";
import { handleCheckout } from "@/lib/handleCheckout";
import Link from "next/link";
import supabase from "@/lib/supabase";

interface PricingCardProps {
  id: string;
  name: string;
  priceId: string;
  price: {
    amount: number;
    currency: string;
    recurring: string | null;
  };
  features: string[];
  image: string;
}

export const PricingCard: FC<PricingCardProps> = ({
  id,
  name,
  priceId,
  price,
  features,
  image,
}) => {

  const [interval, setInterval] = useState<string | null>(null);

  const { userInfo } = useContext(UserInfoContext)

 
  const onCheckout = () => {
    if (!userInfo) {
      alert("Please log in to continue.");
      return;
    }

    handleCheckout({
      priceId,
      userId: userInfo.id!,
      email: userInfo.email!,
    });
  };  
   
  useEffect(() => {
    const fetchInterval = async () => {
      if (!userInfo) return;

      const { data } = await supabase
        .from("profile")
        .select("interval")
        .eq("id", userInfo.id)
        .single();
      
        setInterval(data?.interval ?? null);
    }
    fetchInterval();
  },[])     

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
      <div className="hover-up-5 border border-gray-200 pt-16 pb-8 px-4 text-center rounded flex flex-col h-full bg-white text-blue-500">
        <img src={image} alt={name} className="h-20 mb-6 mx-auto" />
        <h3 className="mb-2 text-4xl font-bold font-heading">{name}</h3>
        <span className="text-4xl font-bold font-heading">{formatCurrency(price.amount, price.currency)}
        </span>
        <p className="mt-2 mb-8">
           {price.recurring ? `per ${price.recurring}` : "One-time payment"}
        </p>
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
              <Link
                className="flex-1 flex items-center justify-center py-2 px-6 text-xs rounded font-semibold text-center text-blue-500 bg-white border border-gray-200 hover:bg-gray-200"
                href={`/programs/${id}`}
              >
                Learn More...
              </Link>
              <button
                disabled={interval !== null}
                onClick={onCheckout}
                className={`flex-1 flex items-center justify-center py-2 px-6 text-xs rounded font-semibold text-center ${interval === null ? "text-white bg-blue-400 hover:bg-blue-200" : "text-gray-400 bg-gray-200 cursor-not-allowed"}`}
              >
                {interval === null ? "Purchase" : "Already have access"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};