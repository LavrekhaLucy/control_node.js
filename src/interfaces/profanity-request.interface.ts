import { Request } from 'express';

export interface ProfanityRequest extends Request {
    hasProfanity?: boolean;
}
