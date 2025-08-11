import {containsProfanity} from '../utils/check-profanity';
import {ProfanityRequest} from '../interfaces/profanity-request.interface';
import {NextFunction} from 'express';

export function profanityMiddleware(req: ProfanityRequest, res: Response, next: NextFunction) {
    const { title, description } = req.body;
    req.hasProfanity =
        containsProfanity(title || '') || containsProfanity(description || '');
    next();
}