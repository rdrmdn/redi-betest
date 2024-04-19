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
        accountNumber: "8239281",
        emailAddress: "rediramdan02@gmail.com",
        identityNumber: "02930230"
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

describe("User Service Spec - User Delete", () => {
    test("Successfully delete existing user", async () => {
        const userId = testIds[0];

        const user = await userService.delete(userId);
        testIds = testIds.filter((id) => id !== userId);

        expect(user?.id).toEqual(userId);
        expect(user?.userName).toEqual("Redi sample");
        expect(user?.accountNumber).toEqual("8239281");
        expect(user?.emailAddress).toEqual("rediramdan02@gmail.com");
        expect(user?.identityNumber).toEqual("02930230");
    });

    test("Delete user should be throw NotFoundError if user not found", async () => {
        const deleteUser = async () => {
            await userService.delete(ksuidSync());
        }

        await expect(deleteUser()).rejects.toThrow(NotFoundError);
    });
});
