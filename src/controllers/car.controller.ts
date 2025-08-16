import {NextFunction, Request, Response} from 'express';
import {carService} from '../services/car.service';
import {IUser} from '../interfaces/user-interface';
import { ApiError } from '../errors/api-error';


class CarController {

    public async createCar(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            if (!user)
                throw new ApiError('Unauthorized', 401);

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
            const { id } = req.params;
            if (!id) {
                throw new ApiError('Car ID is required', 400);
            }

            const updatedCar = await carService.editCar(id, req.body);

            if (!updatedCar) {
                throw new ApiError('Car not found', 404);
            }

            res.status(200).json(updatedCar);
        } catch (e) {
            next(e);
        }

    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const car = await carService.getById(id);

            if (!car) {
                throw new ApiError('Car not found', 404);
            }

            res.json(car);
        } catch (e) {
            next(e);
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const cars = await carService.getAll();
            res.json(cars);
        } catch (e) {
            next(e);
        }
    }


}

export const carController = new CarController();
