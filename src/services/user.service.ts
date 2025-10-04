import {ApiError} from '../errors/api-error';
import {ITokenPayload} from '../interfaces/token.interface';
import {s3Service} from './s3.service';
import {UploadedFile} from 'express-fileupload';
import {IUser, IUserListQuery, IUserListResponse} from '../interfaces/user.interface';
import {userRepository} from '../repositories/user.repository';
import {userPresenter} from '../presenters/user.presenter';
import {FileItemTypeEnum} from '../enums/file-item-type.enum';
import {Types} from 'mongoose';
import {passwordService} from './password.service';


class UserService {
    public async getList(query: IUserListQuery): Promise<IUserListResponse> {
        const [entities, total] = await userRepository.getList(query);
        return userPresenter.toListResDto(entities, total, query);
    }

    public async getById(userId: string): Promise<IUser> {
        const objectId = new Types.ObjectId(userId);
        return await userRepository.findById(objectId);
    }

    public async get(jwtPayload: ITokenPayload): Promise<IUser> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        return  await userRepository.findById(userId);
    }

    public async update(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        return await userRepository.update(userId, dto);
    }

    public async delete(userId: string): Promise<void> {
        const id = new Types.ObjectId(userId);
        await userRepository.delete(id);
    }

    public async uploadAvatar(
        jwtPayload: ITokenPayload,
        file: UploadedFile,
    ): Promise<IUser> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        const user = await userRepository.findById(userId);

        const avatar = await s3Service.uploadFile(
            file,
            FileItemTypeEnum.USER,
            user.id,
        );

        const updatedUser = await userRepository.update(user.id, { avatar });
        if (user.avatar) {
            await s3Service.deleteFile(user.avatar);
        }
        return updatedUser;
    }

    public async deleteAvatar(jwtPayload: ITokenPayload): Promise<IUser> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        const user = await userRepository.findById(userId);

        if (user.avatar) {
            await s3Service.deleteFile(user.avatar);
        }
        return await userRepository.update(user.id, { avatar: null });
    }

    public async createUser(dto: Partial<IUser>): Promise<Omit<IUser, 'password'>> {
        if (!dto.password) {
            throw new ApiError('Password is required', 400);
        }

        const hashedPassword = await passwordService.hashPassword(dto.password);

        const user = await userRepository.create({
            ...dto,
            password: hashedPassword,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password:_, ...userWithoutPassword } = user.toObject ? user.toObject() : user;

        return userWithoutPassword;
    }



    public async toggleBanUser(userId: string, isBanned: boolean): Promise<IUser> {
        const objectId = new Types.ObjectId(userId);
        return await userRepository.update(objectId, { isDeleted: isBanned });

    }

}

export const userService = new UserService();