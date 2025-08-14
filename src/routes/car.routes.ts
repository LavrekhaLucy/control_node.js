import { Router } from 'express';
import { carController } from '../controllers/car.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {requirePermission} from "../middlewares/require-permission";


const carRouter = Router();

// Створити авто (SELLER, MANAGER, ADMIN)
carRouter.post(
    '/',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_CAR'),
    carController.createCar
);

// Редагувати авто (власник або MANAGER, ADMIN)
carRouter.put(
    '/:carId',
    authMiddleware.checkAccessToken,
    requirePermission('EDIT_CAR'),
    carController.editCar
);

// Видалити авто (MANAGER, ADMIN)
// carRouter.delete(
//     '/:carId',
//     authMiddleware.checkAccessToken,
//     requirePermission('DELETE_CAR'),
//     carController.deleteCar
// );

export { carRouter };
