import { FC } from "react";

interface SubscribeButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
  className?: string;
}

export const SubscribeButton: FC<SubscribeButtonProps> = ({ setIsModalOpen, className }) => {
  const handleClick = () => {
    localStorage.setItem("subscribeOpen",JSON.stringify(true));
    setIsModalOpen(true);
  };

  return (
        <button
        className="py-1 px-2 text-white bg-blue-400 rounded hover:bg-blue-700 transition md:py-2 md:px-4"
        onClick={handleClick}
        >
        Subscribe Now
        </button>
  );
};
