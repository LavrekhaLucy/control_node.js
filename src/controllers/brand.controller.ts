
import { Request, Response, NextFunction } from 'express';
import { brandRepository } from '../repositories/brand.repository';

class BrandController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await brandRepository.getAll();
            res.json(brands);
        } catch (e) {
            next(e);
        }
    }

    async requestNewBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            if (!name) return res.status(400).json({ message: 'Brand name is required' });

            await brandRepository.create(name);
            res.status(201).json({ message: 'Brand added successfully' });
        } catch (e) {
            next(e);
        }
    }
}

export const brandController = new BrandController();
