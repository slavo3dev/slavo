import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ bold: true }, { italic: true }, { underline: true }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "blockquote", "code-block"],
  [{ color: [] }, { background: [] }],
  ["image"],
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Edit Comment
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <ReactQuill
              value={updatedComment}
              onChange={handleChange}
              modules={{
                toolbar: toolbarOptions,
              }}
              className="rounded-lg focus:ring-2 focus:ring-blue-500 text-sm h-32"
            />
          </div>
          <div className="mt-10 flex justify-between gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
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
