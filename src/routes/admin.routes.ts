import { authMiddleware } from '../middlewares/auth.middleware';
import { adminController } from '../controllers/admin.controller';
import {Router} from 'express';
import {requirePermissionMiddleware} from '../middlewares/require-permission';
import {PermissionEnum} from '../enums/permission.enum';
import {roleController} from '../controllers/role.controller';
import {validateAssignRoleMiddleware} from '../middlewares/validate-assign-role.middleware';

const router = Router();


router.post(
    '/assign',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.CREATE_MANAGER),
    validateAssignRoleMiddleware,
    roleController.assignRole
);


router.post(
    '/:userId/ban',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.BAN_USER),
    adminController.banUser
);

router.post(
    '/:userId/unban',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.UNBAN_USER),
    adminController.unbanUser
);

router.delete(
    '/:userId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.DELETE_USER),
    adminController.deleteUser
);

router.get(
    '/',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.VIEW_USERS),
    adminController.listUsers
);

export const adminRoutes = router;
