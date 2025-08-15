import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../errors/api-error';
import {carRepository} from '../repositories/car.repository';
import {AccountType} from '../enums/account-type.enum';
import {IUser} from "../interfaces/user-interface";


//
// class CarMiddleware {
//     public async checkCreatePermissions(req: Request, res: Response, next: NextFunction) {
//         try {
//             const user = req.user; // це об’єкт, який authMiddleware ставить після JWT
//             if (!user || !user._id) throw new ApiError('Unauthorized', 401);
//
//             // Конвертуємо _id у ObjectId
//             const sellerId = new Types.ObjectId(user._id.toString());
//
//             const seller = await userRepository.findById(sellerId);
//             if (!seller) throw new ApiError('Seller not found', 404);
//
//             if (seller.accountType === AccountType.BASE) {
//                 const count = await carRepository.countActiveBySeller(sellerId);
//                 if (count >= 1) throw new ApiError('Base account allows only 1 active ad', 403);
//             }
//
//             next();
//         } catch (error) {
//             next(error);
//         }
//     }
// }
//
// export const carMiddleware = new CarMiddleware();

class CarMiddleware {
    public async checkCreatePermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            if (!user) throw new ApiError('Unauthorized', 401);

            if (user.accountType === AccountType.BASE) {
                const count = await carRepository.countActiveBySeller(user._id);
                if (count >= 1) throw new ApiError('Base account allows only 1 active ad', 403);
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}
export const carMiddleware = new CarMiddleware();