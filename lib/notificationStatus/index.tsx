/* eslint-disable @typescript-eslint/no-explicit-any */
export const notificationStatus = (reqStatus: any) => {
	if (!reqStatus) {
		return "";
	}

	if (reqStatus === "pending") {
		return {
			status: "pending",
			title: "Sending Message...",
			message: "Thank You, We are sending your Message!",
		};
	}

	if (reqStatus === "success") {
		return {
			status: "success",
			title: "Message Stored",
			message:
        "Significant, We Received your message. We will get back to you ASAP",
		};
	}

	if (reqStatus === "error") {
		return {
			status: "error",
			title: "Oops...",
			message:
        "We are sorry, but something went worng, please try to send message again!",
		};
	}
};