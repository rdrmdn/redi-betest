import { MongoClient } from "mongodb";

export function MongoDBConnection(): MongoClient {
  const uri = process.env.MONGODB_HOST || "mongodb://localhost:27017";
  return new MongoClient(uri);
}
