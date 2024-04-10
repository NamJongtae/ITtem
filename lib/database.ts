import { MongoClient } from "mongodb";

export default async function connectToDB() {
  const client = await MongoClient.connect(
    process.env.NEXT_SECRET_MONGODB_URL as string
  );
  return client;
}
