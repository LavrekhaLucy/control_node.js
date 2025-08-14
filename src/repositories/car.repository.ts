import { Car } from '../models/car.model';
import { ICar } from '../interfaces/car-interface';
import mongoose, {FilterQuery, HydratedDocument} from 'mongoose';

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
    public async findById(id: string):Promise<HydratedDocument<ICar>| null> {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return null;
        }
        return Car.findById(id);
    }
    public find(query: FilterQuery<ICar>) {
        return Car.find(query);
    }
}
export const carRepository = new CarRepository();

