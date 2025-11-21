import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import supabase from "@/lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

type Props = { update: PorchType | null };

const PorchUpdatePage: NextPage<Props> = ({ update }) => {
  if (!update) {
    return (
      <main className="max-w-3xl px-6 py-16 mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Update not found</h1>
        <p className="mt-2 text-gray-600">
          The update you’re looking for doesn’t exist or was removed.
        </p>
        <div className="mt-6">
          <Link href="/porch" className="text-blue-700 hover:underline">
            ← Back to Porch
          </Link>
          <h1>Helloooooooooooooooooooooooooooooooo</h1>
        </div>
      </main>
    );
  }

  const email = update.email ?? update.name ?? "Student";
  const created = new Date(update.created_at);

  return (
    <>
      <Head>
        <title>{`Porch update by ${email}`}</title>
        <meta
          name="description"
          content={truncate(update.text ?? (update as any).content ?? "Learning update", 140)}
        />
        <meta property="og:title" content={`Porch update by ${email}`} />
        <meta
          property="og:description"
          content={truncate(update.text ?? (update as any).content ?? "Learning update", 140)}
        />
      </Head>

      <main className="max-w-3xl px-6 py-12 mx-auto">
        <Link href="/porch" className="text-sm text-gray-600 hover:underline">
          ← Back to Porch
        </Link>

        <article className="p-6 mt-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <header className="flex items-center gap-3">
            <Avatar name={email} avatarUrl={(update as any).avatar_url} />
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {email}
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <time dateTime={update.created_at}>{formatDate(created)}</time>
                {typeof (update as any).streak === "number" && (update as any).streak > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                    🔥 {(update as any).streak}-day streak
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="mt-5 prose prose-blue max-w-none">
            <p className="whitespace-pre-wrap">
              {update.text ?? (update as any).content ?? (update as any).title ?? "Learning update"}
            </p>
          </div>

          {Array.isArray((update as any).topics) && (update as any).topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {(update as any).topics.map((t: string) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-white to-gray-50 px-2.5 py-1 text-xs text-gray-800 border border-gray-200 shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  {t}
                </span>
              ))}
            </div>
          )}

          <footer className="flex items-center justify-between mt-6">
            <Link href="/porch" className="text-sm font-medium text-blue-700 hover:underline">
              View all updates
            </Link>
            {(update as any).username ? (
              <Link href={`/u/${(update as any).username}`} className="text-sm text-gray-500 hover:text-gray-700">
                Profile →
              </Link>
            ) : (
              <span />
            )}
          </footer>
        </article>
      </main>
    </>
  );
};

export default PorchUpdatePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = ctx.params?.id as string;

  // Try id first; if your table uses new_id, try that too.
  let update: PorchType | null = null;

  // Try primary id
  const { data: byId, error: e1 } = await supabase
    .from("porch")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (!e1 && byId) {
    update = byId as PorchType;
  } else {
    // Fallback to new_id
    const { data: byNewId } = await supabase
      .from("porch")
      .select("*")
      .eq("new_id", id)
      .limit(1)
      .maybeSingle();
    if (byNewId) update = byNewId as PorchType;
  }

  return { props: { update } };
};

/* helpers */

function formatDate(d: Date) {
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  return avatarUrl ? (
    <Image
      src={avatarUrl}
      alt={`${name} avatar`}
      width={40}
      height={40}
      className="object-cover w-10 h-10 rounded-full"
    />
  ) : (
    <div
      className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
      title={name}
    >
      {initials(name)}
    </div>
  );
}

function initials(name: string) {
  const label = name.includes("@") ? name.split("@")[0] : name;
  return label
    .split(/[.\s_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}
