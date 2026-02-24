import React, { FC, useEffect, useMemo, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { Edit, Check, Link as LinkIcon, Mail } from "lucide-react";

type Porch = {
  source?: string | null;
  likes?: string[] | null;
  email?: string | null;
  new_id?: string | number | null;
};

interface CardLayoutProps {
  title: string;
  porch: Porch;

  displayComment: string;
  commentText: string;
  showMore: boolean;
  handleMore: () => void;

  handleVote: () => void;
  isUpdating: boolean;

  formattedDate?: string;
  isVoteDisabled: boolean;
  hasVoted: boolean;

  extraContent: React.ReactNode;
  isLoggedIn: boolean;

  submitChange?: (porchId: string, updatedText: string) => void;
  userEmail?: string | null;
}

export const CardLayout: FC<CardLayoutProps> = ({
  title,
  porch,
  displayComment,
  commentText,
  showMore,
  handleMore,
  handleVote,
  isUpdating,
  formattedDate,
  extraContent,
  isVoteDisabled,
  hasVoted,
  isLoggedIn,
  submitChange,
  userEmail,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempComment, setTempComment] = useState(commentText ?? "");

  // keep textarea in sync if commentText changes from parent (refetch, edit, etc.)
  useEffect(() => {
    if (!isEditing) setTempComment(commentText ?? "");
  }, [commentText, isEditing]);

  // ---- null-safe normalization (fixes your includes() crash + other edge cases)
  const safeSource = useMemo(
    () => (porch?.source ?? "").toString().trim(),
    [porch?.source],
  );
  const hasSource = safeSource.length > 0;
  const sourceHref = useMemo(() => {
    if (!hasSource) return "#";
    return safeSource.startsWith("http")
      ? safeSource
      : `https://${safeSource.replace(/^\/+/, "")}`;
  }, [hasSource, safeSource]);

  const safeLikes = useMemo(
    () => (Array.isArray(porch?.likes) ? porch.likes : []),
    [porch?.likes],
  );
  const likesCount = safeLikes.length;

  const safePorchId = useMemo(() => {
    const raw = porch?.new_id;
    if (raw === null || raw === undefined) return "";
    return String(raw);
  }, [porch?.new_id]);

  const safeCommentText = useMemo(
    () => (commentText ?? "").toString(),
    [commentText],
  );
  const shouldShowReadMore = !showMore && safeCommentText.length > 90;

  const isOwner = useMemo(() => {
    const porchEmail = (porch?.email ?? "").toString().toLowerCase();
    const me = (userEmail ?? "").toString().toLowerCase();
    return !!porchEmail && !!me && porchEmail === me;
  }, [porch?.email, userEmail]);

  const handleEditClick = () => {
    setTempComment(safeCommentText);
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    const next = (tempComment ?? "").toString().trim();
    if (submitChange && safePorchId) {
      submitChange(safePorchId, next);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 hover:bg-sky-100">
      <div className="flex-1 px-4 py-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <b className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800">
            {title}
          </b>

          {formattedDate ? (
            <p className="text-sm text-gray-500">{formattedDate}</p>
          ) : null}
        </div>

        {/* Meta box */}
        <div className="flex flex-col gap-1 mt-3 break-all bg-gray-200 border-4 border-gray-200 rounded-xl p-2">
          {/* email */}
          {porch?.email ? (
            <a
              href={`mailto:${porch.email}`}
              title={String(porch.email)}
              className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
            >
              <Mail size={14} />
              <span className="whitespace-normal">
                <b>User Email:</b> {porch.email}
              </span>
            </a>
          ) : null}

          {/* source (null-safe) */}
          {hasSource ? (
            <a
              href={sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
              title={safeSource}
            >
              <LinkIcon size={14} />
              <span className="whitespace-normal">
                <b>Source:</b> {safeSource}
              </span>
            </a>
          ) : (
            <p className="text-sm font-medium text-gray-500">
              <b>Source:</b>{" "}
              <span className="italic">Not provided</span>
            </p>
          )}

          {/* date row (don’t show “undefined”) */}
          {formattedDate ? (
            <p className="text-sm font-medium text-gray-900">
              <b>Date:</b>{" "}
              <span className="whitespace-normal">
                {formattedDate}
              </span>
            </p>
          ) : null}
        </div>

        {/* Comment + edit */}
        <div className="px-2 py-4 mt-auto border-gray-100 sm:px-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center w-full">
              {isEditing ? (
                <textarea
                  value={tempComment}
                  onChange={(e) => setTempComment(e.target.value)}
                  className="w-full min-h-[96px] p-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  placeholder="Write an update…"
                />
              ) : (
                <p className="pl-1 text-base font-medium text-gray-900 whitespace-pre-wrap">
                  {displayComment || "—"}
                  {shouldShowReadMore && (
                    <button
                      onClick={handleMore}
                      className="ml-2 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                      type="button"
                    >
                      read more
                    </button>
                  )}
                </p>
              )}
            </div>

            {isLoggedIn && isOwner && (
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <button
                    onClick={handleUpdateClick}
                    className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-green-600 hover:bg-green-50"
                    type="button"
                    title="Save"
                    disabled={!submitChange || !safePorchId}
                  >
                    <Check size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-blue-600 hover:bg-blue-50"
                    type="button"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Likes */}
        <div className="p-2">
          <p className="text-sm text-black">
            <b>Likes:</b> {likesCount}
          </p>

          <div className="flex justify-start">
            {isLoggedIn ? (
              <button
                onClick={handleVote}
                disabled={isUpdating || isVoteDisabled}
                className={`flex items-center justify-center mt-1 text-4xl transition-all duration-300 ${
                  isUpdating || isVoteDisabled
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                type="button"
                title={hasVoted ? "Remove like" : "Like"}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  {hasVoted ? (
                    <AiFillHeart className="w-5 h-5 text-red-400 transition-transform duration-300 transform scale-125 hover:scale-150 hover:rotate-12" />
                  ) : (
                    <GiCheckMark className="w-5 h-5 text-blue-500 transition-transform duration-300 transform scale-125 hover:scale-150 hover:rotate-12" />
                  )}
                </div>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {extraContent}
    </div>
  );
};
