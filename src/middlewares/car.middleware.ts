import {NextFunction, Request, Response} from 'express';
import {userRepository} from '../repositories/user.repository';
import {ApiError} from '../errors/api-error';
import {AccountType} from '../enums/account-type.enum';
import {carRepository} from '../repositories/car.repository';
import {Types} from "mongoose";


interface IRequestWithBody extends Request {
    body: {
        userId?: string;

    };
}

class CarMiddleware {
    public async checkCreatePermissions(req: IRequestWithBody, res: Response, next: NextFunction) {
        try {

            const sellerId = req.body.userId;

            if (!sellerId) {
                throw new ApiError('Seller ID is missing in the request body', 400);
            }
            const objectIdSellerId = new Types.ObjectId(sellerId);
            const seller = await userRepository.findById(objectIdSellerId);
            if (!seller) {
                throw new ApiError('Seller not found', 404);
            }

            if (seller.accountType === AccountType.BASE) {
                const count = await carRepository.countActiveBySeller(sellerId);
                if (count >= 1) {
                    throw new ApiError('Base account allows only 1 active ad', 403);
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

export const carMiddleware = new CarMiddleware();
