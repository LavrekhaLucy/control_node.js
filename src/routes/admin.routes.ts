import { authMiddleware } from '../middlewares/auth.middleware';
import { adminController } from '../controllers/admin.controller';
import {Router} from 'express';
import {requirePermissionMiddleware} from '../middlewares/require-permission';
import {PermissionEnum} from '../enums/permission.enum';
import {roleController} from '../controllers/role.controller';
import {validateAssignRoleMiddleware} from '../middlewares/validate-assign-role.middleware';

const router = Router();



router.get(
    '/',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.ALL),
    adminController.listUsers
);

router.post(
    '/assign',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware('all'),
    validateAssignRoleMiddleware,
    roleController.assignRole
);

router.patch(
    '/ban/:userId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware('ban_user'),
    adminController.banUser
);

router.post(
    '/unban/:userId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware('unban_user'),
    adminController.unbanUser
);

router.delete(
    '/:userId',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware('delete_user'),
    adminController.deleteUser
);



export const adminRoutes = router;

