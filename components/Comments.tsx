import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import UserInfoContext from "context/UserInfoContext";
import { CommentsError } from "lib/err/err";

interface Comment {
  id?: string;
  userInfo: string;
  message: string;
  sourceId: number;
}

interface CommentsProps {
  sourceId: number; 
}


export const Comments = ({sourceId}: CommentsProps) => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/getComments?sourceId=${sourceId}`);
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
      const response = await fetch('/api/postComments', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  message: comment, userInfo: userEmail, sourceId })
      })
      const data = await response.json();
      if (response.ok) {
        setPostComments([...postComments, data.payload]);
        setComment(""); 
        setSuccessMessage("Comment submitted successfully!");
      } else {
        setError(CommentsError.fetchError);
      }
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

  
  const handleEditComment = async (commentId: string, newMessage: string) => {
    const commentToEdit = postComments.find((comment) => comment.id === commentId);

    if (commentToEdit?.userInfo !== userEmail) { 
      setError("You can only edit your own comments."); 
      return;
    }
    const updatedComments = postComments.map((comment) =>
      comment.id === commentId ? { ...comment, message: newMessage } : comment
    );
    setPostComments(updatedComments);

    try {
      const response = await fetch(`/api/postComments?id=${commentId}`, { 
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }) 
      });

      if (response.ok) {
        setSuccessMessage("Comment updated successfully!");
      } else {
        setError(CommentsError.fetchError);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      setError(CommentsError.fetchError);
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
      const response = await fetch(`/api/postComments?id=${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        setSuccessMessage("Comment deleted successfully!");
      } else {
        setError(CommentsError.fetchError);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError(CommentsError.fetchError);
    }
  };

  return (
    <div className="flex flex-col z-50">
      <button
        onClick={toggleComments}
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
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
              rows={4}/>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={error !== ""}
              className="py-2 px-4 rounded bg-blue-500 text-white disabled:bg-gray-300">
              Post Comment
            </button>
          </form>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="mt-6">
            {postComments.map((comment) => {
              const commentId = comment.id || ""; 
              return (
                <div key={commentId} className="flex flex-col mt-4">
                  <div>
                    <strong>{comment.userInfo}</strong>
                  </div>
                  <div>{comment.message}</div>
                  <div className="flex gap-4 mt-2">
                    {commentId && (
                      <>
                        <button
                          onClick={() => handleEditComment(commentId, prompt("Edit comment:", comment.message) || comment.message)}
                          className="text-blue-500">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(commentId)}
                          className="text-red-500">
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
      <div className="flex flex-col z-50">
        <button
          onClick={toggleComments}
          className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 max-w-xs"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>

        {showComments && (
        <>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg relative max-h-[300px] overflow-y-auto">
              
              <button
                onClick={toggleComments}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              {userEmail && (<form onSubmit={onSubmit} className="mt-2 flex flex-col gap-2">
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
              </form>)}
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
              <div className="mt-2 text-black">
                <p className="font-bold">Comments:</p>
                  {postComments.length === 0 ? (<p> No comments found.</p>) : (postComments.map((postComment) => (
                    <p key={postComment.id} className="p-2 border-b max-w-full break-words text-sm">
                      <span className="text-blue-400">{postComment.userInfo}</span>
                      <span className="block overflow-wrap break-word font-normal text-gray-500">{postComment.message}</span>
                    </p>
                  )))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};
