import { User } from "../models/user.model";
import { IUser } from "../interfaces/user-interface";
import {HydratedDocument} from "mongoose";

class UserRepository {
    public async create(dto: Partial<IUser>): Promise<HydratedDocument<IUser>> {
        return User.create(dto);
    }

    public async findById(id: string):Promise<HydratedDocument<IUser> | null> {
        return User.findById(id).populate("roles");
    }

    public async findByEmail(email: string):Promise<HydratedDocument<IUser> | null> {
        return User.findOne({ email }).populate("roles");
    }

    public async findAll(): Promise<HydratedDocument<IUser>[]>{
        return User.find().populate("roles");
    }

    public async update(id: string, dto: Partial<IUser>):Promise<HydratedDocument<IUser>> {
        return User.findByIdAndUpdate(id, dto, { new: true });
    }

    public async delete(id: string):Promise<void> {
        await User.findByIdAndDelete(id);
    }
}

export const userRepository = new UserRepository();
