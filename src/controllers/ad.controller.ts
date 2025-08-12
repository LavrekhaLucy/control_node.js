import {NextFunction, Request, Response} from 'express';
import {adService, AdService} from '../services/ad.service';
import {ApiError} from '../errors/api-error';
import {ProfanityRequest} from '../interfaces/profanity-request.interface';



export class AdController {
    constructor(private adService: AdService) {}

   async createAd (req: ProfanityRequest, res: Response, next:NextFunction)  {
        try {

            const status = req.hasProfanity ? 'pending_edit' : 'active';
            const result = await this.adService.createAd({...req.body, status});
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    };


    async  getAd (req: Request, res: Response, next: NextFunction)  {
        try{
            const result = await this.adService.getAd(req.params.id);
            if (!result)
                throw new ApiError( 'No ads found.',404 );
            res.json(result);
        }catch (e) {
            next(e);
        }

    };

    async getAllAds  ( req:Request, res: Response, next: NextFunction)  {
        try{
        const result = await this.adService.getAllAds();
        res.json(result);
    } catch (e) {
        next(e);
    }
    };
}
export  const  adController = new AdController(adService);
