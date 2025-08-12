// import { Request, Response, NextFunction } from "express";
// import { ApiError } from "../errors/api-error";
// import { RoleEnum } from "../enums/role.enum";
// import {ITokenPayload} from "../interfaces/token.interface";
//
// export const checkRole = (...allowedRoles: RoleEnum[]) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const payload = res.locals.jwtPayload as ITokenPayload | undefined;
//
//         if (!payload) {
//             throw new ApiError("Unauthorized", 401);
//         }
//
//         if (!allowedRoles.includes(payload.role)) {
//             throw new ApiError("Forbidden", 403);
//         }
//
//         next();
//     };
// };
