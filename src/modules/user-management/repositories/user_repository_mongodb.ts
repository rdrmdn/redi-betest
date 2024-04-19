import { MongoClient } from "mongodb";
import { IUserRepository } from "./iuser_repository";
import { User } from "../core/user";
import { CoreUserDTO, populateCoreUserDTO } from "../core/core_user_dto";

export class UserRepositoryMongodb implements IUserRepository {
    private _client: MongoClient;

    constructor(mongoClient: MongoClient) {
      this._client = mongoClient;
    }

    public async find(): Promise<User[]> {
        const db = this._client.db(process.env.MONGODB_DATABASE);
        const collection = db.collection(process.env.MONGODB_USER_COLLECTION as string);
    
        const userDTOs = await collection.find<CoreUserDTO>({}).toArray();
    
        return userDTOs.map((userDTO) => new User(userDTO))
    }

    public async findOne(id: string): Promise<User | undefined> {
        const db = this._client.db(process.env.MONGODB_DATABASE);
        const collection = db.collection(process.env.MONGODB_USER_COLLECTION as string);
    
        const userDTO = await collection.findOne<CoreUserDTO>({ id });
    
        if (userDTO) {
            return new User(userDTO);
        }

        return undefined;
    }

    public async insert(user: User): Promise<User | undefined> {
        const db = this._client.db(process.env.MONGODB_DATABASE);
        const collection = db.collection(process.env.MONGODB_USER_COLLECTION as string);

        const doc: CoreUserDTO = populateCoreUserDTO(user);
        const result = await collection.insertOne(doc);

        if (result && result.insertedId) {
            return user;
        }

        return undefined;
    }

    public async update(user: User): Promise<User | undefined> {
        const db = this._client.db(process.env.MONGODB_DATABASE);
        const collection = db.collection(process.env.MONGODB_USER_COLLECTION as string);

        const doc: CoreUserDTO = populateCoreUserDTO(user);
        const filter = { id: user.id };
        const updateDoc = {
            $set: { ...doc }
        };

        const result = await collection.updateOne(filter, updateDoc);

        if (result && result.modifiedCount) {
            return user;
        }

        return undefined;
    }

    public async delete(user: User): Promise<User | undefined> {
        const db = this._client.db(process.env.MONGODB_DATABASE);
        const collection = db.collection(process.env.MONGODB_USER_COLLECTION as string);

        const filter = { id: user.id };
        const result = await collection.deleteOne(filter);

        if (result && result.deletedCount) {
            return user;
        }

        return undefined;
    }
}