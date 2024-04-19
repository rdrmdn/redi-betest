import { MongoClient } from "mongodb";
import { RedisClient, RedisConnection } from "../../../../utils/redis_connection";
import { MongoDBConnection } from "../../../../utils/mongodb_connection";
import { UserService } from "../user_services";
import { ksuidSync } from "../../../../utils/identifier";
import { UnprocessableError } from "../../../../utils/errors";

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
});

afterAll(async () => {
    await Promise.all(
        testIds.map(async (id: string) => {
            await userService.delete(id);
            return null;
        })
    );

    await mongoClient.close();
    await redisClient.quit();
});

describe("User Service Spec - User Insert", () => {
    test("Successfully insert user data to database", async () => {
        const userPersitent = await userService.insert({
            id: ksuidSync(),
            userName: "Redi sample",
            accountNumber: "8239288",
            emailAddress: "rediramdan02@gmail.com",
            identityNumber: "02930235"
        });

        if (userPersitent) {
            testIds.push(userPersitent.id);
        }

        const user = await userService.findOne(testIds[0]);

        expect(user?.id).toEqual(userPersitent?.id);
        expect(user?.userName).toEqual(userPersitent?.userName);
        expect(user?.accountNumber).toEqual(userPersitent?.accountNumber);
        expect(user?.emailAddress).toEqual(userPersitent?.emailAddress);
        expect(user?.identityNumber).toEqual(userPersitent?.identityNumber);
    });

    test("Insert user should be throw UnprocessableError if user accountNumber duplicate", async () => {
        const insertUser = async () => {
            const user = await userService.findOne(testIds[0]);
            await userService.insert({
                id: ksuidSync(),
                userName: "Redi sample",
                accountNumber: user?.accountNumber as string,
                emailAddress: "rediramdan02@gmail.com",
                identityNumber: "43453455"
            });
        }

        await expect(insertUser()).rejects.toThrow(UnprocessableError);
    });

    test("Insert user should be throw UnprocessableError if user identityNumber duplicate", async () => {
        const insertUser = async () => {
            const user = await userService.findOne(testIds[0]);
            await userService.insert({
                id: ksuidSync(),
                userName: "Redi sample",
                accountNumber: "34534522",
                emailAddress: "rediramdan02@gmail.com",
                identityNumber: user?.identityNumber as string
            });
        }

        await expect(insertUser()).rejects.toThrow(UnprocessableError);
    });
});
