import { FC } from "react";
import Link from "next/link";

export const WhoItsFor: FC = () => {
  return (
    <section aria-labelledby="who-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2
          id="who-heading"
          className="text-2xl sm:text-3xl font-bold text-gray-900"
        >
          Who it’s for
        </h2>
        <p className="mt-3 max-w-2xl text-gray-600">
          Beginners, self-taught developers, career switchers, and
          builders who want to learn web development with consistency
          and real progress.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-gray-800">
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            Launch and grow offers
          </li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            Ship MVPs and go-to-market
          </li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            Build audience & products
          </li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            Design office-free careers
          </li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            Break career plateaus
          </li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            Stay consistent with Porch
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="#programs"
            className="text-blue-700 font-semibold hover:underline"
          >
            See programs →
          </Link>
        </div>
      </div>
    </section>
  );
};
