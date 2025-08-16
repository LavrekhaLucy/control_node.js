// import { Router } from 'express';
//
// import { authMiddleware } from '../middlewares/auth.middleware';
// import { requirePermission } from '../middlewares/require-permission';
// import {buyerController} from '../controllers/buyer.controller';
//
// const router = Router();
//
//
// router.get(
//     '/cars',
//     authMiddleware.checkAccessToken,
//     requirePermission('VIEW_CAR'),
//     buyerController.getAll
// );
// router.get(
//     '/cars/:id',
//     authMiddleware.checkAccessToken,
//     requirePermission('VIEW_CAR'),
//     buyerController.getById
// );
//
//
// export const buyerRouter = router;
