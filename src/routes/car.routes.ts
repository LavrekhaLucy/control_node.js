import {Router} from 'express';
import {carController} from '../controllers/car.controller';
import {authMiddleware} from '../middlewares/auth.middleware';
import {requirePermission} from '../middlewares/require-permission';
import {carMiddleware} from '../middlewares/car.middleware';


const carRouter = Router();

carRouter.get(
    '/',
    authMiddleware.checkAccessToken,
    requirePermission('VIEW_CAR'),
   carController.getAll
);
carRouter.get(
    '/:id',
    authMiddleware.checkAccessToken,
    requirePermission('VIEW_CAR'),
    carController.getById
);

carRouter.post(
    '/',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_CAR'),
    carMiddleware.checkCreatePermissions,
    carController.createCar
);


carRouter.put(
    '/:id',
    authMiddleware.checkAccessToken,
    requirePermission('EDIT_CAR'),
    carController.editCar
);



export { carRouter };
