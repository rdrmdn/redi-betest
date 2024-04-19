import { User } from "../core/user"

export interface IUserCacheRepository {
    findOne(id: string): Promise<User | undefined>
    insert(user: User): Promise<User | undefined>
    update(user: User): Promise<User | undefined>
}
