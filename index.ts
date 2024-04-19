import dotenv from "dotenv";
dotenv.config();

import { Server } from "@overnightjs/core";
import { MongoClient } from "mongodb";
import express from "express";
import { MongoDBConnection } from "./src/utils/mongodb_connection";
import { UserController } from "./src/modules/user-management/publisher/user_controller";

class AppServer extends Server {
    private _mongoClient: MongoClient;

    constructor(mongoClient: MongoClient) {
        super(true);

        this._mongoClient = mongoClient;

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        super.addControllers([
            new UserController(this._mongoClient),
        ]);
    }

    public run(port: string): void {
        this.app.listen(port, () => {
            console.info(`⚡️[server]: Service is running at http://localhost:${port}`);
        });
    }
}

void (async () => {
    const mongoClient = MongoDBConnection();
    await mongoClient.connect();
    const server = new AppServer(mongoClient);

    server.run(process.env.PORT as string);
})();