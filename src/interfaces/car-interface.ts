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
    priceRate?: number;
    adStatus: AdStatusEnum;
    hasProfanity?: boolean;
    profaneWords?: string[];
    editAttempts?: number;
    views: Array<{ date: Date }>;
    region: string;
    createdAt?: Date;
    updatedAt?: Date;
}
// export interface ICar extends Document {
//     title: string;
//     description: string;
//     brand: string;
//     model: string;
//     price: number;
//     currency: "USD" | "EUR" | "UAH";
//     convertedPriceUSD?: number;
//     convertedPriceEUR?: number;
//     convertedPriceUAH?: number;
//     priceRate?: number;
//     sellerId: Types.ObjectId;
//     status: "active" | "inactive" | "pending";
//     editAttempts: number;
//     views: Array<{ date: Date }>;
//     region: string;
//     createdAt: Date;
//     updatedAt: Date;
// }
 export interface GetCarsQuery {
    region?: string;
    brand?: string;
    currency?: string;
    minPrice?: string; // з query параметрів завжди string
    maxPrice?: string;
}