import { MongoClient } from "mongodb";

export async function MongoDBConnection(): Promise<MongoClient> {
  const uri = process.env.MONGODB_HOST || "mongodb://localhost:27017";
  
  const client = new MongoClient(uri);
  await client.connect()

  return client;
}
