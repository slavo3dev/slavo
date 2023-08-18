
import supabase from "../supabase";


export const getUserData = async () => {
	const userInfo = await supabase.auth.getUser();

	return userInfo?.data?.user || null;
};