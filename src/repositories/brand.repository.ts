import { Brand } from '../models/brand.model';
import { IBrand } from '../interfaces/brand-interface';
import { HydratedDocument } from 'mongoose';
import {ICar} from '../interfaces/car-interface';

class BrandRepository {
    public async getAll(): Promise<HydratedDocument<IBrand>[]> {
        return Brand.find();
    }
    public async findByName(name: string): Promise<HydratedDocument<ICar> | null>{
        return Brand.findOne({ name });
    }
    public async create(dto: Partial<IBrand>): Promise<HydratedDocument<IBrand>> {
        return Brand.create(dto);
    }
}
export const brandRepository = new BrandRepository();
