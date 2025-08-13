import {Router} from 'express';
import {authMiddleware} from '../middlewares/auth.middleware';
import {carController} from '../controllers/car.controller';
import {roleMiddleware} from '../middlewares/role.middleware';
import {RoleEnum} from '../enums/role.enum';

const router = Router();



router.post(
    '/create',
    authMiddleware.checkAccessToken,
    roleMiddleware.isSeller(),  // тільки продавці можуть створювати авто
    carController.create
);

router.put(
    '/:id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkRole(RoleEnum.SELLER, RoleEnum.ADMIN), // продавець або адмін можуть редагувати
    carController.update
);


router.put('/:id',
    authMiddleware.checkAccessToken,
    roleMiddleware.isSeller,roleMiddleware.isAdmin,
    carController.update);


// router.post(
//     '/create',
//     authMiddleware.checkAccessToken,
//     roleMiddleware.checkRole(RoleEnum.SELLER),
//     carController.create
// );

export const carRoutes = router;
