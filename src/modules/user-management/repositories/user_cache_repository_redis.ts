import { User } from "../core/user";
import { IUserCacheRepository } from "./iuser_cache_repository";
import { RedisClient } from "../../../utils/redis_connection";
import { CoreUserDTO, populateCoreUserDTO } from "../core/core_user_dto";

export class UserCacheRepositoryRedis implements IUserCacheRepository {
    private _client: RedisClient;
    private _prefixKey: string;

    constructor(redisClient: RedisClient) {
      this._client = redisClient;
      this._prefixKey = 'user';
    }

    private key(id: string) {
        return `${this._prefixKey}_${id}`;
    }

    public async findOne(id: string): Promise<User | undefined> {
        const value = await this._client.get(this.key(id));
        if (!value) return undefined;

        const user: CoreUserDTO = JSON.parse(value);

        return new User(user)
    }

    public async insert(user: User): Promise<User | undefined> {
        await this._client.set(
            this.key(user.id),
            JSON.stringify(populateCoreUserDTO(user)),
            { EX: 60 * Number(process.env.REDIS_EXPIRE_IN_MINUTES) }
        );

        return user;
    }

    public async update(user: User): Promise<User | undefined> {
        await this._client.set(
            this.key(user.id),
            JSON.stringify(populateCoreUserDTO(user)),
            { EX: 60 * Number(process.env.REDIS_EXPIRE_IN_MINUTES) }
        );

        return user;
    }
}