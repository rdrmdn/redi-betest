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
        accountNumber: "8239284",
        emailAddress: "rediramdan02@gmail.com",
        identityNumber: "02930232"
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

describe("User Service Spec - User Find", () => {
    test("Successfully retrieve list of user data", async () => {

        const users = await userService.find();

        expect(users.length).toBeGreaterThan(0);
    });
});
