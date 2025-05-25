import { MongoClient } from "mongodb";

export const DBClient = new MongoClient(
  process.env.NEXT_SECRET_MONGODB_URL as string
);
