import { MongoClient } from "mongodb";
import { IUserRepository } from "./iuser_repository";
import { User } from "../core/user";
import { CoreUserDTO, populateCoreUserDTO } from "../core/core_user_dto";
import { UnprocessableError } from "../../../utils/errors";

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

        try {
            const result = await collection.insertOne(doc);

            if (result && result.insertedId) {
                return user;
            }
        } catch (err: unknown) {
            const error = err as Error;
            if (error?.message?.includes('duplicate')) {
                throw new UnprocessableError(error.message)
            }

            throw error;
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

        try {
            const result = await collection.updateOne(filter, updateDoc);

            if (result && result.modifiedCount) {
                return user;
            }
        } catch (err: unknown) {
            const error = err as Error;
            if (error?.message?.includes('duplicate')) {
                throw new UnprocessableError(error.message)
            }

            throw error;
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