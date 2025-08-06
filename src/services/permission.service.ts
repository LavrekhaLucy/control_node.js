import {User} from '../models/user.model';
import {IRole} from '../interfaces/role-interface';
import {IPermission} from '../interfaces/permission-interface';
import {IUser} from '../interfaces/user-interface';



export const hasPermission = async (
    userId: string,
    permissionCode: string,
    orgId?: string
): Promise<boolean> => {
    const user = await User.findById(userId).populate({
        path: 'roles',
        match: orgId ? { organizationId: orgId } : {},
        populate: {
            path: 'permissions',
        },
    });

    if (!user) return false;


    const populatedUser = user as IUser & {
        roles: (IRole & { permissions: IPermission[] })[];
    };

    for (const role of populatedUser.roles) {
        for (const permission of role.permissions) {
            if (permission.code === permissionCode) {
                return true;
            }
        }
    }
    return false;

};





