import { FC, useEffect } from "react";
import { useSubscribeBlur } from "@/lib/hooks/useSubscribeBlur"; 

interface BlurWrapperProps {
    children: any;
}

export const BlurWrapper: FC<BlurWrapperProps> = ({ children }) => {
    const { isBlurred } = useSubscribeBlur();

    return (
        <>
            <div className={`${isBlurred ? 'blurred' : ''}`}>
                {children}
            </div>
        </>
    );
};

