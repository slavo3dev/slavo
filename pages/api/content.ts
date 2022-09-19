/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";


interface NewMessage {
	id: any;
	email: string;
	message: string;
	name: string
}

export default async function hendler ( req: NextApiRequest, res: NextApiResponse )
{
	if (req.method === "POST") {
		const { contactDetails } = req.body;
		const { email, name, message } = contactDetails;

		if (
			!email || !email.includes("@") ||
            !name || name.trim() === "" ||
            !message || message.trim() === ""
		) {
			res.status(422).json({ meesage: "Invalid Input" });
			return;
		}

		const newMessage: NewMessage = {
			id: "",
			email,
			message,
			name,
		};

		let client;
		

		try {
			client = await MongoClient.connect(
				`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_contact_cluster}.wbdvr.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
			);
		} catch (err) {
			res.status(500).json({ message: "Didnt connect to DB" + err });
			return;
		}

		const db = client.db();

		try {
			const result = await db
				.collection("messages")
				.insertOne(newMessage);

			newMessage.id = result.insertedId;
		} catch (err) {
			client.close();
			res.status(500).json({ message: `Error: ${err}` });
		}

		client.close();

		res.status(201).json({
			message: "Successfully Stored Message",
		});
	}
}