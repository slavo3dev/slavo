import React, { useState, ChangeEvent, FormEvent } from "react";

interface CommentsPopupProps {
  comment: string;
  onClose: () => void;
  onSave: (updatedComment: string) => void;
}

const CommentsPopup: React.FC<CommentsPopupProps> = ({ comment, onClose, onSave }) => {
  const [updatedComment, setUpdatedComment] = useState<string>(comment);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(updatedComment);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Comment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={updatedComment}
            onChange={handleChange}
            className="p-3 border rounded w-full resize-none"
            rows={6}
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsPopup;
