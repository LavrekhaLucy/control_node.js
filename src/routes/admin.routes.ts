import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/require-permission';
import { adminController } from '../controllers/admin.controller';

const router = Router();

router.post(
    '/managers',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_MANAGER'),
    adminController.createManager
);

router.post(
    '/ban/:userId',
    authMiddleware.checkAccessToken,
    requirePermission('BAN_USER'),
    adminController.banUser
);

export const adminRouter = router;
