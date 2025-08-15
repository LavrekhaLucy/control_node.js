import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { sellerController } from '../controllers/seller.controller';
import {requirePermission} from '../middlewares/require-permission';
import {carMiddleware} from "../middlewares/car.middleware";
import {carController} from "../controllers/car.controller";
import {carRouter} from "./car.routes";


const router = Router();


carRouter.post(
    '/cars',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_CAR'),
    carMiddleware.checkCreatePermissions,
    carController.createCar
);

router.put(
    '/cars/:id',
    authMiddleware.checkAccessToken,
    requirePermission('EDIT_CAR'),
    sellerController.editCar
);


router.delete(
    '/cars/:id',
    authMiddleware.checkAccessToken,
    requirePermission('DELETE_CAR'),
    sellerController.deleteCar
);

export const sellerRouter = router;
