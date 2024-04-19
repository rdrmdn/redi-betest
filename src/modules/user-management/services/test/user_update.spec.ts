import { MongoClient } from "mongodb";
import { RedisClient, RedisConnection } from "../../../../utils/redis_connection";
import { MongoDBConnection } from "../../../../utils/mongodb_connection";
import { UserService } from "../user_services";
import { ksuidSync } from "../../../../utils/identifier";
import { NotFoundError } from "../../../../utils/errors";

let mongoClient: MongoClient;
let redisClient: RedisClient;
let userService: UserService;
let testIds: string[] = [];

beforeAll(async () => {
    mongoClient = await MongoDBConnection();
    redisClient = await RedisConnection();

    userService = new UserService(
        mongoClient,
        redisClient,
    );
    
    const user = await userService.insert({
        id: ksuidSync(),
        userName: "Redi sample",
        accountNumber: "8239287",
        emailAddress: "rediramdan02@gmail.com",
        identityNumber: "02930236"
    });

    if (user) {
        testIds.push(user.id);
    }
});

afterAll(async () => {
    await Promise.all(
        testIds.map(async (id: string) => {
            await userService.delete(id);
            return null;
        })
    );

    mongoClient.close();
    redisClient.quit();
});

describe("User Service Spec - User Update", () => {
    test("Successfully update user data in database", async () => {
        const userPersitent = await userService.update(
            testIds[0],
            {
                id: testIds[0],
                userName: "Redi sample edit",
                accountNumber: "8239287",
                emailAddress: "rediramdan02@gmail.com",
                identityNumber: "02930236"
            }
        );

        const user = await userService.findOne(testIds[0]);

        expect(user?.id).toEqual(userPersitent?.id);
        expect(user?.userName).toEqual(userPersitent?.userName);
        expect(user?.accountNumber).toEqual(userPersitent?.accountNumber);
        expect(user?.emailAddress).toEqual(userPersitent?.emailAddress);
        expect(user?.identityNumber).toEqual(userPersitent?.identityNumber);
    });

    test("Update user should be throw NotFoundError if user not found", async () => {
        const updateUser = async () => {
            await userService.update(
                ksuidSync(),
                {
                    id: ksuidSync(),
                    userName: "Redi sample edit",
                    accountNumber: "8239287",
                    emailAddress: "rediramdan02@gmail.com",
                    identityNumber: "02930236"
                }
            );
        }

        await expect(updateUser()).rejects.toThrow(NotFoundError);
    });
});
