import {authMiddleware} from '../middlewares/auth.middleware';
import {roleMiddleware} from '../middlewares/role.middleware';
import {Router} from 'express';
import {RoleEnum} from '../enums/role.enum';
import {userController} from '../controllers/user.controller';
import {adController} from '../controllers/ad.controller';
import {commonMiddleware} from '../middlewares/common.middleware';
import {changePasswordSchema, signInSchema, updateUserSchema} from '../validators/user.validator';
import { userMiddleware } from '../middlewares/user.middleware';
import {authController} from '../controllers/auth.controller';
import {ActionTokenTypeEnum} from '../enums/action-token-type.enum';


const router = Router();

router.post(
    '/sign-up',
    commonMiddleware.isBodyValid(updateUserSchema),
    userMiddleware.isEmailExist,
    authController.signUp,
);

router.post(
    '/sign-in',
    commonMiddleware.isBodyValid(signInSchema),
    authController.signIn
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken,
);

router.post('/forgot-password',
    authController.forgotPasswordSendEmail);

router.put(
    '/forgot-password',
    authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
    authController.forgotPasswordSet
);

router.post(
    '/change-password',
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(changePasswordSchema),
    authController.changePassword,
);
/////////////////////////////////////////////
router.get('/admin-only',
    authMiddleware.checkAccessToken,
    roleMiddleware.isAdmin(),
    // controller.adminMethod
    );

router.post(
    '/managers-or-admins',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkRole(RoleEnum.MANAGER, RoleEnum.ADMIN),
    adController.getAd,
    // controller.createSomething
);
router.delete('/user/:id',
    authMiddleware.checkAccessToken,
    roleMiddleware.isAdmin(),
    userController.deleteUser);

export default router;

