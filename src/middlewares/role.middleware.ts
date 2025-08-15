// import {NextFunction, Request, Response} from 'express';
// import {ApiError} from '../errors/api-error';
// import {RoleEnum} from '../enums/role.enum';
// import {ITokenPayload} from '../interfaces/token.interface';
// import {IRole} from "../interfaces/role-interface";
//
// class RoleMiddleware {
//
//
//      public checkRole(...allowedRoles: RoleEnum[]) {
//          return (req: Request, res: Response, next: NextFunction) => {
//              try {
//                  const payload = res.locals.jwtPayload as ITokenPayload | undefined;
//
//                  if (!payload) {
//                      throw new ApiError('Unauthorized', 401);
//                  }
//                  const hasPermission = payload.roles.some((role) => allowedRoles.includes(role));
//
//                  if (!hasPermission) {
//                      throw new ApiError('Forbidden: insufficient permissions', 403);
//                  }
//
//                  next();
//              } catch (e) {
//                  next(e);
//              }
//          };
//      }

// async function checkUserRoles() {
//     await mongoose.connect(configs.MONGO_URI);
//
//     const user = await userRepository.findByIdWithRoles("689efc4e84c42323bd719138");
//
//     if (!user) {
//         console.log('User not found');
//         return;
//     }
//
//     console.log(user.roles.map(r => ({
//         name: r.name,
//         permissions: r.permissions?.map(p => p.code) || []
//     })));
//
//     await mongoose.disconnect();
// }

// checkUserRoles();



















//
//
//
// public checkPermission(permission: string) {
//          return async (req: Request, res: Response, next: NextFunction) => {
//              try {
//                  const userRoles = res.locals.jwtPayload.roles as IRole[];
//                  const hasPermission = userRoles.some(role =>
//                      role.permissions.some(p => p.name === permission)
//                  );
//
//                  if (!hasPermission) throw new ApiError('Forbidden', 403);
//
//                  next();
//              } catch (e) {
//                  next(e);
//              }
//          };
//      }
//     // public isAdmin() {
//     //     return this.checkRole(RoleEnum.ADMIN);
//     // }
//     //
//     // public isManager() {
//     //     return this.checkRole(RoleEnum.MANAGER);
//     // }
//     //
//     // public isSeller() {
//     //     return this.checkRole(RoleEnum.SELLER);
//     // }
// }
//
// export const roleMiddleware = new RoleMiddleware();
