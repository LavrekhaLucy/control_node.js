import {ObjectId} from 'mongoose';
import {CurrencyEnum} from '../enums/currency.enum';

export interface IAd {
    _id: ObjectId;
    userId: ObjectId;
    title: string;
    description: string;
    price: number;
    currency: CurrencyEnum;
    exchangeRate: number;
    priceInUAH: number;
    make: string;
    model: string;
    year: number;
    mileage: number;
    images: string[];
    isPremium: boolean;
    views: number;
    isProfanityChecked: boolean;
    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
}

