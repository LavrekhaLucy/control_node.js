
import { IBrand } from '../interfaces/brand-interface';
import { HydratedDocument } from 'mongoose';
import {ICar} from '../interfaces/car-interface';
import {BrandModel} from '../models/brand.model';

class BrandRepository {
    public async getAll(): Promise<HydratedDocument<IBrand>[]> {
        return BrandModel.find();
    }
    public async findByName(name: string): Promise<HydratedDocument<ICar> | null>{
        return BrandModel.findOne({ name });
    }
    public async create(dto: Partial<IBrand>): Promise<HydratedDocument<IBrand>> {
        return BrandModel.create(dto);
    }
}
export const brandRepository = new BrandRepository();


