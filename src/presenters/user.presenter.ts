import {
    IUser,
    IUserListQuery,
    IUserListResponse,
    IUserResponse,
} from '../interfaces/user.interface';
import {configs} from '../configs/config';

class UserPresenter {
    public toPublicResDto(entity: IUser): IUserResponse {
        return {
            _id: entity._id,
            name: entity.name,
            email: entity.email,
            accountType: entity.accountType,
            roles: entity.roles,
            avatar: entity.avatar
                ? `${configs.AWS_S3_ENDPOINT}/${entity.avatar}`
                : null,
            isDeleted: entity.isDeleted,
            isVerified: entity.isVerified,
        };
    }

    public toListResDto(entities: IUser[], total: number, query: IUserListQuery,): IUserListResponse {
            return {
            data: entities.map(this.toPublicResDto),
            total,
            limit: Number(query.limit) || 10,
                page: Number(query.page) || 1,
                search: query.search,
                order: query.order,
                orderBy: query.orderBy,
        };
    }
   }

export const userPresenter = new UserPresenter();