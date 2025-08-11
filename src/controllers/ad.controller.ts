import {NextFunction, Request, Response} from 'express';
import {adService, AdService} from '../services/ad.service';
import {ApiError} from '../errors/api-error';
import {ProfanityRequest} from '../interfaces/profanity-request.interface';



export class AdController {
    constructor(private adService: AdService) {}

    createAd = async (req: ProfanityRequest, res: Response, next:NextFunction) => {
        try {

            const status = req.hasProfanity ? 'pending_edit' : 'active';
            const result = await this.adService.createAd({...req.body, status});
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    };

    // async createAd(req, res, next) {
    //     try {
    //
    //         const ad = await adService.createAd({ ...req.body, status });
    //         res.status(201).json(ad);
    //     } catch (err) {
    //         next(err);
    //     }
    // }

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
