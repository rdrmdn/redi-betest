import { MongoClient } from "mongodb";
import { IUserRepository } from "../repositories/iuser_repository";
import { UserRepositoryMongodb } from "../repositories/user_repository_mongodb";
import { CoreUserDTO, populateCoreUserDTO } from "../core/core_user_dto";
import { ksuidSync } from "../../../utils/identifier";
import { User } from "../core/user";
import { NotFoundError } from "../../../utils/errors";

export class UserService {
    private _userRepo: IUserRepository;

    constructor(mongoClient: MongoClient) {
        this._userRepo = new UserRepositoryMongodb(mongoClient);
    }

    public async find(): Promise<CoreUserDTO[]> {
        const users = await this._userRepo.find();
        return users.map((user) => populateCoreUserDTO(user))
    }

    public async findOne(id: string) {
        const user = await this._userRepo.findOne(id);
        return user ? populateCoreUserDTO(user) : undefined;
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
        return userPersitent ? populateCoreUserDTO(userPersitent) : undefined;
    }

    public async delete(id: string) {
        const user = await this._userRepo.findOne(id);
        
        if (!user) throw new NotFoundError('User not found');
        
        const userPersitent = await this._userRepo.delete(user);
        return userPersitent ? populateCoreUserDTO(userPersitent) : undefined;
    }
}