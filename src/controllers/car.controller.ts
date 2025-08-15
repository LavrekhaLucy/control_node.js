import {NextFunction, Request, Response} from 'express';
import {carService} from '../services/car.service';


class CarController {
    public async createCar(req: Request, res: Response, next: NextFunction) {
        try {

            const user = req.user!;

            const car = await carService.createCar(user._id);
            res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    }
    public async editCar(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const updated = await carService.editCar(req.params.id, user._id);
            res.json(updated);
        } catch (e) {
            next(e);
        }
    }
}

export const carController = new CarController();
