import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requirePermissionMiddleware } from '../middlewares/require-permission';
import { PermissionEnum } from '../enums/permission.enum';
import { carController } from '../controllers/car.controller';
import { userController } from '../controllers/user.controller';

const router = Router();


router.post(
    '/verify-car/:carId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.VERIFY_CAR),
    carController.verifyCar
);


router.post(
    '/ban-user/:userId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.BAN_USER),
    userController.banUser
);


router.post(
    '/cars',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.CREATE_CAR),
    carController.createCar
);

router.put(
    '/cars/:carId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.EDIT_CAR),
    carController.editCar
);

router.delete(
    '/cars/:carId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.DELETE_CAR),
    carController.delete
);

export const managerRoutes = router;
