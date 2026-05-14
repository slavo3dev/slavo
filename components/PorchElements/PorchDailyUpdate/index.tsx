import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  Check,
  Edit,
  Link as LinkIcon,
  Mail,
  Save,
  X,
  Heart,
} from "lucide-react";

import UserInfoContext from "@/context/UserInfoContext";
import { CommentsFetcher } from "@/components/CommentsFetcher";
import supabase from "@/lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

interface PorchDailyUpdateProps {
  porch: PorchType;
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
}

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};

export const PorchDailyUpdate: React.FC<PorchDailyUpdateProps> = ({
  porch,
  setPorchs,
}) => {
  const { userInfo } = useContext(UserInfoContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textUpdate, setTextUpdate] = useState(porch.text || "");

  const userEmail = userInfo?.email;
  const likes = Array.isArray(porch.likes) ? porch.likes : [];
  const likesCount = likes.length;
  const isOwner =
    !!userEmail &&
    !!porch.email &&
    userEmail.toLowerCase() === porch.email.toLowerCase();

  const formattedDate = useMemo(
    () => formatDate(porch.created_at),
    [porch.created_at],
  );

  const safeSource = useMemo(
    () => (porch.source || "").toString().trim(),
    [porch.source],
  );

  const sourceHref = useMemo(() => {
    if (!safeSource) return "";

    return safeSource.startsWith("http")
      ? safeSource
      : `https://${safeSource.replace(/^\/+/, "")}`;
  }, [safeSource]);

  const commentText = porch.text || "";
  const displayComment =
    showMore || commentText.length <= 180
      ? commentText
      : `${commentText.slice(0, 180)}...`;

  useEffect(() => {
    if (userInfo?.email) {
      setHasVoted(likes.includes(userInfo.email));
    } else {
      setHasVoted(false);
    }
  }, [userInfo?.email, porch.likes]);

  useEffect(() => {
    if (!isEditing) {
      setTextUpdate(porch.text || "");
    }
  }, [porch.text, isEditing]);

  const handleVote = async () => {
    if (!userInfo?.email || isUpdating) return;

    setIsUpdating(true);

    try {
      let updatedLikes = [...likes];

      if (hasVoted) {
        updatedLikes = updatedLikes.filter(
          (email) => email !== userInfo.email,
        );
      } else {
        updatedLikes.push(userInfo.email);
      }

      const { error } = await supabase
        .from("porch")
        .update({ likes: updatedLikes })
        .eq("new_id", porch.new_id);

      if (error) {
        console.error("Error updating likes:", error);
        alert("Failed to update likes. Please try again.");
        return;
      }

      setPorchs((porchs) =>
        porchs.map((p) =>
          p.new_id === porch.new_id
            ? { ...p, likes: updatedLikes }
            : p,
        ),
      );

      setHasVoted(!hasVoted);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const submitChange = async () => {
    const nextText = textUpdate.trim();

    if (!nextText) return;

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from("porch")
        .update({ text: nextText })
        .eq("new_id", porch.new_id);

      if (error) {
        console.error("Error updating porch:", error);
        alert("Failed to update. Please try again.");
        return;
      }

      setPorchs((prevPorchs) =>
        prevPorchs.map((p) =>
          p.new_id === porch.new_id ? { ...p, text: nextText } : p,
        ),
      );

      setIsEditing(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <article className="rounded-3xl border border-blue-100 bg-blue-50/70 p-4 shadow-sm transition hover:shadow-md sm:p-6">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-bold text-blue-700">
            Daily Update
          </p>
          {formattedDate ? (
            <p className="mt-1 text-sm font-medium text-slate-500">
              {formattedDate}
            </p>
          ) : null}
        </div>

        {isOwner ? (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={submitChange}
                  disabled={isUpdating || !textUpdate.trim()}
                  className="inline-flex items-center gap-1 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={16} />
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTextUpdate(porch.text || "");
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <X size={16} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1 rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <Edit size={16} />
                Edit
              </button>
            )}
          </div>
        ) : null}
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="space-y-2 rounded-2xl bg-slate-100 p-4 text-sm text-slate-800">
          {porch.email ? (
            <p className="flex items-start gap-2">
              <Mail
                size={17}
                className="mt-0.5 shrink-0 text-slate-600"
              />
              <span>
                <b>User Email:</b> {porch.email}
              </span>
            </p>
          ) : null}

          {safeSource ? (
            <p className="flex items-start gap-2">
              <LinkIcon
                size={17}
                className="mt-0.5 shrink-0 text-slate-600"
              />
              <span className="min-w-0">
                <b>Source:</b>{" "}
                <a
                  href={sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  {safeSource}
                </a>
              </span>
            </p>
          ) : null}

          {formattedDate ? (
            <p>
              <b>Date:</b> {formattedDate}
            </p>
          ) : null}
        </div>

        <div className="mt-5">
          {isEditing ? (
            <textarea
              value={textUpdate}
              onChange={(e) => setTextUpdate(e.target.value)}
              className="min-h-[120px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Write your update..."
            />
          ) : (
            <p className="whitespace-pre-wrap text-base leading-7 text-slate-900">
              {displayComment || "—"}

              {!showMore && commentText.length > 180 ? (
                <button
                  type="button"
                  onClick={() => setShowMore(true)}
                  className="ml-2 font-semibold text-blue-700 hover:underline"
                >
                  Read more
                </button>
              ) : null}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-800">
          Likes: {likesCount}
        </div>

        {userInfo?.email ? (
          <button
            type="button"
            onClick={handleVote}
            disabled={isUpdating}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
              hasVoted
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-blue-50"
            }`}
          >
            {hasVoted ? <Heart size={17} /> : <Check size={17} />}
            {hasVoted ? "Liked" : "Like"}
          </button>
        ) : null}
      </div>

      <div className="mt-5">
        <CommentsFetcher
          sourceId={porch.new_id}
          getRoute="getPorchComments"
          postRoute="postPorchComments"
        />
      </div>
    </article>
  );
};
