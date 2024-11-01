import { useState, useEffect } from "react";

interface UseBlurEffectProps {
    localStorageKey: string;
    targetValue: boolean;
}

export const useBlurEffect = ({localStorageKey, targetValue} : UseBlurEffectProps) => {
    const [isBlurred, setIsBlurred] = useState<boolean>(false); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    

    const checkModalOpen = () => {
        const modalOpen = localStorage.getItem(localStorageKey);
        const isOpen = modalOpen === JSON.stringify(targetValue);
        setIsBlurred(isOpen);
        setIsModalOpen(isOpen);
    };

    useEffect(() => {
        checkModalOpen();

        const interval = setInterval(checkModalOpen, 100);
        return () => clearInterval(interval);
    }, [localStorageKey, targetValue]);

    return { isBlurred, isModalOpen };
};

