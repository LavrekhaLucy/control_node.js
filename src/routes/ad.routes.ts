import { Router } from 'express';
import { adController } from '../controllers/ad.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {requirePermission} from '../middlewares/require-permission';


const adRouter = Router();

adRouter.post(
    '/',
    authMiddleware.checkAccessToken,
    requirePermission('CREATE_AD'),
    adController.createAd
);

adRouter.put(
    '/:adId',
    authMiddleware.checkAccessToken,
    requirePermission('EDIT_AD'),
    adController.updateAd
);

adRouter.delete(
    '/:adId',
    authMiddleware.checkAccessToken,
    requirePermission('DELETE_AD'),
    adController.deleteAd
);

export { adRouter };
