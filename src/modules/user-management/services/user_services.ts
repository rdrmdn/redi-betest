import { MongoClient } from "mongodb";
import { IUserRepository } from "../repositories/iuser_repository";
import { UserRepositoryMongodb } from "../repositories/user_repository_mongodb";
import { CoreUserDTO, populateCoreUserDTO } from "../core/core_user_dto";
import { ksuidSync } from "../../../utils/identifier";
import { User } from "../core/user";
import { NotFoundError } from "../../../utils/errors";
import { RedisClient } from "../../../utils/redis_connection";
import { IUserCacheRepository } from "../repositories/iuser_cache_repository";
import { UserCacheRepositoryRedis } from "../repositories/user_cache_repository_redis";

export class UserService {
    private _userRepo: IUserRepository;
    private _userCacheRepo: IUserCacheRepository;

    constructor(mongoClient: MongoClient, redisClient: RedisClient) {
        this._userRepo = new UserRepositoryMongodb(mongoClient);
        this._userCacheRepo = new UserCacheRepositoryRedis(redisClient);
    }

    public async find(): Promise<CoreUserDTO[]> {
        const users = await this._userRepo.find();
        return users.map((user) => populateCoreUserDTO(user))
    }

    public async findOne(id: string) {
        const userCache = await this._userCacheRepo.findOne(id);
        if (userCache) {
            return {
                ...populateCoreUserDTO(userCache),
                redis: true,
            };
        }

        const user = await this._userRepo.findOne(id);

        if (!user) return undefined;

        await this._userCacheRepo.insert(user)
        return populateCoreUserDTO(user);
    }

    public async insert(payload: CoreUserDTO) {
        const user = new User({
            id: ksuidSync(),
            userName: payload.userName,
            accountNumber: payload.accountNumber,
            emailAddress: payload.emailAddress,
            identityNumber: payload.identityNumber,
            createdAt: new Date(),
        });

        const userPersitent = await this._userRepo.insert(user);
        return userPersitent ? populateCoreUserDTO(userPersitent) : undefined;
    }

    public async update(id: string, payload: CoreUserDTO) {
        const user = await this._userRepo.findOne(id);
        
        if (!user) throw new NotFoundError('User not found');

        user.userName = payload.userName;
        user.accountNumber = payload.accountNumber;
        user.emailAddress = payload.emailAddress;
        user.identityNumber = payload.identityNumber;
        user.updatedAt = new Date();
        
        const userPersitent = await this._userRepo.update(user);

        if (!userPersitent) return undefined;

        const isExist = await this._userCacheRepo.findOne(userPersitent.id);
        if (!isExist) return populateCoreUserDTO(userPersitent);

        await this._userCacheRepo.update(userPersitent);

        return populateCoreUserDTO(userPersitent);
    }

    public async delete(id: string) {
        const user = await this._userRepo.findOne(id);
        
        if (!user) throw new NotFoundError('User not found');
        
        const userPersitent = await this._userRepo.delete(user);
        return userPersitent ? populateCoreUserDTO(userPersitent) : undefined;
    }
}