import { FC } from "react";

interface SubscribeButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export const SubscribeButton: FC<SubscribeButtonProps> = ({ setIsModalOpen }) => {
  const handleClick = () => {
    localStorage.setItem("subscribeOpen",JSON.stringify(true));
    setIsModalOpen(true);
  };

  return (
        <button
        className="py-2 px-4 mr-5 text-white text-xs bg-blue-400 rounded hover:bg-blue-700 transition md:py-2 md:px-5 md:text-sm"
        onClick={handleClick}
        >
        Subscribe Now
        </button>
  );
};
