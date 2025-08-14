import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/require-permission';

const router = Router();

// Перегляд всіх авто — пермішн VIEW_CAR
router.get(
    '/cars',
    authMiddleware.checkAccessToken,
    requirePermission('VIEW_CAR'),
    buyerController.viewCars
);

router.get(
    '/cars/:id',
    authMiddleware.checkAccessToken,
    requirePermission('VIEW_CAR'),
    buyerController.viewCarById
);

export const buyerRouter = router;
