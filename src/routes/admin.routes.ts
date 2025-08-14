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

// Створити менеджера — пермішн CREATE_MANAGER
router.post(
    '/manager',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_MANAGER'),
    adminController.createManager
);

// Бан користувача — пермішн BAN_USER
router.post(
    '/:userId/ban',
    authMiddleware.checkAccessToken,
    requirePermission('BAN_USER'),
    adminController.banUser
);

// Розбан користувача — пермішн UNBAN_USER
router.post(
    '/:userId/unban',
    authMiddleware.checkAccessToken,
    requirePermission('UNBAN_USER'),
    adminController.unbanUser
);

// Видалити користувача — пермішн DELETE_USER
router.delete(
    '/users/:userId',
    authMiddleware.checkAccessToken,
    requirePermission('DELETE_USER'),
    adminController.deleteUser
);

// Перегляд усіх користувачів — пермішн VIEW_USERS
router.get(
    '/users',
    authMiddleware.checkAccessToken,
    requirePermission('VIEW_USERS'),
    adminController.listUsers
);

export const adminRouter = router;
