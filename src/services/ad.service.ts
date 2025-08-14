import {IAd} from '../interfaces/ad.interface';
import {adRepository, AdRepository} from '../repositories/ad.repository';
import {HydratedDocument} from 'mongoose';
import {containsProfanity} from '../utils/check-profanity';
import {AdStatusEnum} from '../enums/ad-status.enum';
import {currencyService, CurrencyService} from './currency.service';

export class AdService {
    constructor(
        private adRepository: AdRepository,
        private currencyService: CurrencyService
    ) {}


    async createAd(dto: Partial<IAd>): Promise<HydratedDocument<IAd>> {
        const hasBadWords =
            containsProfanity(dto.title || '') || containsProfanity(dto.description || '');

        const status = hasBadWords   ? AdStatusEnum.PENDING_EDIT
            : AdStatusEnum.ACTIVE;


        if (!dto.price || !dto.currency) {
            throw new Error('Currency and price are required');
        }

        const exchangeRate = await this.currencyService.getRate(dto.currency);
        const priceInUAH = dto.price * exchangeRate;


        return this.adRepository.create({
            ...dto,
            status,
            exchangeRate,
            priceInUAH
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
    async updateAd(id: string, dto: Partial<IAd>): Promise<HydratedDocument<IAd>> {
        const ad = await this.adRepository.findById(id);
        if (!ad) {
            throw new Error(`Ad with ID ${id} not found`);
        }

        // Якщо змінюється ціна або валюта, оновлюємо priceInUAH
        let priceInUAH = ad.priceInUAH;
        let exchangeRate = ad.exchangeRate;
        if ((dto.price && dto.price !== ad.price) || (dto.currency && dto.currency !== ad.currency)) {
            const currency = dto.currency || ad.currency;
            exchangeRate = await this.currencyService.getRate(currency);
            priceInUAH = (dto.price || ad.price) * exchangeRate;
        }

        const updatedAd = await this.adRepository.updateById(id, {
            ...dto,
            exchangeRate,
            priceInUAH
        });

        return updatedAd;
    }

    async deleteAd(id: string): Promise<void> {
        const ad = await this.adRepository.findById(id);
        if (!ad) {
            throw new Error(`Ad with ID ${id} not found`);
        }

        await this.adRepository.delete(id);
    }
    }



export const adService = new AdService(adRepository, currencyService);




