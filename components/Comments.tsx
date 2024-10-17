"use client";

import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import UserInfoContext from "context/UserInfoContext";

export const Comments = () => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;

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
      setError("Please add a comment first.");
    } else if (wordCount > 96) {
      setError("Comment cannot exceed 96 words.");
    } else {
      setComment(commentValue);
      setError(""); // Clear any previous errors
    }
  };


  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.trim()) {
      setError("Please add a comment first.");
      return;
    }

    if (countWords(comment) > 96) {
      setError("Comment cannot exceed 96 words.");
      return;
    }
    setCommentsList([...commentsList, comment]); // Add comment to the list
    setComment(""); // Clear the input after submission
    setSuccessMessage("Comment submitted successfully!"); // Confirmation message
    setError(""); // Clear any previous errors
  };

  const toggleComments = () => {
    setShowComments(!showComments);
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
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleComments} // Clicking outside the modal closes it
          ></div>

          {/* Popup Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg relative max-h-[300px] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={toggleComments}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {userEmail && (
                <p className="text-sm text-gray-600">
                  Logged in as: <span className="font-bold">{userEmail}</span>
                </p>
              )}
              <form onSubmit={onSubmit} className="mt-2 flex flex-col gap-2">
                <textarea
                  value={comment}
                  onChange={onChange}
                  placeholder="Add a comment"
                  className="p-2 border focus:border-gray-700 w-full outline-none resize-none overflow-hidden"
                  rows={1}
                />
                <button className="py-2 px-4 text-sm text-white font-semibold bg-blue-400 hover:bg-blue-500 rounded">
                  Submit
                </button>
              </form>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
              <div className="mt-2 text-black">
                <h4 className="font-bold">Comments:</h4>
                  {commentsList.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                  ) : (
                    commentsList.map((c, index) => (
                      <p key={index} className="mt-2 p-2 border-b">
                        {c}
                      </p>
                    ))
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
