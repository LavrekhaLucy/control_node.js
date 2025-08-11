import { ObjectId } from 'mongoose';
import {CurrencyEnum} from '../enums/currency.enum';
import {IUser} from './user-interface';

export interface IAd {
    _id: ObjectId;
    userId: ObjectId;

    title: string;
    description: string;
    price: number;
    currency: CurrencyEnum;
    exchangeRate: number;
    priceInUAH: number;
    owner: IUser['_id'];
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
//
// import { Document } from 'mongoose';
// import {Currency, CurrencyEnum} from '../enums/currency.enum';
// import { IUser } from './user.interface';
//
// export interface IAd extends Document {
//     title: string;
//     description: string;
//     price: number;             // ціна, яку ввів користувач
//     currency: Currency;        // валюта, яку вибрав користувач
//     exchangeRate: number;      // курс на момент створення
//     priceInUAH: number;         // перерахована ціна в гривнях
//     owner: IUser['_id'];       // власник оголошення
//     createdAt: Date;
//     updatedAt: Date;
// }
