import { FC } from "react";

interface ModalProps {
    isOpen: boolean; 
    children: any; 
}

export const Modal : FC<ModalProps> = ({ isOpen, children }) => { 
    
    if (!isOpen) { 
        return null; 
    };
    
    return (
        <>
            {children}
        </>
    )
}

