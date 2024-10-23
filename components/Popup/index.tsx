import { FC } from "react";

interface SubscribeModalProps {
    isOpen: boolean; 
    children: any; 
}

export const SubscribeModal : FC<SubscribeModalProps> = ({ isOpen, children }) => { 
    
    if (!isOpen) { 
        return null; 
    };
    
    return (
        <>
            {children}
        </>
    )
}

