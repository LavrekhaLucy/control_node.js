import {Router} from 'express';
import {carController} from '../controllers/car.controller';
import {authMiddleware} from '../middlewares/auth.middleware';
import {carMiddleware} from '../middlewares/car.middleware';
import {requirePermissionMiddleware} from '../middlewares/require-permission';
import {PermissionEnum} from '../enums/permission.enum';


const router = Router();

router.get('/stats/:id',
    authMiddleware.checkAccessToken,
    carMiddleware.checkPremiumAccess,
    carController.getCarStats);

router.get('/:id',
    authMiddleware.checkAccessToken,
    carMiddleware.filterActiveAds,
    carController.getById);

router.get('/',
    authMiddleware.checkAccessToken,
    carMiddleware.filterActiveAds,
    carController.getAll);

router.post('/create',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.CREATE_CAR),
    carMiddleware.checkProfanity,
    carController.createCar);

router.put('/edit/:id',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.EDIT_CAR),
    carMiddleware.checkProfanity,
    carController.editCar);

router.patch('/update-prices',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.ALL),
    carMiddleware.checkAdmin,
    carController.updatePrices);

export const carRoutes = router;



