import {ApiError} from '../errors/api-error';
import {ITokenPayload} from '../interfaces/token.interface';
import {s3Service} from './s3.service';
import {UploadedFile} from 'express-fileupload';
import {IUser, IUserListQuery, IUserListResponse} from '../interfaces/user-interface';
import {userRepository} from '../repositories/user.repository';
import {userPresenter} from '../presenters/user.presenter';
import {FileItemTypeEnum} from '../enums/file-item-type.enum';
import {Types} from 'mongoose';


class UserService {
    public async getList(query: IUserListQuery): Promise<IUserListResponse> {
        const [entities, total] = await userRepository.getList(query);
        return userPresenter.toListResDto(entities, total, query);
    }

    public async getById(userId: string): Promise<IUser> {
        const objectId = new Types.ObjectId(userId);

        const user = await userRepository.findById(objectId);
        if (!user) {
            throw new ApiError('User not found', 404);
        }
        return user;
    }

    public async get(jwtPayload: ITokenPayload): Promise<IUser> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new ApiError('User not found', 404);
        }
        return user;
    }

    public async update(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        return await userRepository.update(userId, dto);
    }

    public async delete(jwtPayload: ITokenPayload): Promise<void> {
        const userId = new Types.ObjectId(jwtPayload.userId);
        return await userRepository.delete(userId);
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

}

export const userService = new UserService();