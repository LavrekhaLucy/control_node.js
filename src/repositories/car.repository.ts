import { Car } from '../models/car.model';
import { ICar } from '../interfaces/car-interface';
import { HydratedDocument } from 'mongoose';

class CarRepository {
    public async create(dto: Partial<ICar>): Promise<HydratedDocument<ICar>> {
        return Car.create(dto);
    }
    public async update(id: string, dto: Partial<ICar>): Promise<HydratedDocument<ICar> | null> {
        return Car.findByIdAndUpdate(id, dto, { new: true });
    }
    public async countActiveBySeller(sellerId: string): Promise<number> {
        return Car.countDocuments({ sellerId, adStatus: 'active' });
    }
    public async findById(id: string) {
        return Car.findById(id);
    }
}
export const carRepository = new CarRepository();
