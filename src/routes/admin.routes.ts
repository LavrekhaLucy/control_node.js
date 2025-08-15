// import { Router } from 'express';
// import { authMiddleware } from '../middlewares/auth.middleware';
// import { requirePermission } from '../middlewares/require-permission';
// import { adminController } from '../controllers/admin.controller';
//
// const router = Router();
//
// router.post(
//     '/managers',
//     authMiddleware.checkAccessToken,
//     requirePermission('CREATE_MANAGER'),
//     adminController.createManager
// );
//
// router.post(
//     '/ban/:userId',
//     authMiddleware.checkAccessToken,
//     requirePermission('BAN_USER'),
//     adminController.banUser
// );
//
// export const adminRouter = router;


import { authMiddleware } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/require-permission';
import { adminController } from '../controllers/admin.controller';
import {Router} from 'express';

const router = Router();

router.post(
    '/manager',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_MANAGER'),
    adminController.createManager
);


router.post(
    '/:userId/ban',
    authMiddleware.checkAccessToken,
    requirePermission('BAN_USER'),
    adminController.banUser
);

router.post(
    '/:userId/unban',
    authMiddleware.checkAccessToken,
    requirePermission('UNBAN_USER'),
    adminController.unbanUser
);

router.delete(
    '/users/:userId',
    authMiddleware.checkAccessToken,
    requirePermission('DELETE_USER'),
    adminController.deleteUser
);

router.get(
    '/users',
    authMiddleware.checkAccessToken,
    requirePermission('VIEW_USERS'),
    adminController.listUsers
);

export const adminRouter = router;
