import { FC, ReactNode } from "react";
import { BiLike } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
interface CardLayoutProps {
  title: string;
  porch: any;
  displayComment: string;
  commentText: string;
  showMore: boolean;
  handleMore: () => void;
  handleVote: () => void;
  isUpdating: boolean;
  formattedDate: string;
  isVoteDisabled: boolean;
  hasVoted: boolean;
  extraContent: React.ReactNode;
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
}) => {
  const buttonClasses = `flex items-center justify-center rounded-xl px-8 py-1 text-md font-extrabold text-white transition-all duration-300 ${
    hasVoted
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-700 hover:bg-blue-800"
  }`;

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 hover:bg-sky-100">
      <div className="flex-1 py-3 px-4 sm:p-6">
        <b className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800">
          {title}
        </b>

        <div className="flex flex-col mt-2 mt-4 mr-8 border-4 border-gray-200 rounded-xl bg-gray-200 break-all">
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
            className="pl-2 text-gray-900 text-sm font-medium"
          >
            <b>Source: </b>
            <span className="whitespace-normal hover:underline">
              {porch.source}
            </span>
          </a>
        </div>

        <div className="py-8 px-2 mt-auto border-gray-100 sm:px-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="pl-1 text-base font-medium text-gray-900">
                {displayComment}
                {!showMore && commentText.length > 90 && (
                  <button onClick={handleMore}>... read more</button>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <p className="text-sm text-black">
            <b>Likes: </b> {porch.likes.length}
          </p>
          <div className="flex justify-start">
            <button
              onClick={handleVote}
              disabled={isUpdating}
              className="text-4xl flex items-center justify-center transition-all duration-300 mt-1"
            >
              <div className="flex items-center justify-center w-10 h-10">
                {isUpdating ? (
                  <span className="text-sm font-semibold"></span>
                ) : hasVoted ? (
                  <AiFillHeart className="text-red-400 w-5 h-5 transform scale-125 hover:scale-150 hover:rotate-12 transition-transform duration-300" />
                ) : (
                  <GiCheckMark className="text-blue-500 w-5 h-5 transform scale-125 hover:scale-150 hover:rotate-12 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      {extraContent}
    </div>
  );
};
