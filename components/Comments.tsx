"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export const Comments = () => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<string[]>([]);

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    const wordCount = countWords(commentValue);

    if (wordCount <= 96) {
      setComment(commentValue);
      setError(""); // Clear any previous errors
    } else {
      setError("Comment cannot exceed 96 words.");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (countWords(comment) > 96) {
      setError("Comment cannot exceed 96 words.");
      return;
    }
    setCommentsList([...commentsList, comment]); // Add comment to the list
    setComment(""); // Clear the input after submission
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="flex justify-center pt-10">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Comments</h3>
        <button
          onClick={toggleComments}
          className="mt-4 py-2 px-4 text-sm text-white font-semibold bg-blue-400 hover:bg-blue-500 rounded"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {showComments && (
          <>
            <form onSubmit={onSubmit} className="mt-8 flex gap-8">
              <p>login</p>
              <textarea
                value={comment}
                onChange={onChange}
                placeholder="Add a comment"
                className="p-2 border focus:border-gray-700 w-full outline-none resize-none"
                rows={4}
              />
              <button className="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded">
                Submit
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
              <h4 className="font-bold">Comments:</h4>
              <ul>
                {commentsList.map((c, index) => (
                  <li key={index} className="mt-2 p-2 border-b">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
