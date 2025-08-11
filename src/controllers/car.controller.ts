import { Request, Response, NextFunction } from 'express';
import { carService } from '../services/car.service';

class CarController {
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const car = await carService.createAd(user._id.toString(), req.body);
            res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const updated = await carService.editAd(req.params.id, user._id.toString(), req.body);
            res.json(updated);
        } catch (e) {
            next(e);
        }
    }
}

export const carController = new CarController();
