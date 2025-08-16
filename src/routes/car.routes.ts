import {Router} from 'express';
import {carController} from '../controllers/car.controller';
import {authMiddleware} from '../middlewares/auth.middleware';
import {carMiddleware} from '../middlewares/car.middleware';


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
     carMiddleware.checkCreatePermission,
    carMiddleware.checkProfanity,
    carController.createCar);

router.put('/edit/:id',
    authMiddleware.checkAccessToken,
    carMiddleware.checkEditPermission,
    carController.editCar);

router.patch('/update-prices',
    authMiddleware.checkAccessToken,
    carMiddleware.checkAdmin,
    carController.updatePrices);

export const carRoutes = router;



