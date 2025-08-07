// import router from "./role.router";
//
// import {UserRole} from "../enums/enum-user-role";
// import {authMiddleware} from "../middlewares/auth.middleware";
// import {roleMiddleware} from "../middlewares/role.middleware";
//
//
// router.get('/admin-only', authMiddleware, roleMiddleware.isAdmin(), controller.adminMethod);
//
// router.post(
//     '/managers-or-admins',
//     authMiddleware,
//     roleMiddleware.checkRole(UserRole.MANAGER, UserRole.ADMIN),
//     controller.createSomething
// );
