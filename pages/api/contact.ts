import { MongoClient } from "mongodb";

export default async (req: any, res: any) => {
  const { subject, department, name, email, message } = req.body;

  const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_contact_cluster}.wbdvr.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  if (req.method === "POST") {
    if (
      (!email || !email.includes("@") || !name || name.trim() === "",
      !subject ||
        subject.trim() === "" ||
        !message ||
        message.trim() === "" ||
        !department)
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }
  }

  // Store to DB
  const storeMessage: any = {
    email,
    department,
    subject,
    name,
    message
  };

  let client: any;

  try {
    client = await MongoClient.connect(uri);
  } catch (error) {
    res.status(500).json({
      message: "Oops something went workn, Please try again!",
    });
    console.error("Error Message: ", error);
  }

  const db = client.db();

  try {
    const result = await db
      .collection("contact_messages: ")
      .insertOne(storeMessage);

    storeMessage.id = result.intertedId;
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      message: "Oops something went wrong, storing message faild",
    });
  }

  client.close();

  res
    .status(201)
    .json({ message: "Succesfuly Stored", payload: storeMessage });
};