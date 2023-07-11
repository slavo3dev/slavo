/* eslint-disable indent */
import { FC } from "react";
import Link from "next/link";

export const Solution: FC = () => {
  return (
    <div className="flex flex-col bg-white justify-center items-center h-full p-8">
      <section className="py-20" id="how-we-work">
        <div className="container overflow-hidden">
          <div className="flex flex-wrap -mx-8">
            <div className="w-full lg:w-1/2 px-8">
              <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
                <h2
                  className="mb-4 text-3xl lg:text-4xl font-bold font-heading max-w-md wow animate__animated animate__fadeIn"
                  data-wow-delay=".1s"
                >
                  Commit<span className="text-blue-600"> to</span>{" "}
                  Your Personal Growth.
                </h2>
                <p
                  className="mb-8 leading-loose text-blueGray-400 wow animate__animated animate__fadeIn"
                  data-wow-delay=".3s"
                >
                  Are you caught in a career rut? <br /> Enthralled by
                  the world of technology but uncertain how to pivot?{" "}
                  <br /> With our exclusive mentorship program, let's
                  convert your passion into your new reality.
                  <br />
                  <strong>
                    Revamp. Recharge. Reinvent.
                    <br /> Picture yourself as a successful Software
                    Engineer - flexible work arrangements, a thriving
                    income, the fulfillment of creating solutions that
                    impact lives, and the pride of being part of the
                    technology frontier. Your journey to transform
                    your career and life starts here. Embrace the
                    future with us today!
                  </strong>
                </p>
                <Link href="/contact">
                  <a
                    className="inline-block text-xs py-4 px-8 text-white font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded hover-up-2 wow animate__animated animate__fadeIn"
                    data-wow-delay=".5s"
                  >
                    Contact
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-8">
              <ul className="space-y-12 p-0">
                <li
                  className="flex flex-col md:flex-row -mx-4 wow animate__animated animate__fadeIn"
                  data-wow-delay=".3s"
                >
                  <div className="px-4 mr-auto">
                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                      1
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold">
                      Habit & Learning Development
                    </h3>
                    <p className="text-blueGray-400 leading-loose">
                      Team up with a dedicated mentor to recognize
                      your unique skills and interests. We'll fuel
                      your fascination for technology, fostering a
                      solid habit of continuous learning, which will
                      empower you as a future software engineer and
                      enhance your problem-solving skills and creative
                      thinking in everyday life.
                    </p>
                  </div>
                </li>
                <li
                  className="flex flex-col md:flex-row -mx-4 wow animate__animated animate__fadeIn"
                  data-wow-delay=".5s"
                >
                  <div className="px-4 mr-auto">
                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                      2
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold">
                      Plan
                    </h3>
                    <p className="text-blueGray-400 leading-loose">
                      Create a personalized learning pathway toward
                      becoming a Software Engineer. With your mentor's
                      guidance, delve into programming languages,
                      comprehend algorithms, and master crucial
                      software development methodologies - all
                      carefully aligned with your career ambitions.
                    </p>
                  </div>
                </li>
                <li
                  className="flex flex-col md:flex-row -mx-4 wow animate__animated animate__fadeIn"
                  data-wow-delay=".7s"
                >
                  <div className="px-4 mr-auto">
                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                      3
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold">
                      Act
                    </h3>
                    <p className="text-blueGray-400 leading-loose">
                      Bring your plan to life! Construct real-world
                      projects, contribute to open-source platforms,
                      and enrich your portfolio. As you evolve into a
                      proficient Software Engineer, you'll also enjoy
                      the flexibility, fulfillment, and endless
                      opportunities this profession brings. Your
                      mentor will offer consistent support, guidance,
                      and feedback throughout this transformative
                      journey.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
