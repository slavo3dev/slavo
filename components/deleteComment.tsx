interface DeleteCommentProps {
    commentId: string;
    onDelete: (commentId: string) => void;
  }
  
  const DeleteComment = ({ commentId, onDelete }: DeleteCommentProps) => {
    const handleDelete = () => {
      onDelete(commentId); // Call onDelete with the commentId
    };
  
    return (
      <button onClick={handleDelete} className="text-red-500">
        Delete
      </button>
    );
  };
  
  export default DeleteComment;
  