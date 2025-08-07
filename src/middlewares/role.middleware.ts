import { Request, Response, NextFunction } from 'express';
import {UserRole} from "../enums/enum-user-role";
import {ApiError} from "../errors/api-error";



class RoleMiddleware {
    public checkRole(...allowedRoles: UserRole[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = req.user;

                if (!user) {
                    throw new ApiError("Unauthorized", 401);
                }

                if (!allowedRoles.includes(user.role)) {
                    throw new ApiError("Forbidden: insufficient permissions", 403);
                }

                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isAdmin() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = req.user;

                if (!user) {
                    throw new ApiError("Unauthorized", 401);
                }

                if (user.role !== UserRole.ADMIN) {
                    throw new ApiError("Access denied. Admins only.", 403);
                }

                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const roleMiddleware = new RoleMiddleware();

