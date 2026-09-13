import { FC } from "react";
import Link from "next/link";

export const WhoItsFor: FC = () => {
  return (
    <section aria-labelledby="who-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2
          id="who-heading"
          className="text-3xl text-[#18342c] sm:text-4xl"
        >
          Wherever you’re starting, start here.
        </h2>
        <p className="mt-3 max-w-2xl text-[#596a63]">
          A grounded way to learn web development, whether you’re opening your
          first code editor or ready to turn your skills into a new career.
        </p>
        <ul className="mt-7 grid grid-cols-1 gap-3 text-sm text-[#263b33] sm:grid-cols-2 lg:grid-cols-3">
          <li className="rounded-md border border-[#e1e8e1] bg-[#fffdf7] p-4">
            You’re learning to code for the first time
          </li>
          <li className="rounded-md border border-[#e1e8e1] bg-[#fffdf7] p-4">
            You’re changing careers or returning after a break
          </li>
          <li className="rounded-md border border-[#e1e8e1] bg-[#fffdf7] p-4">
            You’re self-taught and want a clearer direction
          </li>
          <li className="rounded-md border border-[#e1e8e1] bg-[#fffdf7] p-4">
            You want to build and ship your own projects
          </li>
          <li className="rounded-md border border-[#e1e8e1] bg-[#fffdf7] p-4">
            You need a practice rhythm that fits real life
          </li>
          <li className="rounded-md border border-[#e1e8e1] bg-[#fffdf7] p-4">
            You learn better with feedback and accountability
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="#programs"
            className="font-semibold text-[#13745e] hover:underline"
          >
            See programs →
          </Link>
        </div>
      </div>
    </section>
  );
};
