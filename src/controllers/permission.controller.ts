// import {NextFunction, Request, Response} from 'express';
// import {permissionRepository} from '../repositories/permission.repository';
//
//
// class PermissionController {
//     async createPermission(req: Request, res: Response, next: NextFunction) {
//         try {
//             const permission = await permissionRepository.create(req.body);
//             res.status(201).json(permission);
//         } catch (e) {
//             next(e);
//         }
//
//     }
//
//     async getAllPermissions(req: Request, res: Response, next: NextFunction) {
//         try {
//             const permissions = await permissionRepository.getAll();
//             res.json(permissions);
//         } catch (e) {
//             next(e);
//         }
//
//     }
//
//     async getPermissionById(req: Request, res: Response, next: NextFunction) {
//         try {
//             const permission = await permissionRepository.getById(req.params.id);
//             if (!permission) return res.status(404).json({message: 'Permission not found'});
//             res.json(permission);
//         } catch (e) {
//             next(e);
//         }
//
//     }
//
//     async updatePermission(req: Request, res: Response, next: NextFunction) {
//         try {
//             const permission = await permissionRepository.update(req.params.id, req.body);
//             res.json(permission);
//         } catch (e) {
//             next(e);
//         }
//
//     }
//
//     async deletePermission(req: Request, res: Response, next: NextFunction) {
//         try {
//             await permissionRepository.delete(req.params.id);
//             res.status(204).send();
//         } catch (e) {
//             next(e);
//         }
//
//     }
// }
//
// export const permissionController = new PermissionController();
