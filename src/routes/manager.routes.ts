import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/require-permission';
import {managerController} from '../controllers/manager.controller';

const router = Router();

// Видалення авто — DELETE_CAR
router.delete(
    '/cars/:id',
    authMiddleware.checkAccessToken,
    requirePermission('DELETE_CAR'),
    managerController.deleteCar
);

// Бан користувача — BAN_USER
router.post(
    '/users/:id/ban',
    authMiddleware.checkAccessToken,
    requirePermission('BAN_USER'),
    managerController.banUser
);

router.post(
    '/cars/:id/verify',
    authMiddleware.checkAccessToken,
    requirePermission('VERIFY_CAR'),
    managerController.verifyCar
);


