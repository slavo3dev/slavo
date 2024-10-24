import React, { useEffect, useState } from 'react';

interface Comment {
    id: string;
    created_at: string;
    message: string;
    userInfo: string;
    sourceId: number;
}

const Delete = () => {
   /*  const [comments, setComments] = useState<Comment[]>([]); */
    const [renderData, setData] = useState<Comment[]>([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await fetch('/api/getComments', {
                headers: {
                    Accept: 'application/json'
                }
            });
            
            console.log('Response', response)

            if (!response.ok) {
              throw new Error(`Failed to fetch comments: ${response.status} - ${response.statusText}`)
            }
            const data = await response.json();
            console.log("Data:", data)
    
            if (data.error) {
                setError(data.error)
            } else {
                setData(data)

            }
            
    
          } catch (error) {
            console.error("Error in fetching comments", error)
          }
        }
    
        fetchComments()
      }, []);
      

    return (
        <div>
            {error && <p>{error}</p>}
            {renderData.length > 0 ? (
                <ul>
                    {renderData.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.message}</p>
                            <small>By: {comment.userInfo}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>no comments available</p>
            )}
        </div>
    );
}

export default Delete;
