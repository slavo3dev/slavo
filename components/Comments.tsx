"use client";

import { useState, ChangeEvent, FormEvent, useContext } from "react";
import UserInfoContext from "context/UserInfoContext";

export const Comments = () => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<string[]>([]);

  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;


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
    setShowComments(!showComments);
  };

  return (
    
      <>
        
        <button
          onClick={toggleComments}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >
          {showComments ? "Hide Comments" : "💬"}
        </button>
        {showComments && (
          <>
            {userEmail && (
            <p className="text-sm text-gray-600">
              Logged in as: <span className="font-bold">{userEmail}</span>
            </p>
          )}
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-2">
              
              <textarea
                value={comment}
                onChange={onChange}
                placeholder="Add a comment"
                className="p-2 border focus:border-gray-700 w-full outline-none resize-none overflow-hidden"
                rows={1}
              />
              <button className="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded">
                Submit
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
              <h4 className="font-bold">Comments:</h4>
              <ul>
                {commentsList.length === 0 ? (
                  <p>No comments yet. Be the first to comment!</p>
                ) :
                (commentsList.map((c, index) => (
                  <li key={index} className="mt-2 p-2 border-b">
                    {c}
                  </li>)
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    
  );
};
