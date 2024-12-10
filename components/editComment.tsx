import React, { useState, useEffect } from "react";

interface EditCommentProps {
  commentId: string;
  initialText: string;
  onSave: (commentId: string, newMessage: string) => void;
}

const EditComment = ({ commentId, initialText, onSave }: EditCommentProps) => {
  const [editText, setEditText] = useState<string>(initialText);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setEditText(initialText);
  }, [initialText]);

  const handleSave = async () => {
    try {
      if (editText.trim() === "") {
        setError("Message cannot be empty.");
        return;
      }

      setLoading(true);
      setError(""); 

      const response = await fetch(`/api/postComments`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId,   
          message: editText.trim(), 
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating comment");
      }

      const data = await response.json();
      if (data.message === "Comment updated successfully") {
        onSave(commentId, editText.trim()); 
        setIsEditing(false); 
      } else {
        setError("Failed to update comment. Please try again.");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      setError("Error updating comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={4}
            className="border p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className={`${
                loading ? "bg-gray-300" : "bg-blue-500"
              } text-white py-2 px-4 rounded-md disabled:bg-gray-300`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white py-2 px-4 rounded-md"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditComment;
