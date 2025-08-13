import { ObjectId } from '../types/common';
import {CurrencyEnum} from '../enums/currency.enum';
import {AdStatusEnum} from '../enums/ad-status.enum';


export interface ICar {
    _id?: ObjectId;
    title: string;
    description?: string;
    brand: string;
    model: string[];
    sellerId: ObjectId;
    currency: CurrencyEnum;
    price: number;
    priceUAH?: number;
    priceUSD?: number;
    priceEUR?: number;
    priceSource?: string;
    adStatus: AdStatusEnum;
    hasProfanity?: boolean;
    profaneWords?: string[];
    editAttempts?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
