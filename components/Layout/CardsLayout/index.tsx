import { AiFillHeart } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { FC, useState } from "react";
import { Edit } from "lucide-react";
        
interface CardLayoutProps {
  title: string;
  porch: any;
  displayComment: string;
  commentText: string;
  showMore: boolean;
  handleMore: () => void;
  handleVote: () => void;
  isUpdating: boolean;
  formattedDate?: string; 
  isVoteDisabled: boolean;
  hasVoted: boolean;
  extraContent: React.ReactNode;
  isLoggedIn: boolean;
  submitChange?: (porchId: string, updatedText: string) => void;
  userEmail?: string | null;
}

export const CardLayout: FC<CardLayoutProps> = ({
  title,
  porch,
  displayComment,
  commentText,
  showMore,
  handleMore,
  handleVote,
  isUpdating,
  formattedDate,
  extraContent,
  isVoteDisabled,
  hasVoted,
  isLoggedIn,
  submitChange,
  userEmail,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempComment, setTempComment] = useState(commentText); 
  const buttonClasses = `flex items-center justify-center rounded-xl px-8 py-1 text-md font-extrabold text-white transition-all duration-300 ${
    hasVoted
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-700 hover:bg-blue-800"
  }`;
  const isOwner = userEmail === porch.email;

  const handleEditClick = () => {
    setTempComment(commentText);
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    if (submitChange) {
      submitChange(porch.new_id, tempComment);
    }
    setIsEditing(false); 
  };

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 hover:bg-sky-100">
      <div className="flex-1 px-4 py-3 sm:p-6">
        <div className="flex items-center justify-between">
          <b className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800">
            {title}
          </b>
          {formattedDate && (
  <p className="text-sm text-gray-500">
    {formattedDate}
  </p>
)}
        </div>
        <div className="flex flex-col mt-2 break-all bg-gray-200 border-4 border-gray-200 rounded-xl">
          {porch.email && (
            <a href={`mailto:${porch.email}`} title={porch.email}>
              <p className="pl-2 text-sm font-medium text-gray-900">
                <b>User Email: </b>
                <span className="whitespace-normal hover:underline">
                  {porch.email}
                </span>
              </p>
            </a>
          )}
          <a
            href={
              porch.source.includes("http")
                ? porch.source
                : `//${porch.source}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="pl-2 text-sm font-medium text-gray-900"
          >
            <b>Source: </b>
            <span className="whitespace-normal hover:underline">
              {porch.source}
            </span>
          </a>
          <p className="pl-2 text-sm font-medium text-gray-900">
            <b>Date: </b>
            <span className="whitespace-normal">{formattedDate}</span>
          </p>      
        </div>
        <div className="px-2 py-8 mt-auto border-gray-100 sm:px-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full space-x-2">
              {isEditing ? (
                <textarea
                  value={tempComment}
                  onChange={(e) => setTempComment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="pl-1 text-base font-medium text-gray-900">
                  {displayComment}
                  {!showMore && commentText.length > 90 && (
                    <button onClick={handleMore}>... read more</button>
                  )}
                </p>
              )}
            </div>
            {isLoggedIn && isOwner && (
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <button
                    onClick={handleUpdateClick}
                    className="text-green-500"
                  >
                    Update
                  </button>
                ) : (
                  <button onClick={handleEditClick} className="text-blue-500">
                    <Edit size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-2">
          <p className="text-sm text-black">
            <b>Likes: </b> {porch.likes.length}
          </p>
          <div className="flex justify-start">
            {isLoggedIn && (
              <button
                onClick={handleVote}
                disabled={isUpdating || isVoteDisabled}
                className="flex items-center justify-center mt-1 text-4xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10">
                  {isUpdating ? (
                    <span className="text-sm font-semibold"></span>
                  ) : hasVoted ? (
                    <AiFillHeart className="w-5 h-5 text-red-400 transition-transform duration-300 transform scale-125 hover:scale-150 hover:rotate-12" />
                  ) : (
                    <GiCheckMark className="w-5 h-5 text-blue-500 transition-transform duration-300 transform scale-125 hover:scale-150 hover:rotate-12" />
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
      {extraContent}
    </div>
  );
};
