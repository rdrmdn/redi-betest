import { MongoClient } from "mongodb";
import { RedisClient, RedisConnection } from "../../../../utils/redis_connection";
import { MongoDBConnection } from "../../../../utils/mongodb_connection";
import { UserService } from "../user_services";
import { ksuidSync } from "../../../../utils/identifier";

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
        accountNumber: "8239282",
        emailAddress: "rediramdan02@gmail.com",
        identityNumber: "02930231"
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

    await mongoClient.close();
    await redisClient.quit();
});

describe("User Service Spec - User Find One", () => {
    test("Successfully retrieve one user data", async () => {
        const userId = testIds[0];

        const user = await userService.findOne(userId);

        expect(user?.id).toEqual(userId);
        expect(user?.userName).toEqual("Redi sample");
        expect(user?.accountNumber).toEqual("8239282");
        expect(user?.emailAddress).toEqual("rediramdan02@gmail.com");
        expect(user?.identityNumber).toEqual("02930231");
    });

    test("Should be return undefined if user not found", async () => {
        const user = await userService.findOne(ksuidSync());
        expect(user).toBeUndefined();
    });
});
