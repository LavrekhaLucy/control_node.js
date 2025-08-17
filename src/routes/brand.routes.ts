import { Router } from 'express';
import { brandController } from '../controllers/brand.controller';
import {requirePermissionMiddleware} from '../middlewares/require-permission';
import {PermissionEnum} from '../enums/permission.enum';
import {authMiddleware} from '../middlewares/auth.middleware';

const router = Router();


router.get('/',
    brandController.getAllBrands);


router.post(
    '/suggest',
    authMiddleware.checkAccessToken,
    requirePermissionMiddleware(PermissionEnum.CREATE_CAR),
    brandController.suggestBrand
);
export const brandRoutes = router;
