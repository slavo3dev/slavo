import Link from "next/link";

export function SeoTextBlock() {
  return (
    <section aria-labelledby="seo-intro" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="max-w-3xl text-gray-700 leading-7 text-base">
          <h2
            id="seo-intro"
            className="text-xl font-semibold text-gray-900"
          >
            Learn web development with structure, not overwhelm
          </h2>

          <p className="mt-3">
            Most people fail at learning to code because they don’t
            have a clear plan, feedback, or consistency. Slavo.io is
            built around a simple system: pick a goal, follow a
            roadmap, and track progress daily.
          </p>

          <p className="mt-3">
            Whether you’re starting from zero or returning after a
            break, you’ll get guidance on what to learn next (HTML,
            CSS, JavaScript, React), how to practice, and how to ship
            projects that actually build confidence.
          </p>

          <p className="mt-3">
            Start with the{" "}
            <Link
              href="/free-resources"
              className="text-blue-700 font-semibold hover:underline"
            >
              free web development resources
            </Link>{" "}
            or join the{" "}
            <Link
              href="/programs"
              className="text-blue-700 font-semibold hover:underline"
            >
              web development mentorship programs
            </Link>{" "}
            for a custom roadmap, accountability, and support.
          </p>

          <p className="mt-3">
            Want motivation and consistency? Use{" "}
            <Link
              href="/porch"
              className="text-blue-700 font-semibold hover:underline"
            >
              Porch
            </Link>{" "}
            to track your learning streaks and share progress with
            others.
          </p>
        </div>
      </div>
    </section>
  );
}
