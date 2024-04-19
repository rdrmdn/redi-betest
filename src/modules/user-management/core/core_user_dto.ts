import { User } from "./user"

export type CoreUserDTO = {
    id: string
    userName: string
    accountNumber: string
    emailAddress: string
    identityNumber: string
    createdAt?: Date
    updatedAt?: Date
}

export const populateCoreUserDTO = (user: User) => {
    return {
        id: user.id,
        userName: user.userName,
        accountNumber: user.accountNumber,
        emailAddress: user.emailAddress,
        identityNumber: user.identityNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
}