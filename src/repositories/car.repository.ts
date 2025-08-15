import { Car } from '../models/car.model';
import { ICar } from '../interfaces/car-interface';
import mongoose, {FilterQuery, HydratedDocument, Types} from 'mongoose';
import {ObjectId} from '../types/common';

export class CarRepository {

    public async create(dto: Partial<ICar>): Promise<HydratedDocument<ICar>> {
        return Car.create(dto);
    }

    public async findById(id: string): Promise<HydratedDocument<ICar> | null> {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return null;
        return Car.findById(id);

    }

    public async findByIdAndUpdate(id: string, dto: Partial<ICar>): Promise<HydratedDocument<ICar> | null> {
        if (!id || !Types.ObjectId.isValid(id)) return null;
        return Car.findByIdAndUpdate(id, dto, { new: true });
    }

    public findQuery(filters: FilterQuery<ICar> = {}) {
        return Car.find({ ...filters, isDeleted: false });
    }
    public async countActiveBySeller(sellerId: ObjectId | string): Promise<number> {
        const id = typeof sellerId === 'string' ? new Types.ObjectId(sellerId) : sellerId;
        return Car.countDocuments({ sellerId: id, isDeleted: false });
    }

    public async delete(id: string): Promise<void> {
        if (!id || !Types.ObjectId.isValid(id)) return;
        await Car.findByIdAndUpdate(id, { isDeleted: true });
    }

}

export const carRepository = new CarRepository();

