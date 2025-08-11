// import {NextFunction} from "express";
// import {userRepository} from "../repositories/user.repository";
// import {ApiError} from "../errors/api-error";
// import {AccountType} from "../enums/account-type.enum";
// import {carRepository} from "../repositories/car.repository";
// import {IAd} from "../interfaces/ad.interface";
//
//
// class CarMiddleware {
//     public checkCreatePermissions = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             // ✅ Отримуємо дані з тіла запиту
//             const dto: Partial<IAd> = req.body;
//             const sellerId = dto.userId.toString();
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
