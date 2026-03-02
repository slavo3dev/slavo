import {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useMemo,
} from "react";
import useSWR from "swr";
import UserInfoContext from "context/UserInfoContext";
import { CommentsError } from "lib/err/err";
import DOMPurify from "dompurify";
import { CommentsPopup } from "../CommentsPopup";
import {
  Edit,
  Trash2,
  MessageSquare,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

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
  if (!res.ok) throw new Error("Failed to fetch data");
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
    showComments ? `/api/${getRoute}?sourceId=${sourceId}` : null,
    fetcher,
  );

  const wordCount = useMemo(() => countWords(comment), [comment]);
  const wordLimit = 96;

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // ALWAYS update state first so deleting works
    setComment(value);

    // then validate
    if (!value.trim()) {
      setError(CommentsError.onSubmitError);
      return;
    }

    const words = countWords(value);
    if (words > 96) {
      setError(CommentsError.wordLimitError);
      return;
    }

    setError("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return setError(CommentsError.onSubmitError);
    if (countWords(comment) > wordLimit)
      return setError(CommentsError.wordLimitError);
    if (!userEmail) return setError(CommentsError.notLoggedInError);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("Failed to post comment");

      const data = await res.json();

      // optimistic update
      mutate([...(postComments ?? []), data.payload], false);

      setComment("");
      setSuccessMessage("Comment submitted!");
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  const toggleComments = () => {
    setShowComments((v) => !v);
    setSuccessMessage("");
    setError("");
  };

  const handleEditComment = (c: Comment) => {
    if (!userEmail) return setError(CommentsError.notLoggedInError);
    if (c.userInfo !== userEmail) {
      setError("You can only edit your own comments.");
      return;
    }
    setEditingComment(c);
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: updatedMessage }),
        },
      );
      if (!res.ok) throw new Error("Failed to update comment");

      const updatedComments = (postComments ?? []).map((c) =>
        c.id === editingComment.id
          ? { ...c, message: updatedMessage }
          : c,
      );

      mutate(updatedComments, false);
      setSuccessMessage("Comment updated!");
      setEditingComment(null);
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const commentToDelete = (postComments ?? []).find(
      (c) => c.id === commentId,
    );
    if (!commentToDelete) return;

    if (!userEmail) return setError(CommentsError.notLoggedInError);
    if (commentToDelete.userInfo !== userEmail) {
      setError("You can only delete your own comments.");
      return;
    }

    try {
      const res = await fetch(`/api/${postRoute}?id=${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to delete comment");

      mutate(
        (postComments ?? []).filter((c) => c.id !== commentId),
        false,
      );
      setSuccessMessage("Comment deleted!");
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  const commentsCount = postComments?.length ?? 0;

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-0">
        <button
          onClick={toggleComments}
          className="
            inline-flex items-center gap-2
            rounded-lg border border-gray-200 bg-white
            px-3 py-2 text-sm font-medium text-gray-800
            hover:bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <MessageSquare size={18} />
          <span>
            {showComments ? "Hide comments" : "Show comments"}
          </span>
          <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
            {commentsCount}
          </span>
          <ChevronDown
            size={18}
            className={`ml-1 transition-transform ${showComments ? "rotate-180" : ""}`}
          />
        </button>

        {showComments && (
          <span className="text-xs text-gray-500">
            {isValidating ? "Loading…" : " "}
          </span>
        )}
      </div>

      {showComments && (
        <div className="mt-4 space-y-4 px-4 sm:px-0">
          {/* Composer */}
          <form
            onSubmit={onSubmit}
            className="
              rounded-xl border border-gray-200 bg-white p-3 sm:p-4
              shadow-sm
            "
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <textarea
                  placeholder="Write your comment…"
                  value={comment}
                  onChange={onChange}
                  className="
                    w-full resize-none rounded-lg border border-gray-200
                    p-3 text-sm text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  rows={3}
                />

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {wordCount}/{wordLimit} words
                  </div>

                  {(error || successMessage) && (
                    <div
                      className={`text-xs ${
                        error ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {error || successMessage}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={!!error || !comment.trim()}
                  className="
                    inline-flex items-center justify-center
                    rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white
                    hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
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
                  className="
                    inline-flex items-center justify-center
                    rounded-lg border border-gray-200 bg-white px-3 py-2
                    text-sm font-medium text-gray-700 hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  aria-label="Clear"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </form>

          {/* Comments list */}
          <div className="space-y-3">
            {(postComments ?? []).map((c) => (
              <div
                key={c.id ?? `${c.userInfo}-${Math.random()}`}
                className="
                  rounded-xl border border-gray-200 bg-white p-4
                  shadow-sm
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-gray-900">
                      {c.userInfo}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditComment(c)}
                      className="
                        rounded-lg p-2 text-blue-600 hover:bg-blue-50
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      "
                      aria-label="Edit"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteComment(c.id || "")}
                      className="
                        rounded-lg p-2 text-red-600 hover:bg-red-50
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      "
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div
                  className="mt-2 prose prose-sm max-w-none break-words text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(c.message),
                  }}
                />
              </div>
            ))}
          </div>

          {editingComment && (
            <CommentsPopup
              title="Edit your comment"
              comment={editingComment.message}
              onClose={() => setEditingComment(null)}
              onSave={saveEditedComment}
              saveLabel="Save changes"
            />
          )}
        </div>
      )}
    </div>
  );
};
