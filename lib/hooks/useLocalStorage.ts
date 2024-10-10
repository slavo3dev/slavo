import { useEffect } from "react";

export const useLocalStorage = ({value, setValue, key}: any) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                setValue(storedValue);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, value);
        }
    }, [value]);

    return [value, setValue];
}