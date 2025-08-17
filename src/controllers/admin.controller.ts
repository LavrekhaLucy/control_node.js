import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';

class AdminController {

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
