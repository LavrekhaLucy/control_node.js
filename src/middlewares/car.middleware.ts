import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user-interface';
import { ApiError } from '../errors/api-error';
import { AccountType } from '../enums/account-type.enum';
import { Types } from 'mongoose';
import { RoleEnum } from '../enums/role.enum';
import {carRepository} from '../repositories/car.repository';
import {hasPermission} from '../services/permission.service';
import {containsProfanity} from '../utils/check-profanity';
import {AdStatusEnum} from '../enums/ad-status.enum';

export class CarMiddleware {

    public async checkCreatePermission(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            if (!user) throw new ApiError('Unauthorized', 401);
            if (user.accountType === AccountType.BASE) {
                const count = await carRepository.countActiveBySeller(user._id);
                if (count >= 1) throw new ApiError('Base account allows only 1 active ad', 403);
            }
            const hasCreatePermission = await hasPermission(user._id.toString(), 'CREATE_CAR');
            if (!hasCreatePermission) throw new ApiError('You do not have permission to create a car', 403);

            next();
        } catch (err) {
            next(err);
        }
    }

    public async checkEditPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            if (!user) throw new ApiError('Unauthorized', 401);
            const {id} = req.params;
            if (!id) throw new ApiError('Car ID is required', 400);
            const hasEditPermission = await hasPermission(user._id.toString(), 'EDIT_CAR');
            if (!hasEditPermission) throw new ApiError('You do not have permission to edit this car', 403);

            next();
        } catch (err) {
            next(err);
        }
    }


    public async checkAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            if (!user) throw new ApiError('Unauthorized', 401);

            const isAdmin = user.roles.some(r => {
                if (r instanceof Types.ObjectId) {
                    return r.equals(new Types.ObjectId(RoleEnum.ADMIN));
                } else {
                    return r.name === RoleEnum.ADMIN;
                }
            });
            if (!isAdmin) throw new ApiError('Forbidden', 403);

            next();
        } catch (err) {
            next(err);
        }
    }

    public async checkPremiumAccess(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            if (!user) throw new ApiError('Unauthorized', 401);
            if (user.accountType !== AccountType.PREMIUM) {
                throw new ApiError('Access denied: Premium account required', 403);
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    public async filterActiveAds(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as IUser;
            if (!user) throw new ApiError('Unauthorized', 401);
            if (user.accountType !== AccountType.PREMIUM) {
                req.query.adStatus = 'ACTIVE';
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    public async checkProfanity(req: Request, res: Response, next: NextFunction) {
        try {
            const {title, description} = req.body;
            const text = `${title} ${description}`;
            const {hasProfanity, words} = containsProfanity(text);
            if (hasProfanity) {
                req.body.hasProfanity = true;
                req.body.profaneWords = words;
                req.body.adStatus = AdStatusEnum.PENDING;
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}

export const carMiddleware = new CarMiddleware();
