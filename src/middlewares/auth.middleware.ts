import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../errors/api-error';
import {userRepository} from '../repositories/user.repository';

class AuthMiddleware {
    public authenticate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) throw new ApiError('No token provided', 401);

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { id: string };

            const user = await userRepository.findById(decoded.id);

            if (!user) throw new ApiError('User not found', 404);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    };
}

export const authMiddleware = new AuthMiddleware();

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { userRepository } from '../repositories/user.repository';
// import { ApiError } from '../errors/api-error'; // implement simple ApiError class
//
// export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const header = req.headers.authorization;
//         if (!header?.startsWith('Bearer ')) return next(new ApiError('No token', 401));
//         const token = header.split(' ')[1];
//         const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'secret') as { id: string };
//         const user = await userRepository.findById(payload.id);
//         if (!user) return next(new ApiError('User not found', 401));
//         req.user = user;
//         next();
//     } catch (e) {
//         next(e);
//     }
// };