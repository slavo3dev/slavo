import { FC } from "react";

interface ModalButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
  localStorageKey: string; 
  storageValue: boolean; 
  className?: string; 
}

export const ModalButton: FC<ModalButtonProps> = ({ setIsModalOpen, localStorageKey, storageValue, className }) => {
  const handleClick = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(true));
    setIsModalOpen(true);
  };

  return (
        <button
          className={className}
          onClick={handleClick}
          >
            Subscribe Now
        </button>
  );
};
