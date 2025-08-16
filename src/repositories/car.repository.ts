import {Car} from '../models/car.model';
import {ICar} from '../interfaces/car-interface';
import mongoose, {FilterQuery, HydratedDocument, Types} from 'mongoose';
import {ObjectId} from '../types/common';
import {AdStatusEnum} from '../enums/ad-status.enum';

export class CarRepository {

    public async create(dto: Partial<ICar>): Promise<HydratedDocument<ICar>> {
        return Car.create(dto);
    }



    public async findAll(filters: FilterQuery<ICar> = {}): Promise<ICar[]> {
        return Car.find(filters);
    }


    public async findById(id: string): Promise<HydratedDocument<ICar> | null> {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return null;
        return Car.findById(id);

    }


    // public async findByIdAndUpdate(
    //     id: string,
    //     dto: Partial<ICar>,
    //     incrementEditAttempts = false
    // ): Promise<HydratedDocument<ICar> | null> {
    //     if (!id || !Types.ObjectId.isValid(id)) return null;
    //
    //     const update: UpdateQuery<ICar> = { ...dto };
    //
    //
    //     if (incrementEditAttempts) {
    //         update.$inc = { editAttempts: 1 };
    //     }
    //
    //     return Car.findByIdAndUpdate(id, update, { new: true });
    // }

    public findQuery(filters: FilterQuery<ICar> = {}) {
        return Car.find({ ...filters, isDeleted: false });
    }

    public async countActiveBySeller(sellerId: ObjectId | string): Promise<number> {
        const id = typeof sellerId === 'string' ? new Types.ObjectId(sellerId) : sellerId;
        return Car.countDocuments({
            sellerId: id,
            adStatus: AdStatusEnum.ACTIVE // тільки опубліковані
        });
    }

    public async delete(id: string): Promise<void> {
        if (!id || !Types.ObjectId.isValid(id)) return;
        await Car.findByIdAndUpdate(id, { isDeleted: true });
    }


}

export const carRepository = new CarRepository();

