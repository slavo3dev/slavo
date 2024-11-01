import { FC } from "react";
import { useBlurEffect } from "@/lib/hooks/useBlurEffect";

interface BlurWrapperProps {
    children: any;
    localStorageKey: string; 
    targetValue: boolean; 
}

export const BlurWrapper: FC<BlurWrapperProps> = ({ children, localStorageKey, targetValue }) => {
    const { isBlurred } = useBlurEffect({ localStorageKey, targetValue });

    return (
        <>
            <div className={`${isBlurred ? 'blurred' : ''}`}>
                {children}
            </div>
        </>
    );
};

