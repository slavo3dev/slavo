import axios from "axios";

interface MessageForm
{
    text: string;
    email: string;
    message: string;
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