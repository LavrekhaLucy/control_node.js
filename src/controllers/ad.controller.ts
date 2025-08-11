import {NextFunction, Request, Response} from 'express';
import {adService, AdService} from '../services/ad.service';
import {ApiError} from '../errors/api-error';



export class AdController {
    constructor(private adService: AdService) {}

    createAd = async (req: Request, res: Response, next:NextFunction) => {
        try {
            const result = await this.adService.createAd(req.body);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    };

    getAd = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const result = await this.adService.getAd(req.params.id);
            if (!result)
                throw new ApiError( 'No ads found.',404 );
            res.json(result);
        }catch (e) {
            next(e);
        }

    };

    getAllAds = async ( req:Request, res: Response, next: NextFunction) => {
        try{
        const result = await this.adService.getAllAds();
        res.json(result);
    } catch (e) {
        next(e);
    }
    };
}
export  const  adController = new AdController(adService);
