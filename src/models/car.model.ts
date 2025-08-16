import { Schema, model } from 'mongoose';
import { CurrencyEnum } from '../enums/currency.enum';
import { AdStatusEnum } from '../enums/ad-status.enum';
import {ICar} from '../interfaces/car-interface';
import {containsProfanity} from '../utils/check-profanity';


const CarSchema = new Schema<ICar>(
    {
        title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
            validate: {
                validator: (text: string) => {
                    const { hasProfanity } = containsProfanity(text);
                    return !hasProfanity;
                },
                message: 'The title contains inappropriate language',
            },
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 2000,
            validate: {
                validator: (text: string) => {
                    const { hasProfanity } = containsProfanity(text);
                    return !hasProfanity;
                },
                message: 'The description contains inappropriate language',
            },
        },
        brand: { type: String, required: true },
        model: [{ type: String, required: true }],
        sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        currency: {
            type: String,
            enum: Object.values(CurrencyEnum),
            required: true,
        },
        price: { type: Number, required: true },
        priceUAH: { type: Number },
        priceUSD: { type: Number },
        priceEUR: { type: Number },
        priceRate: { type: Number },
        priceSource: { type: String },
        adStatus: {
            type: String,
            enum: Object.values(AdStatusEnum),
            default: AdStatusEnum.PENDING,
        },
        hasProfanity: { type: Boolean, default: false },
        profaneWords: [{ type: String }],
        editAttempts: { type: Number, default: 0 },
        views: [{ date: { type: Date, default: Date.now } }],
        region: { type: String, required: true },
    },
    { timestamps: true }
);

CarSchema.pre('save', function (next) {
    const car = this as ICar;

    const allTexts = [car.title, car.description].filter(Boolean).join(' ');
    const { hasProfanity, words } = containsProfanity(allTexts);

    car.hasProfanity = hasProfanity;
    car.profaneWords = words;

    if (hasProfanity) {
        car.adStatus = AdStatusEnum.PENDING;
    }

    next();
});

export const Car = model<ICar>('Car', CarSchema);
