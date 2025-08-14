import { Request, Response, NextFunction } from 'express';

class ManagerController {
    async deleteCar(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: 'Car deleted' });
        } catch (e) {
            next(e);
        }
    }

    async banUser(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: 'User banned' });
        } catch (e) {
            next(e);
        }
    }

    async verifyCar(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: 'Car verified' });
        } catch (e) {
            next(e);
        }
    }

    async manageSalon(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: 'Salon managed' });
        } catch (e) {
            next(e);
        }
    }
}

export const managerController = new ManagerController();
