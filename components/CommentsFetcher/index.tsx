import {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useMemo,
} from "react";
import useSWR from "swr";
import DOMPurify from "dompurify";
import {
  Edit,
  Trash2,
  MessageSquare,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

import UserInfoContext from "context/UserInfoContext";
import { CommentsError } from "lib/err/err";
import { CommentsPopup } from "../CommentsPopup";

interface Comment {
  id?: string;
  userInfo: string;
  message: string;
  sourceId: number | string;
}

interface CommentsProps {
  sourceId: number | string;
  getRoute: "getPorchComments" | "getComments";
  postRoute: "postPorchComments" | "postComments";
}

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
};

const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;

export const CommentsFetcher = ({
  sourceId,
  getRoute,
  postRoute,
}: CommentsProps) => {
  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;

  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingComment, setEditingComment] =
    useState<Comment | null>(null);
  const [showComments, setShowComments] = useState(false);

  const {
    data: postComments = [],
    mutate,
    isValidating,
  } = useSWR<Comment[]>(
    sourceId ? `/api/${getRoute}?sourceId=${sourceId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const wordLimit = 96;
  const wordCount = useMemo(() => countWords(comment), [comment]);
  const commentsCount = postComments?.length ?? 0;

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setComment(value);

    if (!value.trim()) {
      setError("");
      return;
    }

    const words = countWords(value);

    if (words > wordLimit) {
      setError(CommentsError.wordLimitError);
      return;
    }

    setError("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError(CommentsError.onSubmitError);
      return;
    }

    if (countWords(comment) > wordLimit) {
      setError(CommentsError.wordLimitError);
      return;
    }

    if (!userEmail) {
      setError(CommentsError.notLoggedInError);
      return;
    }

    const newComment: Comment = {
      userInfo: userEmail,
      message: comment,
      sourceId,
    };

    try {
      setError("");
      setSuccessMessage("");

      const res = await fetch(`/api/${postRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      const data = await res.json();
      const savedComment = data.payload;

      await mutate([...(postComments ?? []), savedComment], false);

      setComment("");
      setSuccessMessage("Comment submitted!");
      setShowComments(true);
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  const toggleComments = () => {
    setShowComments((value) => !value);
    setSuccessMessage("");
    setError("");
  };

  const handleEditComment = (selectedComment: Comment) => {
    if (!userEmail) {
      setError(CommentsError.notLoggedInError);
      return;
    }

    if (selectedComment.userInfo !== userEmail) {
      setError("You can only edit your own comments.");
      return;
    }

    setEditingComment(selectedComment);
    setError("");
    setSuccessMessage("");
  };

  const saveEditedComment = async (updatedMessage: string) => {
    if (!editingComment?.id) return;

    try {
      const res = await fetch(
        `/api/${postRoute}?id=${editingComment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: updatedMessage }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update comment");
      }

      const updatedComments = (postComments ?? []).map((item) =>
        item.id === editingComment.id
          ? { ...item, message: updatedMessage }
          : item,
      );

      await mutate(updatedComments, false);

      setSuccessMessage("Comment updated!");
      setEditingComment(null);
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const commentToDelete = (postComments ?? []).find(
      (item) => item.id === commentId,
    );

    if (!commentToDelete) return;

    if (!userEmail) {
      setError(CommentsError.notLoggedInError);
      return;
    }

    if (commentToDelete.userInfo !== userEmail) {
      setError("You can only delete your own comments.");
      return;
    }

    try {
      const res = await fetch(`/api/${postRoute}?id=${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }

      await mutate(
        (postComments ?? []).filter((item) => item.id !== commentId),
        false,
      );

      setSuccessMessage("Comment deleted!");
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={toggleComments}
        className="inline-flex items-center gap-3 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <MessageSquare size={20} />

        <span>
          {showComments ? "Hide comments" : "Show comments"}
        </span>

        <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
          {commentsCount}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform ${showComments ? "rotate-180" : ""}`}
        />
      </button>

      {showComments ? (
        <div className="mt-4 space-y-4">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <textarea
                value={comment}
                onChange={onChange}
                placeholder="Write your comment..."
                rows={3}
                className="min-h-[96px] flex-1 resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />

              <div className="flex gap-2 sm:flex-col">
                <button
                  type="submit"
                  disabled={!!error || !comment.trim()}
                  className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Submit comment"
                >
                  <Check size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setComment("");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-slate-700 transition hover:bg-slate-50"
                  aria-label="Clear comment"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="text-slate-500">
                {wordCount}/{wordLimit} words
              </span>

              <span>
                {isValidating ? (
                  <span className="text-slate-400">
                    Refreshing comments...
                  </span>
                ) : null}
              </span>

              {(error || successMessage) && (
                <span
                  className={
                    error ? "text-red-600" : "text-green-600"
                  }
                >
                  {error || successMessage}
                </span>
              )}
            </div>
          </form>

          <div className="space-y-3">
            {(postComments ?? []).length > 0 ? (
              (postComments ?? []).map((item) => {
                const canEdit =
                  userEmail && item.userInfo === userEmail;

                return (
                  <div
                    key={
                      item.id ?? `${item.userInfo}-${item.sourceId}`
                    }
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {item.userInfo}
                        </p>
                      </div>

                      {canEdit ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditComment(item)}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Edit comment"
                          >
                            <Edit size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteComment(item.id || "")
                            }
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Delete comment"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : null}
                    </div>

                    <div
                      className="prose prose-sm mt-2 max-w-none break-words text-slate-800"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.message),
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center">
                <p className="text-sm font-medium text-slate-500">
                  No comments yet. Be the first one to comment.
                </p>
              </div>
            )}
          </div>

          {editingComment ? (
            <CommentsPopup
              title="Edit your comment"
              comment={editingComment.message}
              onClose={() => setEditingComment(null)}
              onSave={saveEditedComment}
              saveLabel="Save changes"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
