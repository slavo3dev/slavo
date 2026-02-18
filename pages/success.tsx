import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { HeadBasePage } from "@components";

const Success: NextPage = () => {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <>
      <HeadBasePage
        title="Payment Successful | Slavo"
        description="Your payment was successful. Thank you for your purchase!"
        noIndex
      />
      <section className="flex flex-col bg-white justify-center items-center h-screen pt-20 pb-16 px-4 text-center">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold text-blue-500 mb-4">
              Payment Successful
            </h1>
            <p className="text-lg text-blueGray-600 mb-8">
              Thank you for your purchase! 🎉
              <br />
              {session_id && (
                <span className="text-sm text-blueGray-400">
                  (Session ID: {session_id})
                </span>
              )}
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;
