import {NextFunction, Request, Response} from 'express';
import {carService} from '../services/car.service';
import {IUser} from "../interfaces/user-interface";
import { ApiError } from '../errors/api-error';


class CarController {

    public async createCar(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser; // беремо sellerId з токена
            if (!user) throw new ApiError('Unauthorized', 401);

            const car = await carService.createCar({
                ...req.body,
                sellerId: user._id,
            });

            res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    }


    public async editCar(req: Request, res: Response, next: NextFunction) {
        try {
            const carId = req.params.id;
            const updatedCar = await carService.editCar(carId, req.body);
            res.status(200).json(updatedCar);
        } catch (err) {
            next(err);
        }
    }
}

export const carController = new CarController();
