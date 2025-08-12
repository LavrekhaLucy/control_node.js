// import {NextFunction} from "express";
// import {userRepository} from "../repositories/user.repository";
// import {ApiError} from "../errors/api-error";
// import {AccountType} from "../enums/account-type.enum";
// import {carRepository} from "../repositories/car.repository";
//
//
// class CarMiddleware {
//     public async  checkCreatePermissions (req: Request, res: Response, next: NextFunction) {
//         try {
//             // ✅ Отримуємо дані з тіла запиту
//             // const dto:Partial<IAd> = req.body;
//             // const sellerId = dto.userId.toString();
//
//             const sellerId: string = req.body.userId;
//
//             const seller = await userRepository.findById(sellerId);
//             if (!seller) {
//                 throw new ApiError('Seller not found', 404);
//             }
//
//             if (seller.accountType === AccountType.BASE) {
//                 const count = await carRepository.countActiveBySeller(sellerId);
//                 if (count >= 1) {
//                     throw new ApiError('Base account allows only 1 active ad', 403);
//                 }
//             }
//
//             next();
//         } catch (error) {
//             next(error);
//         }
//     };
// }
//
// export const carMiddleware = new CarMiddleware();
//

import {NextFunction, Request, Response} from 'express';
import {userRepository} from '../repositories/user.repository';
import {ApiError} from '../errors/api-error';
import {AccountType} from '../enums/account-type.enum';
import {carRepository} from '../repositories/car.repository';

// Розширюємо тип Request, щоб TypeScript знав, що в req.body може бути userId
// Якщо використовуєте fileUpload, воно зазвичай додає текстові поля в req.body.
interface IRequestWithBody extends Request {
    body: {
        userId?: string;
        // Інші поля форми...
    };
}

class CarMiddleware {
    public async checkCreatePermissions(req: IRequestWithBody, res: Response, next: NextFunction) {
        try {
            // Отримуємо дані з тіла запиту.
            // TypeScript тепер знає, що req.body може містити userId.
            const sellerId = req.body.userId;

            if (!sellerId) {
                throw new ApiError('Seller ID is missing in the request body', 400);
            }

            const seller = await userRepository.findById(sellerId);
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
