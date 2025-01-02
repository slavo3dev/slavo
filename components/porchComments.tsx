import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import UserInfoContext from "context/UserInfoContext";
import { CommentsError } from "lib/err/err";
import CommentsPopup from "./CommentsPopup";
import DOMPurify from "dompurify";


interface Comment {
  id?: string;
  userInfo: string;
  message: string;
  sourceId: number;
}

interface PorchCommentsProps {
  sourceId: number;
}

export const PorchComments = ({ sourceId }: PorchCommentsProps) => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/getPorchComments?sourceId=${sourceId}`);
        if (!response.ok) throw new Error("Failed to fetch comments.");
        const data = await response.json();
        setPostComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(CommentsError.fetchError);
      }
    };

    fetchComments();
  }, [sourceId]);

  useEffect(() => {
    if (showComments) {
      setError("");
    }
  }, [showComments]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    const wordCount = countWords(commentValue);

    if (!commentValue) {
      setError(CommentsError.onSubmitError);
    } else if (wordCount > 96) {
      setError(CommentsError.wordLimitError);
    } else {
      setComment(commentValue);
      setError(""); 
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!comment.trim()) {
      setError(CommentsError.onSubmitError);
      return;
    }
    
    if (countWords(comment) > 96) {
      setError(CommentsError.wordLimitError);
      return;
    }

    const newComment: Comment = { userInfo: userEmail || "Anonymous", message: comment, sourceId };

    try {
      const response = await fetch('/api/postPorchComments', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: comment, userInfo: userEmail, sourceId })
      });

      if (!response.ok) throw new Error("Failed to post comment.");

      const data = await response.json();
      setPostComments((prevComments) => [...prevComments, data.payload]);
      setComment(""); 
      setSuccessMessage("Comment submitted successfully!");
    } catch (error) {
      console.error("Error posting comment:", error);
      setError(CommentsError.fetchError);
    }

    if (!userEmail) {
      setError(CommentsError.notLoggedInError);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleEditComment = (comment: Comment) => {
    if (comment.userInfo !== userEmail) {
      setError("You can only edit your own comments.");
      return;
    }
    setEditingComment(comment); 
  };

  const saveEditedComment = async (updatedMessage: string) => {
    if (editingComment) {
      const updatedComments = postComments.map((comment) =>
        comment.id === editingComment.id ? { ...comment, message: updatedMessage } : comment
      );
      setPostComments(updatedComments);

      try {
        const response = await fetch(`/api/postPorchComments?id=${editingComment.id}`, {
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: updatedMessage })
        });

        if (!response.ok) throw new Error("Failed to update comment.");
        setSuccessMessage("Comment updated successfully!");
      } catch (error) {
        console.error("Error updating comment:", error);
        setError(CommentsError.fetchError);
      }

      setEditingComment(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const commentToDelete = postComments.find((comment) => comment.id === commentId);

    if (commentToDelete?.userInfo !== userEmail) {
      setError("You can only delete your own comments.");
      return;
    }

    const updatedComments = postComments.filter((comment) => comment.id !== commentId);
    setPostComments(updatedComments);

    try {
      const response = await fetch(`/api/postPorchComments?id=${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Failed to delete comment.");
      setSuccessMessage("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError(CommentsError.fetchError);
    }
  };

  return (
    <div className="flex flex-col z-50">
      <button
        onClick={toggleComments}
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="mt-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={onChange}
              className="p-3 border"
              rows={4}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={error !== ""}
              className="py-2 px-4 rounded bg-blue-500 text-white disabled:bg-gray-300"
            >
              Post Comment
            </button>
          </form>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="mt-6">
            {postComments.map((comment) => (
              <div key={comment.id || ""} className="flex flex-col mt-4">
                <div>
                  <strong>{comment.userInfo}</strong>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.message),
                  }}
                />
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id || "")}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {editingComment && (
        <CommentsPopup
          comment={editingComment.message}
          onClose={() => setEditingComment(null)}  // Close the popup
          onSave={saveEditedComment}  // Save the updated comment
        />
      )}
    </div>
  );
};

