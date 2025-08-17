import {Router} from 'express';
import {commonMiddleware} from '../middlewares/common.middleware';
import {changePasswordSchema, signInSchema, userBodySchema} from '../validators/user.validator';
import {userMiddleware} from '../middlewares/user.middleware';
import {authController} from '../controllers/auth.controller';
import {authMiddleware} from '../middlewares/auth.middleware';
import {ActionTokenTypeEnum} from '../enums/action-token-type.enum';


const router = Router();

router.post('/sign-up/buyer',
    commonMiddleware.isBodyValid(userBodySchema),
    userMiddleware.isEmailExist,
    authController.signUp);

router.post('/sign-up/seller',
    commonMiddleware.isBodyValid(userBodySchema),
    userMiddleware.isEmailExist,
    authController.signUp);


router.post(
    '/sign-in/seller',
    commonMiddleware.isBodyValid(signInSchema),
    authController.signIn
);
router.post(
    '/sign-in/buyer',
    commonMiddleware.isBodyValid(signInSchema),
    authController.signIn
);
router.post(
    '/sign-in/admin',
    commonMiddleware.isBodyValid(signInSchema),
    authController.signIn
);
router.post(
    '/sign-in/manager',
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

export const authRoutes = router;

