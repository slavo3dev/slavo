/* eslint-disable @typescript-eslint/no-explicit-any */
export const notificationStatus = (reqStatus: any) => {
	if (!reqStatus) {
		return "";
	}

	if (reqStatus === "pending") {
		return {
			status: "pending",
			title: "Sending Message...",
			message: "Your message is on its way.",
		};
	}

	if (reqStatus === "success") {
		return {
			status: "success",
			title: "Message Stored",
			message:
        "Thank you! We’ve received your message and will get back to you as soon as possible.",
		};
	}

	if (reqStatus === "error") {
		return {
			status: "error",
			title: "Oops...",
			message:
       "Something went wrong. Please try again later.",
		};
	}
};