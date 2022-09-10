interface MessageForm
{
    text: string;
    email: string;
    message: string;
}


export async function saveContactData ( contactDetails: MessageForm )
{
	
	const resposne = await fetch( "/api/contact", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ contactDetails }),
	});

	const data = await resposne.json();

	if (!resposne.ok) {
		throw new Error(data.message || "Sorry, Something went wrong!!");
	}
}