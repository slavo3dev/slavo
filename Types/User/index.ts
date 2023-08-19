import { Dispatch, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";

export interface UserContextProps {
  userInfo: User | null;
  setUserInfo: Dispatch<SetStateAction<User | null>>;
}