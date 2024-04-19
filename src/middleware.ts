import { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "./utils/errors";
import { validateJwtToken } from "./utils/jwt";

export function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    const jwt = req.headers.authorization as string;
    if (!jwt) return next(new UnauthorizedError());

    try {
        const decoded = validateJwtToken(jwt.split(" ")[1]);
        res.locals.JWTDecoded =  decoded;
        
        next();
    } catch (error) {
        next(new UnauthorizedError());
    }
}

export async function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof UnauthorizedError) {
        res.status(401);
        res.json({
          status: "ERROR",
          message: err.message,
          data: null,
        });
      
        return res;
    } else if (err instanceof NotFoundError) {
        res.status(404);
        res.json({
            status: "ERROR",
            message: err.message,
            data: null,
        });

        return res;
    } else {
        res.status(500);
        res.json({
          status: 'ERROR',
          message: err.message || 'An error occurred trying to process your request',
        });
    
        return res;
    }
  }