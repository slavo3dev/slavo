// UserContext.tsx
import { createContext } from "react";
import { UserContextProps } from "@/Types/User";

const UserInfoContext = createContext<UserContextProps>({
	userInfo: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setUserInfo: () => {}, 
});

export default UserInfoContext;