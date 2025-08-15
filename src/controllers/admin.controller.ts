import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';

class AdminController {
    async createManager(req: Request, res: Response, next: NextFunction) {
        try {
            const manager = await userService.createUser({
                ...req.body,
                roles: ['manager'],
            });
            res.status(201).json(manager);
        } catch (e) {
            next(e);
        }
    }

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const admin = await userService.createUser({
                ...req.body,
                roles: ['admin'],
            });
            res.status(201).json(admin);
        } catch (e) {
            next(e);
        }
    }


    async banUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const bannedUser = await userService.banUser(userId);
            res.json({ message: `User ${bannedUser.email} has been banned` });
        } catch (e) {
            next(e);
        }
    }

    async unbanUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const unbannedUser = await userService.unbanUser(userId);
            res.json({ message: `User ${unbannedUser.email} has been unbanned` });
        } catch (e) {
            next(e);
        }
    }


    async listUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = req.query || {};
            const users = await userService.getList(filters);
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            await userService.delete(userId);
            res.json({ message: `User ${userId} has been deleted` });
        } catch (e) {
            next(e);
        }
    }
}

export const adminController = new AdminController();
