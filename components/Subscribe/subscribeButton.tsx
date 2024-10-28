import { FC } from "react";

interface SubscribeButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
  setBlur: (isBlurred: boolean) => void;
}

export const SubscribeButton: FC<SubscribeButtonProps> = ({ setIsModalOpen, setBlur }) => {
  const handleClick = () => {
    localStorage.setItem("subscribeOpen", "true");
    setIsModalOpen(true);
    setBlur(true);
  };

  return (
        <button
        className="py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-700 transition"
        onClick={handleClick}
        >
        Subscribe Now
        </button>
  );
};
