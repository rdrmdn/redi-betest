import { User } from "../core/user"

export interface IUserRepository {
    find(): Promise<User[]>
    findOne(id: string): Promise<User | undefined>
    insert(user: User): Promise<User | undefined>
    update(user: User): Promise<User | undefined>
    delete(user: User): Promise<User | undefined>
}
