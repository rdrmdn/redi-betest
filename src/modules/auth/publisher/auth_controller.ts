import { Controller, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth_service";

@Controller("v1/auth")
export class AuthController {
  private _authService: AuthService;

  constructor() {
    this._authService = new AuthService();
  }

  @Post("")
  public async insert(req: Request, res: Response, next: NextFunction) {

    try {
        const token = await this._authService.generateToken(req.body?.email);

        res.status(200);
        res.json({
            status: "SUCCESS",
            message: "SUCCESS",  
            data: token,
        });

        return res;
    } catch (error: unknown) {
      return next(error as Error);
    }
  }
}
