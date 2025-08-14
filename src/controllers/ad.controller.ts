import { Request, Response, NextFunction } from 'express';
import { adService } from '../services/ad.service';

class AdController {
    async createAd(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const adData = { ...req.body, userId: user._id }; // додаємо userId в DTO
            const ad = await adService.createAd(adData); // один аргумент
            res.status(201).json(ad);
        } catch (e) {
            next(e);
        }
    }
    async updateAd(req: Request, res: Response, next: NextFunction) {
        try {
            const { adId } = req.params;
            const updated = await adService.updateAd(adId, req.body);
            res.json(updated);
        } catch (e) {
            next(e);
        }
    }

    async deleteAd(req: Request, res: Response, next: NextFunction) {
        try {
            const { adId } = req.params;
            await adService.deleteAd(adId);
            res.json({ message: `Ad ${adId} deleted` });
        } catch (e) {
            next(e);
        }
    }
}

export const adController = new AdController();
