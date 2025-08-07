import {NextFunction, Request, Response} from 'express';
import {roleRepository} from '../repositories/role.repository';
import {UserRole} from "../enums/enum-user-role";


class RoleController {
    async getAllRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const roles = await roleRepository.getAll();
            res.json(roles);
        } catch (e) {
            next(e);
        }
    }

    async getRoleById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const role = await roleRepository.getById(id);
            res.json(role);
        } catch (e) {
            next(e);
        }
    }

    async createRole(req: Request, res: Response, next: NextFunction) {
        try {
            const role = await roleRepository.create(req.body);
            res.status(201).json(role);
        } catch (e) {
            next(e);
        }
    }

    async updateRole(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const updatedRole = await roleRepository.update(id, req.body);
            res.json(updatedRole);
        } catch (e) {
            next(e);
        }
    }

    async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            await roleRepository.delete(id);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async getRoleByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.params.name as UserRole;
            const role = await roleRepository.getByName(name);
            res.json(role);
        } catch (e) {
            next(e);
        }
    }
}

export const roleController = new RoleController();


