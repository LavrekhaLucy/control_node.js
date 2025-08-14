import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';


class AdminController {
    // Створити менеджера
    public createManager = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password, organizationId } = req.body;

            // Створюємо користувача з роллю MANAGER
            const user = await userService.createUser({
                name,
                email,
                password,
                roles: ['manager'],
                organizationId,
            });

            res.status(201).json({ user });
        } catch (e) {
            next(e);
        }
    };

    // Бан користувача
    public banUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;

            await userService.banUser(userId);

            res.status(200).json({ message: `User ${userId} has been banned.` });
        } catch (e) {
            next(e);
        }
    };
}

export const adminController = new AdminController();
