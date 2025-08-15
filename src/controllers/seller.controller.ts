import {NextFunction, Request, Response} from 'express';
import {carService} from '../services/car.service';

class SellerController {
       public createCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const car = await carService.createCar({
                ...req.body,
                userId: req.user!._id,
            });
            res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    };

    public editCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const car = await carService.editCar(req.params.id, req.body);
            res.status(200).json(car);
        } catch (e) {
            next(e);
        }
    };

    public deleteCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await carService.deleteCar(req.params.id);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    };
}
export const sellerController = new SellerController();
