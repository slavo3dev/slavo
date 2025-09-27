"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import supabase from "lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

type Props = {
  isAuthenticated?: boolean;
  limit?: number;
  className?: string;
};

export default function PorchShowcase({
  isAuthenticated = false,
  limit = 6,
  className = "",
}: Props) {
  const [rows, setRows] = React.useState<PorchType[] | null>(null); // renamed from "data" to avoid shadowing
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data: result, error } = await supabase
          .from("porch")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);
        if (error) throw error;
        if (mounted) setRows(result as PorchType[]);
      } catch (e: any) {
        if (mounted) setError(e?.message ?? "Failed to load Porch updates");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [limit]);

  return (
    <section aria-labelledby="porch-showcase-heading" className={`relative ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <header className="mb-8">
          <h2 id="porch-showcase-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
            Porch: Public daily learning logs
          </h2>
          <p className="mt-2 max-w-2xl text-gray-600">
            See what students are learning right now. Visitors can <span className="font-medium">view</span>; members can{" "}
            <span className="font-medium">update</span> and keep a streak.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/porch"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              View all on Porch
            </Link>
            {isAuthenticated ? (
              <Link
                href="/porch#new"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Post your update
              </Link>
            ) : (
              <Link
                href="/login?next=/porch"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Sign in to track your progress
              </Link>
            )}
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl border border-gray-100 bg-gray-50" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        ) : rows && rows.length > 0 ? (
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((u) => (
              <li key={u.new_id ?? u.id ?? u.created_at} className="group">
                <article className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md focus-within:shadow-md">
                  <header className="flex items-center gap-3">
                    <Avatar name={u.name ?? u.email ?? "Student"} avatarUrl={u.avatar_url} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">{u.name ?? "Student"}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <time dateTime={u.created_at}>{timeAgo(new Date(u.created_at))}</time>
                        {typeof (u as any).streak === "number" && (u as any).streak > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                            🔥 {(u as any).streak}-day streak
                          </span>
                        )}
                      </div>
                    </div>
                  </header>

                  <p className="mt-3 line-clamp-3 text-sm text-gray-700">
                    {u.text ?? (u as any).content ?? (u as any).title ?? "Learning update"}
                  </p>

                  {Array.isArray((u as any).topics) && (u as any).topics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(u as any).topics.slice(0, 4).map((t: string) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-white to gray-50 px-2.5 py-1 text-xs text-gray-800 border border-gray-200 shadow-sm"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                          {t}
                        </span>
                      ))}
                      {(u as any).topics.length > 4 && (
                        <span className="text-xs text-gray-500">+{(u as any).topics.length - 4} more</span>
                      )}
                    </div>
                  )}

                  <footer className="mt-5 flex items-center justify-between">
                    <Link href={`/porch/${u.new_id ?? u.id ?? ""}`} className="text-sm font-medium text-blue-700 hover:underline">
                      View update
                    </Link>
                    {(u as any).username ? (
                      <Link href={`/u/${(u as any).username}`} className="text-sm text-gray-500 hover:text-gray-700">
                        Profile →
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400"> </span>
                    )}
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-700">
              No updates yet.{" "}
              {isAuthenticated ? (
                <Link href="/porch#new" className="font-medium text-blue-700 underline">
                  Post your first update
                </Link>
              ) : (
                <>
                  <Link href="/login?next=/porch" className="font-medium text-blue-700 underline">
                    Sign in
                  </Link>{" "}
                  to start tracking your progress.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* subcomponents */

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  return avatarUrl ? (
    <Image src={avatarUrl} alt={`${name} avatar`} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
  ) : (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700" title={name}>
      {initials(name)}
    </div>
  );
}

/* utils */

function timeAgo(date: Date) {
  const diff = (Date.now() - date.getTime()) / 1000;
  const mins = Math.floor(diff / 60);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}
