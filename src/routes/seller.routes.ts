import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { sellerController } from '../controllers/seller.controller';
import {requirePermission} from "../middlewares/require-permission";


const router = Router();

// Створення оголошення — потрібен пермішн CREATE_CAR
router.post(
    '/cars',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_CAR'),
    sellerController.createCar
);

// Редагування оголошення — пермішн UPDATE_CAR
router.put(
    '/cars/:id',
    authMiddleware.checkAccessToken,
    requirePermission('EDIT_CAR'),
    sellerController.updateCar
);

// Видалення оголошення — пермішн DELETE_CAR
router.delete(
    '/cars/:id',
    authMiddleware.checkAccessToken,
    requirePermission('DELETE_CAR'),
    sellerController.deleteCar
);

export const sellerRouter = router;
