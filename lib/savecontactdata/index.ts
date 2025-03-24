import axios from "axios";

interface MessageForm {
  email: string;
  subject: string;
  message: string;
  department: string;
  name: string;
  terms: string;
}


export const saveContactData = async (data: MessageForm) => {
	try {
		const response = await axios.post("/api/contact", data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw new Error(data.message || "Something went wrong!!");
	}
};