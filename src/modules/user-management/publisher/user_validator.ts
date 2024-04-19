import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

function validatorResultsHandler(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422);
        res.json({
            status: 'ERROR',
            message: 'Unprocessable entity',
            data: {
                errors: errors.array()
            },
        });

        return res;
    };

    return next();
}

export function userCreateValidator() {
    return [
        body('userName').isString(),
        body('accountNumber').isString(),
        body('emailAddress').isEmail(),
        body('identityNumber').isNumeric(),
        validatorResultsHandler
    ];
}

export function userUpdateValidator() {
    return [
        body('userName').isString(),
        body('accountNumber').isNumeric(),
        body('emailAddress').isEmail(),
        body('identityNumber').isNumeric(),
        validatorResultsHandler
    ];
}