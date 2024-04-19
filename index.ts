import dotenv from "dotenv";
dotenv.config();

import path from "path"

import { Server } from "@overnightjs/core";
import { MongoClient } from "mongodb";
import express from "express";
import { MongoDBConnection } from "./src/utils/mongodb_connection";
import { UserController } from "./src/modules/user-management/publisher/user_controller";
import { AuthController } from "./src/modules/auth/publisher/auth_controller";
import { errorHandler } from "./src/middleware";
import { RedisClient, RedisConnection } from "./src/utils/redis_connection";

import SwaggerUI from "swagger-ui-express";

import SwaggerDocument from "./swagger";

class AppServer extends Server {
    private _mongoClient: MongoClient;
    private _redisClient: RedisClient;

    constructor(mongoClient: MongoClient, redisClient: RedisClient) {
        super(true);

        this._mongoClient = mongoClient;
        this._redisClient = redisClient;

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use("/api-docs", SwaggerUI.serve);
        this.app.get("/api-docs", SwaggerUI.setup(SwaggerDocument));

        this.app.get('/test-reports', function(req, res) {
            res.sendFile(path.join(__dirname, '../test-nice-report/main.html'));
        });

        this.app.get('/jest-html-reporters-attach/main/index.js', function(req, res) {
            res.sendFile(path.join(__dirname, '../test-nice-report/jest-html-reporters-attach/main/index.js'));
        });

        this.app.get('/jest-html-reporters-attach/main/result.js', function(req, res) {
            res.sendFile(path.join(__dirname, '../test-nice-report/jest-html-reporters-attach/main/result.js'));
        });

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
            console.info(`⚡️[server]: Api Docs is running at http://localhost:${port}/api-docs`);
            console.info(`⚡️[server]: Test report is running at http://localhost:${port}/test-reports`);
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