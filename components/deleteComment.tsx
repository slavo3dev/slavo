import React, { useState } from "react";

interface DeleteCommentProps {
  commentId: string;
  onDelete: (commentId: string) => void;
}

const DeleteComment = ({ commentId, onDelete }: DeleteCommentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(`/api/postComments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });

      if (!response.ok) {
        throw new Error("Error deleting comment");
      }

      const data = await response.json();
      if (data.message === "Comment deleted successfully") {
        onDelete(commentId);
      } else {
        setError("Failed to delete comment. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Error deleting comment.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setConfirmation(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {confirmation ? (
        <div className="flex flex-col gap-3">
          <p className="text-red-500">Are you sure you want to delete this comment?</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={loading}
              className={`${
                loading ? "bg-gray-300" : "bg-red-500"
              } text-white py-2 px-4 rounded-md disabled:bg-gray-300`}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirmation(true)}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default DeleteComment;

  