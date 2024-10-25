import { FC } from "react";

interface ModalProps {
    isOpen: boolean; 
    children: any; 
    className?: string
}

export const Modal : FC<ModalProps> = ({ isOpen, children, className }) => { 
    
    if (!isOpen) { 
        return null; 
    };
    
    return (
        <div className={className}>
            {children}
        </div>
    )
}

