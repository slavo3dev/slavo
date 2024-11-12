import { FC } from 'react'; 
import { BiLike } from 'react-icons/bi';

interface CardLayoutProps {
  title: string;
  porch: {
    text?: string;
    email?: string;
    source: string;
    excellent?: number;
  };
  displayComment: string;
  commentText: string;
  showMore?: boolean;
  handleMore?: () => void;
  handleVote: (type: string) => void;
  isUpdating: boolean;
  formattedDate?: string;
  extraContent?: React.ReactNode;
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
}) => {
  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 hover:bg-sky-100">
      <div className="flex-1 py-3 px-4 sm:p-6">
        <b className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800">
          {title}
        </b>
        
        <div className="flex flex-col mt-2 border-4 border-gray-200 rounded-xl bg-gray-200">
          {porch.email && (
            <a href={`mailto:${porch.email}`} title={porch.email}>
              <p className="pl-2 text-sm font-medium text-gray-900">
                <b>User Email: </b>
                <span className="whitespace-normal hover:underline">{porch.email}</span>
              </p>
            </a>
          )}
          <a
            href={porch.source.includes("http") ? porch.source : `//${porch.source}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pl-2 text-gray-900 text-sm font-medium"
          >
            <b>Source: </b>
            <span className="whitespace-normal hover:underline">{porch.source}</span>
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
          <p className="text-sm pl-1">
            <b>Likes: </b> {porch.excellent}
          </p>
          <button
            className="flex items-center gap-4 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 rounded-xl px-8 py-1 text-md font-extrabold text-white hover:opacity-75"
            onClick={() => handleVote("excellent")}
            disabled={isUpdating}
          >
            <BiLike />
          </button>
          <p className="pl-2 pt-2 text-sm">{formattedDate}</p>
        </div>

        {extraContent && <div className="px-4 py-5">{extraContent}</div>}
      </div>
    </div>
  );
};
