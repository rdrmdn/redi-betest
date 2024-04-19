import { Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { MongoClient } from "mongodb";
import { UserService } from "../services/user_services";
import { NextFunction, Request, Response } from "express";

@Controller("v1/users")
export class UserController {
  private _userService: UserService;

  constructor(mongoClient: MongoClient) {
    this._userService = new UserService(mongoClient);
  }

  @Get("")
  public async find(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await this._userService.find();

        res.status(200);
        res.json({
            status: "SUCCESS",
            message: "SUCCESS",  
            data: users,
        });

        return res;
    } catch (error: unknown) {
      return next(error as Error);
    }
  }

  @Get("/:userId")
  public async findOne(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId ;

    try {
        const user = await this._userService.findOne(userId);

        res.status(200);
        res.json({
            status: "SUCCESS",
            message: "SUCCESS",  
            data: user,
        });

        return res;
    } catch (error: unknown) {
      return next(error as Error);
    }
  }

  @Post("")
  public async insert(req: Request, res: Response, next: NextFunction) {

    try {
      const user = await this._userService.insert(req.body);

        res.status(200);
        res.json({
            status: "SUCCESS",
            message: "SUCCESS",  
            data: user,
        });

        return res;
    } catch (error: unknown) {
      return next(error as Error);
    }
  }

  @Put("/:userId")
  public async update(req: Request, res: Response, next: NextFunction) {

    try {
        const userId = req.params.userId ;
        const user = await this._userService.update(userId, req.body);

        res.status(200);
        res.json({
            status: "SUCCESS",
            message: "SUCCESS",  
            data: user,
        });

        return res;
    } catch (error: unknown) {
      return next(error as Error);
    }
  }

  @Delete("/:userId")
  public async delete(req: Request, res: Response, next: NextFunction) {

    try {
        const userId = req.params.userId ;
        const user = await this._userService.delete(userId);

        res.status(200);
        res.json({
            status: "SUCCESS",
            message: "SUCCESS",  
            data: user,
        });

        return res;
    } catch (error: unknown) {
      return next(error as Error);
    }
  }
}
