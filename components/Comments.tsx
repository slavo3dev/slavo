import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import UserInfoContext from "context/UserInfoContext";
import { CommentsError } from "lib/err/err";

interface Comment {
  id: string;
  userInfo: string;
  message: string;
}

interface PropsComments {
  id: string;
  created_at?: string;
  message: string;
  userInfo: string;
  sourceId?: number;
}

interface CommentsProps {
  sourceId: number; 
}

interface EditCommentProps {
  id: string;
  message: string;
}

export const Comments = ({sourceId}: CommentsProps) => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [postComments, setPostComments] = useState<(PropsComments)[]>([]);
  const [editComment, setEditComment] = useState<EditCommentProps>({id: "", message: ""});


  type Data = {
    id: number;
    name: string;
    age: number;
  };

  // this is for testing only................................................................
  const [data, setData] = useState<Data[]>([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number | ''>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('/api/dummyData');
    const result = await response.json();
    setData(result);
  };
  
  const updateData = async (id: number) => {
    const response = await fetch(`/api/dummyData?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, age: newAge }),
    });

    if (response.ok) {
      const updatedItem = await response.json();
      setData((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    }
  };

  const deleteData = async (id: number) => {
    const response = await fetch(`/api/dummyData?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

//..................................................................

  const { userInfo } = useContext(UserInfoContext);
  const userEmail = userInfo?.email;
  
  // GET comment section
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

  const onChangeEditComment = (event: ChangeEvent<HTMLInputElement>) => {
    if(editComment) {
      setEditComment({...editComment, message: event.target.value})
    }
  }

  /*const confirmEdit = () => {
    window.alert("Confirm edit comment");
  };*/
 //.....................................................................................


  //POST comment section
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

    const newComment: PropsComments = {
      id: crypto.randomUUID(), // Generating a unique ID
      userInfo: userEmail || "Anonymous",
      message: comment,
      sourceId,
    };

    try {
      await fetch('/api/postComments', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newComment, sourceId })
      })
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError(CommentsError.fetchError);
    }


    if (userEmail) {
      setPostComments([...postComments, newComment]); 
      setComment(""); 
      setSuccessMessage("Comment submitted successfully!"); 
    } else {
      setError(CommentsError.notLoggedInError);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  //PATCH comments section
  const confirmEdit = async (id: string) => {
    if (editComment) {
      try {
        await fetch(`/api/editComments?id=${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: editComment.message })
        });
        // Update postComments state after editing
        setPostComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, message: editComment.message } : c))
        );
        setEditComment({ id: "", message: "" }); // Reset edit state
      } catch (error) {
        console.error("Error editing comment:", error);
        setError(CommentsError.fetchError);
      }
    }
  };

  {/*const confirmDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/deleteComments?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        
      });

          if (!response.ok) {
        throw new Error("Failed to delete comment.");
      }

      setPostComments((prev) =>
        prev.filter((c) => c.id !== id)
      );

    } catch (error) {
      console.error("Error deleting comment:", error);
      setError(CommentsError.fetchError);
  }
}*/}

  return (
      <>
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
                  {postComments.length === 0 ? (<p> No comments found.</p>) : (postComments.map((postComment) => (
                    <p key={postComment.id} className="p-2 border-b max-w-full break-words text-sm">
                      <span className="text-blue-400">{postComment.userInfo}</span>
                      {/*<span className="block overflow-wrap break-word font-normal text-gray-500">{postComment.message}</span>*/}
                      <div className="flex items-center gap-2 justify-between">
                      {postComment.id === editComment.id ? (
                        <input
                          type="text"
                          value={editComment.message}
                          onChange={onChangeEditComment}
                          className="pb-1 border-b w-full"
                        />
                      ) : (
                        <p className="block overflow-wrap break-word font-normal text-gray-500">{postComment.message}</p>
                      )}
                      {editComment.id === postComment.id ? (
                        
                        <div className="flex gap-2">
                          <button type="button" onClick={() => confirmEdit(postComment.id)} className={`${editComment.message === postComment.message ? `text-gray-300` : `text-green-500`}`}
                          disabled={editComment.message === postComment.message}>
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditComment({ id: "", message: "" })}
                            className="text-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                        
                      ) : (
                        <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditComment({ id: postComment.id, message: postComment.message })}
                          className="text-green-500"
                        >
                          Edit
                        </button>
                        {/*<button type="button" onClick={() => confirmDelete(postComment.id)}className="text-gray-700">
                        Delete
                        </button>*/}
                        </div>
                      )}
                      </div>
                    </p>
                  )))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>

    <div>
      <h1>Dummy Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}, Age: {item.age}
            <button onClick={() => deleteData(item.id)}>Delete</button>
            <input
              type="text"
              placeholder="New name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="number"
              placeholder="New age"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value ? Number(e.target.value) : '')}
            />
            <button onClick={() => updateData(item.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

