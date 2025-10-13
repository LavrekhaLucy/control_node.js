import {ApiError} from '../errors/api-error';
import {ITokenPair, ITokenPayload} from '../interfaces/token.interface';
import {passwordService} from './password.service';
import {tokenService} from './token.service';
import {userService} from './user.service';
import {TokenTypeEnum} from '../enums/token-type.enum';
import {emailService} from './email.service';
import {EmailTypeEnum} from '../enums/email-type.enum';
import {ActionTokenTypeEnum} from '../enums/action-token-type.enum';
import {IChangePassword, IResetPasswordSend, IResetPasswordSet, ISignIn, IUser} from '../interfaces/user.interface';
import {userRepository} from '../repositories/user.repository';
import {tokenRepository} from '../repositories/token.repository';
import {actionTokenRepository} from '../repositories/action-token.repository';
import {oldPasswordRepository} from '../repositories/old-password.repository';
import {Types} from 'mongoose';
import {mapRolesToEnum} from '../utils/map-roles-to-enum';
import {configs} from '../configs/config';
import {Role} from '../models/role.model';
import {AccountType} from '../enums/account-type.enum';
import {IRole} from '../interfaces/role.interface';

export interface ISignUpDTO {
    name: string;
    email: string;
    password: string;
    age: number;
    roles?: ('buyer' | 'seller')[];
    accountType?: 'base' | 'premium';
}
class AuthService {

    public async signUp(dto: ISignUpDTO): Promise<{ user: IUser; tokens: ITokenPair }> {
        const password = await passwordService.hashPassword(dto.password);

        let rolesToAssign: IRole[] = [];
        if (dto.roles && dto.roles.length > 0) {
            rolesToAssign = await Role.find({ name: { $in: dto.roles } });
            if (rolesToAssign.length !== dto.roles.length)
                throw new Error('One or more roles not found');
        } else {
            const defaultRole = await Role.findOne({ name: 'buyer' });
            if (!defaultRole) throw new Error('Default role buyer not found');
            rolesToAssign = [defaultRole];
        }

        const user = await userRepository.create({
            ...dto,
            password,
            roles: rolesToAssign.map(r => r._id),
            accountType: dto.accountType === 'premium' ? AccountType.PREMIUM : AccountType.BASE,
        });
        await user.populate('roles');

        const rolesEnum = await mapRolesToEnum(user.roles);

        const tokens = tokenService.generateTokens({
            userId: user._id.toString(),
            roles: rolesEnum,
            name: user.name,
            email: user.email,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });


        const verificationToken = tokenService.generateActionTokens(
            {
                userId: user._id.toString(),
                roles: rolesEnum,
                email: user.email,
                name: user.name,
            },
            ActionTokenTypeEnum.VERIFY_EMAIL
        );
        await actionTokenRepository.create({
            _userId: user._id,
            token: verificationToken,
            type: ActionTokenTypeEnum.VERIFY_EMAIL,
        });


        const verificationLink = `${configs.APP_FRONT_URL}/auth/verify-email?token=${verificationToken}`;
        await emailService.sendMail(
            EmailTypeEnum.VERIFY_EMAIL,
            user.email,
            { name: user.name, verifyLink: verificationLink }
        );

        return { user, tokens };
    }


    public async signIn(dto: ISignIn,): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.findByEmail(dto.email);
        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const isPasswordCorrect = await passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!isPasswordCorrect) {
            throw new ApiError('Invalid credentials', 401);
        }
        const rolesEnum = await mapRolesToEnum(user.roles);

        const tokens = tokenService.generateTokens({
            userId: user._id.toString(),
            roles: rolesEnum,
            name: user.name,
            email: user.email,
        });
        await tokenRepository.create({...tokens, _userId: user._id});

        const userData = user.toObject ? user.toObject() : user;
        delete userData.password;

        return { user: userData, tokens };
        // return {user, tokens};
    }

    public async refreshToken(refreshToken: string): Promise<ITokenPair> {

        const payload = tokenService.verifyToken(refreshToken, TokenTypeEnum.REFRESH);

        const tokenFromDB = await tokenRepository.findByParams({refreshToken});

        if (!tokenFromDB) {
            throw new ApiError('Invalid refresh token', 401);
        }

        const user = await userService.getById(payload.userId);

        const rolesEnum = await mapRolesToEnum(user.roles);

        const newTokens = tokenService.generateTokens({
            userId: user._id.toString(),
            roles: rolesEnum,
            name: user.name,
            email: user.email,
        });


        await tokenRepository.create({...newTokens, _userId: user._id});

        return newTokens;
    }

    public async logout(refreshToken: string): Promise<void> {

        const token = await tokenRepository.findByParams({refreshToken});
        if (!token) throw new ApiError('Refresh token not found', 404);

        await tokenRepository.deleteByParams({refreshToken});
    }

    public async logoutAll(userId: string): Promise<void> {
        const objectId = new Types.ObjectId(userId);
        const result = await tokenRepository.deleteByParams({_userId: objectId});
        console.log(`Deleted ${result} tokens for user ${userId}`);
    }

    public async forgotPasswordSendEmail(dto: IResetPasswordSend): Promise<void> {
        const user = await userRepository.findByEmail(dto.email);
        if (!user) {
            throw new ApiError('User not found', 404);
        }
        const rolesEnum = await mapRolesToEnum(user.roles);

        const token = tokenService.generateActionTokens(
            {
                userId: user._id.toString(),
                roles: rolesEnum,
                email: user.email,
                name: user.name,
            },
            ActionTokenTypeEnum.FORGOT_PASSWORD,
        );
        await actionTokenRepository.create({
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
            _userId: user._id,
            token,
        });

        await emailService.sendMail(EmailTypeEnum.FORGOT_PASSWORD,
            // 'lavreha7@gmail.com',
            user.email,
            {
                name: user.name,
                email: user.email,
                actionToken: token,
            });
    }

    public async forgotPasswordSet(dto: IResetPasswordSet, jwtPayload: ITokenPayload): Promise<void> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        const password = await passwordService.hashPassword(dto.password);

        await userRepository.update(userId, {password});

        await actionTokenRepository.deleteManyByParams({
            _userId: userId,
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
        });
        await tokenRepository.deleteByParams({_userId: userId});
    }


    public async verifyEmail(jwtPayload: ITokenPayload): Promise<void> {
        const userId = new Types.ObjectId(jwtPayload.userId);

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        if (user.isVerified) {
            throw new ApiError('Email already verified', 400);
        }

        await userRepository.update(userId, {isVerified: true});

        await actionTokenRepository.deleteManyByParams({
            _userId: userId,
            type: ActionTokenTypeEnum.VERIFY_EMAIL,
        });

        console.log(` Email verified for ${user.email}`);
    }


    public async changePassword(jwtPayload: ITokenPayload, dto: IChangePassword,): Promise<void> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        const user = await userRepository.findById(userId);
        const oldPasswords = await oldPasswordRepository.findByParams(userId);
        const isPasswordCorrect = await passwordService.comparePassword(
            dto.oldPassword,
            user.password,
        );
        if (!user || !user.password) {
            throw new ApiError('User or password not found', 404);
        }
        if (!isPasswordCorrect) {
            throw new ApiError('Invalid previous password', 401);
        }
        const passwords = [...oldPasswords, {password: user.password}];
        await Promise.all(
            passwords.map(async (oldPassword) => {
                const isPrevious = await passwordService.comparePassword(dto.password, oldPassword.password);
                if (isPrevious) {
                    throw new ApiError('This password was already used', 400);
                }
            }),
        );
        const password = await passwordService.hashPassword(dto.password);

        await userRepository.update(userId, {password});
        await oldPasswordRepository.create({
            _userId: userId,
            password: user.password
        });
        await tokenRepository.deleteByParams({_userId: userId});
    }
}

export const authService = new AuthService();
