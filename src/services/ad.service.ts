import { IAd } from '../interfaces/ad.interface';
import { adRepository, AdRepository } from '../repositories/ad.repository';
import { currencyService, CurrencyService } from './currency.service';
import {HydratedDocument} from 'mongoose';
import {ApiError} from '../errors/api-error';

 export class AdService {
    constructor(
        private adRepository: AdRepository,
        private currencyService: CurrencyService
    ) {}

    async createAd(dto: Partial<IAd>): Promise<HydratedDocument<IAd>> {
        if (!dto.currency || !dto.price) {
            throw new ApiError('Currency and price are required', 400);
        }

        const exchangeRate = await this.currencyService.getRate(dto.currency);
        const priceInUAH = dto.price * exchangeRate;
        return this.adRepository.create({
            ...dto,
            priceInUAH,
            exchangeRate,
        });
    }
    async getAd(id: string): Promise<HydratedDocument<IAd> | null> {
        return this.adRepository.findById(id);
    }

    async getAllAds(): Promise<HydratedDocument<IAd>[]> {
        return this.adRepository.findAll();
    }

    async updatePrices(): Promise<void> {
        const ads = await this.adRepository.findActiveAds();
        const uniqueCurrencies = Array.from(new Set(ads.map(ad => ad.currency)));
        const rates: { [key: string]: number } = {};

        for (const currency of uniqueCurrencies) {
            if (currency !== 'UAH') {
                rates[currency] = await this.currencyService.getRate(currency);
            }
        }

        await Promise.all(
            ads.map(async (ad)=> {
                if (ad.currency !== 'UAH' && rates[ad.currency]) {
                    const newPriceUAH = ad.price * rates[ad.currency];
                    await this.adRepository.updateAdPrice(ad._id.toString(), newPriceUAH, rates[ad.currency]);
                }
            })
        );

        }
    }


export const adService = new AdService(adRepository, currencyService);



//
// for (const ad of ads) {
//     if (ad.currency && ad.currency !== 'UAH' && rates[ad.currency]) {
//         const newPriceUAH = ad.price * rates[ad.currency];
//         await this.adRepository.updateAdPrice(ad._id.toString(), newPriceUAH, rates[ad.currency]);
//     }
//     }


