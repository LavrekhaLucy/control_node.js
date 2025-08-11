import { Brand } from '../models/brand.model';
import { IBrand } from '../interfaces/brand-interface';
import { HydratedDocument } from 'mongoose';

class BrandRepository {
    public async getAll(): Promise<HydratedDocument<IBrand>[]> {
        return Brand.find();
    }
    public async findByName(name: string): Promise<HydratedDocument<IBrand> | null> {
        return Brand.findOne({ name });
    }
    public async create(dto: Partial<IBrand>): Promise<HydratedDocument<IBrand>> {
        return Brand.create(dto);
    }
}
export const brandRepository = new BrandRepository();
