import { Schema, model } from 'mongoose';
import { ICar } from '../interfaces/car-interface';
import {CurrencyEnum} from '../enums/currency.enum';
import {AdStatusEnum} from '../enums/ad-status.enum';


const CarSchema = new Schema<ICar>({
        title: { type: String, required: true },
    description: { type: String },
    brand: { type: String, required: true },
    model:[ { type: String, required: true }],
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    currency: { type: String, enum: Object.values(CurrencyEnum), required: true },
    price: { type: Number, required: true },
    priceUAH: { type: Number },
    priceUSD: { type: Number },
    priceEUR: { type: Number },
    priceSource: { type: String },
    adStatus: { type: String, enum: Object.values(AdStatusEnum), default: AdStatusEnum.PENDING },
    // hasProfanity: { type: Boolean, default: false },
    // profaneWords: [{ type: String }],
    editAttempts: { type: Number, default: 0 },
}, { timestamps: true });

export const Car = model<ICar>('Car', CarSchema);
