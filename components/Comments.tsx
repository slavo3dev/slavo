import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import UserInfoContext from "context/UserInfoContext";
import { CommentsError } from "lib/err/err";

interface Comment {
  email: string;
  text: string;
}

interface PropsComments {
  id: string;
  created_at: string;
  message: string;
  userInfo: string;
  sourceId: number;
}

interface CommentsProps {
  sourceId: number; 
}


export const Comments = ({sourceId}: CommentsProps) => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [postComments, setPostComments] = useState<PropsComments[]>([]);

  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/getComments?sourceId=${sourceId}`);
        const data = await response.json();
        setPostComments(data); // `data` will be an empty array if no comments found
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


  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.trim()) {
      setError(CommentsError.onSubmitError);
      return;
    }

    if (countWords(comment) > 96) {
      setError(CommentsError.wordLimitError);
      return;
    }

    const newComment: Comment = { email: userEmail || "Anonymous", text: comment };

    if (userEmail) {
      setCommentsList([...commentsList, newComment]); 
      setComment(""); 
      setSuccessMessage("Comment submitted successfully!"); 
    } else {
      setError(CommentsError.notLoggedInError);
    }
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
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg relative max-h-[300px] overflow-y-auto">
              
              <button
                onClick={toggleComments}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/*userEmail && (
                <p className="text-sm text-gray-600">
                  Logged in as: <span className="font-bold">{userEmail}</span>
                </p>
              )*/}
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
                <p className="font-bold">Comments:</p>
                  {/*commentsList.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                  ) : (
                    commentsList.map((c, index) => (
                      <p key={index} className="p-2 border-b max-w-full break-words text-sm">
                        <span className="text-blue-400">{c.email}:</span> <span className="block overflow-wrap break-word font-normal text-gray-500">{c.text}</span>
                      </p>
                    ))
                  )*/}
                    
                    {postComments.length === 0 ? (<p> No comments found.</p>) : (postComments.map((postComment) => (
                    <p key={postComment.id} className="p-2 border-b max-w-full break-words text-sm">
                      <span className="text-blue-400">{postComment.userInfo}</span>
                      <span className="block overflow-wrap break-word font-normal text-gray-500">{postComment.message}</span>
                    </p>
                    )))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
