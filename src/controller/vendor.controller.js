import { MongoClient } from "mongodb";

export const getSampleUser = async (_, response) => {
  const cluster = await MongoClient.connect(process.env.MONGO_URL);
  const database = cluster.db("sample_mflix");
  const collection = database.collection("users");
  const user = await collection.find({}).toArray();
  response.status(200).json(user);
};
