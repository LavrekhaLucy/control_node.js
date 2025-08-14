import { Request, Response, NextFunction } from 'express';
import { carService } from '../services/car.service';
import {CarFilters} from '../interfaces/car-filters.interface';

class BuyerController {
    async viewCars(req: Request, res: Response, next: NextFunction) {
        try {
            const { brand, minPrice, maxPrice, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;

            const filters: CarFilters = { isPublished: true };

            if (brand) filters.brand = String(brand);
            if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) };
            if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };

            const skip = (Number(page) - 1) * Number(limit);

            const cars = await carService.findCars(filters, {
                sort: { [sortBy as string]: order === 'asc' ? 1 : -1 },
                skip,
                limit: Number(limit),
            });

            res.json(cars);
        } catch (e) {
            next(e);
        }
    }
}

export const buyerController = new BuyerController();
