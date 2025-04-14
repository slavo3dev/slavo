import { NextPage } from "next";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Cancel: NextPage = () => {
  return (
    <section className="flex flex-col bg-white justify-center items-center h-screen pt-20 pb-16 px-4 text-center">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Payment Canceled
          </h1>
          <p className="text-lg text-blueGray-600 mb-8">
            Your payment was canceled. If this was a mistake, feel free to try again.
          </p>
          <Link
            href="/programs"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
          >
            Back to Programs Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cancel;
