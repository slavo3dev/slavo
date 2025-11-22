import { useState, ChangeEvent, FormEvent, useContext } from "react";
import useSWR from "swr";
import UserInfoContext from "context/UserInfoContext";
import { CommentsError } from "lib/err/err";
import DOMPurify from "dompurify";
import { CommentsPopup } from "../CommentsPopup";
import { Edit, Trash2, MessageSquare, ChevronDown, Check  } from "lucide-react";

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

// SWR fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const CommentsFetcher = ({ sourceId, getRoute, postRoute }: CommentsProps) => {
  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;

  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);

  // SWR hook to fetch comments
  const { data: postComments = [], mutate } = useSWR<Comment[]>(
    showComments ? `/api/${getRoute}?sourceId=${sourceId}` : null,
    fetcher
  );

  const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const words = countWords(value);

    if (!value) setError(CommentsError.onSubmitError);
    else if (words > 96) setError(CommentsError.wordLimitError);
    else {
      setComment(value);
      setError("");
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return setError(CommentsError.onSubmitError);
    if (countWords(comment) > 96) return setError(CommentsError.wordLimitError);
    if (!userEmail) return setError(CommentsError.notLoggedInError);

    const newComment: Comment = { userInfo: userEmail, message: comment, sourceId };

    try {
      const res = await fetch(`/api/${postRoute}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("Failed to post comment");

      const data = await res.json();
      // Update SWR cache
      mutate([...postComments, data.payload], false);
      setComment("");
      setSuccessMessage("Comment submitted successfully!");
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  const toggleComments = () => setShowComments(!showComments);

  const handleEditComment = (c: Comment) => {
    if (c.userInfo !== userEmail) {
      setError("You can only edit your own comments.");
      return;
    }
    setEditingComment(c);
  };

  const saveEditedComment = async (updatedMessage: string) => {
    if (!editingComment) return;

    try {
      const res = await fetch(`/api/${postRoute}?id=${editingComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: updatedMessage }),
      });
      if (!res.ok) throw new Error("Failed to update comment");

      const updatedComments = postComments.map((c) =>
        c.id === editingComment.id ? { ...c, message: updatedMessage } : c
      );
      mutate(updatedComments, false);
      setSuccessMessage("Comment updated successfully!");
      setEditingComment(null);
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const commentToDelete = postComments.find((c) => c.id === commentId);
    if (!commentToDelete) return;

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

      mutate(postComments.filter((c) => c.id !== commentId), false);
      setSuccessMessage("Comment deleted successfully!");
    } catch (err) {
      console.error(err);
      setError(CommentsError.fetchError);
    }
  };

  return (
    <div className="z-50 flex flex-col space-y-4">
      <button
        onClick={toggleComments}
        className="px-3 py-2 mx-6"
      >
        {showComments ? <MessageSquare size={18} /> : <ChevronDown size={18} />}
      </button>

      {showComments && (
        <div className="mt-4 space-y-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={onChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={!!error}
              className="px-3 py-2 mx-6"
            >
              <Check size={18}/>
            </button>
          </form>
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <div className="space-y-4">
            {postComments.map((comment) => (
              <div
                key={comment.id || Math.random()}
                className="p-4 bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-gray-800 dark:text-gray-200">{comment.userInfo}</strong>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditComment(comment)} className="text-blue-500 hover:text-blue-700">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteComment(comment.id || "")} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div
                  className="mt-2 text-gray-700 break-words dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.message) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {editingComment && (
        <CommentsPopup
          comment={editingComment.message}
          onClose={() => setEditingComment(null)}
          onSave={saveEditedComment}
        />
      )}
    </div>
  );
};
