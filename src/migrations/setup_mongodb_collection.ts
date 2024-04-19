import dotenv from "dotenv";
dotenv.config();

import { MongoDBConnection } from "../utils/mongodb_connection";

void (async () => {
    console.info('[Setup] Mongodb collection');
    const mongoClient = await MongoDBConnection();

    const db = mongoClient.db(process.env.MONGODB_DATABASE);
    const collection = db.collection(process.env.MONGODB_USER_COLLECTION as string);

    try {
        const hasIndex = await collection.indexExists('id');
        
        if (!hasIndex) throw new Error();
    } catch (error) {
        console.info('Creating index');

        await collection.createIndex('id', { unique: true });
        await collection.createIndex('accountNumber', { unique: true });
        await collection.createIndex('identityNumber', { unique: true });
    }

    console.info('[Setup] Done successfully');
    process.exit();
})();