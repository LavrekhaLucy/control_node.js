import { Request, Response, NextFunction } from 'express';
import {ApiError} from "../errors/api-error";

const allowedCurrencies = ['USD', 'EUR', 'UAH'];

export function validateCurrency(req: Request, res: Response, next: NextFunction) {

    const { currency } = req.body;
    if (!allowedCurrencies.includes(currency)) {
       throw new ApiError( `Currency ${currency} is not supported`,400);
    }
    next();
}
