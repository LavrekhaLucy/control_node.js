import { NextFunction, Request, Response } from 'express';
import { roleService } from '../services/role.service';

class RoleController {
    public async assignRole(req: Request, res: Response, next: NextFunction) {
        try {
            const { userToAssign, roleToAssign } = res.locals;

            const updatedUser = await roleService.assignRole(
                userToAssign._id.toString(),
                roleToAssign._id.toString()
            );

            res.status(200).json({
                message: `Role ${roleToAssign.name} assigned successfully`,
                user: updatedUser,
            });
        } catch (err) {
            next(err);
        }
    }
}

export const roleController = new RoleController();
