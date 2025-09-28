import { FC } from "react";
import Link from "next/link";


export const FreeResourcesTeaser: FC = () => {
  return (
    <section aria-labelledby="free-heading" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 id="free-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
          Get started for free
        </h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Browse playbooks, templates, and guides. Visitors can explore; members can save items to Porch.
        </p>
        <div className="mt-6">
          <Link href="/free-resources" className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Explore free resources
          </Link>
        </div>
      </div>
    </section>
  );
}