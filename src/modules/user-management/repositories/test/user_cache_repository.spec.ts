import { ksuidSync } from "../../../../utils/identifier";
import { RedisClient, RedisConnection } from "../../../../utils/redis_connection";
import { User } from "../../core/user";
import { IUserCacheRepository } from "../iuser_cache_repository";
import { UserCacheRepositoryRedis } from "../user_cache_repository_redis";

let userCacheRepo: IUserCacheRepository;
let redisClient: RedisClient;
let testIds: string[] = [];

beforeAll(async () => {
    redisClient = await RedisConnection();
    userCacheRepo = new UserCacheRepositoryRedis(redisClient);

    const userId = ksuidSync();
    testIds.push(userId);

    await userCacheRepo.insert(new User({
        id: userId,
        userName: "Redi sample",
        accountNumber: "8239283",
        emailAddress: "rediramdan02@gmail.com",
        identityNumber: "02930239"
    }));
});

afterAll(async () => {
    await Promise.all(
        testIds.map(async (id: string) => {
            await userCacheRepo.delete(new User({
                id,
                userName: "User 2",
                accountNumber: "037383434",
                emailAddress: "user2@gmail.com",
                identityNumber: "932483849"
            }));
            return null;
        })
    );

    redisClient.quit();
});

describe("User Cache Repository Spec", () => {
    test("Successfully find one user from cache database", async () => {
        const user = await userCacheRepo.findOne(testIds[0] as string);

        expect(user?.id).toEqual(testIds[0]);
        expect(user?.userName).toEqual("Redi sample");
        expect(user?.accountNumber).toEqual("8239283");
        expect(user?.emailAddress).toEqual("rediramdan02@gmail.com");
        expect(user?.identityNumber).toEqual("02930239");
    });

    test("Successfully insert user to cache database", async () => {
        const userId = ksuidSync();
        testIds.push(userId);

        await userCacheRepo.insert(new User({
            id: userId,
            userName: "User 2",
            accountNumber: "037383434",
            emailAddress: "user2@gmail.com",
            identityNumber: "932483849"
        }));

        const user = await userCacheRepo.findOne(userId);
        expect(user?.id).toEqual(userId);
        expect(user?.userName).toEqual("User 2");
        expect(user?.accountNumber).toEqual("037383434");
        expect(user?.emailAddress).toEqual("user2@gmail.com");
        expect(user?.identityNumber).toEqual("932483849");
    });

    test("Successfully update user in cache database", async () => {
        const userId = testIds[1];

        await userCacheRepo.update(new User({
            id: userId,
            userName: "User 2 edit",
            accountNumber: "0373837674",
            emailAddress: "user2+edit@gmail.com",
            identityNumber: "833934044"
        }));

        const user = await userCacheRepo.findOne(userId);

        expect(user?.id).toEqual(userId);
        expect(user?.userName).toEqual("User 2 edit");
        expect(user?.accountNumber).toEqual("0373837674");
        expect(user?.emailAddress).toEqual("user2+edit@gmail.com");
        expect(user?.identityNumber).toEqual("833934044");
    });

    test("Successfully delete user in cache database", async () => {
        const userId = testIds[1];

        await userCacheRepo.delete(new User({
            id: userId,
            userName: "User 2 edit",
            accountNumber: "0373837674",
            emailAddress: "user2+edit@gmail.com",
            identityNumber: "833934044"
        }));

        const user = await userCacheRepo.findOne(userId);

        testIds = testIds.filter((id) => id !== userId);
        
        expect(user).toBeUndefined();
    });
});
  