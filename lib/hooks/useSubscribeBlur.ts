import { useState, useEffect } from "react";

export const useSubscribeBlur = () => {
    const [isBlurred, setIsBlurred] = useState<boolean>(false); 
    const [subscribeOpen, setSubscribeOpen] = useState<boolean>(false);
    

    const checkSubscribeOpen = () => {
        const subscribeOpen = localStorage.getItem("subscribeOpen");
        const isOpen = subscribeOpen === JSON.stringify(true);
        setIsBlurred(isOpen);
        setSubscribeOpen(isOpen);
    };

    useEffect(() => {
        checkSubscribeOpen();

        const interval = setInterval(checkSubscribeOpen, 100);
        return () => clearInterval(interval);
    }, []);

    return { isBlurred, subscribeOpen };
};

