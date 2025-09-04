import {Router} from 'express';
import {commonMiddleware} from '../middlewares/common.middleware';
import {signInSchema, userBodySchema} from '../validators/user.validator';
import {userMiddleware} from '../middlewares/user.middleware';
import {authController} from '../controllers/auth.controller';


const router = Router();

router.post('/sign-up',
    commonMiddleware.isBodyValid(userBodySchema),
    userMiddleware.isEmailExist,
    authController.signUp);

router.post(
    '/sign-in',
    commonMiddleware.isBodyValid(signInSchema),
    authController.signIn
);


// Routes на майбутнє:
//
//
// router.post(
//     '/refresh',
//     authMiddleware.checkRefreshToken,
//     authController.refreshToken,
// );
//
// router.post('/forgot-password',
//     authController.forgotPasswordSendEmail);
//
// router.put(
//     '/forgot-password',
//     authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
//     authController.forgotPasswordSet
// );
//
// router.post(
//     '/change-password',
//     authMiddleware.checkAccessToken,
//     commonMiddleware.isBodyValid(changePasswordSchema),
//     authController.changePassword,
// );

export const authRoutes = router;

