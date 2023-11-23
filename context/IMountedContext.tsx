
// MountedContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface IMountedContext {
  isMounted: boolean;
}

export const MountedContext = createContext<IMountedContext>({ isMounted: false });

interface MountedProviderProps {
  children: ReactNode;
}

export const MountedProvider: React.FC<MountedProviderProps> = ({ children }) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<MountedContext.Provider value={{ isMounted }}>
			{children}
		</MountedContext.Provider>
	);
};