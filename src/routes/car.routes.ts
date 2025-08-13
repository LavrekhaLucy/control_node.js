import {Router} from 'express';
import {authMiddleware} from '../middlewares/auth.middleware';
import {carController} from '../controllers/car.controller';
import {roleMiddleware} from '../middlewares/role.middleware';

const router = Router();

router.post('/',
    authMiddleware.checkAccessToken,
    carController.create);



router.put('/:id',
    authMiddleware.checkAccessToken,
    roleMiddleware.isSeller,roleMiddleware.isAdmin,
    carController.update);


router.post(
    '/cars/create',
    authMiddleware.checkAccessToken,
    roleMiddleware.isSeller,roleMiddleware.isAdmin,
    carController.create
);

export default router;
