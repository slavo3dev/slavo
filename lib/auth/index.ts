import axios from "axios";
import supabase from "../supabase";

interface AuthData
{
    email: string;
    password: string;
}


export const saveUserAuth = async ( data: AuthData ) =>
{
	const { email, password } = data;
	try {
		const response = await axios.post("/api/auth", data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw new Error("Something went wrong!!");
	}
};