// import {NextFunction, Request, Response} from 'express';
//
// import {ApiError} from '../errors/api-error';
// import {tokenService} from '../services/token.service';
//
// import {userRepository} from "../repositories/user.repository";
//
// class AuthMiddleware {
// //   public async  authenticate  (req: Request, res: Response, next: NextFunction) {
// //
// //     try {
// //         const header = req.headers.authorization;
// //         if (!header) {
// //             throw new ApiError( 'Token is not provided',401 );
// //         }
// //         const accessToken = header.split('Bearer')[1];
// //         const payload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS) as ITokenPayload;
// //
// //
// //         const user = await userRepository.getById(payload.userId);
// //         if (!user) {
// //             throw new ApiError('User not found', 404);
// //         }
// //         req.res.locals.jwtPayload = payload;
// //         next();
// //     } catch (e) {
// //         next(e);
// //     }
// // };
//     public async authenticate(req: Request, res: Response, next: NextFunction) {
//         try {
//
//             const header = req.headers.authorization;
//
//             if (!header || !header.startsWith('Bearer ')) {
//
//                 throw new ApiError('Token is not provided', 401);
//             }
//
//             const accessToken = header.split(' ')[1];
//             // const payload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS) as ITokenPayload;
//
//             if (!payload?.userId) {
//                 throw new ApiError('Invalid token payload', 401);
//             }
//
//             const user = await userRepository.getById(payload.userId);
//
//             if (!user) {
//                 throw new ApiError('User not found', 404);
//             }
//
//             req.user = user; // ← типізовано, якщо правильно розширено Express.Request
//             res.locals.jwtPayload = payload;
//
//             next();
//         } catch (e) {
//             next(e);
//         }
//     }
//
//
//
//
//
// }
//
// export const authMiddleware = new AuthMiddleware();