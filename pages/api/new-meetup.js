// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    //store in DB.

    const client = await MongoClient.connect(
      "mongodb+srv://mikheilgibradze1:ZxndoWeEUNme78RH@cluster0.efoludq.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetupsCol");

    //insert this data object into the DB (thats async operation)

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    //close DB connection:

    client.close();

    res.status(201).json({ message: "meetup inserted successfully!" });
  }
}

export default handler;
