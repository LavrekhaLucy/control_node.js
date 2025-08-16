// import {NextFunction, Request, Response} from 'express';
// import {carService} from '../services/car.service';
// import {IUser} from '../interfaces/user-interface';
//
//
// class CarController {
//
//     public async createCar(req: Request, res: Response, next: NextFunction) {
//         try {
//
//             const user = req.user as IUser;
//             // if (!user) throw new ApiError('Unauthorized', 401);
//
//             const car = await carService.createCar(user, req.body);
//
//             res.status(201).json(car);
//         } catch (e) {
//             next(e);
//         }
//
//     }
//
//
//
//     public async editCar(req: Request, res: Response, next: NextFunction) {
//         try {
//             const user = req.user as IUser;
//             // if (!user) throw new ApiError('Unauthorized', 401);
//
//             const { id } = req.params;
//             // if (!id) throw new ApiError('Car ID is required', 400);
//
//             const updatedCar = await carService.editCar(id, req.body, user);
//
//             res.status(200).json(updatedCar);
//         } catch (e) {
//             next(e);
//         }
//
//     }
//
//     public async getCarStats(req: Request, res: Response, next: NextFunction) {
//         try {
//             const user = req.user as IUser;
//             // if (!user) throw new ApiError("Unauthorized", 401);
//
//             const { id } = req.params;
//             // if (!id) throw new ApiError("Car ID is required", 400);
//
//             const stats = await carService.getCarStats(id, user);
//             if (!stats) return res.status(403).json({ message: "Access denied or car not found" });
//
//             res.status(200).json(stats);
//         } catch (err) {
//             next(err);
//         }
//     }
//
//
//     public async updatePrices(req: Request, res: Response, next: NextFunction) {
//         try {
//             // const user = req.user as IUser;
//             // // if (!user) throw new ApiError("Unauthorized", 401);
//             //
//             // // const hasAdminRole = user.roles.some(r => {
//             // //     if (r instanceof Types.ObjectId) {
//             // //         return r.equals(new Types.ObjectId(RoleEnum.ADMIN));
//             // //     } else {
//             // //         return r.name === RoleEnum.ADMIN;
//             // //     }
//             // // });
//             // //
//             // // if (!hasAdminRole) {
//             // //     throw new ApiError("Forbidden", 403);
//             // // }
//             // //
//             // //
//             //
//
//             await carService.updatePrices();
//             res.status(200).json({ message: "Prices updated successfully" });
//         } catch (err) {
//             next(err);
//         }
//     }
//     public async getById(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { id } = req.params;
//             // if (!id) throw new ApiError("Car ID is required", 400);
//
//             const car = await carService.getCarById(id);
//             // if (!car) throw new ApiError("Car not found", 404);
//
//             res.status(200).json(car);
//         } catch (err) {
//             next(err);
//         }
//     }
//
//     public async getAll(req: Request, res: Response, next: NextFunction) {
//         try {
//             const user = req.user as IUser;
//             const cars = await carService.getAllCars(req.query, user);
//             res.status(200).json(cars);
//         } catch (err) {
//             next(err);
//         }
//     }
// }
//
//
// export const carController = new CarController();
import {NextFunction, Request, Response} from 'express';
import {carService} from '../services/car.service';
import {IUser} from '../interfaces/user-interface';
import {GetCarsQuery} from '../interfaces/car-interface';


class CarController {

    public async createCar(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            const car = await carService.createCar(user, req.body);
            res.status(201).json(car);
        } catch (e) {
            next(e);
        }

    }

    public async editCar(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            const { id } = req.params;
            const updatedCar = await carService.editCar(id, req.body, user);
            res.status(200).json(updatedCar);
        } catch (e) {
            next(e);
        }

    }

    public async getCarStats(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            const { id } = req.params;
            const stats = await carService.getCarStats(id, user);
            if (!stats) return res.status(403).json({ message: 'Access denied or car not found' });

            res.status(200).json(stats);
        } catch (err) {
            next(err);
        }
    }


    public async updatePrices(req: Request, res: Response, next: NextFunction) {
        try {
            await carService.updatePrices();
            res.status(200).json({ message: 'Prices updated successfully' });
        } catch (err) {
            next(err);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const car = await carService.getCarById(id);
            res.status(200).json(car);
        } catch (err) {
            next(err);
        }
    }

    public async getAll(req: Request<unknown, unknown, unknown, GetCarsQuery>, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser | undefined;
            const cars = await carService.getAllCars(req.query, user);
            res.status(200).json(cars);
        } catch (err) {
            next(err);
        }
    }
}


export const carController = new CarController();
