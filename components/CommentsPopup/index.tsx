import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  [{ bold: true }, { italic: true }, { underline: true }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "blockquote", "code-block"],
  [{ color: [] }, { background: [] }],
];

interface CommentsPopupProps {
  comment: string;
  onClose: () => void;
  onSave: (updatedComment: string) => void;
}

const CommentsPopup: React.FC<CommentsPopupProps> = ({
  comment,
  onClose,
  onSave,
}) => {
  const [updatedComment, setUpdatedComment] = useState<string>(comment);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (content: string) => {
    setUpdatedComment(content);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(updatedComment.trim());
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-300 rounded-xl shadow-2xl p-6 w-full max-w-xl mx-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Your Comment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ReactQuill
            value={updatedComment}
            onChange={handleChange}
            modules={{
              toolbar: toolbarOptions,
            }}
            className="focus:ring-2 focus:ring-blue-500 text-sm h-40 rounded-lg"
          />
          <div className="pt-12"></div>
          <div className="flex justify-end space-x-4 mt-12">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition duration-150"
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
