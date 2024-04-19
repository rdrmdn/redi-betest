import dotenv from "dotenv";
dotenv.config();

import { Server } from "@overnightjs/core";
import { MongoClient } from "mongodb";
import express from "express";
import { MongoDBConnection } from "./src/utils/mongodb_connection";
import { UserController } from "./src/modules/user-management/publisher/user_controller";
import { AuthController } from "./src/modules/auth/publisher/auth_controller";
import { errorHandler } from "./src/middleware";
import { RedisClient, RedisConnection } from "./src/utils/redis_connection";

class AppServer extends Server {
    private _mongoClient: MongoClient;
    private _redisClient: RedisClient;

    constructor(mongoClient: MongoClient, redisClient: RedisClient) {
        super(true);

        this._mongoClient = mongoClient;
        this._redisClient = redisClient;

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        super.addControllers([
            new AuthController(),
            new UserController(
                this._mongoClient,
                this._redisClient
            ),
        ]);

        super.app.use(errorHandler);
    }

    public run(port: string): void {
        this.app.listen(port, () => {
            console.info(`⚡️[server]: Service is running at http://localhost:${port}`);
        });
    }
}

void (async () => {
    const mongoClient = await MongoDBConnection();
    const redisClient = await RedisConnection();

    const server = new AppServer(
        mongoClient,
        redisClient,
    );

    server.run(process.env.PORT as string);
})();